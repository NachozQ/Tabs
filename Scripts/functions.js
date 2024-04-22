function tabBar() {
  for (let i = 0; i < 6; i++) {
    spanEl = document.createElement("span")
    brEl = document.createElement("br")
    const stringCount = ["first", "second", "third", "fourth", "fifth", "sixth"]
    spanEl.className = "txtString " + stringCount[i]
    tabBoxEl.append(spanEl, brEl)
  };
  startTab()
}

function currentStrings() {
  let stringsArr = document.querySelectorAll(".txtString");
  let current = Array.from(stringsArr).slice(-6)
  return current
}

function startTab() { // Starts the tab strings and lines and dashes
  let tuning = tuningEl.options[tuningEl.selectedIndex].text
  let tuningArr = tuning.substr(tuning.indexOf("(")+1, tuning.indexOf(")")-tuning.indexOf("(")-1).split(" ")
  document.querySelector("[id^='first']").textContent = tuningArr[5]
  document.querySelector("[id^='second']").textContent = tuningArr[4]
  document.querySelector("[id^='third']").textContent = tuningArr[3]
  document.querySelector("[id^='fourth']").textContent = tuningArr[2]
  document.querySelector("[id^='fifth']").textContent = tuningArr[1]
  document.querySelector("[id^='sixth']").textContent = tuningArr[0]

  tuningArr = tuningArr.reverse()
  for (let i = 0; i < tuningArr.length; i++) {
    tabArr[i] = tuningArr[i]
  }
  if (tuning != "Choose a tuning") {
    if (tuningArr.join("").includes("#") || tuningArr.join("").includes("b")) { // Add space if other notes include sharp or flat
      let indices = [];
      tuningArr.forEach((element, index) => {
        if (element.includes("#") || element.includes("b")) {
          indices.push(index);
        } else {
          indices.push(false)
        }
      });
      for (let i = 0; i < tabArr.length; i++) {
        if (indices.includes(i)) { 
          currentStrings()[i].textContent = tabArr[i] + "|"
        } else { 
          currentStrings()[i].textContent = tabArr[i] + " |"
        }
      }
    } else { // No sharps or flats
      for (let i = 0; i < tabArr.length; i++) {
        currentStrings()[i].textContent = tabArr[i] + "|"
      }
    }
  }
}

const clickListener = (ev) => {
  if ((!ev.target.classList.contains("note") || ev.target.classList.contains("rest")) && document.querySelectorAll("span.selected").length != 0) {
    const ntrt = document.querySelectorAll(".note,.rest")
    ntrt.forEach(el => el.classList.remove("selected"));
  }
};

function writeNote(note) {
  let spaceEl = document.createElement("span")
  spaceEl.innerText = Space(note.toString())
  let noteEl = document.createElement("span")
  noteEl.classList.add(selectedNoteLen(), "note")
  noteEl.innerText = note
  noteEl.onclick = () => { noteSelection(noteEl)}
  tchnqArr.forEach(element => {
    if (element.checked && note != "-") {
      ending = ""
      switch (element.id) {
        case "pulloff":
          spaceEl.innerText = Space("p" + note)
          noteEl.innerText = "p" + note
        break;
        case "hammeron":
          spaceEl.innerText = Space("h" + note)
          noteEl.innerText = "h" + note
        break;
        case "deadnote":
          spaceEl.innerText = Space("x")
          noteEl.innerText = "x"
        break;
        case "slideup":
          spaceEl.innerText = Space("/" + note)
          noteEl.innerText = "/" + note
        break;
        case "slidedown":
          spaceEl.innerText = Space("\\" + note)
          noteEl.innerText = "\\" + note
        break;
        case "tapping":
          spaceEl.innerText = Space("x" + note)
          noteEl.innerText = "t" + note
        break;
      }
    }
  });
  return [spaceEl, noteEl]
}

function writeTab(notes) { // Writes notes
  if (!isOnlyNull(notes)) { // If a note is empty
    tabNoteArr.push([])
    for (let i = 0; i < 6; i++) {
      if (notes[i] == null) { // No notes
        let noteArr = writeNote("-")
        tabNoteArr[tabNoteArr.length - 1].push(noteArr[1])
        noteArr[0].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        noteArr[1].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        currentStrings()[i].append(noteArr[0], noteArr[1])
      } else {
        let noteArr = writeNote(notes[i])
        tabNoteArr[tabNoteArr.length - 1].push(noteArr[1])
        noteArr[0].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        noteArr[1].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        currentStrings()[i].append(noteArr[0], noteArr[1])
      }
    };
  } else { // If all notes are empty
    tabNoteArr.push([])
    for (let i = 0; i < 6; i++) {
      let noteArr = writeNote("-");
      tabNoteArr[tabNoteArr.length - 1].push(noteArr[1])
      noteArr[0].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
      noteArr[1].classList.add("rest");
      noteArr[1].classList.remove("note");
      noteArr[1].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
      currentStrings()[i].append(noteArr[0], noteArr[1])
    };
  }
  // Counts how many beats for measure must be fixed soon
  /* if (wholeEl.checked) {
    tabNoteLen.push(16)
  } else if (halfEl.checked) {
    tabNoteLen.push(8)
  } else if (quarterEl.checked) {
    tabNoteLen.push(4)
  } else if (eighthEl.checked) {
    tabNoteLen.push(2)
  } else if (sixteenthEl.checked) {
    tabNoteLen.push(1)
  }
  if (beats == 16) {
    endTab()
  } */
  // Unchecks
  tchnqArr.forEach(element => {
    element.checked = false
  });
}

function endTab() {
  for (let i = 0; i < 6; i++) {
    currentStrings()[i].innerHTML += "|"
  };
  beats = 0
}

function deleteTab() {
  // Will delete selected note/ noteline, if none are selected delete last noteline
}

function checkbox(checkbox) { // Allows only one checkbox to be checked
  var checkboxes = document.querySelectorAll("input[name='tchnq']");
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

function Space(note) { // 
  let space = ""
  if (note.length == 1) {
    space = "--"
  } else if (note.length == 2) {
    space = "-"
  } else if (note.length == 3) {
    space = ""
  } 
  return space
}

function selectedNoteLen() {
  if (wholeEl.checked) {
    return "whole"
  } else if (halfEl.checked) {
    return "half"
  } else if (quarterEl.checked) {
    return "quarter"
  } else if (eighthEl.checked) {
    return "eighth"
  } else if (sixteenthEl.checked) {
    return "sixteenth"
  }
}

function noteSelection(el) {  // Tab notes
  if (el.classList.contains("selected")) {  // Toggles selected
    el.classList.remove("selected");
  } else {
    if (!shift) {
      document.querySelectorAll("span.selected").forEach(element => element.classList.remove("selected"));
    }

    document.querySelectorAll("span.selected").forEach(element => {
      if (element !== el) {
        element.classList.remove("selected")
        void el.offsetWidth;
        element.classList.add("selected")
      }
    });
    el.classList.add("selected")
  }
  document.addEventListener("click", clickListener)
}

function chordSelection(chord) {  // Selects chord notes while writing it
  fretboardClearSelection()
  for (let i = 0; i < chord.length; i++) {
    if (chord[i] != null) {
      arrayArr[i][chord[i]].classList.add("selected")
    }
  };
}

function fretboardClearSelection() {  // Unselects all
  arrayArr.forEach((stringArr) => {
    stringArr.forEach((element) => {
      element.classList.remove("selected");
    });
  });
}

function overNine(array) {  // check if array contains integer over nine
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] > 9) {
      return true
    }
  };
}

function isOnlyNull(array) {  // returns true if array only contains null values
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      return false
    } 
  };
  return true
}

/* Playback */
function togglePlay() {
  playEl.classList.toggle("hidden")
  pauseEl.classList.toggle("hidden")
}

function hovered(bool) {
  bpmHovered = bool
}

function handleScroll(event) {
  if (bpmHovered) {
    const delta = Math.sign(event.deltaY);
    let bpm = parseInt(bpmEl.value);
    bpm += delta;
    bpm = Math.min(200, Math.max(60, bpm));
    bpmEl.value = bpm;   
  }
}

/* Copy button */
function clipboard() {
  let temptext = document.createElement("textarea");
  // let tabBoxEl = document.querySelector(".tabBox");
  temptext.value = tabBoxEl.innerText
  temptext.select()
  navigator.clipboard.writeText(temptext.value)
}

/* Settings */
function showSettings() {
  let settingIcons = document.querySelectorAll(".settings > svg:not(#settings)")
  
  settingIcons.forEach(el => {
    el.classList.toggle("hidden");
    if (!muted && el == soundOnEl) {
      soundOffEl.classList.toggle("hidden");
    } else if (muted && el == soundOffEl) {
      soundOnEl.classList.toggle("hidden");
    }
  });
}

function mute() {
  muted = !muted
  if (muted) {
    soundOnEl.classList.toggle("hidden");
    soundOffEl.classList.toggle("hidden");
  } else {
    soundOnEl.classList.toggle("hidden");
    soundOffEl.classList.toggle("hidden");
  }
}

/* Theme */
const themeEl = document.querySelector(".settings > .theme");

themeEl.addEventListener("click", () => { // Theme button
  if (themeIndex === 0) {
    theme("dark")
    themeIndex++
  } else if (themeIndex === 1) {
    theme("mintchoco")
    themeIndex++
  } else if (themeIndex === 2) {
    theme("rainbow")
    themeIndex++
  } else if (themeIndex === 3) {
    theme("light")
    themeIndex = 0
  }
});

function theme(name) {  // Changes theme
  switch (name) {
    case "dark":
      rootEl.style.setProperty("--font-color", "#eee");
      rootEl.style.setProperty("--bg-color", "#111");
      rootEl.style.setProperty("--bg-img", "none");
      rootEl.style.setProperty("--bg-animation", "none");
      rootEl.style.setProperty("--image-invert", "invert(1)");
      rootEl.style.setProperty("--light-color", "hsl(0, 31%, 80%)");
      rootEl.style.setProperty("--dark-color", "hsl(0, 45%, 40%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(0, 24%, 50%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(0, 39%, 40%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(0, 24%, 24%)");
      rootEl.style.setProperty("--img-filter", "1");
      break;
    case "light":
      rootEl.style.setProperty("--font-color", "#111");
      rootEl.style.setProperty("--bg-color", "#eee");
      rootEl.style.setProperty("--bg-img", "none");
      rootEl.style.setProperty("--bg-animation", "none");
      rootEl.style.setProperty("--image-invert", "invert(0)");
      rootEl.style.setProperty("--light-color", "hsl(118, 31%, 85%)");
      rootEl.style.setProperty("--dark-color", "hsl(118, 31%, 76%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(118, 24%, 34%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(118, 24%, 24%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(118, 24%, 24%)");
      rootEl.style.setProperty("--img-filter", "0");
      break;
    case "mintchoco":
      rootEl.style.setProperty("--font-color", "hsl(30, 33%, 37%)");
      rootEl.style.setProperty("--bg-color", "hsl(89, 70%, 85%)");
      rootEl.style.setProperty("--bg-img", "none");
      rootEl.style.setProperty("--bg-animation", "none");
      rootEl.style.setProperty("--image-invert", "invert(1)");
      rootEl.style.setProperty("--light-color", "hsl(118, 51%, 70%)");
      rootEl.style.setProperty("--dark-color", "hsl(118, 31%, 66%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(118, 24%, 54%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(118, 24%, 44%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(118, 24%, 24%)");
      rootEl.style.setProperty("--img-filter", "0");
      break;
    case "rainbow":
      rootEl.style.setProperty("--font-color", "#000");
      rootEl.style.setProperty("--bg-color", "#fff");
      rootEl.style.setProperty("--bg-img", "repeating-linear-gradient(90deg, #f4b1c4, #f2b98b, #bbd36b, #6eddc9, #9acef3, #cebbf3, #f4b1c4)");
      rootEl.style.setProperty("--bg-animation", "background-scroll 16s linear infinite");
      rootEl.style.setProperty("--light-color", "hsl(0, 50%, 89%)");
      rootEl.style.setProperty("--dark-color", "hsl(344, 75%, 63%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(0, 30%, 79%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(0, 30%, 79%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(118, 24%, 24%)");
      rootEl.style.setProperty("--img-filter", "0");
  }
}

function playNote(note) {  // Plays note
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
}

function changeTuningNotes(el) {  // Changes the notes when tuning is changed
  tuningEvent = !tuningEvent
  if (el == "standard") {
    tuningNotes(["E2", "A2", "D3", "G3", "B3", "E4"]);
  } else if (el == "hStepUp") {
    tuningNotes(["F2", "Bb2", "Eb3", "Ab3", "C3", "F4"]);
  } else if (el == "hStepDown") {
    tuningNotes(["D2", "G2", "C3", "F3", "A3", "D4"]);
  } else if (el == "wStepDown") {
    tuningNotes(["C2", "F2", "Bb2", "Eb3", "G3", "C4"]);
  } else if (el == "dropA") {
    tuningNotes(["E2", "A2", "D3", "G3", "B3", "A3"]);
  } else if (el == "dropB") {
    tuningNotes(["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"]);
  } else if (el == "dropC") {
    tuningNotes(["C2", "F2", "Bb2", "Eb3", "G3", "C4"]);
  } else if (el == "dropC#") {
    tuningNotes(["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"]);
  } else if (el == "dropD") {
    tuningNotes(["D2", "G2", "C3", "F3", "A3", "D4"]);
  } else if (el == "openA") {
    tuningNotes(["E2", "A2", "Db3", "E3", "A3", "E4"]);
  } else if (el == "openC") {
    tuningNotes(["C2", "G2", "C3", "G3", "C3", "E4"]);
  } else if (el == "openD") {
    tuningNotes(["D2", "A2", "D3", "Gb3", "A3", "D4"]);
  } else if (el == "openE") {
    tuningNotes(["E2", "B2", "E3", "Ab3", "B3", "E4"]);
  } else if (el == "openF") {
    tuningNotes(["F2", "C2", "F3", "A3", "C3", "F4"]);
  } else if (el == "openG") {
    tuningNotes(["D2", "G2", "D3", "G3", "B3", "D4"]);
  }
}
