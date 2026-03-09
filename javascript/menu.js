document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("#menu-button");
  const closeButton = document.getElementById("close-menu");
  const mobileMenu = document.querySelector(".menu-container");
  const menuLinks = document.querySelector(".menu-links");
  const logo = document.getElementsByClassName("logo");
  const searchbar = document.querySelector(".search-bar");

  // Evento para abrir el menú móvil
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    menuLinks.classList.add("active");
    searchbar.classList.remove("hidden");
    menuButton.style.display = "none";
    console.log("menu");
  });

  // Evento para cerrar el menú móvil
  closeButton.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    menuLinks.classList.remove("active");
    searchbar.classList.add("hidden");
    menuButton.style.display = "block";
  });

  // evento para redirigir al home al hacer click en el logo
  if (logo.length > 0) {
    logo[0].addEventListener("click", () => {
      window.location.href = "/";
    });
  }
});
