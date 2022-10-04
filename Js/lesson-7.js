let input = document.body.querySelector("input[type='text']");
let themeBtn = document.body.querySelector(".theme__btn");
let task = document.body.querySelector(".modal");
// Theme:
let small = document.body.querySelector(".theme__small");
let reset = document.body.querySelector(".reset");
let large = document.body.querySelector(".theme__large");
// Search:
let search = document.body.querySelector("#search");
let themeLang = document.body.querySelector(".theme__lang");

themeBtn.addEventListener("click", (event) => {
  event.target.textContent =
    event.target.textContent === "Night" ? "Light" : "Night";
  // document.body.classList.toggle("night");

  if (document.body.classList.length === 0) {
    document.body.classList.add("night", "boshqa");
  } else {
    document.body.classList.remove("night", "boshqa");
  }
});

// *******************************  getComputedStyle  ******************************* //
// Bunda property nomlari camelCase usulida beriladi, aks holda ishlamaydi, shuningdek cssda qanday yozilgan bo'lsa, shunday property berilishi kerak: not padding, instead paddingTop...

const bodyStyles = getComputedStyle(document.body);
let fz = bodyStyles.fontSize;

// setTimeout(() => {
//   document.body.style.fontSize = `${Number(fz.replace("px", "")) * 2}px`;
// }, 3000);

small.addEventListener("click", () => {
  document.body.style.fontSize = `${Number(fz.replace("px", "")) * 0.8}px`;
});

reset.addEventListener("click", () => {
  document.body.style.fontSize = fz;
});

large.addEventListener("click", () => {
  document.body.style.fontSize = `${Number(fz.replace("px", "")) * 1.5}px`;
});

themeLang.addEventListener("change", (event) => {
  let currentLang = event.target.value;
  console.log(currentLang);
});
