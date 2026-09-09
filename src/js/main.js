import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import "/adaptive-fps.js";

gsap.registerPlugin(ScrollTrigger);

function revealBody() {
  requestAnimationFrame(() => {
    document.body.classList.add("fade-in-loaded");
  });
}
if (document.readyState === "complete") {
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

  // Init Boot Sequence
  initBootSequence();
  initGhostCursor();
  initWebGL();
  initHTMLGSAP();
  initDepthChamber();
  renderASCII();
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
          const seq = document.getElementById("boot-sequence");
          if (seq) {
            seq.style.opacity = "0";
            setTimeout(() => (seq.style.display = "none"), 500);
          }
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

function initWebGL() {
  const container3D = document.getElementById("webgl-container");
  if (!container3D) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x010203, 0.005);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 15, 60);
  camera.rotation.set(-0.1, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setClearColor(0x010203, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Deliberately NOT setting high pixel ratio to maintain original buttery performance
  container3D.appendChild(renderer.domElement);

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2,
    0.4,
    0.2,
  );
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Floating Data Cubes
  const numCubes = 1500;
  const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const cubeMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.6,
  });

  const instancedCubes = new THREE.InstancedMesh(cubeGeo, cubeMat, numCubes);
  const dummy = new THREE.Object3D();
  const cubeData = [];

  for (let i = 0; i < numCubes; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 500;
    const rx = Math.random() * Math.PI;
    const ry = Math.random() * Math.PI;
    cubeData.push({ x, y, z, rx, ry });

    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, 0);
    dummy.updateMatrix();
    instancedCubes.setMatrixAt(i, dummy.matrix);
  }
  masterGroup.add(instancedCubes);

  // Handle Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  let disablePostProcessing = false;
  window.addEventListener("fpsDowngrade", () => {
    disablePostProcessing = true;
  });

  function animate3D() {
    requestAnimationFrame(animate3D);

    for (let i = 0; i < numCubes; i++) {
      let data = cubeData[i];
      data.rx += 0.01;
      data.ry += 0.01;
      data.z += 0.1;
      if (data.z > 100) data.z = -400;
      dummy.position.set(data.x, data.y, data.z);
      dummy.rotation.set(data.rx, data.ry, 0);
      dummy.updateMatrix();
      instancedCubes.setMatrixAt(i, dummy.matrix);
    }
    instancedCubes.instanceMatrix.needsUpdate = true;

    if (disablePostProcessing) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }
  }
  animate3D();

  // Magnetic Cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
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

  // GSAP ScrollTrigger
  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "#projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    z: -250,
    y: 2,
    ease: "none",
  });

  gsap.to(camera.rotation, {
    scrollTrigger: {
      trigger: "#projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    x: 0,
    ease: "none",
  });

  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "#explore",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    x: 10,
    z: -30,
    ease: "power2.inOut",
  });

  gsap.to(camera.rotation, {
    scrollTrigger: {
      trigger: "#explore",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    x: -0.05,
  });
}

function initHTMLGSAP() {
  gsap.utils.toArray(".card, .mb-16").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.2)",
    });
  });

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

window.toggleMenu = function () {
  const menu = document.getElementById("sidebar");
  menu.classList.toggle("open");
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

// --- ASCII ART RENDERING ---
const renderASCII = () => {
  const canvas = document.getElementById("ascii-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.onload = () => {
    const cols = 150;
    const aspect = img.height / img.width;
    const rows = Math.floor(cols * aspect * 0.6);

    const offCanvas = document.createElement("canvas");
    offCanvas.width = cols;
    offCanvas.height = rows;
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
    offCtx.drawImage(img, 0, 0, cols, rows);
    const imgData = offCtx.getImageData(0, 0, cols, rows).data;

    const fontSize = 800 / cols;
    canvas.width = cols * fontSize * 0.6;
    canvas.height = rows * fontSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = "top";

    const asciiChars =
      ' .\\`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = (y * cols + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        const charIdx = Math.floor(brightness * (asciiChars.length - 1));
        const char = asciiChars[charIdx];

        if (char !== " ") {
          ctx.fillStyle =
            brightness > 0.6
              ? "#ffffff"
              : brightness > 0.3
                ? "#33ff33"
                : "#008800";
          ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
        }
      }
    }
  };
  img.onerror = () => console.error("Failed to load rsz_image.png"); img.src = "rsz_image.png"; // Need absolute path because main.js is inside /src/js
};
renderASCII();

function initDepthChamber() {
  // --- DEPTH CHAMBER SCROLL LOGIC ---
  document.addEventListener("scroll", () => {
    const container = document.getElementById("projects");
    const world = document.getElementById("depth-world");
    if (!container || !world) return;

    const rect = container.getBoundingClientRect();
    let progress = 0;
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
    } else if (rect.bottom < window.innerHeight) {
      progress = 1;
    }

    // 3D Depth Fly-through
    const maxZ = 8300; // Fly through the Z-axis
    const currentZ = progress * maxZ;

    // Add a slight "snake" camera wobble
    const camX = Math.sin(progress * Math.PI * 10) * 100;
    const camY = Math.cos(progress * Math.PI * 6) * 50;

    world.style.transform = `translate3d(${camX}px, ${camY}px, ${currentZ}px)`;
  });
}
  // --- CYBER TEXT DECODER ---
  const initCyberDecoder = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!¿§';
    const el = document.getElementById('decoder');
    if (!el) return;
    let interval = null;

    function scramble() {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = el.dataset.value
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return el.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('');

        if (iteration >= el.dataset.value.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    }

    scramble();
    el.addEventListener('mouseenter', scramble);
  };
  initCyberDecoder();
