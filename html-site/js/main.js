/**
 * HUMANITY HORIZON FOUNDATION — PREMIUM VANILLA JS MECHANICS
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initHeaderScroll();
  initMobileDrawer();
  initThemeToggle();
  initTabControllers();
  initLightbox();
  initAIChatbot();
});

/**
 * 1. Scroll Progress Indicator
 */
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + "%";
  }, { passive: true });
}

/**
 * 2. Header scrolled state
 */
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      `;
    } else {
      drawer.classList.add("open");
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" x2="6" y1="6" y2="18"></line>
          <line x1="6" x2="18" y1="6" y2="18"></line>
        </svg>
      `;
    }
  });

  // Close drawer on link clicks
  const drawerLinks = drawer.querySelectorAll("a");
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      `;
    });
  });
}

/**
 * 4. Class-Based Dark Theme Sync
 */
function initThemeToggle() {
  const toggleBtn = document.querySelector(".theme-toggle");
  if (!toggleBtn) return;

  // Initial check
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

/**
 * 5. General Tab Controller Switches
 */
function initTabControllers() {
  const controllers = document.querySelectorAll(".tab-controllers");
  controllers.forEach(controller => {
    const btns = controller.querySelectorAll(".tab-btn");
    const container = controller.closest("[data-tabs-container]") || document;
    
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-tab-target");
        if (!targetId) return;

        // Deactivate old buttons & panels
        btns.forEach(b => b.classList.remove("active"));
        const panels = container.querySelectorAll(".tab-panel");
        panels.forEach(p => p.classList.remove("active"));

        // Activate selected
        btn.classList.add("active");
        const activePanel = container.querySelector(targetId);
        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  });
}

/**
 * 6. Fullscreen Masonry Lightbox
 */
function initLightbox() {
  const items = document.querySelectorAll(".masonry-item");
  if (items.length === 0) return;

  // Create Lightbox DOM structure on demand
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-nav lightbox-prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="lightbox-img-wrapper">
        <img src="" alt="Lightbox image">
      </div>
      <div class="lightbox-caption">
        <h3 class="lightbox-title"></h3>
        <p class="lightbox-desc"></p>
      </div>
      <button class="lightbox-nav lightbox-next">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector("img");
  const title = lightbox.querySelector(".lightbox-title");
  const desc = lightbox.querySelector(".lightbox-desc");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  const showImage = (index) => {
    if (index < 0 || index >= items.length) return;
    currentIndex = index;

    const currentItem = items[currentIndex];
    const sourceImg = currentItem.querySelector("img");
    const sourceTitle = currentItem.getAttribute("data-title") || "";
    const sourceDesc = currentItem.getAttribute("data-desc") || "";

    if (sourceImg && img) {
      img.src = sourceImg.src;
      img.alt = sourceImg.alt;
    }
    if (title) title.textContent = sourceTitle;
    if (desc) desc.textContent = sourceDesc;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  items.forEach((item, idx) => {
    item.addEventListener("click", () => showImage(idx));
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = items.length - 1;
    showImage(prevIndex);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let nextIndex = currentIndex + 1;
    if (nextIndex >= items.length) nextIndex = 0;
    showImage(nextIndex);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
}

/**
 * 7. Mock AI FAQ Chatbot Panel
 */
function initAIChatbot() {
  const trigger = document.querySelector(".chat-trigger");
  const panel = document.querySelector(".chat-panel");
  const closeBtn = document.querySelector(".chat-close");
  const sendBtn = document.querySelector(".chat-send");
  const input = document.querySelector(".chat-input");
  const messagesContainer = document.querySelector(".chat-messages");

  if (!trigger || !panel) return;

  trigger.addEventListener("click", () => {
    panel.classList.toggle("active");
    if (panel.classList.contains("active") && messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      input.focus();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("active");
    });
  }

  const responses = {
    hello: "Hello! I am HorizonBot, your Humanity Horizon guide. How can I help you support communities today? (Type 'donate', 'volunteer', or 'tax')",
    hi: "Hello! I am HorizonBot, your Humanity Horizon guide. How can I help you support communities today? (Type 'donate', 'volunteer', or 'tax')",
    donate: "Thank you for your generous heart! You can donate easily on our /donate.html page. We accept card, net banking, UPI, and bank transfers.",
    donation: "Thank you for your generous heart! You can donate easily on our /donate.html page. We accept card, net banking, UPI, and bank transfers.",
    volunteer: "We are thrilled to welcome new changemakers! Head over to our /volunteer.html page to fill out our quick application and select an open spot.",
    tax: "Yes! All donations to Humanity Horizon Foundation are 50% tax-exempt under Section 80G of the Income Tax Act. We also have FCRA clearances for international support.",
    "80g": "Yes! All donations to Humanity Horizon Foundation are 50% tax-exempt under Section 80G of the Income Tax Act. We also have FCRA clearances for international support.",
    fcra: "Humanity Horizon is officially registered under the Foreign Contribution Regulation Act (FCRA), permitting us to receive tax-exempt foreign contributions securely.",
    contact: "You can reach our team via /contact.html or email us at support@humanityhorizon.org. Our Bandra West, Mumbai office phone is +91 98765 43210.",
    programs: "Our core programs include Universal Education, Primary Healthcare Access, Environment Sustainability, and Women Empowerment. Read more on /programs.html."
  };

  const getResponse = (text) => {
    const cleanText = text.toLowerCase().trim();
    for (const key in responses) {
      if (cleanText.includes(key)) {
        return responses[key];
      }
    }
    return "I appreciate your message! I'm a specialized FAQ helper. Please type 'donate', 'volunteer', 'programs', 'tax', or 'contact' for instant guides, or head over to our contact page!";
  };

  const addMessage = (text, isBot = false) => {
    if (!messagesContainer) return;
    const msg = document.createElement("div");
    msg.className = `chat-message ${isBot ? "chat-message-bot" : "chat-message-user"}`;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, false);
    input.value = "";

    // Show bot typing indicator delay
    setTimeout(() => {
      const response = getResponse(text);
      addMessage(response, true);
    }, 600);
  };

  if (sendBtn && input) {
    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }
}
