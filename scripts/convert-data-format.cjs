/**
 * 轉換 data_full.json 格式以符合應用程式結構
 * 
 * 原格式: word, romanization, definition, sentence
 * 新格式: hanzi, tailo, meaning, sentence (符合 CentralCard 元件期望)
 */
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'src', 'data_full.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'data.json');

console.log('📖 讀取 data_full.json...');
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

console.log(`   總筆數: ${rawData.length}`);

// 轉換格式
const convertedWords = rawData.map((item, index) => ({
    id: index + 1,
    hanzi: item.word,
    tailo: item.romanization,
    type: item.type,
    meaning: item.definition || item.sentence || '（待補充）',
    sentence: item.sentence || null,
    themeColor: item.themeColor
}));

// 包裝為 { words: [...] } 格式
const output = { words: convertedWords };

// 輸出
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log(`\n✅ 已轉換並輸出至: ${outputPath}`);
console.log(`   共 ${convertedWords.length} 筆資料`);

// 顯示範例
console.log('\n📋 範例資料 (前 5 筆):');
convertedWords.slice(0, 5).forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item.hanzi} [${item.type}] - ${item.tailo}`);
    console.log(`     釋義: ${item.meaning}`);
    console.log(`     例句: ${item.sentence || '(無)'}`);
});
