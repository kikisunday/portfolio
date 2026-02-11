// ================================================
// Utility Functions
// ================================================

// Throttle function for performance optimization
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    clearTimeout(timeoutId);

    if (timeSinceLastExec >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - timeSinceLastExec);
    }
  };
}

// ================================================
// Navigation
// ================================================

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = window.scrollY;
  }, 100),
);

// Active navigation link based on scroll position
const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", throttle(updateActiveNavLink, 100));

// ================================================
// Scroll Animations
// ================================================

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".scroll-animate");
  animateElements.forEach((el) => observer.observe(el));

  // Add scroll-animate class to relevant elements
  const elementsToAnimate = [
    ...document.querySelectorAll(".highlight-item"),
    ...document.querySelectorAll(".skill-category"),
    ...document.querySelectorAll(".project-card"),
    ...document.querySelectorAll(".info-card"),
  ];

  elementsToAnimate.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });
});

// ================================================
// Skill Bars Animation
// ================================================

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const progress = progressBar.getAttribute("data-progress");

          setTimeout(() => {
            progressBar.style.width = progress + "%";
          }, 200);

          skillObserver.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 },
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

document.addEventListener("DOMContentLoaded", animateSkillBars);

// ================================================
// Smooth Scrolling
// ================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip empty anchors
    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 70;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ================================================
// Contact Form
// ================================================

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Log form data (in production, this would be sent to a server)
  console.log("Form submitted:", formData);

  // Show success message
  contactForm.style.display = "none";
  formSuccess.classList.add("show");

  // Reset form after 5 seconds
  setTimeout(() => {
    contactForm.reset();
    contactForm.style.display = "block";
    formSuccess.classList.remove("show");
  }, 5000);
});

// ================================================
// Typing Effect for Hero Section
// ================================================

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    const text = "Fullstack Engineer";
    setTimeout(() => {
      typeWriter(typingElement, text, 100);
    }, 1500);
  }
});

// ================================================
// Parallax Effect for Hero Background
// ================================================

window.addEventListener(
  "scroll",
  throttle(() => {
    const heroGrid = document.querySelector(".hero-grid");
    if (heroGrid) {
      const scrolled = window.scrollY;
      const parallaxSpeed = 0.5;
      heroGrid.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  }, 16),
); // ~60fps

// ================================================
// Dynamic Stats Counter Animation
// ================================================

function animateCounter(element, start, end, duration) {
  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = (currentTime - startTime) / duration;

    if (progress < 1) {
      const value = Math.floor(start + (end - start) * easeOutQuad(progress));
      element.textContent = value + "+";
      requestAnimationFrame(animate);
    } else {
      element.textContent = end + "+";
    }
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  requestAnimationFrame(animate);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");

        statNumbers.forEach((stat, index) => {
          const endValues = [5, 10, 100]; // Years, Projects, Team members
          const text = stat.textContent;
          const endValue = parseInt(text);

          setTimeout(() => {
            animateCounter(stat, 0, endValue, 1500);
          }, index * 200);
        });

        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
});

// ================================================
// Project Card Tilt Effect
// ================================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", handleTilt);
  card.addEventListener("mouseleave", resetTilt);
});

function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 30;
  const rotateY = (centerX - x) / 30;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
}

function resetTilt(e) {
  const card = e.currentTarget;
  card.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
}

// ================================================
// Cursor Effect (Optional - subtle glow)
// ================================================

const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

// Add cursor glow style dynamically
const style = document.createElement("style");
style.textContent = `
    .cursor-glow {
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.03) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    }
    
    @media (max-width: 768px) {
        .cursor-glow {
            display: none;
        }
    }
`;
document.head.appendChild(style);

let cursorX = 0;
let cursorY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

document.addEventListener("mouseenter", () => {
  cursorGlow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});

function animateCursorGlow() {
  // Smooth follow effect
  glowX += (cursorX - glowX) * 0.15;
  glowY += (cursorY - glowY) * 0.15;

  cursorGlow.style.left = glowX + "px";
  cursorGlow.style.top = glowY + "px";

  requestAnimationFrame(animateCursorGlow);
}

animateCursorGlow();

// ================================================
// Loading Animation
// ================================================

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  setTimeout(() => {
    updateActiveNavLink();
  }, 100);
});

// ================================================
// Performance Optimization
// ================================================

// Lazy load images if any are added later
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ================================================
// Easter Egg - Console Message
// ================================================

console.log(
  "%c👨‍💻 椎久智也のポートフォリオへようこそ！",
  "color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);",
);
console.log(
  "%cフロントエンド開発に情熱を注いでいます 🚀",
  "color: #00ff88; font-size: 14px;",
);
console.log("%cお仕事のご相談はお気軽に！", "color: #0088ff; font-size: 14px;");

// ================================================
// Keyboard Navigation Enhancement
// ================================================

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Press 'H' to go to home
  if (e.key === "h" || e.key === "H") {
    document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
  }

  // Press 'A' to go to about
  if (e.key === "a" || e.key === "A") {
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
  }

  // Press 'S' to go to skills
  if (e.key === "s" || e.key === "S") {
    document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
  }

  // Press 'P' to go to projects
  if (e.key === "p" || e.key === "P") {
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
  }

  // Press 'C' to go to contact
  if (e.key === "c" || e.key === "C") {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  }
});

// ================================================
// Accessibility Enhancements
// ================================================

// Add focus visible styles for keyboard navigation
const focusableElements = document.querySelectorAll(
  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
);

focusableElements.forEach((element) => {
  element.addEventListener("focus", function () {
    this.style.outline = "2px solid var(--primary-color)";
    this.style.outlineOffset = "2px";
  });

  element.addEventListener("blur", function () {
    this.style.outline = "";
    this.style.outlineOffset = "";
  });
});

// ================================================
// Browser Compatibility Checks
// ================================================

// Check for CSS Grid support
if (!CSS.supports("display", "grid")) {
  console.warn(
    "CSS Grid is not supported in this browser. Layout may not display correctly.",
  );
}

// Check for IntersectionObserver support
if (!("IntersectionObserver" in window)) {
  console.warn(
    "IntersectionObserver is not supported. Some animations may not work.",
  );
  // Fallback: show all elements immediately
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    el.classList.add("active");
  });
}
