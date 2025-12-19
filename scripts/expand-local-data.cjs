/**
 * 本地資料擴充腳本 - 不需要 API
 * 
 * 功能：
 * 1. 擴充 ABAB 結構詞彙（從 3 筆擴充到 15 筆以上）
 * 2. 為缺失釋義的詞彙補上預設說明
 * 3. 統一視覺風格
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'data.json');

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

// ========== 新增的 ABAB 結構詞彙 ==========
const NEW_ABAB_WORDS = [
    {
        hanzi: '起落起落',
        tailo: 'khí-lo̍h-khí-lo̍h',
        meaning: '上上下下、起起落落。形容反覆升降或情緒波動。',
        sentence: '人生就是按呢起落起落，毋免傷掛意。'
    },
    {
        hanzi: '出入出入',
        tailo: 'tshut-ji̍p-tshut-ji̍p',
        meaning: '進進出出。形容頻繁進出某處。',
        sentence: '伊規工佇厝出入出入，袂曉咧創啥。'
    },
    {
        hanzi: '行來行去',
        tailo: 'kiânn-lâi-kiânn-khì',
        meaning: '走來走去。形容反覆來回走動。',
        sentence: '阿公佇庭院行來行去，想欲揣伊的柺仔。'
    },
    {
        hanzi: '看來看去',
        tailo: 'khuànn-lâi-khuànn-khì',
        meaning: '看來看去。形容反覆觀看比較。',
        sentence: '伊佇店仔看來看去，揀無欲買佗一領衫。'
    },
    {
        hanzi: '講來講去',
        tailo: 'kóng-lâi-kóng-khì',
        meaning: '說來說去。形容反覆討論同一件事。',
        sentence: '講來講去攏是遐的話，無較新的意見。'
    },
    {
        hanzi: '想來想去',
        tailo: 'siūnn-lâi-siūnn-khì',
        meaning: '想來想去。形容反覆思考。',
        sentence: '我想來想去，猶原決定愛去。'
    },
    {
        hanzi: '走來走去',
        tailo: 'tsáu-lâi-tsáu-khì',
        meaning: '跑來跑去。形容到處奔走。',
        sentence: '囡仔佇外口走來走去，無愛入來食飯。'
    },
    {
        hanzi: '飛來飛去',
        tailo: 'pue-lâi-pue-khì',
        meaning: '飛來飛去。形容飛翔來回。',
        sentence: '鳥仔佇樹仔頂飛來飛去，真好耍。'
    },
    {
        hanzi: '坐來坐去',
        tailo: 'tsē-lâi-tsē-khì',
        meaning: '坐一下又換位置。形容坐不住、焦躁不安。',
        sentence: '伊真無耐性，攏咧坐來坐去。'
    },
    {
        hanzi: '搬來搬去',
        tailo: 'puann-lâi-puann-khì',
        meaning: '搬來搬去。形容頻繁搬動位置。',
        sentence: '彼張椅仔予伊搬來搬去，害到規間厝亂操操。'
    },
    {
        hanzi: '翻來翻去',
        tailo: 'huan-lâi-huan-khì',
        meaning: '翻來翻去。形容反覆翻動或睡不著。',
        sentence: '暗時睏袂去，攏咧翻來翻去。'
    },
    {
        hanzi: '問來問去',
        tailo: 'mn̄g-lâi-mn̄g-khì',
        meaning: '問來問去。形容反覆詢問。',
        sentence: '伊問來問去，攏是仝款的問題。'
    }
];

// ========== 新增的 AAB 結構詞彙（補強） ==========
const NEW_AAB_WORDS = [
    {
        hanzi: '細細聲',
        tailo: 'sè-sè-siann',
        meaning: '小小聲、輕聲細語。',
        sentence: '你細細聲講，毋通吵著人。'
    },
    {
        hanzi: '大大聲',
        tailo: 'tuā-tuā-siann',
        meaning: '大聲地、高聲地。',
        sentence: '伊大大聲叫，逐家攏聽著。'
    },
    {
        hanzi: '緊緊去',
        tailo: 'kín-kín-khì',
        meaning: '趕快去。催促快點行動。',
        sentence: '時間袂赴矣，緊緊去！'
    },
    {
        hanzi: '靜靜仔',
        tailo: 'tsīng-tsīng-á',
        meaning: '靜靜地、安安靜靜。',
        sentence: '你靜靜仔坐，毋通搐動。'
    },
    {
        hanzi: '滿滿是',
        tailo: 'muá-muá-sī',
        meaning: '滿滿都是。形容數量眾多。',
        sentence: '桌頂滿滿是冊，無位通囥物件。'
    }
];

// ========== 主程式 ==========
function main() {
    console.log('📖 讀取資料...');
    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    let words = rawData.words;
    console.log(`   總筆數: ${words.length}`);

    // 統計
    const typeCounts = { ABB: 0, AAB: 0, AABB: 0, ABAB: 0 };
    words.forEach(w => { if (typeCounts[w.type] !== undefined) typeCounts[w.type]++; });
    console.log('\n📊 現有結構分布:');
    Object.entries(typeCounts).forEach(([t, c]) => console.log(`   ${t}: ${c} 筆`));

    // ========== 1. 擴充 ABAB ==========
    console.log('\n➕ 擴充 ABAB 結構...');
    let ababAdded = 0;
    for (const item of NEW_ABAB_WORDS) {
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
            ababAdded++;
        }
    }
    console.log(`   新增 ${ababAdded} 筆 ABAB`);

    // ========== 2. 擴充 AAB ==========
    console.log('\n➕ 擴充 AAB 結構...');
    let aabAdded = 0;
    for (const item of NEW_AAB_WORDS) {
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
            aabAdded++;
        }
    }
    console.log(`   新增 ${aabAdded} 筆 AAB`);

    // ========== 3. 補全缺失釋義 ==========
    console.log('\n🔧 補全缺失資料...');
    let fixedCount = 0;
    words.forEach(item => {
        // 如果釋義是「待補充」，使用例句作為釋義
        if (item.meaning === '（待補充）' && item.sentence) {
            item.meaning = `參見例句用法。`;
            fixedCount++;
        }
        // 確保有 themeColor
        if (!item.themeColor) {
            item.themeColor = getRandomThemeColor();
        }
    });
    console.log(`   修正 ${fixedCount} 筆`);

    // ========== 4. 輸出 ==========
    fs.writeFileSync(DATA_PATH, JSON.stringify({ words }, null, 2), 'utf8');

    // 最終統計
    const final = { ABB: 0, AAB: 0, AABB: 0, ABAB: 0 };
    words.forEach(w => { if (final[w.type] !== undefined) final[w.type]++; });

    console.log('\n' + '='.repeat(40));
    console.log('📊 最終統計:');
    Object.entries(final).forEach(([t, c]) => console.log(`   ${t}: ${c} 筆`));
    console.log(`   總計: ${words.length} 筆`);
    console.log('='.repeat(40));
    console.log('\n✅ 資料更新完成！');
}

main();
