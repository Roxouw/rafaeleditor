const siteNav = document.getElementById("site-nav");
const menuToggle = document.getElementById("menu-toggle");
const navOverlay = document.getElementById("nav-overlay");
const navLinks = document.querySelectorAll(".nav-links a, .nav-actions a");
const revealEls = document.querySelectorAll(".reveal");
const videoModal = document.getElementById("video-modal");
const videoModalClose = document.getElementById("video-modal-close");
const videoModalFrame = document.getElementById("video-modal-frame");
const videoModalTitle = document.getElementById("video-modal-title");
const reelsCarousel = document.querySelector(".reels-carousel");
const reelsTrack = document.querySelector(".reels-track");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const heroStage = document.querySelector(".hero-stage");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const faqItems = document.querySelectorAll(".faq-item");
const clientLinks = document.querySelectorAll(".client-link");
const trackedSections = document.querySelectorAll(
  "#transformacao, #modulos, #provas, #processo, #faq, #oferta",
);

function getCampaignParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || "(direct)",
    utm_medium: params.get("utm_medium") || "(none)",
    utm_campaign: params.get("utm_campaign") || "(not_set)",
    utm_content: params.get("utm_content") || "(not_set)",
    utm_term: params.get("utm_term") || "(not_set)",
  };
}

function isDebugModeEnabled() {
  const params = new URLSearchParams(window.location.search);

  return (
    params.get("debug_analytics") === "1" ||
    params.get("gtm_debug") === "x" ||
    window.location.hostname === "localhost" ||
    window.location.protocol === "file:"
  );
}

function trackEvent(eventName, properties = {}) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    page_title: document.title,
    page_location: window.location.href,
    debug_mode: isDebugModeEnabled(),
    ...getCampaignParams(),
    ...properties,
  });
}

function getElementLocation(element) {
  if (!element) return "unknown";

  const identifiedContainer = element.closest("section[id], div[id]");
  if (identifiedContainer?.id) return identifiedContainer.id;

  const section = element.closest("section");
  if (section?.id) return section.id;
  if (section?.classList.length) return section.classList[0];

  const main = element.closest("main");
  if (!main) return "unknown";

  const sectionLike = element.closest("div[class]");
  if (!sectionLike) return "unknown";

  return sectionLike.classList[0] || sectionLike.tagName.toLowerCase();
}

function getButtonText(element) {
  if (!element) return "unknown";

  return (
    element.dataset.analyticsLabel ||
    element.getAttribute("aria-label") ||
    element.textContent?.trim() ||
    "unknown"
  );
}

function trackCtaClick(element, extra = {}) {
  const buttonText = getButtonText(element);
  const location = getElementLocation(element);

  trackEvent("cta_clicked", {
    button_text: buttonText,
    location,
    cta_type: element.classList.contains("pill-btn") ? "primary" : "secondary",
    destination: element.getAttribute("href") || "modal",
    ...extra,
  });
}

function syncNavState() {
  if (!siteNav) return;
  siteNav.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  if (!siteNav) return;
  siteNav.classList.remove("open");
  document.body.style.overflow = "";
  if (menuToggle) {
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    document.body.style.overflow = isOpen ? "hidden" : "";
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

    trackEvent("nav_menu_toggled", {
      state: isOpen ? "open" : "close",
      location: "site_nav",
    });
  });
}

navOverlay?.addEventListener("click", closeMenu);
syncNavState();
window.addEventListener("scroll", syncNavState, { passive: true });

whatsappLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const location = link.dataset.whatsappLink || getElementLocation(link);

    trackCtaClick(link, {
      destination_type: "whatsapp",
    });

    trackEvent("signup_intent", {
      method: "whatsapp",
      location,
      button_text: getButtonText(link),
    });

    trackEvent("click_whatsapp", {
      event_category: "engagement",
      event_label: location,
      destination: "whatsapp",
    });
  });
});

document.addEventListener("click", (event) => {
  const cta = event.target.closest(
    'a[href^="#"], .text-btn, .ghost-btn, .pill-btn',
  );

  if (!cta || cta.hasAttribute("data-whatsapp-link")) return;

  if (
    cta.classList.contains("pill-btn") ||
    cta.classList.contains("ghost-btn") ||
    cta.classList.contains("text-btn")
  ) {
    trackCtaClick(cta, {
      destination_type: cta.getAttribute("href")?.startsWith("#")
        ? "internal_anchor"
        : "link",
    });
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Fecha menu ao tocar fora (mobile)
document.addEventListener(
  "click",
  (e) => {
    if (
      siteNav &&
      siteNav.classList.contains("open") &&
      !siteNav.contains(e.target)
    ) {
      closeMenu();
    }
  },
  { passive: true },
);

// Fecha menu com Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

function closeVideoModal() {
  if (!videoModal || !videoModalFrame) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  videoModalFrame.innerHTML = "";
  document.body.style.overflow = "";
}

function openYoutubeModal(videoId, title) {
  if (!videoModal || !videoModalFrame || !videoModalTitle) return;

  trackEvent("module_preview_opened", {
    video_id: videoId || "unknown",
    video_title: title || "Preview do video",
    location: "modulos",
  });

  videoModalTitle.textContent = title || "Preview do video";
  videoModalFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title || "Video"}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openImageModal(imageSrc, title) {
  if (!videoModal || !videoModalFrame || !videoModalTitle || !imageSrc) return;

  trackEvent("image_preview_opened", {
    image_title: title || "Preview da imagem",
    location: getElementLocation(videoModal),
  });

  videoModalTitle.textContent = title || "Preview da imagem";
  videoModalFrame.innerHTML = `<img src="${imageSrc}" alt="${title || "Imagem ampliada"}" />`;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

document.addEventListener("click", (event) => {
  const imageTrigger = event.target.closest(".image-modal-trigger");
  if (imageTrigger) {
    openImageModal(imageTrigger.dataset.imageSrc, imageTrigger.dataset.imageTitle);
    return;
  }

  const trigger = event.target.closest(".reel-modal-trigger");
  if (!trigger) return;

  const videoType = trigger.dataset.videoType;
  const videoId = trigger.dataset.videoId;
  const videoTitle = trigger.dataset.videoTitle;

  if (videoType === "youtube" && videoId) {
    openYoutubeModal(videoId, videoTitle);
  }
});

function setupReelsAutoplay() {
  if (!reelsCarousel || !reelsTrack) return;

  const originalCards = Array.from(reelsTrack.children);
  if (!originalCards.length) return;

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    reelsTrack.appendChild(clone);
  });

  let paused = false;
  let rafId = 0;
  let lastFrame = 0;
  let resumeAt = 0;
  const speed = 0.045;

  const pauseTemporarily = (delay = 2400) => {
    resumeAt = window.performance.now() + delay;
  };

  const step = (timestamp) => {
    if (!lastFrame) lastFrame = timestamp;

    const delta = timestamp - lastFrame;
    lastFrame = timestamp;

    if (!paused && timestamp >= resumeAt) {
      reelsCarousel.scrollLeft += delta * speed;
      const loopPoint = reelsTrack.scrollWidth / 2;

      if (reelsCarousel.scrollLeft >= loopPoint) {
        reelsCarousel.scrollLeft -= loopPoint;
      }
    }

    rafId = window.requestAnimationFrame(step);
  };

  reelsCarousel.addEventListener("mouseenter", () => {
    paused = true;
  });

  reelsCarousel.addEventListener("mouseleave", () => {
    paused = false;
    resumeAt = window.performance.now() + 800;
  });

  reelsCarousel.addEventListener("focusin", () => {
    paused = true;
  });

  reelsCarousel.addEventListener("focusout", () => {
    paused = false;
    resumeAt = window.performance.now() + 800;
  });

  reelsCarousel.addEventListener("touchstart", () => {
    pauseTemporarily(3200);
  }, { passive: true });

  reelsCarousel.addEventListener("wheel", () => {
    pauseTemporarily();
  }, { passive: true });

  reelsCarousel.addEventListener("pointerdown", () => {
    pauseTemporarily(3200);
  });

  rafId = window.requestAnimationFrame(step);

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(rafId);
  });
}

setupReelsAutoplay();

if (heroStage && !prefersReducedMotion.matches) {
  const resetHeroStage = () => {
    heroStage.style.setProperty("--spot-x", "50%");
    heroStage.style.setProperty("--spot-y", "50%");
  };

  heroStage.addEventListener("pointermove", (event) => {
    const rect = heroStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    heroStage.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
    heroStage.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
  });

  heroStage.addEventListener("pointerleave", resetHeroStage);
  resetHeroStage();
}

videoModal?.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeVideoModal();
  }
});

videoModalClose?.addEventListener("click", closeVideoModal);

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    const summary = item.querySelector("summary");
    trackEvent("faq_opened", {
      question: summary?.textContent?.trim() || "unknown",
      location: "faq",
    });
  });
});

clientLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const card = link.closest(".client-card");
    const name = card?.querySelector("h3")?.textContent?.trim() || "unknown";

    trackEvent("proof_link_clicked", {
      profile_name: name,
      location: "provas",
      destination_type: "external_proof",
    });
  });
});

if (trackedSections.length) {
  const seenSections = new Set();
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id || "unknown";
        if (seenSections.has(sectionId)) return;

        seenSections.add(sectionId);
        trackEvent("section_viewed", {
          section_name: sectionId,
        });
      });
    },
    { threshold: 0.35 },
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
}

// Threshold reduzido para revelar elementos antes no mobile
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
);

revealEls.forEach((el) => revealObserver.observe(el));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
  }
});
