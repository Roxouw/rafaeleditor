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
  });
}

navOverlay?.addEventListener("click", closeMenu);

whatsappLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "click_whatsapp", {
      event_category: "engagement",
      event_label: link.dataset.whatsappLink || "unknown",
      destination: "whatsapp",
    });
  });
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

  videoModalTitle.textContent = title || "Preview do video";
  videoModalFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="${title || "Video"}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openImageModal(imageSrc, title) {
  if (!videoModal || !videoModalFrame || !videoModalTitle || !imageSrc) return;

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

videoModal?.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-modal")) {
    closeVideoModal();
  }
});

videoModalClose?.addEventListener("click", closeVideoModal);

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
