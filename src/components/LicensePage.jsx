/**
 * LicensePage - 版權宣告與授權說明頁面
 * 簡約優雅的排版，延續網站質感
 */
import './LicensePage.css';

export function LicensePage({ onClose }) {
    return (
        <div className="license-page">
            {/* 頂部導覽列 */}
            <div className="license-header">
                <h1 className="license-title">版權宣告與授權說明</h1>
                <p className="license-subtitle">Copyright & License</p>
                <button
                    onClick={onClose}
                    className="close-button"
                    aria-label="返回首頁"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* 內容區域 */}
            <div className="license-content">
                {/* 一、教育部資料引用說明 */}
                <section className="license-section">
                    <h2 className="section-title">一、教育部資料引用說明</h2>
                    <p className="section-text">
                        本站部分內容（包含但不限於：詞目、拼音、釋義、原廠例句等）引用自中華民國教育部
                        <strong>《臺灣台語常用詞辭典》</strong>
                        （網址：
                        <a
                            href="https://twblg.dict.edu.tw/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link"
                        >
                            https://twblg.dict.edu.tw/
                        </a>
                        ）。
                    </p>
                    <ul className="section-list">
                        <li>
                            <strong>著作權歸屬：</strong>
                            上述引用內容之著作權為中華民國教育部所有。
                        </li>
                        <li>
                            <strong>授權條款：</strong>
                            該部分內容係依據「創用 CC 姓名標示-非商業性-禁止改作 2.5 台灣」授權條款進行使用。
                        </li>
                        <li>
                            <strong>使用方式：</strong>
                            本站於引用時儘力保持原資料之正確性，且未將該資料用於任何商業營利行為。
                        </li>
                    </ul>
                </section>

                {/* 二、本站自編內容說明 */}
                <section className="license-section">
                    <h2 className="section-title">二、本站自編內容說明</h2>
                    <p className="section-text">
                        為增進學習趣味與實用性，本站針對部分詞彙提供自編例句、造句或補充說明。
                    </p>
                    <ul className="section-list">
                        <li>
                            <strong>著作權歸屬：</strong>
                            凡標註為自編或非屬教育部原文之內容，其著作權屬 <strong>Vibe Quirk Labs</strong> 所有。
                        </li>
                        <li>
                            <strong>使用規範：</strong>
                            未經授權，請勿擅自重製、改作或將本站自編內容用於商業用途。如需轉載，請事先取得本站同意。
                        </li>
                    </ul>
                </section>

                {/* 三、免責聲明 */}
                <section className="license-section">
                    <h2 className="section-title">三、免責聲明</h2>
                    <p className="section-subtitle-text">Disclaimer</p>
                    <ul className="section-list">
                        <li>
                            <strong>非官方代表：</strong>
                            本站係由個人/獨立團隊運作之教學分享平台，並非教育部官方網站。本站之呈現方式、編排與觀點，並不代表教育部為本站或其使用方式提供任何形式之背書、保證或推薦。
                        </li>
                        <li>
                            <strong>資料準確性：</strong>
                            雖本站於引用時力求準確，但語言資料可能隨時間更新，實際內容應以教育部官方辭典最新版本為準。
                        </li>
                    </ul>
                </section>

                {/* 四、聯繫方式 */}
                <section className="license-section">
                    <h2 className="section-title">四、聯繫方式</h2>
                    <p className="section-text">
                        若您發現本站內容有任何版權標示疑慮、錯誤或侵權之處，請立即與我們聯繫，我們將儘速處理：
                    </p>
                    <p className="contact-email">
                        📧 聯絡電子郵件：
                        <a
                            href="mailto:nailai7981.ai@gmail.com"
                            className="email-link"
                        >
                            nailai7981.ai@gmail.com
                        </a>
                    </p>
                </section>

                {/* 返回按鈕 */}
                <div className="back-button-container">
                    <button onClick={onClose} className="back-button">
                        ← 返回首頁
                    </button>
                </div>
            </div>
        </div>
    );
}
