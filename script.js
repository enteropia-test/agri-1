const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const dealerIntent = document.querySelector("[data-dealer-intent]");
const messageField = document.querySelector("#message");
const counters = document.querySelectorAll(".counter-value");
const faqItems = document.querySelectorAll(".faq-item");

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

if (dealerIntent) {
  dealerIntent.addEventListener("click", () => {
    if (!messageField.value.trim()) {
      messageField.value = "I am interested in dealership opportunities. Please share distributor requirements, product range, and commercial details.";
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name");

    formStatus.textContent = `Thank you, ${name}. Your enquiry has been prepared for the sales team.`;
    contactForm.reset();
  });
}

const animateCounters = () => {
  counters.forEach((counter) => {
    if (counter.dataset.animated === "true") return;

    const rect = counter.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.8) return;

    const target = Number(counter.dataset.target || 0);
    const duration = 1200;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = target >= 1000 ? value.toLocaleString() : value.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target >= 1000 ? target.toLocaleString() : target.toString();
        counter.dataset.animated = "true";
      }
    };

    requestAnimationFrame(step);
  });
};

window.addEventListener("scroll", animateCounters, { passive: true });
window.addEventListener("load", animateCounters);

faqItems.forEach((item, index) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  if (!button || !answer) return;

  const answerId = answer.id || `faq-answer-${index}`;
  answer.id = answerId;
  button.setAttribute("aria-expanded", String(item.classList.contains("active")));
  button.setAttribute("aria-controls", answerId);

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((entry) => {
      entry.classList.remove("active");
      const entryButton = entry.querySelector(".faq-question");
      if (entryButton) {
        entryButton.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const revealElements = document.querySelectorAll([
  ".hero-content",
  ".hero-panel",
  ".section-copy",
  ".section-heading",
  ".stat-card",
  ".chairman-card",
  ".chairman-quote",
  ".timeline-card",
  ".quality-highlight",
  ".quality-card",
  ".product-card",
  ".facility-slider",
  ".facility-points article",
  ".why-item",
  ".cert-card",
  ".crop-card",
  ".market-card",
  ".testimonial-card",
  ".faq-item",
  ".map-card",
  ".contact-info",
  ".contact-form",
  ".contact-list article",
  ".contact-link",
  ".dealer-layout"
].join(", "));

const getRevealDirection = (element, index) => {
  if (element.classList.contains("hero-content") || element.classList.contains("section-heading")) return "fade-up";
  if (element.classList.contains("hero-panel") || element.classList.contains("chairman-quote") || element.classList.contains("contact-form")) return "fade-left";
  if (element.classList.contains("section-copy") || element.classList.contains("chairman-card") || element.classList.contains("contact-info") || element.classList.contains("dealer-layout")) return "fade-right";

  const parent = element.parentElement;
  if (!parent) return "fade-up";

  const siblings = Array.from(parent.children).filter((child) => child.matches(".stat-card, .timeline-card, .quality-card, .product-card, .why-item, .cert-card, .crop-card, .market-card, .testimonial-card, .faq-item"));
  const position = siblings.indexOf(element);

  if (position % 3 === 0) return "fade-right";
  if (position % 3 === 1) return "fade-up";
  return "fade-left";
};

revealElements.forEach((element, index) => {
  if (element.getAttribute("data-aos")) return;

  const direction = getRevealDirection(element, index);
  element.setAttribute("data-aos", direction);

  const baseDelay = Math.min(index * 70, 320);
  if (!element.getAttribute("data-aos-delay")) {
    element.setAttribute("data-aos-delay", String(baseDelay));
  }
});

if (window.AOS) {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: false,
    mirror: true,
    offset: 80
  });
}

if (window.Swiper) {
  new Swiper(".facility-slider", {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 4200,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".slider-next",
      prevEl: ".slider-prev"
    }
  });
}
