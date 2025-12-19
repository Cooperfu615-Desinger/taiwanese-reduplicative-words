/**
 * 匯入台語疊字詞完整資料 (最終版)
 * 
 * 資料來源：source_dict.ods
 * 修正策略：由於 ID 欄位為空，改用「漢字」作為關聯鍵
 * 
 * - 詞目分頁：主表，C欄=漢字，D欄=台羅
 * - 義項分頁：D欄=解說 (需透過順序對應)
 * - 例句分頁：D欄=漢字例句，F欄=華語翻譯
 */
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// 深色系主題色
const DARK_THEME_COLORS = [
    '#2D3436', '#1E272E', '#2C3E50', '#34495E', '#1A1A2E',
    '#16213E', '#0F3460', '#533483', '#4A0E4E', '#2C2C54',
    '#474787', '#3D3D3D', '#2F4F4F', '#4A4A4A', '#1F1F1F',
    '#3A3A3A', '#5D4E60', '#3C3C3C', '#2B2B2B', '#4B3832'
];

function getRandomThemeColor() {
    return DARK_THEME_COLORS[Math.floor(Math.random() * DARK_THEME_COLORS.length)];
}

// 清洗文字
function cleanWord(text) {
    if (!text) return '';
    return text
        .replace(/【[^】]*】/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/（[^）]*）/g, '')
        .trim();
}

// 判斷疊字結構：ABB, AAB, AABB, ABAB
function isReduplicativeWord(word) {
    if (!word || word.length < 2) return false;
    const chars = [...word];
    const len = chars.length;

    // === 3字結構 ===

    // ABB：後兩字相同 (如：紅記記、冷吱吱)
    if (len === 3 && chars[1] === chars[2]) {
        return { type: 'ABB', word };
    }

    // AAB：前兩字相同 (如：慢慢仔、好好仔)
    if (len === 3 && chars[0] === chars[1]) {
        return { type: 'AAB', word };
    }

    // === 4字結構 ===

    // AABB：前兩字同 + 後兩字同 (如：歡歡喜喜、平平安安)
    if (len === 4 && chars[0] === chars[1] && chars[2] === chars[3]) {
        return { type: 'AABB', word };
    }

    // ABAB：AB 重複 (如：來去來去、反反覆覆)
    // 注意：chars[0]==chars[2] 且 chars[1]==chars[3]
    if (len === 4 && chars[0] === chars[2] && chars[1] === chars[3]) {
        return { type: 'ABAB', word };
    }

    return false;
}

function main() {
    const odsPath = path.join(__dirname, '..', 'source_dict.ods');
    const outputPath = path.join(__dirname, '..', 'src', 'data_full.json');

    console.log('📖 讀取 ODS 檔案:', odsPath);
    const workbook = XLSX.readFile(odsPath);

    // ========== 讀取詞目表，建立索引（依行數對應） ==========
    console.log('\n📋 讀取詞目主表...');
    const cimuSheet = workbook.Sheets['詞目'];
    const cimuData = XLSX.utils.sheet_to_json(cimuSheet, { header: 1 });
    console.log(`   詞目數量: ${cimuData.length - 1} 筆`);

    // 建立詞目 -> 行號對應 (用於後續對應義項/例句)
    const wordToRowIndex = new Map();
    for (let i = 1; i < cimuData.length; i++) {
        const hanzi = cleanWord(cimuData[i][2]); // C欄
        if (hanzi) {
            wordToRowIndex.set(hanzi, i);
        }
    }

    // ========== 讀取義項表，建立漢字 -> 解說對照 ==========
    console.log('\n📚 讀取義項表...');
    const yixiangSheet = workbook.Sheets['義項'];
    const yixiangData = XLSX.utils.sheet_to_json(yixiangSheet, { header: 1 });

    // 義項表結構：按順序對應詞目（需要找出對應方式）
    // 從「義項tuì義項近義」分頁可以看出 B欄有詞目漢字
    // 讓我改用「義項tuì義項近義」分頁來抓取釋義
    const definitionMap = new Map();

    // 嘗試從義項tuì義項近義取得對照
    const yixiangNearSheet = workbook.Sheets['義項tuì義項近義'];
    if (yixiangNearSheet) {
        const data = XLSX.utils.sheet_to_json(yixiangNearSheet, { header: 1 });
        // 欄位：A=義項id, B=詞目漢字, C=解說
        for (let i = 1; i < data.length; i++) {
            const hanzi = data[i][1];
            const definition = data[i][2];
            if (hanzi && definition && !definitionMap.has(hanzi)) {
                definitionMap.set(cleanWord(hanzi), definition);
            }
        }
    }
    console.log(`   建立 ${definitionMap.size} 筆釋義索引`);

    // ========== 讀取例句表 ==========
    console.log('\n📝 讀取例句表...');
    const lijuSheet = workbook.Sheets['例句'];
    const lijuData = XLSX.utils.sheet_to_json(lijuSheet, { header: 1 });

    // 例句表：D欄=台語例句, E欄=羅馬字, F欄=華語
    // 音檔檔名格式如 "1-1-1" 可能表示 詞目ID-義項ID-例句序
    // 透過例句內容 (D欄) 中是否包含詞目漢字來關聯
    const sentenceMap = new Map();

    // 先收集所有例句
    const allSentences = [];
    for (let i = 1; i < lijuData.length; i++) {
        const row = lijuData[i];
        const taigiSentence = row[3]; // D欄
        const mandarin = row[5];      // F欄
        if (taigiSentence) {
            allSentences.push({
                taigi: taigiSentence,
                mandarin: mandarin || ''
            });
        }
    }
    console.log(`   共 ${allSentences.length} 筆例句`);

    // ========== 處理詞目，過濾疊字 ==========
    console.log('\n🔍 過濾 ABB/AAB/AABB/ABAB 疊字結構...');

    const results = [];
    let abbCount = 0;
    let aabCount = 0;
    let aabbCount = 0;
    let ababCount = 0;
    let withDefinition = 0;
    let withSentence = 0;

    for (let i = 1; i < cimuData.length; i++) {
        const row = cimuData[i];
        const hanziRaw = row[2];        // C欄：漢字
        const romanization = row[3];    // D欄：台羅

        if (!hanziRaw) continue;

        const hanzi = cleanWord(hanziRaw);
        const reduplication = isReduplicativeWord(hanzi);
        if (!reduplication) continue;

        if (reduplication.type === 'ABB') abbCount++;
        if (reduplication.type === 'AAB') aabCount++;
        if (reduplication.type === 'AABB') aabbCount++;
        if (reduplication.type === 'ABAB') ababCount++;

        // 取得釋義
        let definition = definitionMap.get(hanzi) || null;

        // 尋找包含此詞的例句
        let sentence = null;
        for (const s of allSentences) {
            if (s.taigi.includes(hanzi)) {
                sentence = s.taigi;
                break;
            }
        }

        if (definition) withDefinition++;
        if (sentence) withSentence++;

        results.push({
            id: `word_${i}`,
            word: hanzi,
            romanization: romanization || '',
            definition: definition,
            sentence: sentence,
            type: reduplication.type,
            themeColor: getRandomThemeColor()
        });
    }

    // ========== 輸出統計 ==========
    console.log('\n📊 統計結果:');
    console.log(`   • ABB 結構: ${abbCount} 筆`);
    console.log(`   • AAB 結構: ${aabCount} 筆`);
    console.log(`   • AABB 結構: ${aabbCount} 筆`);
    console.log(`   • ABAB 結構: ${ababCount} 筆`);
    console.log(`   • 總計疊字詞: ${results.length} 筆`);
    console.log(`   • 有釋義: ${withDefinition} 筆`);
    console.log(`   • 有例句: ${withSentence} 筆`);
    console.log(`   • 無例句 (需 AI 補): ${results.length - withSentence} 筆`);

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`\n✅ 已輸出至: ${outputPath}`);

    // 顯示範例
    console.log('\n📋 範例資料 (前 10 筆):');
    results.slice(0, 10).forEach((item, idx) => {
        console.log(`  ${idx + 1}. ${item.word} [${item.type}] - ${item.romanization}`);
        console.log(`     釋義: ${item.definition || '(無)'}`);
        console.log(`     例句: ${item.sentence || '(無)'}`);
    });
}

main();
