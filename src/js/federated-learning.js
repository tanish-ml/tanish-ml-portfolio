import "/adaptive-fps.js";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("fade-in-loaded");
  });
});

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

gsap.defaults({ overwrite: "auto" });

// --- 3D SCENE SETUP ---
const container = document.getElementById("webgl-container");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030508, 0.015);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 20, 80);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x030508);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// --- POST-PROCESSING (BLOOM) ---
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength
  0.4, // radius
  0.1, // threshold
);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --- NETWORK CONSTRUCTION ---
const networkGroup = new THREE.Group();
scene.add(networkGroup);

// 1. Central Server Node
const serverGeo = new THREE.IcosahedronGeometry(5, 2);
const serverMat = new THREE.MeshBasicMaterial({
  color: 0x00aaff,
  wireframe: true,
  transparent: true,
  opacity: 0.8,
});
const serverNode = new THREE.Mesh(serverGeo, serverMat);
networkGroup.add(serverNode);

const serverCoreGeo = new THREE.SphereGeometry(4.5, 32, 32);
const serverCoreMat = new THREE.MeshBasicMaterial({
  color: 0x0044ff,
  transparent: true,
  opacity: 0.5,
});
const serverCore = new THREE.Mesh(serverCoreGeo, serverCoreMat);
networkGroup.add(serverCore);

// 2. Edge Nodes (Spawned later, initially invisible)
const edgeNodes = [];
const lines = [];
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0x00aaff,
  transparent: true,
  opacity: 0.0,
});
const edgeGeo = new THREE.SphereGeometry(0.5, 16, 16);

const numEdges = 150;
for (let i = 0; i < numEdges; i++) {
  // Distribute on a sphere/ring
  const phi = Math.acos(-1 + (2 * i) / numEdges);
  const theta = Math.sqrt(numEdges * Math.PI) * phi;
  const r = 30 + Math.random() * 20;

  const x = r * Math.cos(theta) * Math.sin(phi);
  const y = r * Math.sin(theta) * Math.sin(phi) * 0.3; // Flatten slightly like a galaxy
  const z = r * Math.cos(phi);

  // Initially invisible (opacity 0)
  const edgeMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.0,
  });
  const edge = new THREE.Mesh(edgeGeo, edgeMat);
  edge.position.set(x, y, z);
  edge.userData = {
    baseX: x,
    baseY: y,
    baseZ: z,
    angle: Math.random() * Math.PI * 2,
    speed: 0.002 + Math.random() * 0.005,
  };

  networkGroup.add(edge);
  edgeNodes.push(edge);

  // Connect to server (lines initially invisible)
  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geo, lineMaterial.clone());
  // Store reference to end point for dynamic updating if needed
  line.userData = { node: edge };
  networkGroup.add(line);
  lines.push(line);
}

// 3. Data Packets (for animation)
const packetGeo = new THREE.SphereGeometry(0.4, 8, 8);

// Helper to shoot packets from infinity to server (Step 0, 1)
function spawnExternalPacket(colorHex, duration, isHeavy) {
  const packet = new THREE.Mesh(
    packetGeo,
    new THREE.MeshBasicMaterial({ color: colorHex }),
  );
  const angle = Math.random() * Math.PI * 2;
  const dist = 100;
  packet.position.set(
    Math.cos(angle) * dist,
    (Math.random() - 0.5) * 40,
    Math.sin(angle) * dist,
  );
  if (isHeavy) packet.scale.set(1.5, 1.5, 1.5);

  networkGroup.add(packet);

  gsap.to(packet.position, {
    x: 0,
    y: 0,
    z: 0,
    duration: duration,
    ease: "power2.in",
    onComplete: () => {
      networkGroup.remove(packet);
      packet.geometry.dispose();
      packet.material.dispose();
    },
  });
}

// Helper to shoot packets between edge and server
function spawnInternalPacket(fromServer, colorHex, duration) {
  const edge = edgeNodes[Math.floor(Math.random() * edgeNodes.length)];
  const packet = new THREE.Mesh(
    packetGeo,
    new THREE.MeshBasicMaterial({ color: colorHex }),
  );

  const startPos = fromServer
    ? new THREE.Vector3(0, 0, 0)
    : edge.position.clone();
  const endPos = fromServer
    ? edge.position.clone()
    : new THREE.Vector3(0, 0, 0);

  packet.position.copy(startPos);
  networkGroup.add(packet);

  gsap.to(packet.position, {
    x: endPos.x,
    y: endPos.y,
    z: endPos.z,
    duration: duration,
    ease: "power2.inOut",
    onComplete: () => {
      networkGroup.remove(packet);
      packet.geometry.dispose();
      packet.material.dispose();
    },
  });
}

let packetInterval;
let shakeInterval;

// --- INTERSECTION OBSERVER & SCROLL LOGIC ---
let currentStep = -1;
const steps = document.querySelectorAll(".step");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stepIndex = parseInt(entry.target.getAttribute("data-step"));
        if (currentStep !== stepIndex) {
          steps.forEach((s) => s.classList.remove("active"));
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
function update3DModel(step) {
  clearInterval(packetInterval);
  clearInterval(shakeInterval);

  // Stop shaking server
  gsap.killTweensOf(serverNode.position);
  serverNode.position.set(0, 0, 0);
  serverCore.position.set(0, 0, 0);

  if (step === 0) {
    // Step 0: The Centralized Cloud (No Edge Nodes)
    gsap.to(camera.position, {
      x: 0,
      y: 10,
      z: 80,
      duration: 2,
      ease: "power2.inOut",
    });

    serverCoreMat.color.setHex(0x0044ff);
    gsap.to(serverCoreMat, { opacity: 0.6, duration: 1 });
    serverMat.color.setHex(0x00aaff);

    // Hide all edge nodes
    edgeNodes.forEach((node) =>
      gsap.to(node.material, { opacity: 0, duration: 1 }),
    );
    lines.forEach((line) =>
      gsap.to(line.material, { opacity: 0, duration: 1 }),
    );

    // Normal data packets flowing in
    packetInterval = setInterval(() => {
      spawnExternalPacket(0x00aaff, 2.0, false);
    }, 200);
  } else if (step === 1) {
    // Step 1: Bottlenecks (Still no edge nodes, just chaos)
    gsap.to(camera.position, {
      x: -20,
      y: 15,
      z: 70,
      duration: 2,
      ease: "power2.inOut",
    });

    serverCoreMat.color.setHex(0xff0000);
    gsap.to(serverCoreMat, { opacity: 0.9, duration: 1 });
    serverMat.color.setHex(0xff3333);

    edgeNodes.forEach((node) =>
      gsap.to(node.material, { opacity: 0, duration: 1 }),
    );
    lines.forEach((line) =>
      gsap.to(line.material, { opacity: 0, duration: 1 }),
    );

    // Heavy red data packets crashing in
    packetInterval = setInterval(() => {
      spawnExternalPacket(0xff1111, 1.0, true);
    }, 50);

    // Shake the server
    shakeInterval = setInterval(() => {
      serverNode.position.x = (Math.random() - 0.5) * 1.5;
      serverNode.position.y = (Math.random() - 0.5) * 1.5;
      serverCore.position.x = serverNode.position.x;
      serverCore.position.y = serverNode.position.y;
    }, 50);
  } else if (step === 2) {
    // Step 2: Spawning IoT (Edge Deployment)
    gsap.to(camera.position, {
      x: 0,
      y: 30,
      z: 60,
      duration: 2,
      ease: "power2.inOut",
    });

    // Server calms down
    serverCoreMat.color.setHex(0x00aaff);
    gsap.to(serverCoreMat, { opacity: 0.5, duration: 2 });
    serverMat.color.setHex(0x00aaff);

    // Lines appear slightly
    lines.forEach((line) => {
      line.material.color.setHex(0x00aaff);
      gsap.to(line.material, { opacity: 0.05, duration: 2 });
    });

    // Edge nodes spawn and light up in a cascading wave
    edgeNodes.forEach((node, i) => {
      node.material.color.setHex(0x00ffcc);
      node.scale.set(0.1, 0.1, 0.1);
      gsap.to(node.material, {
        opacity: 0.4,
        duration: 1,
        delay: i * 0.01,
      });
      gsap.to(node.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "back.out",
        delay: i * 0.01,
      });
    });

    // Server shoots models to edge nodes
    let spawnCount = 0;
    packetInterval = setInterval(() => {
      if (spawnCount > 50) return; // Burst of models
      spawnInternalPacket(true, 0x00ffcc, 1.0);
      spawnCount++;
    }, 40);
  } else if (step === 3) {
    // Step 3: Local Training
    gsap.to(camera.position, {
      x: 30,
      y: 10,
      z: 50,
      duration: 2,
      ease: "power2.inOut",
    });

    // Server goes dim
    serverCoreMat.color.setHex(0x002255);
    gsap.to(serverCoreMat, { opacity: 0.2, duration: 1 });

    // Lines dim
    lines.forEach((line) =>
      gsap.to(line.material, { opacity: 0.01, duration: 1 }),
    );

    // Edge nodes pulse brightly (Training on local data)
    edgeNodes.forEach((node) => {
      node.material.color.setHex(0x00ffcc);
      gsap.killTweensOf(node.material);
      gsap.killTweensOf(node.scale);
      gsap.to(node.material, {
        opacity: 1,
        duration: 0.4 + Math.random(),
        yoyo: true,
        repeat: -1,
      });
      gsap.to(node.scale, {
        x: 1.8,
        y: 1.8,
        z: 1.8,
        duration: 0.4 + Math.random(),
        yoyo: true,
        repeat: -1,
      });
    });
  } else if (step === 4) {
    // Step 4: Secure Aggregation
    gsap.to(camera.position, {
      x: 0,
      y: 20,
      z: 70,
      duration: 2,
      ease: "power2.inOut",
    });

    serverCoreMat.color.setHex(0x00ff44);
    gsap.to(serverCoreMat, {
      opacity: 1,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
    });
    serverMat.color.setHex(0x00ffcc);

    lines.forEach((line) => {
      line.material.color.setHex(0x00ff44);
      gsap.to(line.material, { opacity: 0.15, duration: 1 });
    });

    // Edge nodes stop pulsing as intensely
    edgeNodes.forEach((node) => {
      gsap.killTweensOf(node.material);
      gsap.killTweensOf(node.scale);
      node.material.color.setHex(0x00ffcc);
      gsap.to(node.material, { opacity: 0.5, duration: 1 });
      gsap.to(node.scale, { x: 1, y: 1, z: 1, duration: 1 });
    });

    // Shoot fast gradients to server
    packetInterval = setInterval(() => {
      spawnInternalPacket(false, 0x00ff44, 0.4);
    }, 30);
  } else if (step === 5) {
    // Step 5: Outro
    gsap.to(camera.position, {
      x: -10,
      y: 30,
      z: 90,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.killTweensOf(serverCoreMat);
    serverCoreMat.color.setHex(0x00aaff);
    gsap.to(serverCoreMat, { opacity: 0.8, duration: 2 });
    serverMat.color.setHex(0x00aaff);

    lines.forEach((line) => {
      line.material.color.setHex(0x00aaff);
      gsap.to(line.material, { opacity: 0.05, duration: 2 });
    });

    edgeNodes.forEach((node) => {
      node.material.color.setHex(0x00ffcc);
      gsap.to(node.material, { opacity: 0.3, duration: 2 });
    });
  }
}

// --- RENDER LOOP ---
function animate() {
  requestAnimationFrame(animate);

  networkGroup.rotation.y += 0.001;
  serverNode.rotation.x += 0.005;
  serverNode.rotation.y += 0.005;

  // Orbit edge nodes
  edgeNodes.forEach((node, i) => {
    node.userData.angle += node.userData.speed;
    const r = Math.sqrt(node.userData.baseX ** 2 + node.userData.baseZ ** 2);
    node.position.x = r * Math.cos(node.userData.angle);
    node.position.z = r * Math.sin(node.userData.angle);
    node.position.y =
      node.userData.baseY + Math.sin(node.userData.angle * 5) * 2;

    // Update line positions dynamically so they follow the orbiting nodes
    if (lines[i]) {
      const pos = lineMaterial.clone(); // Just to reference, actually we need to update geometry
      const positions = lines[i].geometry.attributes.position.array;
      // First point is (0,0,0) (Server), Second point is edge node
      positions[3] = node.position.x;
      positions[4] = node.position.y;
      positions[5] = node.position.z;
      lines[i].geometry.attributes.position.needsUpdate = true;
    }
  });

  composer.render();
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
