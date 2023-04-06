let audio = new Audio();
audio.src = 'https://usa9.fastcast4u.com/proxy/jamz?mp=/1';
audio.loop = true;

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'lofiplayer') {
    port.onMessage.addListener(function(message) {
      if (message.action === 'play') {
        audio.play();
        port.postMessage({ status: 'playing' });
      } else if (message.action === 'pause') {
        audio.pause();
        port.postMessage({ status: 'paused' });
      } else if (message.action === 'setVolume') {
        audio.volume = message.volume;
        port.postMessage({ status: 'volumeSet' });
      }
    });
  }
});
