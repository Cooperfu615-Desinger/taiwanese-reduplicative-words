/**
 * 修正資料中過淺的 themeColor
 * 確保所有背景色足夠深以顯示白色文字
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'data.json');

// ========== 復古深色調色盤 ==========
// 所有顏色經過篩選，確保與白色文字有足夠對比度
const DARK_PALETTE = [
    // 墨綠系
    '#1B4332', '#2D4739', '#1E3A2F', '#264D3B',
    // 藏青/靛藍系
    '#1B3A4B', '#16213E', '#1A1A2E', '#0F3460',
    // 胭脂紅/酒紅系
    '#4A0E0E', '#5C1A1A', '#6B2D2D', '#4A1C2C',
    // 深赭石/棕褐系
    '#3D2314', '#4B3832', '#4A3728', '#5D4037',
    // 墨紫系
    '#2E1A47', '#4A0E4E', '#533483', '#2C2C54',
    // 炭灰/墨色系
    '#1F1F1F', '#2B2B2B', '#2D3436', '#1E272E',
    // 深青/石板系
    '#2F4F4F', '#3C4F4F', '#34495E', '#2C3E50'
];

// ========== 顏色工具函數 ==========

/**
 * HEX 轉 RGB
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * 計算相對亮度 (Relative Luminance)
 * 基於 WCAG 2.1 公式
 */
function getLuminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 1; // 無效顏色視為過亮

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * 計算對比度 (Contrast Ratio)
 * 白色文字 vs 背景色
 */
function getContrastWithWhite(bgHex) {
    const bgLum = getLuminance(bgHex);
    const whiteLum = 1; // 白色的相對亮度
    return (whiteLum + 0.05) / (bgLum + 0.05);
}

/**
 * 判斷顏色是否足夠深
 * WCAG AA 標準要求對比度至少 4.5:1
 * 我們使用更嚴格的 5:1 確保良好可讀性
 */
function isDarkEnough(hex, minContrast = 5) {
    return getContrastWithWhite(hex) >= minContrast;
}

/**
 * 隨機選擇一個深色
 */
function getRandomDarkColor() {
    return DARK_PALETTE[Math.floor(Math.random() * DARK_PALETTE.length)];
}

// ========== 主程式 ==========
function main() {
    console.log('📖 讀取資料...');
    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    let words = rawData.words;
    console.log(`   總筆數: ${words.length}`);

    console.log('\n🔍 檢查顏色對比度...');
    let fixedCount = 0;
    let lightColors = [];

    words.forEach(item => {
        const color = item.themeColor;

        // 檢查是否有顏色且是否足夠深
        if (!color || !color.startsWith('#') || !isDarkEnough(color)) {
            const contrast = color ? getContrastWithWhite(color).toFixed(2) : 'N/A';
            lightColors.push({ word: item.hanzi, color, contrast });

            // 替換為深色
            item.themeColor = getRandomDarkColor();
            fixedCount++;
        }
    });

    if (lightColors.length > 0) {
        console.log('\n⚠️ 發現過淺的顏色:');
        lightColors.slice(0, 10).forEach(({ word, color, contrast }) => {
            console.log(`   ${word}: ${color || '(無)'} (對比度: ${contrast})`);
        });
        if (lightColors.length > 10) {
            console.log(`   ... 還有 ${lightColors.length - 10} 筆`);
        }
    }

    console.log(`\n✅ 修正了 ${fixedCount} 筆顏色`);

    // 輸出
    fs.writeFileSync(DATA_PATH, JSON.stringify({ words }, null, 2), 'utf8');
    console.log(`\n💾 已儲存至: ${DATA_PATH}`);

    // 顯示調色盤
    console.log('\n🎨 使用的深色調色盤:');
    DARK_PALETTE.forEach((color, i) => {
        const contrast = getContrastWithWhite(color).toFixed(2);
        console.log(`   ${color} (對比度: ${contrast})`);
    });
}

main();
