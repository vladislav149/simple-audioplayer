import './style.css'

const UI = {
  BUTTON_START: document.querySelector<HTMLButtonElement>('.audio-start')!,
  BUTTON_PAUSE: document.querySelector<HTMLButtonElement>('.audio-pause')!,
  AUDIO_LINE: document.querySelector<HTMLDivElement>('.audio-line')!,
  AUDIO_INNER_LINE:
    document.querySelector<HTMLDivElement>('.audio-inner-line')!,
  AUDIO_RANGE_VOLUME: document.querySelector<HTMLInputElement>(
    '.audio-input-volume'
  )!,
  AUDIO_BUTTON_VOLUME: document.querySelector<HTMLButtonElement>(
    '.audio-button-volume'
  )!,
  AUDIO_UPLOAD: document.querySelector<HTMLInputElement>('.audio-upload')!,
  UPLOAD_BUTTON: document.querySelector<HTMLButtonElement>('.upload-button')!,
}

const audioElement = document.createElement('audio')
const sourceElement = document.createElement('source')
audioElement.appendChild(sourceElement)

UI.BUTTON_START.addEventListener('click', startAudio)
UI.BUTTON_PAUSE.addEventListener('click', pauseAudio)
audioElement.addEventListener('timeupdate', updateProgress)
UI.AUDIO_LINE.addEventListener('click', seekAudio)
UI.AUDIO_RANGE_VOLUME.addEventListener('click', changeVolume)
UI.AUDIO_BUTTON_VOLUME.addEventListener('click', toggleVolume)
UI.AUDIO_UPLOAD.addEventListener('change', uploadAudio)
UI.UPLOAD_BUTTON.addEventListener('click', uploadAudioButton)

function startAudio() {
  audioElement.play()
}

function pauseAudio() {
  audioElement.pause()
}

function updateProgress() {
  const progress = (audioElement.currentTime / audioElement.duration) * 100
  UI.AUDIO_INNER_LINE.style.width = `${progress}%`
}

function seekAudio(event: MouseEvent) {
  const rect = UI.AUDIO_LINE.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const width = rect.width

  const percent = clickX / width
  const newTime = percent * audioElement.duration

  audioElement.currentTime = newTime
}

function changeVolume() {
  audioElement.volume = Number(UI.AUDIO_RANGE_VOLUME.value)
}

function toggleVolume() {
  if (audioElement.volume) {
    UI.AUDIO_RANGE_VOLUME.value = '0'
    audioElement.volume = 0
  } else {
    UI.AUDIO_RANGE_VOLUME.value = '1'
    audioElement.volume = 1
  }
}

function uploadAudio(event: Event) {
  const input = event.target as HTMLInputElement

  if (input.files && input.files[0]) {
    console.log(1)

    const file = input.files[0]
    const fileURL = URL.createObjectURL(file)

    sourceElement.src = fileURL
    audioElement.load()
  }
}

function uploadAudioButton() {
  UI.AUDIO_UPLOAD.click()
}
