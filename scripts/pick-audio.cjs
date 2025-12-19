/**
 * 音檔搬運腳本
 * 
 * 任務：
 * 1. 從 ODS 讀取 311 筆疊字詞的音檔檔名對應
 * 2. 從 sutiau-mp3/ 搜尋並複製對應音檔
 * 3. 更新 data.json 新增 audioPath 欄位
 */
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const ODS_PATH = path.join(PROJECT_ROOT, 'source_dict.ods');
const DATA_PATH = path.join(PROJECT_ROOT, 'src', 'data', 'data.json');
const AUDIO_SOURCE = path.join(PROJECT_ROOT, 'sutiau-mp3');
const AUDIO_DEST = path.join(PROJECT_ROOT, 'public', 'audio');

// 清洗文字
function cleanWord(text) {
    if (!text) return '';
    return text
        .replace(/【[^】]*】/g, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/（[^）]*）/g, '')
        .trim();
}

// 遞迴搜尋音檔
function findAudioFile(sourceDir, filename) {
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(sourceDir, entry.name);

        if (entry.isDirectory()) {
            const result = findAudioFile(fullPath, filename);
            if (result) return result;
        } else if (entry.name === filename) {
            return fullPath;
        }
    }
    return null;
}

function main() {
    console.log('📖 讀取 ODS 檔案...');
    const workbook = XLSX.readFile(ODS_PATH);
    const cimuSheet = workbook.Sheets['詞目'];
    const cimuData = XLSX.utils.sheet_to_json(cimuSheet, { header: 1 });

    // 建立 漢字 -> 音檔檔名 對照表
    const hanziToAudio = new Map();
    for (let i = 1; i < cimuData.length; i++) {
        const row = cimuData[i];
        const hanzi = cleanWord(row[2]); // C欄: 漢字
        const audioName = row[5];         // F欄: 羅馬字音檔檔名

        if (hanzi && audioName) {
            hanziToAudio.set(hanzi, audioName);
        }
    }
    console.log(`   建立對照表: ${hanziToAudio.size} 筆`);

    // 讀取目前的 data.json
    console.log('\n📋 讀取 data.json...');
    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const words = rawData.words;
    console.log(`   詞彙數量: ${words.length} 筆`);

    // 確保目標資料夾存在
    if (!fs.existsSync(AUDIO_DEST)) {
        fs.mkdirSync(AUDIO_DEST, { recursive: true });
        console.log(`\n📁 建立目標資料夾: ${AUDIO_DEST}`);
    }

    // 開始搬運
    console.log('\n🎵 開始搬運音檔...');
    let successCount = 0;
    let notFoundCount = 0;
    const notFoundList = [];

    for (const word of words) {
        const audioName = hanziToAudio.get(word.hanzi);

        if (!audioName) {
            notFoundList.push({ hanzi: word.hanzi, reason: 'ODS 中無對應' });
            notFoundCount++;
            continue;
        }

        // 音檔檔名格式: "數字(1)" -> "數字(1).mp3"
        const audioFilename = `${audioName}.mp3`;
        const sourcePath = findAudioFile(AUDIO_SOURCE, audioFilename);

        if (!sourcePath) {
            notFoundList.push({ hanzi: word.hanzi, audioName, reason: '音檔不存在' });
            notFoundCount++;
            continue;
        }

        // 複製音檔（攤平放在 public/audio/）
        const destPath = path.join(AUDIO_DEST, audioFilename);
        fs.copyFileSync(sourcePath, destPath);

        // 更新 data.json 的 audioPath
        word.audioPath = `/audio/${audioFilename}`;
        successCount++;
    }

    // 儲存更新後的 data.json
    fs.writeFileSync(DATA_PATH, JSON.stringify(rawData, null, 2), 'utf8');

    // 輸出結果
    console.log('\n========== 執行結果 ==========');
    console.log(`✅ 成功搬運: ${successCount} 個音檔`);
    console.log(`❌ 未找到: ${notFoundCount} 個`);

    if (notFoundList.length > 0) {
        console.log('\n📋 未找到音檔的詞彙清單:');
        notFoundList.forEach((item, i) => {
            console.log(`   ${i + 1}. ${item.hanzi} (${item.reason}${item.audioName ? `: ${item.audioName}` : ''})`);
        });
    }

    console.log('\n💾 data.json 已更新');
}

main();
