function addSection() {
  let divEl = document.createElement("div")
  let brEl = document.createElement("br")
  divEl.className = "section" + sectionCount + " active"
  sectionCount++
  if (sectionCount > 1) {
    var active = activeSection().classList[0]
  }
  removePrevActive()
  divEl.onclick = () => {
    removePrevActive()
    divEl.classList.add("active")
  };
  for (let i = 0; i < stringCount; i++) {
    let spanEl = document.createElement("span")
    let span2El = document.createElement("span")
    const stringCount = ["first", "second", "third", "fourth", "fifth", "sixth"]
    spanEl.className = "txtString " + stringCount[i]
    span2El.className = "tabTuning"
    span2El.textContent = "|"
    spanEl.append(span2El)
    divEl.append(spanEl)
  };
  divEl.append(brEl)

  if (sectionCount == 1) {
    tabSheetEl.append(divEl)
  } else if (sectionCount > 1) {
    document.querySelector("." + active).insertAdjacentElement("afterend", divEl);
  }
  updateSection()
}

function removePrevActive() {
  const allActive = document.querySelectorAll(".active")
  allActive.forEach(el => el.classList.remove("active"));
}

function updateSection() {  // Updates tuning notes on tab text
  if (tuning.options[tuning.selectedIndex].value != "") {
    tuningArr = tuningArr.reverse()
    let tabTuningArr = document.querySelectorAll(".active > .txtString > .tabTuning")
    // Add space if other notes include sharp or flat
    if (tuningArr.join("").includes("#") || tuningArr.join("").includes("b")) { 
      let indices = [];
      tuningArr.forEach((element, index) => {
        if (element.includes("#") || element.includes("b")) {
          indices.push(index);
        } else {
          indices.push(false)
        }
      });
      for (let i = 0; i < tuningArr.length; i++) {
        if (indices.includes(i)) { 
          tabTuningArr[i].textContent = tuningArr[i] + "|"
        } else { 
          tabTuningArr[i].textContent = tuningArr[i] + " |"
        }
      }
    } else { // No sharps or flats
      for (let i = 0; i < tuningArr.length; i++) {
        tabTuningArr[i].textContent = tuningArr[i] + "|"
      }
    }
  } 
}

function activeStrings() {
  return document.querySelectorAll(".active > .txtString");
}

function activeSection() {
  return document.querySelector(".active");
}

const clickListener = (ev) => {
  let target = ev.target
  if (!target.classList.contains("note") && !target.classList.contains("rest")) {
    if (document.querySelectorAll("span.selected").length != 0) {
      const ntrt = document.querySelectorAll(".note, .rest")
      ntrt.forEach(el => el.classList.remove("selected"));
    }
  }
};

function writeNote(note) {
  let spaceEl = document.createElement("span")
  spaceEl
  var neededSpace = overNine(notes) + techniqueSpace()
  let notechars = note.toString().length
  if (activeStrings()[stringCount-1].textContent.slice(-1) == "|") {
    if (spacing == "single") {
      if (notechars == 1) {
        spaceEl.innerText = Space(notechars - neededSpace, true)
      } else if (notechars == 2) {
        spaceEl.innerText = Space(notechars - 1, true)
      }
    } else {
      if (notechars == 1) {
        spaceEl.innerText = Space(neededSpace - notechars, true)
      } else if (notechars == 2) {
        spaceEl.innerText = Space(notechars - 2, true)
      }
    }
  } else {
    spaceEl.innerText = Space(notechars, false)
  }
  let noteEl = document.createElement("span")
  noteEl.classList.add(selectedNoteLen(), "note")
  noteEl.innerText = note
  noteEl.onclick = () => { noteSelection(noteEl)}
  tchnqArr.forEach(element => {
    if (element.checked && note != "-") {
      ending = ""
      switch (element.id) {
        case "pulloff":
          spaceEl.innerText = Space(("p" + note).length, false)
          noteEl.innerText = "p" + note
        break;
        case "hammeron":
          spaceEl.innerText = Space(("h" + note).length, false)
          noteEl.innerText = "h" + note
        break;
        case "deadnote":
          spaceEl.innerText = Space(("x").length, false)
          noteEl.innerText = "x"
        break;
        case "slideup":
          spaceEl.innerText = Space(("/" + note).length, false)
          noteEl.innerText = "/" + note
        break;
        case "slidedown":
          spaceEl.innerText = Space(("\\" + note).length, false)
          noteEl.innerText = "\\" + note
        break;
        case "tapping":
          spaceEl.innerText = Space(("x" + note).length, false)
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
    for (let i = 0; i < stringCount; i++) {
      if (notes[i] == null) { // No notes
        let noteArr = writeNote("-")
        tabNoteArr[tabNoteArr.length - 1].push(noteArr[1])
        noteArr[0].classList.add("i" + (tabNoteArr.length - 1), "s" + i, "sp")
        noteArr[1].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        activeStrings()[i].append(noteArr[0], noteArr[1])
      } else {
        let noteArr = writeNote(notes[i])
        tabNoteArr[tabNoteArr.length - 1].push(noteArr[1])
        noteArr[0].classList.add("i" + (tabNoteArr.length - 1), "s" + i, "sp")
        noteArr[1].classList.add("i" + (tabNoteArr.length - 1), "s" + i)
        activeStrings()[i].append(noteArr[0], noteArr[1])
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
      activeStrings()[i].append(noteArr[0], noteArr[1])
    };
  }

  beats += notelenChecked()
  if (beats == 16) {
    endTab()
  }
  // Unchecks
  tchnqArr.forEach(el => el.checked = false);
}

function endTab() {
  for (let i = 0; i < stringCount; i++) {
    var text
    if (spacing == "single") {
      text = document.createTextNode("-|")
    } else if (spacing == "double") {
      text = document.createTextNode("--|")
    }
    activeStrings()[i].append(text)
  };
  beats = 0
}

function deleteTab() {
  // Will delete last noteline, if the last noteline doesn't have notes it deletes the section
  let lastTing = activeStrings()[0].lastChild
  if (lastTing.textContent != "-|") {
    let lastEl = lastTing.className
    if (activeSection().classList.contains("section0") && lastEl == "tabTuning") {
      alert("Can't delete first tab section")
    } else if (!activeSection().classList.contains("section0") && lastEl == "tabTuning") {
      activeSection().remove()
      sectionCount--
    } else if (lastEl.includes("note") || lastEl.includes("rest")) {
      beats -= lengthToBeat(lastTing.classList[0])
      activeStrings().forEach(el => {
        el.lastChild.remove()
        el.lastChild.remove()
      });
    }
  } else {
    activeStrings().forEach(el => {
      el.lastChild.remove()
    });
  }
}

function Space(note, start) { // 
  let space = ""
  if (spacing == "single" && start) {
    note++
  }
  if (note == 0) {
    space = "---"
  } else if (note == 1) {
    space = "--"
  } else if (note == 2) {
    space = "-"
  } else if (note == 3) {
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
    let allSelected = document.querySelectorAll("span.selected")
    if (!shift) {
      allSelected.forEach(span => span.classList.remove("selected"));
    }

    allSelected.forEach(span => {
      if (span !== el) {
        span.classList.remove("selected")
        void el.offsetWidth;
        span.classList.add("selected")
      }
    });
    el.classList.add("selected")
  }
  document.addEventListener("click", clickListener)
}

function overNine(array) {  // check if array contains integer over nine
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] > 9) {
      return 1
    }
  };
  return 0
}

function techniqueSpace() {
  let tchnqlabelEl = document.querySelector(".technique > input:checked + label")
  if (tchnqlabelEl) {
    let value = tchnqlabelEl.textContent
    if (value != "x" && value != "( )") {
      return value.length
    } else {
      if (value == "x") {
        return 0
      } else if (value == "( )") {
        // Maybe 3? since 1( 2n 3)
        return 2
      }
    }
  }
  return 0
}

function isOnlyNull(array) {  // returns true if array only contains null values
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      return false
    } 
  };
  return true
}

function handleNoteEdit(key, selectedNotes) {
  if (selectedNotes.length > 1) {  // Multi note editing
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = selectedNotes[0].textContent;
    };
  }
  if (lastSel != selectedNotes[0].textContent) {  // First note
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = key;
    };
    lastSel = selectedNotes[0].textContent
  } else {  // Second note
    if (lastSel >= 1 && lastSel <= 2) {  // Note between 1 and 2
      if (lastSel == 1) {  // For 10 to 19
        for (let i = 0; i < selectedNotes.length; i++) {
          selectedNotes[i].textContent += key;
        }
        lastSel = selectedNotes[0].textContent
      } else if (lastSel == 2 && (key == "0" || key == "1" || key == "2")) {  // For 20 to 22
        for (let i = 0; i < selectedNotes.length; i++) {
          selectedNotes[i].textContent += key;
        }
        lastSel = selectedNotes[0].textContent
      } else {  // To avoid > 22
        for (let i = 0; i < selectedNotes.length; i++) {
          selectedNotes[i].textContent = key;
        };
        lastSel = key;
      }
    } else {  // To avoid > 22
      for (let i = 0; i < selectedNotes.length; i++) {
        selectedNotes[i].textContent = key;
      };
      lastSel = key;
    }
  }
}

function handleTechniqueEdit(key, selectedNotes) {
  if (key === "x") {
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = "x"; 
    } 
  } else if (key === "d") {
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = "\\" + selectedNotes[i].textContent;
    } 
  } else if (key === "u") { 
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = "/" + selectedNotes[i].textContent;
    } 
  } else {
    for (let i = 0; i < selectedNotes.length; i++) {
      selectedNotes[i].textContent = key + selectedNotes[i].textContent;
      lastSel = selectedNotes[i].textContent;
    } 
  }
}

/* Copy button */
function clipboard() {
  let sections = document.querySelectorAll(".tabSheet > div")
  let result = "";

  sections.forEach(section => {
    let lines = section.querySelectorAll(".txtString");
    lines.forEach(line => {
      result += line.innerText.replace(/\n/g, "") + "\n";
    });
    result += "\n";
  });

  let temptext = document.createElement("textarea");
  temptext.value = result.trim();
  temptext.select()
  navigator.clipboard.writeText(temptext.value)
}

function clearTab() {
  // Clears tab
  tabSheetEl.textContent = ""
  sectionCount = 0
  beats = 0
}