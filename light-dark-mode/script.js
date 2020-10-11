const toggleSwitch = document.querySelector("input[type=checkbox]");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const imagesMode = (theme) => {
  image1.src = `img/undraw_proud_coder_${theme}.svg`;
  image2.src = `img/undraw_feeling_proud_${theme}.svg`;
  image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
};

const textMode = (theme) => {
  const capitalizedMode = theme.charAt(0).toUpperCase() + theme.slice(1);
  toggleIcon.children[0].textContent = `${capitalizedMode} Mode`;
};

const saveThemeInLocalStorage = (theme) => {
  localStorage.setItem("theme", theme);
};

const toggleDarkLightMode = (theme) => {
  debugger;
  document.documentElement.setAttribute("data-theme", theme);
  const isDarkMode = theme === DARK_THEME;

  nav.style.backgroundColor = isDarkMode
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDarkMode
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  isDarkMode
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  toggleSwitch.checked = isDarkMode;

  textMode(theme);
  imagesMode(theme);
  saveThemeInLocalStorage(theme);
};

const switchTheme = (event) => {
  const theme = event.target.checked ? DARK_THEME : LIGHT_THEME;

  toggleDarkLightMode(theme);
};

toggleSwitch.addEventListener("change", switchTheme);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  toggleDarkLightMode(currentTheme);
}
