function startTab() { // Starts the tab strings and lines and dashes
  let tuning = tuningEl.options[tuningEl.selectedIndex].text
  let tuningArr = tuning.substr(tuning.indexOf("(")+1, tuning.indexOf(")")-tuning.indexOf("(")-1).split(" ")
  document.querySelectorAll("[id^='first']")[0].textContent = tuningArr[5]
  document.querySelectorAll("[id^='second']")[0].textContent = tuningArr[4]
  document.querySelectorAll("[id^='third']")[0].textContent = tuningArr[3]
  document.querySelectorAll("[id^='fourth']")[0].textContent = tuningArr[2]
  document.querySelectorAll("[id^='fifth']")[0].textContent = tuningArr[1]
  document.querySelectorAll("[id^='sixth']")[0].textContent = tuningArr[0]

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
        stringsEl[i].textContent = tabArr[i] + "|"
      } else { 
        stringsEl[i].textContent = tabArr[i] + " |"
      }
    }
  } else { // No sharps or flats
    for (let i = 0; i < tabArr.length; i++) {
      stringsEl[i].textContent = tabArr[i] + "|"
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
      switch (element.id) {
        case "pulloff":
          ending = "p" + note
          break;
        case "hammeron":
          ending = "h" + note
          break;
        case "deadnote":
          ending = Space(1) + "x"
          break;
        case "slideup":
          ending = "/" + note
          break;
        case "slidedown":
          ending = "\\" + note
          break;
        case "tapping":
          ending = "t" + note
          break;
      }
    } 
  });
  return ending
}

function writeTab(string, fret) { // Writes notes
  if (!spacingEl.checked) {
    for (let i = 0; i < 6; i++) {
      if (string == i && fret <= 9) {
        stringsEl[i].textContent += sep(fret)
      } else {
        stringsEl[i].textContent += Space(2)
      }
    };
  } else {
    for (let i = 0; i < 6; i++) {
      if (string == i && fret <= 9) {
        stringsEl[i].textContent += sep(fret)
      } else if (string == i && fret > 9) {
        stringsEl[i].textContent += sep(fret)
      } else {
        stringsEl[i].textContent += Space(1) + "-"
      }
    };
  }
  // Unchecks
  tchnqArr.forEach(element => {
    element.checked = false
  });
}

function deleteTab() {
  stringsEl.forEach(element => {
    element.textContent = element.textContent.slice(0, -2)
  });
}

function checkbox(checkbox) {
  var checkboxes = document.querySelectorAll("input[name='tchnq']");
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}

function Space(amount) {
  let space = ""
  for (let i = 0; i < amount; i++) {
    if (!spacingEl.checked) {
      space += "-"
    } else {
      space += "--"
    }
  };
  return space
}
