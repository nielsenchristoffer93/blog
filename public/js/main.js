/* --------- NAVBAR --------- */

// Add the sticky class when you reach the scroll position
// Remove it when you leave the scroll position
window.addEventListener("scroll", () => {
  // Get the navbar.
  const navbar = document.getElementsByClassName("navbar")[0];

  // Get the offset position of the navbar.
  const sticky = navbar.offsetTop;

  if (window.scrollY > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

/* --------- NAVBAR MENU --------- */
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".navbar-list");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navMenu.classList.toggle("active");
});

/* --------- LIGHT / DARK MODE TOGGLE --------- */
const darkModeToggle = document.querySelector(".checkbox-label");
const logoImg = document.getElementsByClassName("logo")[0];
const checkbox = document.querySelector("#checkbox");

darkModeToggle.addEventListener("click", () => {
  // Initialize dark mode based on stored preference (if any)
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode) {
    const isDarkMode = JSON.parse(storedDarkMode);
    console.log(`isDarkMode: ${isDarkMode}`);
    if (isDarkMode) {
      localStorage.setItem("darkMode", JSON.stringify(false));
      changeToLightMode();
    } else {
      localStorage.setItem("darkMode", JSON.stringify(true));
      changeToDarkMode();
    }
  }
});

checkIfDarkModeWasEnabledPreviously();

function checkIfDarkModeWasEnabledPreviously() {
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode) {
    const isDarkMode = JSON.parse(storedDarkMode);
    console.log(`isDarkMode: ${isDarkMode}`);
    if (!isDarkMode) {
      checkbox.checked = false;
      changeToLightMode();
    } else {
      checkbox.checked = true;
      changeToDarkMode();
    }
  } else {
    localStorage.setItem("darkMode", JSON.stringify(false));
  }
}

function changeToLightMode() {
  // Change logo image.
  logoImg.src = "/images/CN_New_Black.svg";
  logoImg.alt = "CN_New_Black.svg";

  // Change root colors.
  document.documentElement.style.setProperty("--color-primary-100", "#00bfa5");
  document.documentElement.style.setProperty(
    "--color-primary-100-rgb",
    "0, 191, 165"
  );
  document.documentElement.style.setProperty("--color-primary-200", "#5ac3b0");
  document.documentElement.style.setProperty("--color-primary-300", "#64ceb8");
  document.documentElement.style.setProperty("--color-primary-400", "#7ed5c2");
  document.documentElement.style.setProperty("--color-primary-500", "#95ddcc");
  document.documentElement.style.setProperty("--color-primary-600", "#ace4d6");

  document.documentElement.style.setProperty("--color-surface-100", "#fefefe");
  document.documentElement.style.setProperty("--color-surface-200", "#ededed");
  document.documentElement.style.setProperty("--color-surface-300", "#dcdcdc");
  document.documentElement.style.setProperty("--color-surface-400", "#d3d3d3");
  document.documentElement.style.setProperty("--color-surface-500", "#cbcbcb");
  document.documentElement.style.setProperty("--color-surface-600", "#c2c2c2");

  document.documentElement.style.setProperty("--color-font-primary", "#000000");
  document.documentElement.style.setProperty(
    "--color-font-primary-rgb",
    "000, 000, 000"
  );
  document.documentElement.style.setProperty(
    "--color-font-secondary",
    "#111111"
  );
  document.documentElement.style.setProperty(
    "--color-font-tertiary",
    "#222222"
  );
}

function changeToDarkMode() {
  // Change logo image.
  logoImg.src = "/images/CN_New_White.svg";
  logoImg.alt = "CN_New_White.svg";

  // Change root colors.
  document.documentElement.style.setProperty("--color-primary-100", "#5ac3b0");
  document.documentElement.style.setProperty(
    "--color-primary-100-rgb",
    "90, 195, 176"
  );
  document.documentElement.style.setProperty("--color-primary-200", "#70cab8");
  document.documentElement.style.setProperty("--color-primary-300", "#84d1c1");
  document.documentElement.style.setProperty("--color-primary-400", "#97d7ca");
  document.documentElement.style.setProperty("--color-primary-500", "#a9ded2");
  document.documentElement.style.setProperty("--color-primary-600", "#bae5db");

  document.documentElement.style.setProperty("--color-surface-100", "#121212");
  document.documentElement.style.setProperty("--color-surface-200", "#282828");
  document.documentElement.style.setProperty("--color-surface-300", "#3f3f3f");
  document.documentElement.style.setProperty("--color-surface-400", "#575757");
  document.documentElement.style.setProperty("--color-surface-500", "#717171");
  document.documentElement.style.setProperty("--color-surface-600", "#8b8b8b");

  document.documentElement.style.setProperty("--color-font-primary", "#ffffff");
  document.documentElement.style.setProperty(
    "--color-font-primary-rgb",
    "255, 255, 255"
  );
  document.documentElement.style.setProperty(
    "--color-font-secondary",
    "#eeeeee"
  );
  document.documentElement.style.setProperty(
    "--color-font-tertiary",
    "#dddddd"
  );
}
