let modeEl = document.querySelector(".fa-circle-half-stroke")
let rootEl = document.querySelector(":root")
let tuningEl = document.querySelector("#tuning")

let firstEl = document.querySelectorAll("[id^='first']")
let secondEl = document.querySelectorAll("[id^='second']")
let thirdEl = document.querySelectorAll("[id^='third']")
let fourthEl = document.querySelectorAll("[id^='fourth']")
let fifthEl = document.querySelectorAll("[id^='fifth']")
let sixthEl = document.querySelectorAll("[id^='sixth']")

let outputEl = document.querySelector(".output")
let tabArr = [
  "",
  "",
  "",
  "",
  "",
  ""
]

modeEl.addEventListener("click", () => {
  if (getComputedStyle(rootEl).getPropertyValue('--bg-color') == "#fff") {
    rootEl.style.setProperty("--font-color", "#fff")
    rootEl.style.setProperty("--bg-color", "#000")
  } else {
    rootEl.style.setProperty("--font-color", "#000")
    rootEl.style.setProperty("--bg-color", "#fff")
  }
})

tuningEl.addEventListener("change", () => {
  let tuning = tuningEl.options[tuningEl.selectedIndex].text
  let tuningArr = tuning.substr(tuning.indexOf("(")+1, tuning.indexOf(")")-tuning.indexOf("(")-1).split(" ")
  firstEl[0].textContent = tuningArr[0]
  secondEl[0].textContent = tuningArr[1]
  thirdEl[0].textContent = tuningArr[2]
  fourthEl[0].textContent = tuningArr[3]
  fifthEl[0].textContent = tuningArr[4]
  sixthEl[0].textContent = tuningArr[5]
  
  tuningArr = tuningArr.reverse()
  for (let i = 0; i < tuningArr.length; i++) {
    tabArr[i] = tuningArr[i]
  }

  updateTab()
})

function updateTab() {
  outputEl.innerHTML = ""
  for (let i = 0; i < tabArr.length; i++) {
    let pEl = document.createElement("p")
    pEl.textContent = tabArr[i]
    let brEl = document.createElement("br")
    outputEl.append(pEl, brEl)
  }
}