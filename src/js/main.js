import "/adaptive-fps.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebGLWorker from "../workers/webgl-worker.js?worker";

gsap.registerPlugin(ScrollTrigger);

function revealBody() {
  requestAnimationFrame(() => {
    document.body.classList.add("fade-in-loaded");
  });
}
if (document.readyState === 'complete') {
  revealBody();
} else {
  window.addEventListener("load", revealBody);
}

document.addEventListener("DOMContentLoaded", () => {
  // Page Transition Logic
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (
      link &&
      link.hostname === window.location.hostname &&
      link.target !== "_blank" &&
      link.href.includes(".html")
    ) {
      if (link.hash && link.pathname === window.location.pathname) return;
      e.preventDefault();
      document.body.classList.remove("fade-in-loaded");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    }
  });

  // Init Terminal Boot Sequence
  initBootSequence();
  initGhostCursor();
  initWebWorker();
  initHTMLGSAP();
});

function initBootSequence() {
  const bootLines = [
    "> INITIATING NEURAL LINK...",
    "> LOADING TENSORFLOW KERNELS...",
    "> ESTABLISHING CONNECTION TO MAINFRAME...",
    "> BYPASSING SECURITY PROTOCOLS...",
    "> SYNCING DATA STREAMS...",
    "> READY.",
  ];
  const terminalBody = document.getElementById("terminal-body");
  if (!terminalBody) return;

  let delay = 0;
  bootLines.forEach((line, index) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.textContent = line;
      terminalBody.appendChild(p);
      if (index === bootLines.length - 1) {
        setTimeout(() => {
          document.getElementById("boot-sequence").style.opacity = "0";
          setTimeout(
            () =>
              (document.getElementById("boot-sequence").style.display = "none"),
            500,
          );
        }, 800);
      }
    }, delay);
    delay += Math.random() * 300 + 200;
  });
}

function initGhostCursor() {
  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  if (isTouchDevice) return;

  const numGhosts = 5;
  const lerpSpeeds = [0.4, 0.3, 0.2, 0.1, 0.05];
  const ghosts = [];
  const coords = [];

  for (let i = 0; i < numGhosts; i++) {
    const ghost = document.createElement("div");
    ghost.className = "cursor-node";
    document.body.appendChild(ghost);
    ghosts.push(ghost);
    coords.push({ x: 0, y: 0 });
  }

  let target = { x: 0, y: 0 };
  document.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    document.body.classList.remove("target-locked");
  });

  // Interactive elements hover state
  document.querySelectorAll(".interactive").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("target-locked");
    });
    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("target-locked");
    });
  });

  function renderAnimation() {
    coords[0].x += (target.x - coords[0].x) * lerpSpeeds[0];
    coords[0].y += (target.y - coords[0].y) * lerpSpeeds[0];
    ghosts[0].style.transform = `translate3d(${coords[0].x}px, ${coords[0].y}px, 0)`;

    for (let i = 1; i < numGhosts; i++) {
      let current = coords[i];
      let prev = coords[i - 1];
      current.x += (prev.x - current.x) * lerpSpeeds[i];
      current.y += (prev.y - current.y) * lerpSpeeds[i];
      ghosts[i].style.transform =
        `translate3d(${current.x}px, ${current.y}px, 0)`;
    }
    requestAnimationFrame(renderAnimation);
  }
  renderAnimation();
}

function initWebWorker() {
  const container3D = document.getElementById("webgl-container");
  if (!container3D) return;

  const canvas = document.createElement("canvas");
  // Fullscreen styling
  Object.assign(canvas.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    outline: "none",
    border: "none",
    zIndex: "-3",
  });
  container3D.appendChild(canvas);

  let worker;
  if ("transferControlToOffscreen" in canvas) {
    const offscreen = canvas.transferControlToOffscreen();
    worker = new WebGLWorker();
    worker.postMessage(
      {
        type: "init",
        canvas: offscreen,
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      },
      [offscreen],
    );
  } else {
    console.warn("OffscreenCanvas not supported! Web Worker disabled.");
    // Fallback: If not supported, we'd theoretically load Three.js here.
    // For this rewrite, we assume modern browser support.
    return;
  }

  // Handle Resize
  window.addEventListener("resize", () => {
    worker.postMessage({
      type: "resize",
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  // Handle Downgrade Event
  window.addEventListener("fpsDowngrade", () => {
    worker.postMessage({ type: "downgrade" });
  });

  // Handle Magnetic Cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 15 degrees max rotation
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty("--glare-x", `${x}px`);
      card.style.setProperty("--glare-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.setProperty("--glare-x", `50%`);
      card.style.setProperty("--glare-y", `50%`);
    });
  });

  // --- GSAP CAMERA PROXY ---
  const proxyCamera = { x: 0, y: 15, z: 60, rx: -0.1, ry: 0, rz: 0 };

  function updateWorkerCamera() {
    worker.postMessage({ type: "camera", data: proxyCamera });
  }

  // 1. Projects Section (The Dive & Forward Tunnel)
  gsap.to(proxyCamera, {
    scrollTrigger: {
      trigger: "#projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    z: -50,
    y: 2,
    ease: "none",
    onUpdate: updateWorkerCamera,
  });

  gsap.to(proxyCamera, {
    scrollTrigger: {
      trigger: "#projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    rx: 0,
    ease: "none",
    onUpdate: updateWorkerCamera,
  });

  // 2. Explore Section (The Aggressive Right Bank & Dive)
  gsap.to(proxyCamera, {
    scrollTrigger: {
      trigger: "#explore",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    x: 10,
    z: -30,
    ease: "power2.inOut",
    onUpdate: updateWorkerCamera,
  });

  gsap.to(proxyCamera, {
    scrollTrigger: {
      trigger: "#explore",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    rx: -0.05,
    onUpdate: updateWorkerCamera,
  });
}

function initHTMLGSAP() {
  // Make the UI cards fly in dynamically as you scroll
  gsap.utils.toArray(".card, .mb-16").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%", // Trigger when top of element hits 90% of viewport
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)",
    });
  });

  // Interactive parallax text
  gsap.to(".hud-overlay", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    y: 50,
    ease: "none",
  });
}

// Global functions for inline HTML event handlers
window.toggleMenu = function () {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
};
window.openGame = function (url) {
  document.getElementById("game-frame").src = url;
  document.getElementById("game-modal").style.display = "block";
  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-active");
  document
    .querySelectorAll(".cursor-node")
    .forEach((node) => (node.style.opacity = "0"));
};
window.closeGame = function () {
  document.getElementById("game-modal").style.display = "none";
  document.getElementById("game-frame").src = "";
  document.body.style.overflow = "auto";
  document.body.classList.remove("modal-active");
  document
    .querySelectorAll(".cursor-node")
    .forEach((node) => (node.style.opacity = "1"));
};
