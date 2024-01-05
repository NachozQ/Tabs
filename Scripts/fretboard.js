let fretdivEl = document.querySelector(".fretboard");
// Create table element
var table = document.createElement("table");
table.classList.add("guitar");
let firstEl = []
let secondEl = []
let thirdEl = []
let fourthEl = []
let fifthEl = []
let sixthEl = []

// Add rows and cells
for (var i = 0; i < 7; i++) {
  switch (i) {
    case 1:
      var stringname = "first"
      break;
    case 2:
      var stringname = "second"
      break
    case 3:
      var stringname = "third"
      break
    case 4:
      var stringname = "fourth"
      break
    case 5:
      var stringname = "fifth"
      break
    case 6:
      var stringname = "sixth"
      break
  }
  var row = table.insertRow(i);
  for (let j = 0; j < 23; j++) {
    if (i === 0) {  // Table numbers
      // Create th element for the first row
      var th = document.createElement("th");
      th.innerText = j;
      row.appendChild(th);
    } else {  // Frets
      if (j === 0) {
        // Create th element for the first column
        var th = document.createElement("th");
        th.id = stringname + j;
        th.className = "string";
        row.appendChild(th);
        var element = th
      } else {
        // Create td element for other cells
        var td = document.createElement("td");
        td.id = stringname + j;
        row.appendChild(td);
        if ((i==2 && j==12) || (i==5 && j==12)) {
          const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          svgEl.setAttribute("viewBox", "0 0 100 100")
          circleEl.setAttribute("cx", "50")
          circleEl.setAttribute("cy", "50")
          circleEl.setAttribute("r", "50")
          svgEl.append(circleEl)
          td.classList.add("content-center")
          td.append(svgEl)
        } else if (i==3 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21)) {
          const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          svgEl.setAttribute("viewBox", "0 0 100 100")
          circleEl.setAttribute("cx", "50")
          circleEl.setAttribute("cy", "100")
          circleEl.setAttribute("r", "50")
          svgEl.append(circleEl)
          td.classList.add("content-bottom")
          td.append(svgEl)
        } else if (i==4 && (j==3 || j==5 || j==7 || j==9 || j==15 || j==17 || j==19 || j==21)) {
          const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          svgEl.setAttribute("viewBox", "0 0 100 100")
          circleEl.setAttribute("cx", "50")
          circleEl.setAttribute("cy", "0")
          circleEl.setAttribute("r", "50")
          svgEl.append(circleEl)
          td.classList.add("content-top")
          td.append(svgEl)
        }
        var element = td
      }
      switch (i) {
        case 1:
          firstEl.push(element)
          break;
        case 2:
          secondEl.push(element)
          break
        case 3:
          thirdEl.push(element)
          break
        case 4:
          fourthEl.push(element)
          break
        case 5:
          fifthEl.push(element)
          break
        case 6:
          sixthEl.push(element)
          break
      }
    }
  }
}

fretdivEl.appendChild(table);
const arrayArr = [firstEl, secondEl, thirdEl, fourthEl, fifthEl, sixthEl];

arrayArr.forEach((stringArr, stringIndex) => {
  stringArr.forEach((element, index) => {
    element.addEventListener("click", () => {
      if (chordEl.checked) {
        notes.splice(stringIndex, 1, index);
      } else {
        notes.splice(stringIndex, 1, index);
        writeTab(notes);
        clearSelection();
        selected();
        notes = [null, null, null, null, null, null]
      }
    });
  });
});
