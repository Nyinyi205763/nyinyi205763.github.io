document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80
    });
  }

  /* Typewriter */
  const textElement = document.getElementById("typewriter");
  const phrases = [
    "Marketing Specialist",
    "Visual Strategist",
    "AI-Powered Web Designer"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!textElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      textElement.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      textElement.textContent = currentPhrase.substring(0, charIndex);
    }

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 450;
    }

    setTimeout(typeWriter, speed);
  }

  typeWriter();

  /* Mobile Menu */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  /* Lightbox */
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.getElementById("closeLightbox");

  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Preview";
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox?.classList.contains("active")) {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  /* Social stagger reveal */
  const staggerIcons = document.querySelector(".stagger-icons");

  if (staggerIcons) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          staggerIcons.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    observer.observe(staggerIcons);
  }

  /* Ripple effect */
  document.querySelectorAll(".ripple-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });
});
