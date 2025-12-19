/**
 * 深度分析義項與例句工作表
 */
const XLSX = require('xlsx');
const path = require('path');

const odsPath = path.join(__dirname, '..', 'source_dict.ods');
const workbook = XLSX.readFile(odsPath);

// 分析義項
console.log('=== 義項工作表分析 ===');
const yixiang = workbook.Sheets['義項'];
if (yixiang) {
    const data = XLSX.utils.sheet_to_json(yixiang, { header: 1 });
    console.log('欄位標題:', data[0]);
    console.log('總行數:', data.length);
    console.log('\n前 10 行完整資料:');
    for (let i = 0; i < Math.min(10, data.length); i++) {
        console.log(`Row ${i}:`, JSON.stringify(data[i]));
    }

    // 檢查有多少行有 A 欄 (詞目ID)
    let withA = 0;
    let withB = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i][0]) withA++;
        if (data[i][1]) withB++;
    }
    console.log(`\nA欄有值: ${withA} 行`);
    console.log(`B欄有值: ${withB} 行`);
}

// 分析例句
console.log('\n\n=== 例句工作表分析 ===');
const liju = workbook.Sheets['例句'];
if (liju) {
    const data = XLSX.utils.sheet_to_json(liju, { header: 1 });
    console.log('欄位標題:', data[0]);
    console.log('總行數:', data.length);
    console.log('\n前 10 行完整資料:');
    for (let i = 0; i < Math.min(10, data.length); i++) {
        console.log(`Row ${i}:`, JSON.stringify(data[i]));
    }

    // 檢查詞目ID欄
    let withA = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i][0]) withA++;
    }
    console.log(`\nA欄有值: ${withA} 行`);
}

// 確認詞目表的 ID 格式
console.log('\n\n=== 詞目表 ID 格式 ===');
const cimu = workbook.Sheets['詞目'];
if (cimu) {
    const data = XLSX.utils.sheet_to_json(cimu, { header: 1 });
    console.log('前 5 筆詞目 ID:');
    for (let i = 1; i <= 5; i++) {
        console.log(`  詞目ID: "${data[i][0]}" | 漢字: "${data[i][2]}"`);
    }
}
