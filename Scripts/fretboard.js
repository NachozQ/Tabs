var arrayArr = [[], [], [], [], [], []];

// Creation of fretboard
function buildFretboard(instrument) {
  // Create table element
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
        th.innerText = j;
        row.appendChild(th);
      } else {  // Frets
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
            } else if (i==3 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21)) {
              fretboardSVG(td, 100, "bottom", "0 49 100 50")
            } else if (i==4 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21)) {
              fretboardSVG(td, 0, "top", "0 1 100 50")
            }
          } else if (stringCount == 4) {
            if (
              i==2 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21) ||
              i==1 && (j==12) ||
              i==3 && (j==12)) {
              fretboardSVG(td, 100, "bottom", "0 49 100 50")
            } else if (
              i==3 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21) ||
              i==2 && (j==12) ||
              i==4 && (j==12)) {
              fretboardSVG(td, 0, "top", "0 1 100 50")
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
  el.classList.add("align-" + alignment)
  el.append(svgEl)
}

function tuningNotes(tuningArr) {
  let allNotes = [
    "A0", "Bb0", "B0", "C1", "Db1", "D1", "Eb1", "E1", "F1", "Gb1", "G1", "Ab1",
    "A1", "Bb1", "B1", "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2",
    "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3",
    "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4",
    "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5",
    "A5", "Bb5", "B5", "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6",
    "A6", "Bb6", "B6", "C7", "Db7", "D7", "Eb7", "E7", "F7", "Gb7"
  ];
  tuningArr.reverse();
  let Arr = []
  allNotes.splice(0, capoEl.value)
  // Adds fretboard notes based on tuningnotes then adds it to array
  for (let i = 0; i < tuningArr.length; i++) {
    let startIndex = allNotes.indexOf(tuningArr[i])
    let stringNoteArr = allNotes.slice(startIndex, startIndex+23) 
    Arr.push(...stringNoteArr)
  }
  let fretboardArr = document.querySelectorAll(".instrument > tbody > tr > *[id]")
  // Remove old and add new eventlisteners
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
      }
    }
    el.removeEventListener("click", el.eventListener);
    el.eventListener = () => playNote(Arr[i]);
    el.addEventListener("click", el.eventListener);
  });
}

function changeTuningNotes(el) {  // Changes the notes when tuning is changed
  if (el != "") {
    tuningEvent = !tuningEvent
    if (currentInstrument == "guitar") { // Might be able to slice off the 3 last notes to become bass tunings, should look into it
      if (el == "standard") {
        tuningNotesArr = ["E2", "A2", "D3", "G3", "B3", "E4"]
      } else if (el == "hStepUp") {
        tuningNotesArr = ["F2", "Bb2", "Eb3", "Ab3", "C3", "F4"]
      } else if (el == "hStepDown") {
        tuningNotesArr = ["D2", "G2", "C3", "F3", "A3", "D4"]
      } else if (el == "wStepDown") {
        tuningNotesArr = ["C2", "F2", "Bb2", "Eb3", "G3", "C4"]
      } else if (el == "dropA") {
        tuningNotesArr = ["E2", "A2", "D3", "G3", "B3", "A3"]
      } else if (el == "dropB") {
        tuningNotesArr = ["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"]
      } else if (el == "dropC") {
        tuningNotesArr = ["C2", "F2", "Bb2", "Eb3", "G3", "C4"]
      } else if (el == "dropC#") {
        tuningNotesArr = ["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"]
      } else if (el == "dropD") {
        tuningNotesArr = ["D2", "G2", "C3", "F3", "A3", "D4"]
      } else if (el == "openA") {
        tuningNotesArr = ["E2", "A2", "Db3", "E3", "A3", "E4"]
      } else if (el == "openC") {
        tuningNotesArr = ["C2", "G2", "C3", "G3", "C3", "E4"]
      } else if (el == "openC5") {
        tuningNotesArr = ["C2", "G2", "C3", "G3", "C3", "C4"]
      } else if (el == "openD") {
        tuningNotesArr = ["D2", "A2", "D3", "Gb3", "A3", "D4"]
      } else if (el == "openE") {
        tuningNotesArr = ["E2", "B2", "E3", "Ab3", "B3", "E4"]
      } else if (el == "openF") {
        tuningNotesArr = ["F2", "C2", "F3", "A3", "C3", "F4"]
      } else if (el == "openG") {
        tuningNotesArr = ["D2", "G2", "D3", "G3", "B3", "D4"]
      }
    } else if (currentInstrument == "bass") {
      if (el == "standard") { // MISSING TUNINGS ATM
        tuningNotesArr = ["E1", "A1", "D2", "G2"]
      } else if (el == "hStepUp") {
        tuningNotesArr = ["F1", "Bb1", "Eb2", "Ab2"]
      } else if (el == "hStepDown") {
        tuningNotesArr = ["D1", "G1", "C2", "F2"]
      } else if (el == "wStepDown") {
        tuningNotesArr = ["C1", "F1", "Bb1", "Eb2"]
      } 
    } else if (currentInstrument == "ukulele") {
      if (el == "standard") {  // MISSING TUNINGS ATM
        tuningNotesArr = ["E1", "A1", "D2", "G2"]
      }     
    }
    tuningArr = tuningNotesArr.map(el => el.slice(0, -1));
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
  document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
}