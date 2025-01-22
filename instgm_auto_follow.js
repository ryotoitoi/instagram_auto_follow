// グローバル変数
let intervalId;
let retryCount = 0;
const MAX_RETRIES = 5;
let lastScrollTop = 0;

// メインの自動化関数
async function autoFollowAndScroll() {
    try {
        // モーダルのスクロール可能な要素を取得
        const scrollableDiv = document.querySelector('div[style*="overflow: hidden auto"]');
        if (!scrollableDiv) {
            console.error('スクロール可能な要素が見つかりませんでした');
            if (++retryCount >= MAX_RETRIES) {
                console.log(`${MAX_RETRIES}回試行しましたが失敗しました。停止します。`);
                stopAutomation();
            }
            return;
        }

        // フォローボタンを探して全てクリック
        const followButtons = document.querySelectorAll('button._acan._acap._acas');
        let clickCount = 0;
        followButtons.forEach(button => {
            if (button.textContent.includes('フォロー')) {
                try {
                    button.click();
                    clickCount++;
                } catch (e) {
                    console.warn('ボタンのクリックに失敗:', e);
                }
            }
        });
        console.log(`${clickCount}個のフォローボタンをクリックしました`);

        // スクロール実行
        lastScrollTop = scrollableDiv.scrollTop;
        const scrollAmount = scrollableDiv.clientHeight - 50; // 表示領域分スクロール
        scrollableDiv.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });

        // スクロール後の位置を確認するため少し待機
        setTimeout(() => {
            if (Math.abs(lastScrollTop - scrollableDiv.scrollTop) < 10) {
                console.log('スクロールが最下部に到達したか、正常に動作していません');
                if (++retryCount >= MAX_RETRIES) {
                    console.log(`${MAX_RETRIES}回試行しましたが失敗しました。停止します。`);
                    stopAutomation();
                }
            } else {
                retryCount = 0; // スクロールが成功したらリトライカウントをリセット
                console.log(`スクロール成功: ${scrollableDiv.scrollTop}px`);
            }
        }, 1000);

    } catch (error) {
        console.error('エラーが発生しました:', error);
        if (++retryCount >= MAX_RETRIES) {
            console.log(`${MAX_RETRIES}回試行しましたが失敗しました。停止します。`);
            stopAutomation();
        }
    }
}

// 自動化を開始する関数
function startAutomation() {
    console.log('自動化を開始します...');
    retryCount = 0;
    intervalId = setInterval(autoFollowAndScroll, 2000);
}

// 自動化を停止する関数
function stopAutomation() {
    if (intervalId) {
        clearInterval(intervalId);
        console.log('自動化を停止しました');
    }
}

// スクロール位置をリセットする関数
function resetScroll() {
    const scrollableDiv = document.querySelector('div[style*="overflow: hidden auto"]');
    if (scrollableDiv) {
        scrollableDiv.scrollTop = 0;
        console.log('スクロール位置をリセットしました');
    }
}

// 実行方法:
startAutomation()  // 開始
// stopAutomation()   // 停止
// resetScroll()      // スクロール位置リセット
