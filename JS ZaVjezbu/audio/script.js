//
const keyPlay = event => {
  let onOff = document.querySelector('#onOff')
  let buttonEl
  //
  let key = event.target.innerText
  // it was a keyboard key pressed
  if (event.keyCode !== undefined) {
    key = String.fromCharCode(event.keyCode).toUpperCase()
    // console.log(event.keyCode)
    // mode
    if (key === 'M') {
      let mode = document.querySelector('#mode')
      if (mode.checked) {
        mode.checked = false
      } else {
        mode.checked = true
      }
      return
    }
    // on off
    if (key === 'P') {
      if (onOff.checked) {
        onOff.checked = false
      } else {
        onOff.checked = true
      }
      return
    }
    if (event.keyCode === 188 || event.keyCode === 190) {
      let volumeEl = document.querySelector('#volume')
      let volume = +volumeEl.value
      if (event.keyCode === 188) {
        if (volume > 0) volume--
      } else {
        if (volume < 100) volume++
      }

      volumeEl.value = volume
      setVolume(volume)
      return
    }

    for (let btn of document.querySelectorAll('#keyboard-container button')) {
      if (btn.textContent === key) {
        buttonEl = btn
      }
    }
  } else {
    buttonEl = event.target
  }
  if (onOff.checked) {
    // animation
    if (buttonEl !== undefined) {
      buttonEl.addEventListener('animationend', e => {
        buttonEl.classList.remove('anim-press')
      })
      buttonEl.classList.add('anim-press')
    }

    // choose bank
    let bank
    if (document.querySelector('#mode').checked) bank = bankOne
    else bank = bankTwo

    // search  in bank
    let data
    for (let obj of bank) {
      if (obj.keyTrigger === key) {
        data = obj
        break
      }
    }
    // if not found
    if (data === undefined) {
      console.log(`Error: key "${key}" is not found in bank`)
      return
    }

    // play
    let audioEl = document.createElement('audio')

    let volume = +document.querySelector('#volume').value
    audioEl.volume = volume / 100

    let title = document.querySelector('#title-playing')
    title.textContent = data.id

    title.style.visibility = 'visible'
    audioEl.onended = e => {
      title.style.visibility = 'hidden'
    }
    audioEl.setAttribute('src', data.url)
    audioEl.play()
  }
}
/**
 *
 * I N I T
 *
 *
 *  */

document.querySelectorAll('#keyboard-container button').forEach(elem => {
  elem.addEventListener('click', e => keyPlay(e))
})

document.body.addEventListener('keydown', e => keyPlay(e), { capture: true })

const setVolume = volume => {
  document.querySelector('#volume_val').innerText = volume
}
document.querySelector('#volume').addEventListener('change', e => {
  setVolume(e.target.value)
})

/**
 *
 *
 * B A N K S
 *
 *
 *
 * */
const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]
