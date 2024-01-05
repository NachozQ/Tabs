let modeEl = document.querySelector(".fa-circle-half-stroke");
let rootEl = document.querySelector(":root");
// selectors
let tuningEl = document.querySelector("#tuning");
// techniques
let tchnqArr = document.querySelectorAll("input[name='tchnq']");
let pulloffEl = document.querySelector("#pulloff");
let hammeronEl = document.querySelector("#hammeron");
let deadnoteEl = document.querySelector("#deadnote");
let slideupEl = document.querySelector("#slideup");
let slidedownEl = document.querySelector("#slidedown");
let tappingEl = document.querySelector("#tapping");
// notelengths
let noteLenIndex = 2
let wholeEl = document.querySelector("#whole");
let halfEl = document.querySelector("#half");
let quarterEl = document.querySelector("#quarter");
let eighthEl = document.querySelector("#eighth");
let sixteenthEl = document.querySelector("#sixteenth");
let noteLenArr = [wholeEl, halfEl, quarterEl, eighthEl, sixteenthEl];
// chords
let chordEl = document.querySelector("#chord");
var notes = [null, null, null, null, null, null];
// output
let outputEl = document.querySelector(".output");
let tabBoxEl = document.querySelector(".tabBox");
let stringsArr = document.querySelectorAll(".txtString");
let tabArr = ["", "", "", "", "", ""];
// 
let tabBars = 1;
let beats = 0;
let ctrlHold = false;
let themeIndex = 0

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
    case "Backspace":
      deleteTab()
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
      clearSelection()
      if (!ctrlHold) {
        ctrlHold = true
        chordEl.checked = true 
      } else {
        ctrlHold = false
        chordEl.checked = false
        writeTab(notes)
        selected()
        notes = [null, null, null, null, null, null];
      }
      break;
  }
});

chordEl.addEventListener("change", () => {
  clearSelection()
  if (chordEl.checked == false) {
    writeTab(notes)
    selected()
    notes = [null, null, null, null, null, null];
  }
});

document.querySelector(".input").addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {  // Scrolling down
    noteLenIndex = Math.min(noteLenIndex + 1, 4); // Assuming 4 is the maximum index (0 to 4)
  } else {  // Scrolling up
    noteLenIndex = Math.max(noteLenIndex - 1, 0);
  }
  noteLenArr[noteLenIndex].checked = true;
});

document.addEventListener("DOMContentLoaded", () => {
  // tuningEl.value = "standard"
  tabBar()
});