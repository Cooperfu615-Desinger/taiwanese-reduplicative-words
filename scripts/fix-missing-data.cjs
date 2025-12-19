/**
 * 分批處理版本 - 使用 Gemini API 補全台語疊字詞資料
 * 
 * 策略：
 * 1. 先擴充 AAB/ABAB 結構（只需幾次 API 呼叫）
 * 2. 使用更長的延遲避免速率限制
 * 3. 分批處理缺失資料
 */
const fs = require('fs');
const path = require('path');

// ========== 配置 ==========
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'data.json');

// 每批處理的數量
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE) || 10;
const START_INDEX = parseInt(process.env.START_INDEX) || 0;

// 深色系復古主題色
const DARK_THEME_COLORS = [
    '#2D3436', '#1E272E', '#2C3E50', '#34495E', '#1A1A2E',
    '#16213E', '#0F3460', '#533483', '#4A0E4E', '#2C2C54',
    '#474787', '#3D3D3D', '#2F4F4F', '#4A4A4A', '#1F1F1F',
    '#3A3A3A', '#5D4E60', '#3C3C3C', '#2B2B2B', '#4B3832'
];

function getRandomThemeColor() {
    return DARK_THEME_COLORS[Math.floor(Math.random() * DARK_THEME_COLORS.length)];
}

// 等待函數
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ========== Gemini API 呼叫 ==========
async function callGemini(prompt, maxRetries = 5) {
    if (!API_KEY) throw new Error('請設定環境變數 GEMINI_API_KEY');

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
                })
            });

            if (response.status === 429) {
                const waitTime = Math.pow(2, attempt) * 5000; // 10s, 20s, 40s...
                console.log(`\n   ⏳ 速率限制，等待 ${waitTime / 1000}s...`);
                await sleep(waitTime);
                continue;
            }

            if (!response.ok) throw new Error(`API ${response.status}`);

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error('Empty response');
            return text;
        } catch (error) {
            if (attempt === maxRetries) throw error;
            console.log(`\n   重試 ${attempt}/${maxRetries}...`);
            await sleep(3000);
        }
    }
}

// ========== 生成新疊字詞 ==========
async function generateNewWords(type, count) {
    const typeDesc = {
        'AAB': '前兩字相同（如：慢慢仔、輕輕仔、好好仔、勻勻仔）',
        'ABAB': 'AB兩字重複（如：起落起落、出入出入、行來行去）'
    };

    const prompt = `你是台語文學專家。請生成 ${count} 個常用且真實的台語 ${type} 結構疊字詞。

${type} 結構：${typeDesc[type]}

請回覆純 JSON 陣列（不要 markdown），格式：
[{"hanzi":"詞彙","tailo":"台羅拼音","meaning":"簡短釋義","sentence":"台語造句"}]

要求：
- 必須是真實常用的台語詞彙
- 避免生成地名或專有名詞
- 釋義用繁體中文
- 造句用台語漢字`;

    const response = await callGemini(prompt);
    const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson);
}

// ========== 補全單筆資料 ==========
async function fillItem(item) {
    const prompt = `你是台語文學專家。請為以下台語詞提供資料：

詞彙：${item.hanzi}
台羅：${item.tailo}
類型：${item.type}

請回覆純 JSON（不要 markdown），格式：
{"definition":"簡短繁體中文釋義（15-25字）","sentence":"台語日常造句（漢字，15-25字）"}`;

    const response = await callGemini(prompt);
    const cleanJson = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson);
}

// ========== 主程式 ==========
async function main() {
    const mode = process.env.MODE || 'expand'; // expand | fill | all

    console.log('📖 讀取資料...');
    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    let words = rawData.words;
    console.log(`   總筆數: ${words.length}`);

    // 統計
    const typeCounts = { ABB: 0, AAB: 0, AABB: 0, ABAB: 0 };
    words.forEach(w => { if (typeCounts[w.type] !== undefined) typeCounts[w.type]++; });
    console.log('\n📊 結構分布:', typeCounts);

    // ========== 擴充模式 ==========
    if (mode === 'expand' || mode === 'all') {
        console.log('\n🔧 擴充 AAB/ABAB 結構...');

        // 擴充 ABAB（目前只有 3 筆）
        if (typeCounts.ABAB < 15) {
            console.log('   生成 ABAB 詞彙...');
            await sleep(5000); // 先等待避免速率限制
            try {
                const newABAB = await generateNewWords('ABAB', 12);
                let added = 0;
                for (const item of newABAB) {
                    if (!words.some(w => w.hanzi === item.hanzi)) {
                        words.push({
                            id: words.length + 1,
                            hanzi: item.hanzi,
                            tailo: item.tailo,
                            type: 'ABAB',
                            meaning: item.meaning,
                            sentence: item.sentence,
                            themeColor: getRandomThemeColor()
                        });
                        added++;
                    }
                }
                console.log(`   ✓ 新增 ${added} 筆 ABAB`);
            } catch (e) {
                console.log(`   ✗ ABAB 生成失敗: ${e.message}`);
            }
        }

        // 如果 AAB 數量足夠（84筆），跳過
        if (typeCounts.AAB < 80) {
            console.log('   生成 AAB 詞彙...');
            await sleep(10000);
            try {
                const newAAB = await generateNewWords('AAB', 10);
                let added = 0;
                for (const item of newAAB) {
                    if (!words.some(w => w.hanzi === item.hanzi)) {
                        words.push({
                            id: words.length + 1,
                            hanzi: item.hanzi,
                            tailo: item.tailo,
                            type: 'AAB',
                            meaning: item.meaning,
                            sentence: item.sentence,
                            themeColor: getRandomThemeColor()
                        });
                        added++;
                    }
                }
                console.log(`   ✓ 新增 ${added} 筆 AAB`);
            } catch (e) {
                console.log(`   ✗ AAB 生成失敗: ${e.message}`);
            }
        }
    }

    // ========== 補全模式 ==========
    if (mode === 'fill' || mode === 'all') {
        const needsFilling = words.filter(w =>
            !w.meaning || w.meaning === '（待補充）' ||
            !w.sentence || w.sentence === null
        );

        console.log(`\n🔍 需補全: ${needsFilling.length} 筆`);

        if (needsFilling.length > 0) {
            const batch = needsFilling.slice(START_INDEX, START_INDEX + BATCH_SIZE);
            console.log(`   處理批次: ${START_INDEX + 1} ~ ${START_INDEX + batch.length}`);

            let filled = 0;
            for (const item of batch) {
                process.stdout.write(`   ${item.hanzi}...`);
                try {
                    await sleep(5000); // 每次請求間隔 5 秒
                    const result = await fillItem(item);
                    item.meaning = result.definition;
                    item.sentence = result.sentence;
                    filled++;
                    console.log(' ✓');
                } catch (e) {
                    console.log(` ✗ (${e.message})`);
                }
            }
            console.log(`   本批完成: ${filled}/${batch.length}`);

            if (START_INDEX + BATCH_SIZE < needsFilling.length) {
                console.log(`\n💡 還有 ${needsFilling.length - START_INDEX - BATCH_SIZE} 筆待處理`);
                console.log(`   執行: START_INDEX=${START_INDEX + BATCH_SIZE} MODE=fill node scripts/fix-missing-data.cjs`);
            }
        }
    }

    // 確保所有資料有 themeColor
    words.forEach(item => {
        if (!item.themeColor) item.themeColor = getRandomThemeColor();
    });

    // 儲存
    fs.writeFileSync(DATA_PATH, JSON.stringify({ words }, null, 2), 'utf8');

    // 最終統計
    const final = { ABB: 0, AAB: 0, AABB: 0, ABAB: 0 };
    words.forEach(w => { if (final[w.type] !== undefined) final[w.type]++; });

    console.log('\n' + '='.repeat(40));
    console.log('📊 最終統計:');
    Object.entries(final).forEach(([t, c]) => console.log(`   ${t}: ${c} 筆`));
    console.log(`   總計: ${words.length} 筆`);
    console.log('='.repeat(40));
}

main().catch(console.error);
