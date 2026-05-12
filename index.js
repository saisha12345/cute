const images = [
  './assets/image-content/bunny-1.png',
  './assets/image-content/bunny-2.png',
  './assets/image-content/bunny-3.png',
  './assets/image-content/bunny-4.png',
  './assets/image-content/bunny-5.png',
  './assets/image-content/bunny-6.png'
];

const imageContent = document.querySelector('.image-content');
const mainButton = document.getElementById('main-button');
const finalMessage = document.querySelector('.final-message');
const letterButton = document.getElementById('letter-button');
const letterModal = document.getElementById('letter-modal');
const closeLetter = document.getElementById('close-letter');
const catButton = document.getElementById('cat-button');
const tinyMessage = document.getElementById('tiny-message');
const playButton = document.getElementById('play-button');
const audio = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

let currentIndex = 0;
let hasStartedAudio = false;
let isPlaying = false;

finalMessage.style.display = 'none';
mainButton.style.display = 'block';
letterButton.classList.add('hidden');
catButton.classList.add('hidden');
tinyMessage.classList.add('hidden');

function updateImage() {
  imageContent.classList.remove('floating');
  imageContent.style.opacity = 0;

  const img = new Image();
  img.src = images[currentIndex];

  img.onload = () => {
    imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
    imageContent.style.opacity = 1;
    imageContent.classList.add('floating');
  };
}

updateImage();

mainButton.addEventListener('click', () => {
  currentIndex++;

  if (!hasStartedAudio) {
    audio.play();
    hasStartedAudio = true;
    isPlaying = true;
    playButton.textContent = '⏸';
  }

  if (currentIndex >= images.length) {
    mainButton.style.display = 'none';
    finalMessage.style.display = 'block';
    imageContent.style.backgroundImage = 'none';
    document.getElementById('song-title').classList.remove('hidden');
    playButton.classList.remove('hidden');
    progressContainer.classList.remove('hidden');
    document.querySelector('.final-deco-wrapper').style.display = 'flex';
    imageContent.classList.add('final-screen');
    letterButton.classList.remove('hidden');
    return;
  }

  updateImage();
});

letterButton.addEventListener('click', () => {
  letterModal.classList.remove('hidden');
});

function closeLetterAndShowCat() {
  letterModal.classList.add('hidden');
  letterButton.classList.add('hidden');
  catButton.classList.remove('hidden');
  tinyMessage.classList.add('hidden');
}

closeLetter.addEventListener('click', closeLetterAndShowCat);

letterModal.addEventListener('click', (event) => {
  if (event.target === letterModal) {
    closeLetterAndShowCat();
  }
});

function showTinyMessage(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  tinyMessage.textContent = 'i love you forever — love, saisha';
  tinyMessage.classList.remove('hidden');
}

catButton.addEventListener('click', showTinyMessage);
catButton.addEventListener('pointerup', showTinyMessage);
catButton.addEventListener('touchend', showTinyMessage);

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = '⏸';
    isPlaying = true;
  } else {
    audio.pause();
    playButton.textContent = '▶';
    isPlaying = false;
  }
});
