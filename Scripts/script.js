const rootEl = document.querySelector(":root");
// Menu & Settings
const menuEl = document.querySelector("#menu");
const soundOnEl = document.querySelector(".soundOn");
const soundOffEl = document.querySelector(".soundOff");
const showNotesEl = document.querySelector("#showNotes");
const themeEl = document.querySelector(".theme");
var themeIndex = 0
var muted = false
var showNotesToggle = false
// Modal
const modalEl = document.querySelector("#modal")
const settingsEl = document.querySelector(".settings-content")
const navbarEl = document.querySelector(".modal-box > nav")
const instrumentEl = document.querySelector("#instrument")
const openModalEl = document.querySelector(".openModal")
const closeModalEl = document.querySelector(".closeModal")
//// Inputs
// Tuning
const tuningEl = document.querySelector("#tuning");
const tuningDivEl = document.querySelector(".tuning");
// Techniques
const techniqueEl = document.querySelector(".technique")
const tchnqArr = document.querySelectorAll("input[name='tchnq']");
const pulloffEl = document.querySelector("#pulloff");
const hammeronEl = document.querySelector("#hammeron");
const deadnoteEl = document.querySelector("#deadnote");
const slideupEl = document.querySelector("#slideup");
const slidedownEl = document.querySelector("#slidedown");
const tappingEl = document.querySelector("#tapping");
const tchnqExpArr = document.querySelectorAll(".tchnqExp")
// Note lengths
const wholeEl = document.querySelector("#whole");
const halfEl = document.querySelector("#half");
const quarterEl = document.querySelector("#quarter");
const eighthEl = document.querySelector("#eighth");
const sixteenthEl = document.querySelector("#sixteenth");
const noteLenArr = [wholeEl, halfEl, quarterEl, eighthEl, sixteenthEl];
var noteLengths = []
var noteLenIndex = 2
// Playback
const playEl = document.querySelector("#play");
const pauseEl = document.querySelector("#pause");
const bpmEl = document.querySelector("#bpm")
var bpmHovered = false
var capoHovered = false
var playing = false
// Capo
const capoEl = document.querySelector("#capo");
// Chords
const chordEl = document.querySelector("#chord");
var notes = [null, null, null, null, null, null];
//// Guitar
// Fretboard
const fretdivEl = document.querySelector(".fretboard");
var tuningArr = ["", "" , "", "", "", ""]
var tuningEvent = false
// Tab
const stringsArr = document.querySelectorAll(".txtString");
const outputEl = document.querySelector(".output");
const tabSheetEl = document.querySelector(".tabSheet");
var sectionCount = 0
// Measures
let tabMeasures = 1;
var beats = 0;
let noteIndex = 0
let noteArr = []
// Compiling
var tabNoteLen = []
var tabNoteArr = []
// TABNOTE
var lastSel = null
var stringRowSel = null
// General
var numFrets = 22;
var stringCount = 6
var currentInstrument = "guitar"
var spacing = "single"
var paste = [] 

function buildTuningSelect() {
  tuningEl.textContent = ""
  var instrumentTunings
  if (currentInstrument == "guitar") {  
    instrumentTunings = [
      { value: "", text: "Choose a tuning", hidden: true },
      { value: "standard", text: "Standard", tooltip: "(E A D G B e)" },
      { value: "hStepUp", text: "Halfstep up", tooltip: "(E# A# D# G# B# E#)" },
      { value: "hStepDown", text: "Halfstep down", tooltip: "(Eb Ab Db Gb Bb Eb)" },
      { value: "wStepDown", text: "Wholestep down", tooltip: "(D G C F A D)" },
      { value: "dropA", text: "Drop A", tooltip: "(A E A D F# B)" },
      { value: "dropB", text: "Drop B", tooltip: "(B F# B E G# C#)" },
      { value: "dropC", text: "Drop C", tooltip: "(C G C F A D)" },
      { value: "dropC#", text: "Drop C#", tooltip: "(C# G# C# F# A# D#)" },
      { value: "dropD", text: "Drop D", tooltip: "(D A D G B E)" },
      { value: "openA", text: "Open A", tooltip: "(E A E A C# E)" },
      { value: "openC", text: "Open C", tooltip: "(C G C G C E)" },
      { value: "openC5", text: "Open C5", tooltip: "(C G C G C C)" },
      { value: "openD", text: "Open D", tooltip: "(D A D F# A D)" },
      { value: "openE", text: "Open E", tooltip: "(E B E G# B E)" },
      { value: "openF", text: "Open F", tooltip: "(F A C F C F)" },
      { value: "openG", text: "Open G", tooltip: "(D G D G B D)" }
    ];
  } else if (currentInstrument == "bass") { // Might be able to create basstunings from guitar but one octave lower and removing last 3 notes
    instrumentTunings = [
      { value: "", text: "Choose a tuning", hidden: true },
      { value: "standard", text: "Standard", tooltip: "(E A D G)" },
      { value: "hStepUp", text: "Halfstep up", tooltip: "(E# A# D# G#)" },
      { value: "hStepDown", text: "Halfstep down", tooltip: "(Eb Ab Db Gb)" },
      { value: "wStepDown", text: "Wholestep down", tooltip: "(D G C F)" }
    ];
  } else if (currentInstrument == "ukulele") {
    instrumentTunings = [
      { value: "", text: "Choose a tuning", hidden: true },
      { value: "standard", text: "Standard", tooltip: "(E A D G)" },
      { value: "hStepUp", text: "Halfstep up", tooltip: "(E# A# D# G#)" },
      { value: "hStepDown", text: "Halfstep down", tooltip: "(Eb Ab Db Gb)" },
      { value: "wStepDown", text: "Wholestep down", tooltip: "(D G C F)" }
    ];
  }

  instrumentTunings.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    if (opt.hidden) {
      option.setAttribute("selected", "");
      option.setAttribute("hidden", "");
    } else { 
      option.setAttribute("title", opt.tooltip);
    }
    tuningEl.appendChild(option);
  });
}

tuningEl.addEventListener("change", () => {
  if (tuningEl.value != "") {
    let openStringArr = document.querySelectorAll(".string") 
    for (let i = 0; i < openStringArr.length; i++) {
      openStringArr[i].textContent = tuningArr[i]
    }
  }
});

// Listener for keypresses and shortcuts
chordEl.addEventListener("change", () => {
  if (chordEl.checked == false && !isOnlyNull(notes)) {
    playChord()
    writeTab(notes)
    notes = [null, null, null, null, null, null];
  }
  fretboardClearSelection()
});

instrumentEl.addEventListener("change", () => {
  currentInstrument = instrumentEl.options[instrumentEl.selectedIndex].value
  buildFretboard(instrumentEl.options[instrumentEl.selectedIndex].value); 
  clearTab();
  buildTuningSelect();
  changeTuningNotes(tuningEl.options[tuningEl.selectedIndex].value)
  addSection()
});

function checkbox(checkbox) { // Allows only one checkbox to be checked
  tchnqArr.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

/* Menu */
function showMenu() {
  let menuIcons = document.querySelectorAll(".settings > svg:not(#menu)")

  menuIcons.forEach(el => {
    if (el == soundOnEl) {
      if (!muted) {
        soundOnEl.classList.toggle("hidden");
      }
    } else if (el == soundOffEl) {
      if (muted) {
        soundOffEl.classList.toggle("hidden");
      } 
    } else {
      el.classList.toggle("hidden");
    }
  });
  menuEl.classList.toggle("open")
}

function mute() {
  muted = !muted
  soundOnEl.classList.toggle("hidden");
  soundOffEl.classList.toggle("hidden");
}

function expandTechniques() {
  tchnqExpArr.forEach(tchnq => {
    tchnq.classList.toggle("hidden")
  });
  techniqueEl.classList.toggle("expanded")
}

/* Playback */
function togglePlay() {
  playEl.classList.toggle("hidden")
  pauseEl.classList.toggle("hidden")
}

function hovered(el, bool) {
  if (el === bpmEl) {
    bpmHovered = bool
  } else if (el === capoEl) {
    capoHovered = bool
  }
}

function handleScroll(el, event) {
  const delta = -Math.sign(event.deltaY);
  let value = parseInt(el.value);
  value += delta;

  if (el === bpmEl && bpmHovered) {
    value = Math.min(240, Math.max(60, value));
    bpmEl.value = value;   
  } else if (el === capoEl && capoHovered) {
    value = Math.min(12, Math.max(0, value));
    capoEl.value = value;
  }
}

function validateInput(el) { // Makes the min and max values of bpm and capo auto snap
  let value = parseInt(el.value);
  if (isNaN(value)) {
    value = el === bpmEl ? 60 : 0;
  }
  if (el === bpmEl) {
    el.value = Math.min(240, Math.max(60, value));
  } else if (el === capoEl) {
    el.value = Math.min(12, Math.max(0, value));
  }
}

function notelenChecked() { // Returns beats based on notelength
  return Number(document.querySelector(".noteLength > input:checked").value)
}

function lengthToBeat(lenName) {
  if (lenName == "whole") {
    return 16
  } else if (lenName == "half") {
    return 8
  } else if (lenName == "quarter") {
    return 4
  } else if (lenName == "eighth") {
    return 2
  } else if (lenName == "sixteenth") {
    return 1
  }
}

function playNote(note) {
  if (!(muted || chordEl.checked)) {
    let audio = new Audio("piano-mp3/" + note + ".mp3");
    audio.play()
  }
}

function playChord() {
  let notesArr = document.querySelectorAll(".guitar > tbody > tr > .selected")
  notesArr.forEach(el => {
    console.log(el);
  });
  // Haven't tested yet
  // let note = el.id || el.dataset.note; // Assumes note name is stored in id or data-note attribute
  // if (note) {
  //   let audio = new Audio("piano-mp3/" + note + ".mp3");
  //   audio.play();
  // }
}

document.addEventListener("DOMContentLoaded", () => {
  buildTuningSelect();
  addSection()
  settings()

  // Wave animation for fretboard
  arrayArr.forEach((stringArray, stringIndex) => {
    stringArray.forEach((cell, fretIndex) => {
      let delay = fretIndex * 50 + stringIndex * 25
      setTimeout(() => {
        cell.classList.add("wave");
        // Removes class after animation is done
        setTimeout(() => {
          cell.classList.remove("wave");
        }, 1000);
      }, delay); // Delay 
    });
  });

  //// Testing
  // tuningEl.options[1].selected = "selected";
  // tuningEl.value = "standard"
  // modalEl.showModal()
});

window.onload = function () {
  document.querySelector(".preloader").style.display = "none"
}