const rootEl = document.querySelector(":root");
// selectors
const tuningEl = document.querySelector("#tuning");
const soundOnEl = document.querySelector(".soundOn");
const soundOffEl = document.querySelector(".soundOff");
const showNotesEl = document.querySelector("#showNotes");
// playback
let playEl = document.querySelector("#play");
let pauseEl = document.querySelector("#pause");
const bpmEl = document.querySelector("#bpm")
let bpmHovered = false
let playing = false
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
// Capo
const capoEl = document.querySelector("#capo");
// chords
const chordEl = document.querySelector("#chord");
var notes = [null, null, null, null, null, null];
// output
const outputEl = document.querySelector(".output");
const tabBoxEl = document.querySelector(".tabBox");
const stringsArr = document.querySelectorAll(".txtString");
let tabArr = ["", "", "", "", "", ""];
// Measures
let tabBars = 1;
let beats = 0;
let noteIndex = 0
let noteArr = []
// Theme
let themeIndex = 0
// Toggles
var shift = false
var muted = false
var showNotesToggle = false
// Compiling
let tabNoteLen = []
let tabNoteArr = []
// TABNOTE
let lastSel = null
let stringRowSel = null
// Listeners for sections
tuningEl.addEventListener("change", () => {
  if (tuningEl.value != "") {
    startTab()
  }
});
tuningEvent = false
// Listener for keypresses and shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    shift = true;
  }
  if (/[0-9]/.test(event.key) && stringRowSel != null) {  
    if (stringRowSel == 0) {
      firstEl[event.key].click();
    } else if (stringRowSel == 1) {
      secondEl[event.key].click();
    } else if (stringRowSel == 2) {
      thirdEl[event.key].click();
    } else if (stringRowSel == 3) {
      fourthEl[event.key].click();
    } else if (stringRowSel == 4) {
      fifthEl[event.key].click();
    } else if (stringRowSel == 5) {
      sixthEl[event.key].click();
    }
  }
  let selArr = document.querySelectorAll("span.selected");
  if (selArr.length == 0) {
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
      case "T":
        tappingEl.checked = !tappingEl.checked
        checkbox(tappingEl)
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
      case "|":
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
      case "q":
        firstEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 0
        break;
      case "w":
        secondEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 1
        break;
      case "e":
        thirdEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 2
        break;
      case "r":
        fourthEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 3
        break;
      case "t":
        fifthEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 4
        break;
      case "y":
        sixthEl.forEach(el => {
          el.classList.add("selectedLight");
        });
        stringRowSel = 5
        break;
    }
  } else { // if selArr
    if (/[0-9]/.test(event.key)) {  // Numbers 0-9 
      if (selArr.length > 1) {  // Multi note editing
        for (let i = 0; i < selArr.length; i++) {
          selArr[i].textContent = selArr[0].textContent;
        };
      }
      if (lastSel != selArr[0].textContent) {  // First note
        for (let i = 0; i < selArr.length; i++) {
          selArr[i].textContent = event.key;
        };
        lastSel = selArr[0].textContent
      } else {  // Second note
        if (lastSel >= 1 && lastSel <= 2) {  // Note between 1 and 2
          if (lastSel == 1) {  // For 10 to 19
            for (let i = 0; i < selArr.length; i++) {
              selArr[i].textContent += event.key;
            }
            lastSel = selArr[0].textContent
          } else if (lastSel == 2 && (event.key == "0" || event.key == "1" || event.key == "2")) {  // For 20 to 22
            for (let i = 0; i < selArr.length; i++) {
              selArr[i].textContent += event.key;
            }
            lastSel = selArr[0].textContent
          } else {  // To avoid > 22
            for (let i = 0; i < selArr.length; i++) {
              selArr[i].textContent = event.key;
            };
            lastSel = event.key;
          }
        } else {  // To avoid > 22
          for (let i = 0; i < selArr.length; i++) {
            selArr[i].textContent = event.key;
          };
          lastSel = event.key;
        }
      }
    } else if (/^[phudtx]$/.test(event.key)) {  // Techniques
      if (event.key === "x") {
        selArr[0].textContent = "x"; 
      } else if (event.key === "d") {
        selArr[0].textContent = "\\" + selArr[0].textContent;
      } else if (event.key === "u") { 
        selArr[0].textContent = "/" + selArr[0].textContent;
      } else {
        selArr[0].textContent = event.key + selArr[0].textContent;
        lastSel = selArr[0].textContent;
      }
    } else if (event.key === "Backspace") {  // Delete last note
      selArr[0].textContent = "-"; 
      lastSel = null
    } else if (event.key === "ArrowDown") {
      let val = parseInt(selArr[0].textContent)
      // console.log(val);
      selArr[0].textContent = val++
    } 
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Shift") {
    shift = false
  } else if (e.key == "q") {
    firstEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  } else if (e.key == "w") {
    secondEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  } else if (e.key == "e") {
    thirdEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  } else if (e.key == "r") {
    fourthEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  } else if (e.key == "t") {
    fifthEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  } else if(e.key == "y") {
    sixthEl.forEach(el => {
      el.classList.remove("selectedLight");
    });
    stringRowSel = null
  }
});

chordEl.addEventListener("change", () => {
  if (chordEl.checked == false && !isOnlyNull(notes)) {
    playChord()
    writeTab(notes)
    notes = [null, null, null, null, null, null];
  }
  fretboardClearSelection()
});

document.addEventListener("DOMContentLoaded", () => {
  // tuningEl.options[1].selected = "selected";
  // tuningEl.value = "standard"
  tabBar()
});