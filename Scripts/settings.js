function settings() {
  let checked = navbarEl.querySelector("label:has(input:checked)").textContent
  document.querySelectorAll(".settings-content > div").forEach(el => {
    el.classList.add("hidden")
  });
  
  switch (checked) {
    case "General":
      document.querySelector(".general").classList.remove("hidden")
      break;
    case "Appearance":
      document.querySelector(".appearance").classList.remove("hidden")
      break;
    case "Accessibility":
      document.querySelector(".accessibility").classList.remove("hidden")
      break;
    case "Sound":
      document.querySelector(".sound").classList.remove("hidden")
      break;
    case "Documentation":
      document.querySelector(".documentation").classList.remove("hidden")
      break;
  }
}

modalEl.addEventListener("cancel", (event) => {
  event.preventDefault();
});

function theme(name) {  // Changes theme
  let black = "0, 0%, 7%"
  let white = "0, 0%, 93%"
  let hsl; let dark; let cRotate
  rootEl.style.setProperty("--bg-img", "none");
  rootEl.style.setProperty("--bg-animation", "none");
  rootEl.style.setProperty("--img-filter", "0");
  switch (name) {
    case "dark":
      hsl = [0, 50, 30]
      dark = 24
      cRotate = 240
      rootEl.style.setProperty("--font-color", white);
      rootEl.style.setProperty("--bg-color", black);
      rootEl.style.setProperty("--img-filter", "1");
      break;
    case "light":
      hsl = [118, 24, 30]
      dark = 24
      cRotate = 0
      rootEl.style.setProperty("--font-color", black);
      rootEl.style.setProperty("--bg-color", white);
      break;
    case "mintchoco":
      hsl = [118, 24, 30]
      dark = 40
      cRotate = 320
      rootEl.style.setProperty("--font-color", "30, 33%, 37%");
      rootEl.style.setProperty("--bg-color", "89, 70%, 85%");
      break;
    case "rainbow":
      hsl = [0, 50, 80]
      dark = 70
      cRotate = 200
      rootEl.style.setProperty("--font-color", black);
      rootEl.style.setProperty("--bg-color", white);
      rootEl.style.setProperty("--bg-img", "repeating-linear-gradient(90deg, #f4b1c4, #f2b98b, #bbd36b, #6eddc9, #9acef3, #cebbf3, #f4b1c4)");
      rootEl.style.setProperty("--bg-animation", "background-scroll 16s linear infinite");
      break;
  }
  rootEl.style.setProperty("--color-rotation", "hue-rotate(" + cRotate + "deg)");
  rootEl.style.setProperty("--light-accent", hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%");
  rootEl.style.setProperty("--dark-accent", hsl[0] + ", " + hsl[1] + "%, " + dark + "%");
}