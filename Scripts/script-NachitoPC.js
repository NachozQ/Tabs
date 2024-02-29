const modeEl = document.querySelector(".fa-circle-half-stroke");
const rootEl = document.querySelector(":root");
// selectors
const tuningEl = document.querySelector("#tuning");
// techniques
const tchnqArr = document.querySelectorAll("input[name='tchnq']");
const pulloffEl = document.querySelector("#pulloff");
const hammeronEl = document.querySelector("#hammeron");
const deadnoteEl = document.querySelector("#deadnote");
const slideupEl = document.querySelector("#slideup");
const slidedownEl = document.querySelector("#slidedown");
const tappingEl = document.querySelector("#tapping");
// notelengths
let noteLengths = []
let noteLenIndex = 2
const wholeEl = document.querySelector("#whole");
const halfEl = document.querySelector("#half");
const quarterEl = document.querySelector("#quarter");
const eighthEl = document.querySelector("#eighth");
const sixteenthEl = document.querySelector("#sixteenth");
const noteLenArr = [wholeEl, halfEl, quarterEl, eighthEl, sixteenthEl];
// chords
const chordEl = document.querySelector("#chord");
var notes = [null, null, null, null, null, null];
// output
const outputEl = document.querySelector(".output");
const tabBoxEl = document.querySelector(".tabBox");
const stringsArr = document.querySelectorAll(".txtString");
let tabArr = ["", "", "", "", "", ""];
// 
let tabBars = 1;
let beats = 0;
// 
let noteIndex = 0
let noteArr = []
// Theme
let themeIndex = 0
// Shift toggle
var shift = false

// Listener for mode
modeEl.addEventListener("click", () => { // Dark mode
  if (themeIndex === 0) {
    theme("dark")
    themeIndex++
  } else if (themeIndex === 1) {
    theme("mintchoco")
    themeIndex++
  } else if (themeIndex === 2) {
    theme("light")
    themeIndex = 0
  }
});

// Listeners for sections
tuningEl.addEventListener("change", () => {
  if (tuningEl.value != "") {
    startTab()
  }
});

// Listener for keypresses and shortcuts
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    /* case "Backspace":
      if (tabBoxEl.textContent != "||||||") {
        deleteTab()
      }
      break; */
    case " ":
      writeTab(notes)
      break;
    case "Enter":
      let brEl = document.createElement("br")
      tabBoxEl.appendChild(brEl)
      tabBar()
      break;
    case "p":
      pulloffEl.checked = !pulloffEl.checked
      checkbox(pulloffEl)
      break;
    case "h":
      hammeronEl.checked = !hammeronEl.checked
      checkbox(hammeronEl)
      break;
    case "x":
      deadnoteEl.checked = !deadnoteEl.checked
      checkbox(deadnoteEl)
      break;
    case "u":
      slideupEl.checked = !slideupEl.checked
      checkbox(slideupEl)
      break;
    case "d":
      slidedownEl.checked = !slidedownEl.checked
      checkbox(slidedownEl)
      break;
    case "t":
      tappingEl.checked = !tappingEl.checked
      checkbox(tappingEl)
      break;
    case "Shift":
      shift = true;
      break;
    case "Control":
      fretboardClearSelection()
      if (chordEl.checked == false) {
        chordEl.checked = true
      } else {
        chordEl.checked = false
        if (!isOnlyNull(notes)) {
          writeTab(notes)
          notes = [null, null, null, null, null, null];
        } 
      }
      break;
    case "q":
      document.addEventListener("keydown", (e) => {
        if (e.key == "1") {
          noteLenArr[0].checked = true
        } else if (e.key == "2") {
          noteLenArr[1].checked = true
        } else if (e.key == "3") {
          noteLenArr[2].checked = true
        } else if (e.key == "4") {
          noteLenArr[3].checked = true
        } else if (e.key == "5") {
          noteLenArr[4].checked = true
        } 
      });
      break;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Shift") {
    shift = false
  }
});

chordEl.addEventListener("change", () => {
  fretboardClearSelection()
  if (chordEl.checked == false && !isOnlyNull(notes)) {
    writeTab(notes)
    notes = [null, null, null, null, null, null];
  }
});

/* document.addEventListener("wheel", (event) => {
  document.addEventListener("keydown", (e) => {
    if (e.key = "n") {
      if (event.deltaY > 0) {  // Scrolling down
        noteLenIndex = Math.min(noteLenIndex + 1, 4); // Assuming 4 is the maximum index (0 to 4)
      } else {  // Scrolling up
        noteLenIndex = Math.max(noteLenIndex - 1, 0);
      }
      noteLenArr[noteLenIndex].checked = true;
    }
  });
}); */

document.addEventListener("DOMContentLoaded", () => {
  // tuningEl.value = "standard"
  tabBar()
});