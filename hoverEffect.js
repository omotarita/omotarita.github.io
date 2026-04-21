// Click handler — runs on all screen sizes
document.querySelectorAll(".hover-text").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.dataset.href) {
      window.open(this.dataset.href, "_blank");
    }
  });
});

// Hover effect — desktop only
if (window.matchMedia("(min-width: 961px)").matches) {
  document.querySelectorAll(".hover-text").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      document.querySelector(".about-section").classList.add("faded");
      this.classList.add("hovered");

      const imageId = this.dataset.image;
      if (imageId) {
        document.getElementById(imageId).style.display = "block";
      }
    });

    btn.addEventListener("mouseleave", function () {
      document.querySelector(".about-section").classList.remove("faded");
      this.classList.remove("hovered");

      const imageId = this.dataset.image;
      if (imageId) {
        document.getElementById(imageId).style.display = "none";
      }
    });
  });
}

// Click elsewhere to reset — desktop only
document.addEventListener("click", function (e) {
  if (!e.target.closest(".hover-text")) {
    document.querySelector(".about-section").classList.remove("faded");
    document.querySelectorAll(".hover-text.hovered").forEach((btn) => {
      btn.classList.remove("hovered");
    });
    document.querySelectorAll(".secret-image").forEach((img) => {
      img.style.display = "none";
    });
  }
});
