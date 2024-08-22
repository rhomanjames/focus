// Todo List
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('tasks');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="edit" onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(newTask);
        taskInput.value = '';
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskText = taskItem.querySelector('.task-text').textContent;
    const newTaskText = prompt('Edit your task', taskText);
    if (newTaskText !== null) {
        taskItem.querySelector('.task-text').textContent = newTaskText.trim();
    }
}

// Timer
let timer;
let timeLeft = 60; // Default to 1 minute (60 seconds)

function setTimer(seconds) {
    timeLeft = seconds;
    displayTime();
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                displayTime();
            } else {
                clearInterval(timer);
                alert('Time is up!');
                timer = null;
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    displayTime();
}

function displayTime() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initial display
displayTime();

// Get elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.querySelector('.play-pause-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.volume-bar');

// Create a playlist from the sources in the <audio> tag
const sources = audioPlayer.getElementsByTagName('source');
let playlist = [];
for (let i = 0; i < sources.length; i++) {
    playlist.push(sources[i].src);
}

let currentSongIndex = 0;

// Load the current song
function loadSong(index) {
    audioPlayer.src = playlist[index];
    audioPlayer.load(); // Load the new source
    audioPlayer.play(); // Play the song immediately
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '❚❚'; // Pause symbol
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '►'; // Play symbol
    }
});

// Next track functionality
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playPauseBtn.textContent = '❚❚'; // Switch to pause symbol
});

// Previous track functionality
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playPauseBtn.textContent = '❚❚'; // Switch to pause symbol
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.setProperty('--progress', `${progressPercent}%`);
});

// Seek functionality
progressBar.addEventListener('click', (e) => {
    const clickPosition = (e.offsetX / progressBar.offsetWidth) * audioPlayer.duration;
    audioPlayer.currentTime = clickPosition;
});

// Volume control
volumeBar.addEventListener('click', (e) => {
    const clickPosition = e.offsetX / volumeBar.offsetWidth;
    audioPlayer.volume = clickPosition;
    volumeBar.querySelector('::before').style.width = `${clickPosition * 100}%`;
});
