let audio = new Audio('https://usa9.fastcast4u.com/proxy/jamz?mp=/1');
audio.loop = true;
audio.play();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'pause') {
    audio.pause();
    sendResponse({ status: 'paused' });
  } else if (message.action === 'setVolume') {
    audio.volume = message.volume;
    sendResponse({ status: 'volumeSet' });
  }
});
