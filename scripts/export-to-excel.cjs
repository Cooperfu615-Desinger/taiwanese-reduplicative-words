/**
 * 導出資料為 Excel 檔案
 * 用於人工校對與編輯
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'data.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'taiwanese_words_v1.xlsx');

console.log('📖 讀取資料...');
const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const words = rawData.words;
console.log(`   總筆數: ${words.length}`);

// 轉換為扁平化表格格式
const tableData = words.map((item, index) => ({
    id: index + 1,
    word: item.hanzi || '',
    romanization: item.tailo || '',
    definition: item.meaning || '',
    sentence: item.sentence || '',
    type: item.type || '',
    themeColor: item.themeColor || '',
    category: item.category || ''
}));

// 建立工作表
const worksheet = XLSX.utils.json_to_sheet(tableData);

// 設定欄寬
worksheet['!cols'] = [
    { wch: 5 },   // id
    { wch: 15 },  // word
    { wch: 25 },  // romanization
    { wch: 40 },  // definition
    { wch: 50 },  // sentence
    { wch: 8 },   // type
    { wch: 10 }, // themeColor
    { wch: 10 }   // category
];

// 建立工作簿
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, '疊字詞資料');

// 導出
XLSX.writeFile(workbook, OUTPUT_PATH);

console.log(`\n✅ 已導出至: ${OUTPUT_PATH}`);
console.log('\n📋 欄位說明:');
console.log('   • id: 序號');
console.log('   • word: 漢字');
console.log('   • romanization: 台羅拼音');
console.log('   • definition: 釋義');
console.log('   • sentence: 例句');
console.log('   • type: 結構類型 (ABB/AAB/AABB/ABAB)');
console.log('   • themeColor: 主題色 (HEX)');
console.log('   • category: 分類');
