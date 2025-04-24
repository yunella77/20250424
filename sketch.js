let bgImage; // 宣告變數來儲存背景圖片
let fontSize = 24; // 預設字體大小
let selectedOption = null; // 儲存目前選擇的選單
let iframe; // 宣告變數來儲存 iframe 元素
let iframeBackground; // 宣告變數來儲存背景矩形
let introText; // 宣告變數來儲存文字方塊
let isLocked = true; // 鎖屏狀態
let passwordInput; // 密碼輸入框
let unlockButton; // 解鎖按鈕
const correctPassword = "1234"; // 正確密碼

const menuOptions = ["首頁", "自我介紹", "作品集", "測驗卷", "上課影片"]; // 選單項目

function preload() {
  bgImage = loadImage('畫布背景.jpg'); // 載入背景圖片
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  textAlign(CENTER, CENTER); // 文字置中

  if (isLocked) {
    showLockScreen(); // 顯示鎖屏畫面
  } else {
    initializeMenu(); // 初始化選單
  }
}

function showLockScreen() {
  // 建立鎖屏背景
  lockScreenBackground = createDiv()
    .style('position', 'absolute')
    .style('top', '0')
    .style('left', '0')
    .style('width', '100%')
    .style('height', '100%')
    .style('background', '#000')
    .style('opacity', '0.8')
    .style('z-index', '300'); // 確保在最上層

  // 建立密碼輸入框
  passwordInput = createInput('').attribute('type', 'password');
  passwordInput.style('position', 'absolute')
    .style('top', '50%')
    .style('left', '50%')
    .style('transform', 'translate(-50%, -50%)')
    .style('padding', '10px')
    .style('font-size', '16px')
    .style('border-radius', '5px')
    .style('border', 'none')
    .style('outline', 'none')
    .style('z-index', '400'); // 確保在最上層

  // 建立解鎖按鈕
  unlockButton = createButton('解鎖');
  unlockButton.style('position', 'absolute')
    .style('top', '60%')
    .style('left', '50%')
    .style('transform', 'translate(-50%, -50%)')
    .style('padding', '10px 20px')
    .style('font-size', '16px')
    .style('background', '#28a745')
    .style('color', '#fff')
    .style('border', 'none')
    .style('border-radius', '5px')
    .style('cursor', 'pointer')
    .style('z-index', '400'); // 確保在最上層
  unlockButton.mousePressed(checkPassword); // 綁定按鈕事件
}

function checkPassword() {
  const enteredPassword = passwordInput.value();
  if (enteredPassword === correctPassword) {
    isLocked = false; // 解鎖
    passwordInput.remove();
    unlockButton.remove();
    if (lockScreenBackground) {
      lockScreenBackground.remove();
    }
    initializeMenu(); // 初始化選單
  } else {
    alert('密碼錯誤，請再試一次！');
  }
}

function initializeMenu() {
  // 建立選單容器
  const menuContainer = createDiv().style('position', 'absolute')
    .style('top', '10px')
    .style('right', '10px')
    .style('display', 'flex')
    .style('gap', '10px')
    .style('z-index', '200'); // 確保選單在最上層

  // 建立選單項目
  menuOptions.forEach((option, index) => {
    const menuItem = createDiv(option)
      .style('padding', '10px 20px')
      .style('background', '#000')
      .style('color', '#fff')
      .style('border-radius', '5px')
      .style('cursor', 'pointer')
      .style('position', 'relative') // 設定相對定位，方便子選單定位
      .mousePressed(() => handleMenuClick(index));

    // 如果是 "作品集"，加入子選單按鈕
    if (option === "作品集") {
      const subMenu = createDiv()
        .style('position', 'absolute')
        .style('top', '100%') // 子選單放在主選單項目下方
        .style('left', '0')
        .style('background', '#000')
        .style('color', '#fff')
        .style('border-radius', '5px')
        .style('display', 'none') // 預設隱藏子選單
        .style('flex-direction', 'column')
        .style('padding', '10px');

      // 建立第一週按鈕
      const firstWeekButton = createButton('第一週');
      firstWeekButton.style('padding', '10px 20px')
        .style('background', '#444')
        .style('color', '#fff')
        .style('border', 'none')
        .style('border-radius', '5px')
        .style('cursor', 'pointer')
        .mousePressed(() => loadFrame('https://yunella77.github.io/20250314/')); // 直接載入第一週的連結
      subMenu.child(firstWeekButton);

      // 建立第二週按鈕
      const secondWeekButton = createButton('第二週');
      secondWeekButton.style('padding', '10px 20px')
        .style('background', '#444')
        .style('color', '#fff')
        .style('border', 'none')
        .style('border-radius', '5px')
        .style('cursor', 'pointer')
        .mousePressed(() => loadFrame('https://yunella77.github.io/20250328/')); // 直接載入第二週的連結
      subMenu.child(secondWeekButton);

      menuItem.child(subMenu);

      // 顯示/隱藏子選單
      menuItem.mouseOver(() => subMenu.style('display', 'flex'));
      menuItem.mouseOut(() => subMenu.style('display', 'none'));
    }

    menuContainer.child(menuItem);
  });
}

function draw() {
  image(bgImage, 0, 0, width, height); // 繪製背景圖片，填滿畫布
}

function handleMenuClick(index) {
  console.log(`選擇了: ${menuOptions[index]}`);
  selectedOption = index;

  // 如果選擇了其他選單，移除舊的 iframe 和背景
  if (iframe) {
    iframe.remove();
  }
  if (iframeBackground) {
    iframeBackground.remove();
  }

  // 如果選擇的是「測驗卷」
  if (menuOptions[index] === "測驗卷") {
    loadFrame("https://yunella77.github.io/20250321/");
  }
  // 如果選擇的是「上課影片」
  if (menuOptions[index] === "上課影片") {
    loadFrame("https://reurl.cc/8D6zdX");
  }
  // 如果選擇的是「首頁」，則不載入任何 iframe
  if (menuOptions[index] === "首頁") {
    if (iframe) {
      iframe.remove();
    }
    if (iframeBackground) {
      iframeBackground.remove();
    }
  }

  // 如果選擇的是「自我介紹」
  if (menuOptions[index] === "自我介紹") {
    // 如果文字方塊已存在，先移除
    if (introText) {
      introText.remove();
    }
    // 建立新的文字方塊
    introText = createDiv("我是莊云溱，班級教科一Ａ，學號413730374，這是我的期中報告")
      .style('position', 'absolute')
      .style('top', '50%')
      .style('left', '50%')
      .style('transform', 'translate(-50%, -50%)')
      .style('background', '#000')
      .style('color', '#fff')
      .style('padding', '20px')
      .style('border-radius', '10px')
      .style('z-index', '300'); // 確保在最上層
    introText.parent(document.body);
  } else {
    // 如果不是「自我介紹」，移除文字方塊
    if (introText) {
      introText.remove();
      introText = null; // 確保變數清空
    }
  }
}

function handleSubMenuClick(subIndex) {
  console.log(`選擇了: ${subMenuOptions[subIndex]}`);
  loadFrame(subMenuLinks[subIndex]); // 使用 loadFrame 函數載入 iframe
}

function loadFrame(url) {
  // 移除舊的背景矩形和 iframe
  if (iframe) {
    iframe.remove();
  }
  if (iframeBackground) {
    iframeBackground.remove();
  }

  // 建立背景矩形（第二層）
  iframeBackground = createDiv(); // 使用 div 作為背景矩形
  iframeBackground.style('position', 'absolute')
    .style('top', '15px')
    .style('left', '15px')
    .style('width', `${width - 30}px`)
    .style('height', `${height - 30}px`)
    .style('background-color', '#FFBB77') // 設定背景顏色
    .style('opacity', '0.6') // 設定透明度為 60%
    .style('z-index', '100'); // 設定背景矩形在第二層

  // 建立新的 iframe（第二層）
  iframe = createElement('iframe');
  iframe.attribute('src', url); // 設定 iframe 的連結
  iframe.style('position', 'absolute')
    .style('top', '15px') // 與背景矩形對齊
    .style('left', '15px') // 與背景矩形對齊
    .style('width', `${width - 30}px`) // 設定寬度為畫布寬度 - 30px
    .style('height', `${height - 30}px`) // 設定高度為畫布高度 - 30px
    .style('border', 'none') // 移除邊框
    .style('z-index', '110'); // 設定 iframe 在背景矩形之上，但低於選單
}
