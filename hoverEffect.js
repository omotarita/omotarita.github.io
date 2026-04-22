// Desktop hover effect
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

// Click elsewhere to reset — desktop
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

// Click handlers — all screen sizes
document.querySelectorAll(".hover-text").forEach((btn) => {
  // Clicking the button text
  btn.querySelector(".button-copy").addEventListener("click", function (e) {
    const parentBtn = this.closest(".hover-text");
    if (parentBtn.dataset.href) {
      window.open(parentBtn.dataset.href, "_blank");
    } else {
      // No link — expand the image
      expandImage(parentBtn);
    }
  });

  // Clicking the inline icon
  const icon = btn.querySelector(".inline-icon");
  if (icon) {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const parentBtn = this.closest(".hover-text");
      expandImage(parentBtn);
    });
  }
});

// Expand image into overlay
function expandImage(btn) {
  const imageId = btn.dataset.image;
  if (!imageId) return;

  const sourceImg = document.getElementById(imageId);
  if (!sourceImg) return;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("overlay-close");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", function () {
    overlay.remove();
  });

  const img = document.createElement("img");
  img.src = sourceImg.src;

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Close on background click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}
