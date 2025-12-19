/**
 * 驗證並移除不在 ODS 中的詞彙
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const ODS_PATH = path.join(PROJECT_ROOT, 'source_dict.ods');
const DATA_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'data.json');

// 清洗文字
function cleanWord(text) {
    if (!text) return '';
    return text
        .replace(/【[^】]*】/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/（[^）]*）/g, '')
        .trim();
}

function main() {
    console.log('📖 讀取 ODS 檔案...');
    const workbook = XLSX.readFile(ODS_PATH);
    const cimuSheet = workbook.Sheets['詞目'];
    const cimuData = XLSX.utils.sheet_to_json(cimuSheet, { header: 1 });

    // 建立 ODS 中所有漢字集合
    const odsHanziSet = new Set();
    for (let i = 1; i < cimuData.length; i++) {
        const hanzi = cleanWord(cimuData[i][2]); // C欄: 漢字
        if (hanzi) {
            odsHanziSet.add(hanzi);
        }
    }
    console.log(`   ODS 詞目總數: ${odsHanziSet.size}`);

    // 讀取 data.json
    console.log('\n📋 讀取 data.json...');
    const dataRaw = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const words = dataRaw.words;
    console.log(`   data.json 詞彙總數: ${words.length}`);

    // 分類
    const inODS = words.filter(w => odsHanziSet.has(w.hanzi));
    const notInODS = words.filter(w => !odsHanziSet.has(w.hanzi));

    console.log(`\n✅ 在 ODS 中的詞彙: ${inODS.length} 筆`);
    console.log(`❌ 不在 ODS 中的詞彙: ${notInODS.length} 筆`);

    // 顯示不在 ODS 中的詞彙
    if (notInODS.length > 0) {
        console.log('\n📋 不在 ODS 中的詞彙清單:');
        notInODS.forEach((w, i) => {
            console.log(`   ${i + 1}. ${w.hanzi} (${w.type})`);
        });
    }

    // 詢問是否移除
    console.log('\n========================================');
    console.log('是否要移除這些不在 ODS 中的詞彙？');
    console.log('使用 --remove 參數執行移除');
    console.log('========================================');

    if (process.argv.includes('--remove')) {
        console.log('\n🗑️ 執行移除...');

        // 只保留在 ODS 中的詞彙
        dataRaw.words = inODS;

        // 重新編號 id
        dataRaw.words.forEach((w, i) => {
            w.id = i + 1;
        });

        // 儲存
        fs.writeFileSync(DATA_PATH, JSON.stringify(dataRaw, null, 2), 'utf8');
        console.log(`\n💾 已儲存！剩餘 ${dataRaw.words.length} 筆詞彙`);
    }
}

main();
