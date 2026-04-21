if (window.matchMedia("(min-width: 841px)").matches) {
  console.log("media is not mobile");
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

    btn.addEventListener("click", function () {
      if (this.dataset.href) {
        window.open(this.dataset.href, "_blank");
      }
    });
  });
}
