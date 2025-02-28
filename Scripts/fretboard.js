var arrayArr = [[], [], [], [], [], []];

// Creation of fretboard
function buildFretboard(instrument) { // Max frets maybe?
  fretdivEl.textContent = ""
  var table = document.createElement("table");
  table.className = "instrument";
  if (instrument == "guitar") {
    stringCount = 6
    arrayArr = [[], [], [], [], [], []];
  } else if (instrument == "ukulele" || instrument == "bass") {
    stringCount = 4
    arrayArr = [[], [], [], []];
  }
  for (var i = 0; i < stringCount+1; i++) {
    let numberNames = ["first", "second", "third", "fourth", "fifth", "sixth"];
    for (let l = 0; l < stringCount; l++) {
      if (i == l+1) {
        var stringname = numberNames[l];
      }
    };
    var row = table.insertRow(i);
    for (let j = 0; j < 23; j++) {
      if (i === 0) {  // Table numbers, create th element for the first row
        var th = document.createElement("th");
        th.innerText = j + parseInt(capoEl.value)
        th.classList.add("numbers")
        row.appendChild(th);
      } else {  // Frets
        row.tabIndex = "0";
        if (j === 0) {  // Create th element for the first column
          var th = document.createElement("th");
          th.id = stringname + j;
          th.className = "string";
          row.appendChild(th);
          var element = th
        } else {  // Create td element for other cells
          let pEl = document.createElement("p")
          var td = document.createElement("td");
          td.id = stringname + j;
          row.appendChild(td);
          td.append(pEl)
          if (stringCount == 6) {
            if ((i==2 && j==12) || (i==5 && j==12)) {
              fretboardSVG(td, 50, "center", "0 0 100 100")
            } else if ((j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21)) {
              if (i==3) {
                fretboardSVG(td, 100, "bottom", "0 49 100 100")
              } else if (i==4) {
                td.classList.add("fretmarker-top")
              }
            }
          } else if (stringCount == 4) {
            if (i==2 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21) || i==1 && (j==12) || i==3 && (j==12)) {
              fretboardSVG(td, 100, "bottom", "0 49 100 100")
            } else if (i==3 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21) || i==2 && (j==12) || i==4 && (j==12)) {
              td.classList.add("fretmarker-top")
            }
          }
          var element = td
        }
        // Push frets to string array
        for (let k = 0; k <= stringCount; k++) {
          if (i == k) {
            arrayArr[i-1].push(element)
          }
        };
      }
    }
  }
  arrayArr.forEach((stringArr, stringIndex) => {
    stringArr.forEach((element, index) => {
      element.addEventListener("click", () => {
        if (chordEl.checked) {
          notes.splice(stringIndex, 1, index);
          chordSelection(notes, element)
        } else {
          notes.splice(stringIndex, 1, index);
          writeTab(notes);
          fretboardClearSelection();
          element.classList.add("selected");
          notes = [null, null, null, null, null, null]
        }
      });
    });
  });
  fretdivEl.appendChild(table);
}
buildFretboard("guitar")

function fretboardSVG(el, y, alignment, vb) {
  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  svgEl.setAttribute("viewBox", vb)
  circleEl.setAttribute("cx", "50")
  circleEl.setAttribute("cy", y)
  circleEl.setAttribute("r", "40")
  svgEl.append(circleEl)
  el.append(svgEl)
  el.classList.add(`fretmarker-${alignment}`)
}

function tuningNotes(tuningArr) {
  let allNotes = [
    "A0", "A♯0", "B0", "C1", "C♯1", "D1", "D♯1", "E1", "F1", "F♯1", "G1", "G♯1",
    "A1", "A♯1", "B1", "C2", "C♯2", "D2", "D♯2", "E2", "F2", "F♯2", "G2", "G♯2",
    "A2", "A♯2", "B2", "C3", "C♯3", "D3", "D♯3", "E3", "F3", "F♯3", "G3", "G♯3",
    "A3", "A♯3", "B3", "C4", "C♯4", "D4", "D♯4", "E4", "F4", "F♯4", "G4", "G♯4",
    "A4", "A♯4", "B4", "C5", "C♯5", "D5", "D♯5", "E5", "F5", "F♯5", "G5", "G♯5",
    "A5", "A♯5", "B5", "C6", "C♯6", "D6", "D♯6", "E6", "F6", "F♯6", "G6", "G♯6",
    "A6", "A♯6", "B6", "C7", "C♯7", "D7", "D♯7", "E7", "F7", "F♯7"
  ];
  tuningArr = tuningArr.reverse(); // Why not work?

  let Arr = []
  // Adds fretboard notes based on tuningnotes then adds it to array
  for (let i = 0; i < tuningArr.length; i++) {
    let startIndex = allNotes.indexOf(tuningArr[i]) + parseInt(capoEl.value)
    let stringNoteArr = allNotes.slice(startIndex, startIndex+23) 
    Arr.push(...stringNoteArr)
  }
  let fretboardArr = document.querySelectorAll(".instrument > tbody > tr > *[id]")
  // Remove old and add new eventlisteners for sounds
  fretboardArr.forEach((el, i) => {
    if (showNotesToggle) {
      if (i!=0 && i!=23 && i!= 46 && i!= 69 && i!=92 && i!=115) {
        let pEl = el.querySelector("p")
        let str = Arr[i].slice(0, -1)
        pEl.textContent = str
      } 
    } else {
      if (i!=0 && i!=23 && i!= 46 && i!= 69 && i!=92 && i!=115) {
        let pEl = el.querySelector("p")
        pEl.textContent = ""
      } else {
        // el.textContent = Arr[i].slice(0, -1)
      }
    }
    el.removeEventListener("click", el.eventListener);
    el.eventListener = () => playNote(Arr[i]);
    el.addEventListener("click", el.eventListener);
  });
  // Animation
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
}

function changeTuningNotes(el) {  // Changes the notes when tuning is changed
  if (el != "") {
    tuningEvent = !tuningEvent
    if (currentInstrument == "guitar") {
      tuningNotesArr = guitarTunings[el];
    } else if (currentInstrument == "bass") {
      tuningNotesArr = bassTunings[el];
    } else if (currentInstrument == "ukulele") {
      tuningNotesArr = ukuleleTunings[el];
    }
    tuningArr = tuning.options[tuning.selectedIndex].title.split(" ");
    tuningNotes(tuningNotesArr);
  }
}

function chordSelection(chord, el) {  // Selects chord notes while writing it
  let hadSelection = el.classList.contains("selected")
  fretboardClearSelection()
  for (let i = 0; i < chord.length; i++) {
    if (chord[i] != null) {
      if (hadSelection && el == arrayArr[i][chord[i]]) {
        arrayArr[i][chord[i]].classList.remove("selected")
        notes[i] = null
      } else {
        arrayArr[i][chord[i]].classList.add("selected")
      }
    }
  };
}

function selectString(string, type) {
  arrayArr[string].forEach(el => {
    if (type == "down") {
      el.classList.add("selectedLight");
    } else {
      el.classList.remove("selectedLight");
    }
  });
  if (type == "down") {
    stringRowSel = string
  } else {
    stringRowSel = null
  }
}

function fretboardClearSelection() {  // Unselects all
  document.querySelectorAll(".instrument > tbody > tr > .selected").forEach(el => el.classList.remove("selected"));
}