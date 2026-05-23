document.addEventListener("DOMContentLoaded", () => {
  /* --- MOBILE NAVBAR INTERACTION --- */
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
    });
  });

  /* --- SCROLL SPY & HEADER GLASS EFFECTS --- */
  const sections = document.querySelectorAll("section");
  const header = document.querySelector(".header");

  window.onscroll = () => {
    // Header background glass effect on scroll
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Active link highlighting on scroll
    let top = window.scrollY;
    sections.forEach(sec => {
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          document.querySelector(".navbar a[href*=" + id + "]").classList.add("active");
        });
      }
    });
  };

  /* --- TYPING SUBHEADINGS ANIMATION --- */
  const words = [
    "Computer Engineering Student",
    "Mobile & AI Developer",
    "Huawei Volunteer Cloud Trainer",
    "Artun UAV Software Team Leader"
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedTextSpan = document.querySelector(".typed-text");

  function typeEffect() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = 80;
    if (isDeleting) {
      typeSpeed /= 2; // Delete twice as fast
    }

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 1800; // Pause at the end of the word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typedTextSpan) {
    typeEffect();
  }

  /* --- PORTFOLIO DYNAMIC FILTERING --- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioBoxes = document.querySelectorAll(".portfolio-box");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active filter tab styling
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioBoxes.forEach(box => {
        const categories = box.getAttribute("data-category").split(" ");

        if (filterValue === "all" || categories.includes(filterValue)) {
          // Reset styles and transition in
          box.style.display = "block";
          setTimeout(() => {
            box.style.opacity = "1";
            box.style.transform = "scale(1)";
          }, 30);
        } else {
          // Transition out and hide
          box.style.opacity = "0";
          box.style.transform = "scale(0.85)";
          setTimeout(() => {
            box.style.display = "none";
          }, 350); // Match style.css transitions
        }
      });
    });
  });

  /* --- CONTACT FORM HANDLER --- */
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById("form-name").value;
      const emailVal = document.getElementById("form-email").value;
      
      alert(`Teşekkürler ${nameVal}! Mesajınız başarıyla gönderildi. beytullahatasoy55@gmail.com adresinden veya telefonunuzdan sizinle en kısa sürede iletişime geçeceğim.`);
      contactForm.reset();
    });
  }
});
