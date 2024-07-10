var shift = false
var ctrl = false
var alt = false

document.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    shift = true;
  } else if (e.key === "Control") {
    ctrl = true;
  } else if (e.key === "Alt") {
    alt = true;
  } else if (e.key === "F1" || e.key === "F2" || e.key === "F3" || e.key === "F4" || e.key === "F5" || e.key === "F6") {
    e.preventDefault();
  }
  if (/^[0-9]$/.test(e.key) && stringRowSel != null) {  
    arrayArr[stringRowSel][e.key].click();
  }
  let selArr = document.querySelectorAll("span.selected");
  if (selArr.length == 0) {
    switch (e.key) {
      case "Backspace":
        deleteTab()
        break;
      case " ":
        writeTab([null, null, null, null, null, null])
        break;
      case "Enter":
        addSection()
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
      case "v":
        if (ctrl && paste != []) {
          writeTab(paste)
        }
        break;
      case "ArrowUp":
        if (shift) {
          slideupEl.checked = !slideupEl.checked
          checkbox(slideupEl)
        }
        break;
      case "ArrowDown":
        if (shift) {
          slidedownEl.checked = !slidedownEl.checked
          checkbox(slidedownEl)
        }
        break;
      case "t":
        tappingEl.checked = !tappingEl.checked
        checkbox(tappingEl)
        break;
      case "Alt":
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
      case "|":  // | + 1-5 to access notelengths
        document.addEventListener("keydown", (event) => {
          if (event.key == "1") {
            noteLenArr[0].checked = true
          } else if (event.key == "2") {
            noteLenArr[1].checked = true
          } else if (event.key == "3") {
            noteLenArr[2].checked = true
          } else if (event.key == "4") {
            noteLenArr[3].checked = true
          } else if (event.key == "5") {
            noteLenArr[4].checked = true
          } 
        });
        break;
      case "F1":
        selectString(0, "down")
        break;
      case "F2":
        selectString(1, "down")
        break;
      case "F3":
        selectString(2, "down")
        break;
      case "F4":
        selectString(3, "down")
        break;
      case "F5":
        if (stringCount > 4) {  
          selectString(4, "down")
        }
        break;
      case "F6":
        if (stringCount > 4) {  
          selectString(5, "down")
        }
        break;
      case "Escape":  // Needs fixing
        if (modalEl.open) {
          modalEl.close()
        } else {
          modalEl.showModal()
        }
        break;
    }
  } else { // if tabnotes are selected
    if (/[0-9]/.test(e.key)) {  // Numbers 0-9 
      handleNoteEdit(e.key, selArr)
    } else if (/^[phudtx]$/.test(e.key)) {  // Techniques
      handleTechniqueEdit(e.key, selArr)
    } else if (e.key === "Backspace") {  // Delete last note
      selArr[0].textContent = "-"; 
      lastSel = null
    } else if (e.key === "ArrowDown") {
      if (shift) {
        selArr.forEach(el => {
          let num = parseInt(el.textContent)
          if (num != NaN && num > 0) {
            el.textContent = num - 1
          }
        });
      } else {
        let colIndex = selArr[0].classList[2]
        let rowIndex = parseInt(selArr[0].classList[3].substring(1, 2)) + 1
        if (rowIndex < stringCount) {
          let belowEl = document.querySelector("." + colIndex + ".s" + rowIndex + ":not(.sp)")
          selArr[0].classList.remove("selected")
          belowEl.classList.add("selected")
        }
      }
    } else if (e.key === "ArrowUp") {
      if (shift) {
        selArr.forEach(el => {
          let num = parseInt(el.textContent)
          if (num != NaN && num < 22) {
            el.textContent = num + 1
          }
        });
      } else {
        let colIndex = selArr[0].classList[2]
        let rowIndex = parseInt(selArr[0].classList[3].substring(1)) - 1
        if (rowIndex >= 0) {
          let aboveEl = document.querySelector("." + colIndex + ".s" + rowIndex + ":not(.sp)")
          selArr[0].classList.remove("selected")
          aboveEl.classList.add("selected")
        } 
      }
    } else if (e.key === "ArrowLeft") {
      let colIndex = parseInt(selArr[0].classList[2].substring(1)) - 1
      let rowIndex = selArr[0].classList[3]

      if (colIndex >= 0) {
        let leftEl = document.querySelector(".i" + colIndex + "." + rowIndex + ":not(.sp)")
        selArr[0].classList.remove("selected")
        leftEl.classList.add("selected")
      }
    } else if (e.key === "ArrowRight") {
      let colIndex = parseInt(selArr[0].classList[2].substring(1)) + 1
      let rowIndex = selArr[0].classList[3]

      if (colIndex < tabNoteArr.length) {
        let leftEl = document.querySelector(".i" + colIndex + "." + rowIndex + ":not(.sp)")
        selArr[0].classList.remove("selected")
        leftEl.classList.add("selected")
      }
    } else if (e.key === "c" && ctrl) {
      let allTabnotes = document.querySelectorAll(".active > .txtString")
      paste = []
      allTabnotes.forEach((el, i) => {
        let selNote = el.querySelector(".selected")
        if (selNote != null && selNote.textContent != "-") {
          paste.push(selNote.textContent)
        } else {
          paste.push(null)
        }
      });
    } else if (e.key === "a") {
      if (alt) {
        document.querySelectorAll(".note, rest").forEach(el => {
          el.classList.remove("selected")
          void el.offsetWidth;
          el.classList.add("selected")
        });
      } else if (ctrl) {
        if (selArr.length == 1) {
          let selnoteIndex = document.querySelector("span.selected").classList[2]
          let colNotes = document.querySelectorAll("span." + selnoteIndex + ":not(.sp)")
          colNotes.forEach(el => {
            el.classList.remove("selected")
            void el.offsetWidth;
            el.classList.add("selected")
          });
        }
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Shift") {
    shift = false
  } else if (e.key == "Control") {
    ctrl = false
  } else if (e.key == "Alt") {
    alt = false
  } else if (e.key == "F1") {
    selectString(0, "up")
  } else if (e.key == "F2") {
    selectString(1, "up")
  } else if (e.key == "F3") {
    selectString(2, "up")
  } else if (e.key == "F4") {
    selectString(3, "up")
  } else if (e.key == "F5") {
    selectString(4, "up")
  } else if(e.key == "F6") {
    selectString(5, "up")
  }
});