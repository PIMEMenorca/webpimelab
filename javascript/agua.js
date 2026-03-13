document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".agua-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      tabs.forEach((item) => {
        item.classList.remove("active", "border-blanco", "text-blanco/90");
        item.classList.add("border-transparent", "text-blanco/70");
      });

      tab.classList.add("active", "border-blanco", "text-blanco/90");
      tab.classList.remove("border-transparent", "text-blanco/70");

      const target = document.querySelector(tab.getAttribute("href"));
      if (target) {
        const offset =
          target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });
});
