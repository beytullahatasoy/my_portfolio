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
    "Mobile Application Development",
    "Machine Learning & AI Solutions",
    "Huawei Cloud Architectures"
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

  /* --- CONTACT FORM HANDLER & PREMIUM EMAIL MODAL --- */
  const contactForm = document.getElementById("portfolio-contact-form");
  const emailModal = document.getElementById("email-modal");
  const emailModalClose = document.getElementById("email-modal-close");

  if (contactForm && emailModal && emailModalClose) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = document.getElementById("form-name").value;
      const emailVal = document.getElementById("form-email").value;
      const subjectVal = document.getElementById("form-subject").value;
      const messageVal = document.getElementById("form-message").value;

      const emailTo = "beytullahatasoy55@gmail.com";
      const subjectText = subjectVal || "Portfolio Contact";
      const bodyText = `Hi Beytullah,\n\n${messageVal}\n\nBest regards,\n${nameVal}\nEmail: ${emailVal}`;

      // Populate modal fields
      document.getElementById("modal-subject").value = subjectText;
      document.getElementById("modal-body").value = bodyText;

      // Encode parameters for URLs
      const encodedSubject = encodeURIComponent(subjectText);
      const encodedBody = encodeURIComponent(bodyText);

      // Generate action URLs
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${encodedSubject}&body=${encodedBody}`;
      const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailTo}&subject=${encodedSubject}&body=${encodedBody}`;

      // Update modal anchor hrefs
      document.getElementById("modal-btn-gmail").href = gmailUrl;
      document.getElementById("modal-btn-outlook").href = outlookUrl;

      // Display the helper/fallback modal
      emailModal.style.display = "flex";
      setTimeout(() => {
        emailModal.classList.add("active");
      }, 10);

      // Reset the form inputs
      contactForm.reset();
    });

    // Close Modal trigger
    const closeModal = () => {
      emailModal.classList.remove("active");
      setTimeout(() => {
        emailModal.style.display = "none";
      }, 300);
    };

    emailModalClose.addEventListener("click", closeModal);

    // Close on click outside
    emailModal.addEventListener("click", (e) => {
      if (e.target === emailModal) {
        closeModal();
      }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && emailModal.classList.contains("active")) {
        closeModal();
      }
    });

    // Clipboard Copy Buttons Handler
    const copyBtns = document.querySelectorAll(".modal-copy-btn");
    copyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-copy");
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Copy text to clipboard
          targetElement.select();
          targetElement.setSelectionRange(0, 99999); // For mobile devices
          navigator.clipboard.writeText(targetElement.value)
            .then(() => {
              // Show copy success animation
              const icon = btn.querySelector("i");
              icon.className = "bi bi-check2-all";
              btn.style.backgroundColor = "var(--main-color)";
              btn.style.color = "#000";
              
              setTimeout(() => {
                icon.className = "bi bi-clipboard";
                btn.style.backgroundColor = "";
                btn.style.color = "";
              }, 1500);
            })
            .catch(err => {
              console.error("Could not copy text: ", err);
            });
        }
      });
    });
  }
});
