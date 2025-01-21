(function() {
    let isRunning = true;
    let notFoundCount = 0;
    let currentButtonIndex = 0;

    // スクロール対象の要素を取得
    const scrollTarget = document.querySelector('div[style="height: 356px; overflow: hidden auto;"] > div');
    if (!scrollTarget) {
        console.error("スクロール対象の要素が見つかりませんでした。");
        return;
    }

    function clickNextFollowButton() {
      const followButtons = document.querySelectorAll('button._acan._acap._acas._aj1-._ap30');

        if (followButtons.length === 0) {
              console.log('フォローボタンが見つかりませんでした。');
             notFoundCount++;
            if (notFoundCount > 10) {
                  console.log("連続してボタンが見つからなかったため、処理を停止します。");
                  isRunning = false;
                return;
             }
            setTimeout(clickNextFollowButton, 1000);
             return;
          }
        notFoundCount = 0;


      if (currentButtonIndex >= followButtons.length) {
            console.log("すべてのフォローボタンの処理が完了しました。");
          currentButtonIndex = 0; // リセットして、最初から繰り返す
          return;
      }

      const button = followButtons[currentButtonIndex];

       if (button.textContent.trim() === 'フォロー') {
         button.click();
         console.log(`インデックス ${currentButtonIndex} のフォローボタンをクリックしました。`);
       } else {
         console.log(`インデックス ${currentButtonIndex} のボタンは既にフォロー済みです。`);
       }

      currentButtonIndex++; // 次のボタンへ進む
        setTimeout(clickNextFollowButton, 1000); // 1秒後に次のボタンを処理
    }


    function scrollPage() {
          try {
             scrollTarget.scrollBy(0, scrollTarget.clientHeight); // 1画面分スクロール
             console.log("モーダル内をスクロールしました。");
        } catch (error) {
           console.error("スクロール時にエラーが発生しました:", error);
        }
   }


    function autoClickAndScroll() {
      if (!isRunning) return;


       try {
             scrollPage();
           } catch (error) {
             console.error("スクロール時にエラーが発生しました:", error);
           }
       clickNextFollowButton();
    }


    autoClickAndScroll();

    console.log('フォローボタンの自動クリックとモーダル内スクロールを開始しました。');



    window.addEventListener('beforeunload', () => {
        isRunning = false;
    });


      window.stopAutoClickAndScroll = function() {
        isRunning = false;
        console.log('フォローボタンの自動クリックとスクロールを停止しました。');
    }

})();
