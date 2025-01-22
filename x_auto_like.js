async function autoLike() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    while (true) {
        const likeButtons = document.querySelectorAll('button[data-testid="like"]');
        
        for (const button of likeButtons) {
            if (isElementInViewport(button) && !button.closest('[aria-label*="Liked"]')) {
                button.click();
                await delay(10000); // 1秒待機
            }
        }
        
        window.scrollBy(0, 300);
        await delay(500); // スクロール後の待機
    }
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 実行するには以下を呼び出し:
autoLike();