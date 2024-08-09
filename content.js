// Function to check if subtitles are enabled
function subtitlesEnabled() {
  const subtitlesButton = document.querySelector('button.ytp-subtitles-button');
  return subtitlesButton && subtitlesButton.getAttribute('aria-pressed') === 'true';
}

// Function to open the settings menu
function openSettingsMenu() {
  const settingsButton = document.querySelector('button.ytp-settings-button');
  if (settingsButton) {
    settingsButton.click();
    console.log('Settings menu opened');
    return true;
  }
  console.log('Settings button not found');
  return false;
}

// Function to click the subtitles menu item
function clickSubtitlesMenuItem() {
  const menuItems = document.querySelectorAll('.ytp-menuitem');
  for (let item of menuItems) {
    if (item.innerText.includes('字幕')) {
      item.click();
      console.log('Subtitles menu item clicked');
      return true;
    }
  }
  console.log('Subtitles menu item not found');
  return false;
}

// Function to click the Chinese (Simplified) or Chinese subtitles menu item
function clickChineseSimplifiedMenuItem() {
  const menuItems = document.querySelectorAll('.ytp-menuitem');
  for (let item of menuItems) {
    if ((item.innerText.includes('中文')) && item.getAttribute('aria-checked') === 'true') {
      console.log('Chinese (Simplified) or Chinese subtitles menu item already selected');
      return true;
    }
  }
  console.log('Chinese (Simplified) or Chinese subtitles menu item not found or not selected');
  return false;
}

// Function to click the auto-translate menu item
function clickAutoTranslateMenuItem() {
  const menuItems = document.querySelectorAll('.ytp-menuitem');
  for (let item of menuItems) {
    if (item.innerText.includes('自動翻譯')) {
      item.click();
      console.log('Auto-translate menu item clicked');
      return true;
    }
  }
  console.log('Auto-translate menu item not found');
  return false;
}

// Function to select Traditional Chinese
function selectTraditionalChinese() {
  const menuItems = document.querySelectorAll('.ytp-menuitem');
  for (let item of menuItems) {
    if (item.innerText.includes('中文（繁體）')) {
      item.click();
      console.log('Traditional Chinese selected');
      return true;
    }
  }
  console.log('Traditional Chinese option not found');
  return false;
}

// Main function to set subtitles to Traditional Chinese
function setSubtitlesToTraditionalChinese() {
  if (subtitlesEnabled()) {
    if (openSettingsMenu()) {
      if (clickSubtitlesMenuItem()) {
        if (clickChineseSimplifiedMenuItem()) {
          if (clickAutoTranslateMenuItem()) {
            selectTraditionalChinese();
          }
        }
      }
    }
  }
}

// Function to observe the subtitles button
function observeSubtitlesButton() {
  const subtitlesButton = document.querySelector('button.ytp-subtitles-button');
  if (subtitlesButton) {
    const observer = new MutationObserver(() => {
      if (subtitlesEnabled()) {
        console.log('Subtitles enabled, starting the process to set to Traditional Chinese');
        setSubtitlesToTraditionalChinese();
        observer.disconnect();
      }
    });

    observer.observe(subtitlesButton, { attributes: true, attributeFilter: ['aria-pressed'] });
    console.log('Started observing the subtitles button');
  } else {
    console.log('Subtitles button not found');
  }
}

// Observe changes to the YouTube player
const playerObserver = new MutationObserver(() => {
  const player = document.querySelector('.html5-video-player');
  if (player) {
    console.log('YouTube player found');

    // Check if subtitles are already enabled and set subtitles to Traditional Chinese if they are
    if (subtitlesEnabled()) {
      console.log('Subtitles already enabled, setting to Traditional Chinese');
      setSubtitlesToTraditionalChinese();
    } else {
      // Start observing the subtitles button if subtitles are not enabled
      setTimeout(observeSubtitlesButton, 300);
    }

    playerObserver.disconnect();
  }
});

// Observe changes to the URL (for video change detection)
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    console.log('Video URL changed, resetting subtitles');
    setSubtitlesToTraditionalChinese();
  }
}).observe(document, { subtree: true, childList: true });

// Start observing when the script is loaded
playerObserver.observe(document.body, { childList: true, subtree: true });
