document.addEventListener('DOMContentLoaded', function () {
  let playButton = document.getElementById('playButton');
  let pauseButton = document.getElementById('pauseButton');
  let volumeSlider = document.getElementById('volumeSlider');
  let volumePercentage = document.getElementById('volumePercentage');

  let startTimer = document.getElementById('startTimer');
  let resetTimer = document.getElementById('resetTimer');
  let addTodo = document.getElementById('addTodo');
  let todoList = document.getElementById('todoList');

  let port = chrome.runtime.connect({ name: 'lofiplayer' });

  playButton.addEventListener('click', function () {
    port.postMessage({ action: 'play' });
  });

  pauseButton.addEventListener('click', function () {
    port.postMessage({ action: 'pause' });
  });

  volumeSlider.addEventListener('input', function () {
    let volume = parseFloat(volumeSlider.value);
    port.postMessage({ action: 'setVolume', volume });
    volumePercentage.textContent = Math.round(volume * 100) + '%';
  });

  // Set initial volume percentage
  volumePercentage.textContent = Math.round(volumeSlider.value * 100) + '%';

  // Pomodoro Timer
  let timer;
  let minutes = 25;
  let seconds = 0;
  let isRunning = false;

  function updateTimerDisplay() {
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }

  function startPomodoro() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(function () {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            alert('Time is up!');
          } else {
            minutes--;
            seconds = 59;
          }
        } else {
          seconds--;
        }
        updateTimerDisplay();
      }, 1000);
    }
  }

  function resetPomodoro() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
  }

  startTimer.addEventListener('click', startPomodoro);
  resetTimer.addEventListener('click', resetPomodoro);

  // To-do List
  function createTodoItem(text) {
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
      li.classList.toggle('completed');
    });
    let span = document.createElement('span');
    span.textContent = text;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
      todoList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }

  addTodo.addEventListener('click', function () {
    let newTodo = document.getElementById('newTodo');
    if (newTodo.value.trim()) {
      createTodoItem(newTodo.value.trim());
      newTodo.value = '';
    }
  });
});
