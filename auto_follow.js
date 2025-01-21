(function() {
  let currentIndex = 8; // 初期インデックス (XPathの最後の数字)
  let isRunning = true;

  function clickFollowButton() {
    const xpath = `/html/body/div[7]/div[2]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[3]/div/div/div[${currentIndex}]/div/div/div/div[3]/div/button`;
    const followButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (!followButton) {
      console.log(`インデックス${currentIndex}のフォローボタンが見つかりませんでした。処理を停止します。`);
      isRunning = false;
      return;
    }

   if (followButton.textContent.trim() === 'フォロー') {
      followButton.click();
      console.log(`インデックス${currentIndex}のフォローボタンをクリックしました。`);
    } else {
       console.log(`インデックス${currentIndex}のボタンは既にフォロー済みです。`);
    }

    currentIndex++; // 次のインデックスに進む
  }

  function autoClick() {
    if (!isRunning) return;
    clickFollowButton();
    setTimeout(autoClick, 1000); // 1秒間隔で繰り返す。
  }

  autoClick();

  console.log('フォローボタンの自動クリックを開始しました。');


  window.addEventListener('beforeunload', () => {
        isRunning = false; // ページを離れる際にフラグをオフにする
   });

  // スクリプト停止用の関数
   window.stopAutoClick = function() {
    isRunning = false;
   console.log('フォローボタンの自動クリックを停止しました。');
   }


})();
