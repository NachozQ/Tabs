function tabBar() {
  for (let i = 0; i < 6; i++) {
    spanEl = document.createElement("span")
    brEl = document.createElement("br")
    spanEl.className = "txtString"
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

function sep(note) {
  if (note <= 9) {
    var ending = Space(1) + note
  } else {
    var ending = "-" + note
  } 
  tchnqArr.forEach(element => {
    if (element.checked) {
      if (note <= 9 && element.id != "deadnote") {
        ending = "-"
      } else {
        ending = ""
      }
      switch (element.id) {
        case "pulloff":
          ending += "p" + note
          break;
        case "hammeron":
          ending += "h" + note
          break;
        case "deadnote":
          ending +=  Space(1) + "x"
          break;
        case "slideup":
          ending += "/" + note
          break;
        case "slidedown":
          ending += "\\" + note
          break;
        case "tapping":
          ending += "t" + note
          break;
      }
    }
  });
  return ending
}

function writeTab(notes) { // Writes notes
  if (chord) { // Chord
    const isOnlyNull = (arr) => arr.every((element) => element === null);
    if (!isOnlyNull(notes)) { // If notes empty
      for (let i = 0; i < 6; i++) {
        if (notes[i] == null) { // No notes
          currentStrings()[i].textContent += Space(1) + "-"
        } else {
          currentStrings()[i].textContent += sep(notes[i])
        }
      };
      // Counts how many beats for measure
      if (wholeEl.checked) {
        beats += 16
      } else if (halfEl.checked) {
        beats += 8
      } else if (quarterEl.checked) {
        beats += 4
      } else if (eighthEl.checked) {
        beats += 2
      } else if (sixteenthEl.checked) {
        beats += 1
      }
      if (beats == 16) {
        endTab()
      }
    }
  }
  // Unchecks
  tchnqArr.forEach(element => {
    element.checked = false
  });
}

function endTab() {
  for (let i = 0; i < 6; i++) {
    currentStrings()[i].textContent += Space(1) + "|"
  };
  beats = 0
}

function deleteTab() {
  currentStrings().forEach(element => {
    element.textContent = element.textContent.slice(0, -2)
  });
}

function checkbox(checkbox) { // Allows only one checkbox to be checked
  var checkboxes = document.querySelectorAll("input[name='tchnq']");
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}

function Space(amount) { // 
  let space = ""
  for (let i = 0; i < amount; i++) {
    space += "--"
  };
  return space
}

function selected() {
  currentStrings().forEach((element, index) => {
    if (element.textContent.substr(-2, 1) == "-") {
      if (parseInt(element.textContent.substr(-1)) <= 9) {
        arrayArr[index][element.textContent.substr(-1)].classList.add("selected")
      } else if (element.textContent.substr(-1) == "x") {
        arrayArr[index][0].classList.add("selected")
      }
    } else if (parseInt(element.textContent.substr(-2)) > 9) {
      arrayArr[index][element.textContent.substr(-2)].classList.add("selected")
    }
  });
}

function clearSelection() {
  arrayArr.forEach((stringArr) => {
    stringArr.forEach((element) => {
      element.classList.remove("selected");
    });
  });
}

function overNine(array) {
  for (let i = 0; i < array.length; i++) {
    if (!isNaN(array[i]) && array[i] > 9) {
      return true
    }
  };
}

function clipboard() {
  let temptext = document.createElement("textarea");
  // let tabBoxEl = document.querySelector(".tabBox");
  temptext.value = tabBoxEl.innerText
  temptext.select()
  navigator.clipboard.writeText(temptext.value)
}

function theme(name) {
  switch (name) {
    case "dark":
      rootEl.style.setProperty("--font-color", "#fff");
      rootEl.style.setProperty("--bg-color", "#000");
      rootEl.style.setProperty("--light-color", "hsl(0, 31%, 80%)");
      rootEl.style.setProperty("--dark-color", "hsl(0, 45%, 40%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(0, 24%, 50%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(0, 39%, 40%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(0, 24%, 24%)");
      rootEl.style.setProperty("--image-color", "invert(100%)");
      rootEl.style.setProperty("--image", "invert(1)");
      rootEl.style.setProperty("--image-invert", "invert(1)");
      break;
    case "light":
      rootEl.style.setProperty("--font-color", "#000");
      rootEl.style.setProperty("--bg-color", "#fff");
      rootEl.style.setProperty("--light-color", "hsl(118, 31%, 85%)");
      rootEl.style.setProperty("--dark-color", "hsl(118, 31%, 76%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(118, 24%, 34%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(118, 24%, 24%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(118, 24%, 24%)");
      rootEl.style.setProperty("--image-color", "invert(0%)");
      rootEl.style.setProperty("--bg-image", "url('Images/Dot.png')");
      rootEl.style.setProperty("--bg-top-image", "url('Images/TopDot.png')");
      rootEl.style.setProperty("--image", "invert(0)");
      rootEl.style.setProperty("--image-invert", "invert(0)");
      break;
    case "mintchoco":
      rootEl.style.setProperty("--font-color", "hsl(30, 33%, 37%)");
      rootEl.style.setProperty("--bg-color", "hsl(89, 70%, 85%)");
      rootEl.style.setProperty("--light-color", "hsl(118, 51%, 70%)");
      rootEl.style.setProperty("--dark-color", "hsl(118, 31%, 66%)");
      rootEl.style.setProperty("--light-alpha-color", "hsla(118, 24%, 54%, 0.75)");
      rootEl.style.setProperty("--dark-alpha-color", "hsla(118, 24%, 44%, 0.75)");
      rootEl.style.setProperty("--border", "hsl(118, 24%, 24%)");
      rootEl.style.setProperty("--image-color", "invert(0%)");
      rootEl.style.setProperty("--bg-image", "url('Images/Dot.png')");
      rootEl.style.setProperty("--bg-top-image", "url('Images/TopDot.png')");
      rootEl.style.setProperty("--image", "invert(0)");
      rootEl.style.setProperty("--image-invert", "invert(1)");
      break;
  }
}