document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("#menu-button");
  const closeButton = document.getElementById("close-menu");
  const menuLinks = document.querySelector(".menu-links");
  const logo = document.querySelector(".logo");
  const slotCenter = document.getElementById("slot-center");
  const slotDrawer = document.getElementById("slot-drawer");
  const slotRight = document.getElementById("slot-right");
  const searchControl = document.getElementById("search-control");
  const loginControl = document.getElementById("login-control");
  const loginForm = document.querySelector(".login");
  const header = document.querySelector("header");
  const PIME = document.querySelector("img[alt='Logo de PIME Menorca']");

  if (!menuButton || !closeButton || !menuLinks) {
    return;
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 0);
  });

  const placeHeaderControls = () => {
    if (!slotCenter || !slotDrawer || !slotRight || !searchControl || !loginControl) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const isTablet = window.matchMedia("(min-width: 768px)").matches && !isDesktop;

    if (isDesktop) {
      slotRight.append(searchControl, loginControl);
      return;
    }

    if (isTablet) {
      slotCenter.append(searchControl);
      slotDrawer.append(loginControl);
      return;
    }

    slotDrawer.append(loginControl, searchControl);
  };

  const closeMobileMenu = () => {
    menuLinks.classList.remove("active");
    menuButton.classList.remove("hidden");
    menuButton.setAttribute("aria-expanded", "false");
  };

  // Evento para abrir el menú móvil
  menuButton.addEventListener("click", function () {
    menuLinks.classList.add("active");
    menuButton.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "true");
  });

  // Evento para cerrar el menú móvil
  closeButton.addEventListener("click", function () {
    closeMobileMenu();
  });

  // Cierra el menu al pulsar cualquier enlace en mobile/tablet
  menuLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Si se vuelve a desktop, se limpia el estado mobile.
  window.addEventListener("resize", () => {
    placeHeaderControls();
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  // evento para mostrar el formulario de login
  loginControl.addEventListener("click", () => {
    loginForm.classList.add("active");
  });

  document.addEventListener("click", (event) => {
    if (loginForm.classList.contains("active") && !loginForm.contains(event.target) && event.target !== loginControl) {
      loginForm.classList.remove("active");
    }
  });

  PIME.addEventListener("click", (event) => {
    window.location.href = "https://www.pimemenorca.org/"
  });

  placeHeaderControls();

  // evento para redirigir al home al hacer click en el logo
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "/";
    });
  }
});
