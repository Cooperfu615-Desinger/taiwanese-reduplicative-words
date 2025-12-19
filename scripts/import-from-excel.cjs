/**
 * 從 Excel 匯入資料
 * 將編輯後的 Excel 同步回 data.json
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.join(process.env.HOME, 'Desktop', 'taiwanese_words_v1.xlsx');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'data.json');

// 深色系復古主題色（如果缺少 themeColor 時使用）
const DARK_THEME_COLORS = [
    '#2D3436', '#1E272E', '#2C3E50', '#34495E', '#1A1A2E',
    '#16213E', '#0F3460', '#533483', '#4A0E4E', '#2C2C54',
    '#474787', '#3D3D3D', '#2F4F4F', '#4A4A4A', '#1F1F1F'
];

function getRandomThemeColor() {
    return DARK_THEME_COLORS[Math.floor(Math.random() * DARK_THEME_COLORS.length)];
}

console.log('📖 讀取 Excel 檔案...');
console.log(`   來源: ${EXCEL_PATH}`);

if (!fs.existsSync(EXCEL_PATH)) {
    console.error('❌ 找不到 Excel 檔案！請確認檔案位於桌面。');
    process.exit(1);
}

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(worksheet);

console.log(`   讀取 ${rawData.length} 筆資料`);

// 轉換為應用程式格式
const words = rawData.map((row, index) => ({
    id: index + 1,
    hanzi: row.word || '',
    tailo: row.romanization || '',
    type: row.type || 'ABB',
    meaning: row.definition || '',
    sentence: row.sentence || null,
    themeColor: row.themeColor || getRandomThemeColor(),
    category: row.category || null
}));

// 統計
const typeCounts = { ABB: 0, AAB: 0, AABB: 0, ABAB: 0 };
words.forEach(w => {
    if (typeCounts[w.type] !== undefined) typeCounts[w.type]++;
});

console.log('\n📊 結構分布:');
Object.entries(typeCounts).forEach(([t, c]) => console.log(`   ${t}: ${c} 筆`));
console.log(`   總計: ${words.length} 筆`);

// 檢查資料完整性
let missingDef = 0, missingSentence = 0;
words.forEach(w => {
    if (!w.meaning) missingDef++;
    if (!w.sentence) missingSentence++;
});
console.log(`\n⚠️ 缺失統計:`);
console.log(`   缺少釋義: ${missingDef} 筆`);
console.log(`   缺少例句: ${missingSentence} 筆`);

// 輸出
const output = { words };
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');

console.log(`\n✅ 已匯入至: ${OUTPUT_PATH}`);
