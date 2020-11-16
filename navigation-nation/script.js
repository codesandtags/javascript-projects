const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navList = [
  document.getElementById("nav-1"),
  document.getElementById("nav-2"),
  document.getElementById("nav-3"),
  document.getElementById("nav-4"),
  document.getElementById("nav-5"),
];

function toggleNavItems(addClass, removeClass) {
  navList.forEach((nav, index) => {
    index++;
    nav.classList.replace(`${removeClass}-${index}`, `${addClass}-${index}`);
  });
}

function toggleNav() {
  menuBars.classList.toggle("change");

  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    toggleNavItems("slide-in", "slide-out");
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    toggleNavItems("slide-out", "slide-in");
  }
}

// Event Listeners
menuBars.addEventListener("click", toggleNav);

navList.forEach((nav) => {
  nav.addEventListener("click", toggleNav);
});
