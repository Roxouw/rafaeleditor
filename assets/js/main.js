const siteNav = document.getElementById("site-nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a, .nav-actions a");
const revealEls = document.querySelectorAll(".reveal");
const reelModalTriggers = document.querySelectorAll(".reel-modal-trigger");
const videoModal = document.getElementById("video-modal");
const videoModalClose = document.getElementById("video-modal-close");
const videoModalFrame = document.getElementById("video-modal-frame");
const videoModalTitle = document.getElementById("video-modal-title");

function closeMenu() {
  if (!siteNav) return;
  siteNav.classList.remove("open");
  if (menuToggle) {
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

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

reelModalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const videoType = trigger.dataset.videoType;
    const videoId = trigger.dataset.videoId;
    const videoTitle = trigger.dataset.videoTitle;

    if (videoType === "youtube" && videoId) {
      openYoutubeModal(videoId, videoTitle);
    }
  });
});

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
