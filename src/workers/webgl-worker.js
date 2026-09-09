import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

let scene, camera, renderer, composer;
let masterGroup, grid, instancedCubes, dummy, cubeData;
let numCubes = 400;

let disablePostProcessing = false;

self.onmessage = function (e) {
  if (e.data.type === "init") {
    const { canvas, width, height, pixelRatio } = e.data;
    initScene(canvas, width, height, pixelRatio);
    animate();
  } else if (e.data.type === "resize") {
    const { width, height } = e.data;
    if (camera && renderer && composer) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
    }
  } else if (e.data.type === "camera") {
    if (camera) {
      const { x, y, z, rx, ry, rz } = e.data.data;
      if (x !== undefined) camera.position.x = x;
      if (y !== undefined) camera.position.y = y;
      if (z !== undefined) camera.position.z = z;
      if (rx !== undefined) camera.rotation.x = rx;
      if (ry !== undefined) camera.rotation.y = ry;
      if (rz !== undefined) camera.rotation.z = rz;
    }
  } else if (e.data.type === "downgrade") {
    disablePostProcessing = true;
    if (renderer) renderer.setPixelRatio(1);
  }
};

function initScene(canvas, width, height, pixelRatio) {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030508, 0.005);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 15, 60);
  camera.rotation.set(-0.1, 0, 0);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(0x030508, 1);
  renderer.setSize(width, height, false); // false to not set CSS styles
  renderer.setPixelRatio(Math.min(pixelRatio, 2));

  // Bloom Post-Processing
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    1.2, // strength
    0.4, // radius
    0.2, // threshold
  );

  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 2. Floating Data Cubes (Particles)
  const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const cubeMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.6,
  });

  instancedCubes = new THREE.InstancedMesh(cubeGeo, cubeMat, numCubes);
  dummy = new THREE.Object3D();

  cubeData = [];
  for (let i = 0; i < numCubes; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 400;
    const rx = Math.random() * Math.PI;
    const ry = Math.random() * Math.PI;
    cubeData.push({ x, y, z, rx, ry });

    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, 0);
    dummy.updateMatrix();
    instancedCubes.setMatrixAt(i, dummy.matrix);
  }
  masterGroup.add(instancedCubes);

  // 3. Massive Server Monoliths
  const monolithGeo = new THREE.BoxGeometry(8, 40, 8);
  const monolithMat = new THREE.MeshBasicMaterial({
    color: 0x002211,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });

  for (let i = 0; i < 25; i++) {
    const m = new THREE.Mesh(monolithGeo, monolithMat);
    m.position.set((Math.random() - 0.5) * 200, 0, Math.random() * -500 + 50);
    masterGroup.add(m);
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate floating cubes
  if (instancedCubes && dummy && cubeData) {
    for (let i = 0; i < numCubes; i++) {
      let data = cubeData[i];
      data.rx += 0.01;
      data.ry += 0.01;
      dummy.position.set(data.x, data.y, data.z);
      dummy.rotation.set(data.rx, data.ry, 0);
      dummy.updateMatrix();
      instancedCubes.setMatrixAt(i, dummy.matrix);
    }
    instancedCubes.instanceMatrix.needsUpdate = true;
  }

  if (disablePostProcessing) {
    renderer.render(scene, camera);
  } else {
    composer.render();
  }
}
