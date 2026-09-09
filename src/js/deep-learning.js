import "/adaptive-fps.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

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

gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", () => {
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
});

// --- 3D SCENE SETUP ---
const container = document.getElementById("webgl-container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010302); // Deep dark background

// Add a subtle grid floor for scale
const gridHelper = new THREE.GridHelper(200, 100, 0x004422, 0x001105);
gridHelper.position.y = -15;
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// --- POST-PROCESSING (BLOOM) ---
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  2.0, // strength
  0.5, // radius
  0.1, // threshold
);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- NETWORK TOPOLOGY ---
const layers = [
  { nodes: 16, x: -20, color: 0x00ffcc }, // Input
  { nodes: 24, x: -6, color: 0x00aa44 }, // Hidden 1
  { nodes: 24, x: 6, color: 0x00aa44 }, // Hidden 2
  { nodes: 8, x: 20, color: 0xff0055 }, // Output
];

const nodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);

const nodes = [];
const layerMeshes = [[], [], [], []];
const lines = [];

// Build Nodes
layers.forEach((layer, layerIdx) => {
  for (let i = 0; i < layer.nodes; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: layer.color,
      transparent: true,
      opacity: 0.15, // Default low opacity
    });
    const mesh = new THREE.Mesh(nodeGeometry, material);

    // Spread nodes vertically
    const yOffset = (i - layer.nodes / 2) * 1.8;
    mesh.position.set(layer.x, yOffset, Math.random() * 4 - 2);

    // Save original base position and color for animations
    mesh.userData = {
      baseY: yOffset,
      baseColor: layer.color,
      layerIndex: layerIdx,
    };

    scene.add(mesh);
    nodes.push(mesh);
    layerMeshes[layerIdx].push(mesh);
  }
});

// Build Connections (Synapses)
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.02,
  blending: THREE.AdditiveBlending,
});

for (let l = 0; l < layerMeshes.length - 1; l++) {
  const currentLayer = layerMeshes[l];
  const nextLayer = layerMeshes[l + 1];

  currentLayer.forEach((nodeA) => {
    nextLayer.forEach((nodeB) => {
      if (Math.random() > 0.4) return; // Keep lines manageable

      const points = [nodeA.position, nodeB.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial.clone());

      scene.add(line);
      lines.push({
        line: line,
        nodeA: nodeA,
        nodeB: nodeB,
        layerIndex: l,
      });
    });
  });
}

// --- DATA PACKET PARTICLES (Forward Propagation Simulation) ---
const packetGeometry = new THREE.SphereGeometry(0.15, 8, 8);
const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const packets = [];

function spawnPacket(nodeA, nodeB) {
  const packet = new THREE.Mesh(packetGeometry, packetMaterial);
  packet.position.copy(nodeA.position);
  scene.add(packet);

  gsap.to(packet.position, {
    x: nodeB.position.x,
    y: nodeB.position.y,
    z: nodeB.position.z,
    overwrite: true,
    duration: 0.6 + Math.random() * 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      scene.remove(packet);
      packet.geometry.dispose();
      packet.material.dispose();
    },
  });
}

// Background Ambient Dust
const dustGeo = new THREE.BufferGeometry();
const dustCount = 800;
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount * 3; i++) {
  dustPos[i] = (Math.random() - 0.5) * 150;
}
dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
  size: 0.15,
  color: 0x00ffcc,
  transparent: true,
  opacity: 0.4,
  blending: THREE.AdditiveBlending,
});
const dustMesh = new THREE.Points(dustGeo, dustMat);
scene.add(dustMesh);

// --- INTERSECTION OBSERVER & SCROLL LOGIC ---
let currentStep = 0;
let propagationInterval;
const steps = document.querySelectorAll(".step");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stepIndex = parseInt(entry.target.getAttribute("data-step"));
        if (currentStep !== stepIndex) {
          steps[currentStep].classList.remove("active");
          currentStep = stepIndex;
          entry.target.classList.add("active");
          update3DModel(currentStep);
        }
      }
    });
  },
  { rootMargin: "-40% 0px -60% 0px" },
);

steps.forEach((step) => observer.observe(step));
setTimeout(() => steps[0].classList.add("active"), 500);

// --- ANIMATIONS & STATE MACHINE ---
gsap.defaults({ overwrite: "auto" });
function update3DModel(step) {
  clearInterval(propagationInterval);

  // Camera Transitions
  let camX = 0,
    camY = 0,
    camZ = 50,
    rotY = 0;

  if (step === 0) {
    camX = 0;
    camZ = 55;
  } else if (step === 1) {
    camX = -15;
    camZ = 30;
    rotY = -0.2;
  } else if (step === 2) {
    camX = -10;
    camZ = 35;
    rotY = 0;
  } else if (step === 3) {
    camX = 0;
    camZ = 30;
    rotY = 0;
  } else if (step === 4) {
    camX = 0;
    camZ = 50;
    rotY = 0.2;
  } else if (step === 5) {
    camX = 15;
    camZ = 25;
    rotY = 0.3;
  } else if (step === 6) {
    camX = 0;
    camZ = 60;
    rotY = 0;
  }

  gsap.to(camera.position, {
    x: camX,
    y: camY,
    z: camZ,
    overwrite: true,
    duration: 2,
    ease: "power3.inOut",
  });
  gsap.to(camera.rotation, {
    y: rotY,
    overwrite: true,
    duration: 2,
    ease: "power3.inOut",
  });

  // Reset all nodes
  nodes.forEach((node) => {
    gsap.to(node.material, {
      opacity: 0.15,
      overwrite: true,
      duration: 1,
    });
    gsap.to(node.scale, {
      x: 1,
      y: 1,
      z: 1,
      overwrite: true,
      duration: 1,
    });
  });
  lines.forEach((obj) => {
    gsap.to(obj.line.material, {
      opacity: 0.02,
      overwrite: true,
      duration: 1,
    });
  });

  // Step Specific Logic
  if (step === 1) {
    // Highlight Input
    layerMeshes[0].forEach((node) => {
      gsap.to(node.material, {
        opacity: 1.0,
        overwrite: true,
        duration: 0.5,
      });
      gsap.to(node.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        overwrite: true,
        duration: 0.5,
      });
    });
  } else if (step === 2) {
    // Highlight connections between input and hidden
    lines.forEach((obj) => {
      if (obj.layerIndex === 0)
        gsap.to(obj.line.material, {
          opacity: 0.4,
          overwrite: true,
          duration: 1,
        });
    });
    layerMeshes[0].forEach((n) => (n.material.opacity = 0.5));
    layerMeshes[1].forEach((n) => (n.material.opacity = 0.5));
  } else if (step === 3) {
    // Pulse Hidden Layers (Activation)
    [1, 2].forEach((l) => {
      layerMeshes[l].forEach((node) => {
        gsap.to(node.material, {
          opacity: 1.0,
          overwrite: true,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
        });
        gsap.to(node.scale, {
          x: 1.8,
          y: 1.8,
          z: 1.8,
          overwrite: true,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
        });
      });
    });
  } else if (step === 4) {
    // Full Forward Propagation Data Packets
    propagationInterval = setInterval(() => {
      const l = Math.floor(Math.random() * 3);
      const currentLayer = layerMeshes[l];
      const nextLayer = layerMeshes[l + 1];
      const nodeA =
        currentLayer[Math.floor(Math.random() * currentLayer.length)];
      const nodeB = nextLayer[Math.floor(Math.random() * nextLayer.length)];
      spawnPacket(nodeA, nodeB);
    }, 50); // Massive flow

    // Light up lines slightly
    lines.forEach((obj) =>
      gsap.to(obj.line.material, {
        opacity: 0.1,
        overwrite: true,
        duration: 1,
      }),
    );
    nodes.forEach((n) =>
      gsap.to(n.material, { opacity: 0.6, overwrite: true, duration: 1 }),
    );
  } else if (step === 5) {
    // Output Layer Softmax Highlight
    layerMeshes[3].forEach((node, i) => {
      const isWinner = i === 2; // Simulate a high probability class
      node.material.color.setHex(isWinner ? 0x00ffcc : 0xff0055);
      gsap.to(node.material, {
        opacity: isWinner ? 1 : 0.2,
        overwrite: true,
        duration: 1,
      });
      gsap.to(node.scale, {
        x: isWinner ? 2.5 : 0.8,
        y: isWinner ? 2.5 : 0.8,
        z: isWinner ? 2.5 : 0.8,
        overwrite: true,
        duration: 1,
      });
    });
  } else if (step === 6 || step === 0) {
    // Restore defaults
    nodes.forEach((n) => {
      n.material.color.setHex(n.userData.baseColor);
      gsap.to(n.material, { opacity: 0.3, overwrite: true, duration: 1 });
    });
  }
}

// --- RENDER LOOP ---
const clock = new THREE.Clock();
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Floating effect for nodes
  nodes.forEach((node) => {
    node.position.y =
      node.userData.baseY + Math.sin(elapsedTime * 1.5 + node.position.x) * 0.3;
  });

  // Subtle camera sway based on mouse
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);

  // Rotate dust slowly
  dustMesh.rotation.y = elapsedTime * 0.02;

  // Use composer for Bloom effect instead of raw renderer
  if (window.disablePostProcessing) {
    renderer.render(scene, camera);
  } else {
    composer.render();
  }
}
animate();

// Responsive handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
