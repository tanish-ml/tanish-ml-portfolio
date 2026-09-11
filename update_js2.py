import re

with open('src/js/deep-learning.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_index = content.find('function update3DModel(step) {')
end_index = content.find('// --- RENDER LOOP ---')

if start_index != -1 and end_index != -1:
    new_logic = '''function update3DModel(step) {
  clearInterval(propagationInterval);

  let camX = 0, camY = 0, camZ = 50, rotY = 0;

  if (step === 0) { camX = -20; camZ = 30; rotY = -0.3; }
  else if (step === 1) { camX = -15; camZ = 35; rotY = -0.2; }
  else if (step === 2) { camX = -10; camZ = 40; rotY = -0.1; }
  else if (step === 3) { camX = -5;  camZ = 35; rotY = 0; }
  else if (step === 4) { camX = 0;   camZ = 30; rotY = 0; }
  else if (step === 5) { camX = 5;   camZ = 25; rotY = 0.1; }
  else if (step === 6) { camX = 0;   camZ = 50; rotY = 0; }
  else if (step === 7) { camX = 10;  camZ = 35; rotY = 0.2; }
  else if (step === 8) { camX = 20;  camZ = 25; rotY = 0.3; }
  else if (step === 9) { camX = 25;  camZ = 20; rotY = 0.4; }
  else if (step === 10) { camX = 0;  camZ = 60; rotY = 0; }

  gsap.to(camera.position, { x: camX, y: camY, z: camZ, overwrite: true, duration: 2, ease: "power3.inOut" });
  gsap.to(camera.rotation, { y: rotY, overwrite: true, duration: 2, ease: "power3.inOut" });

  // Reset all nodes
  nodes.forEach((node) => {
    gsap.killTweensOf(node.material);
    gsap.killTweensOf(node.scale);
    node.material.color.setHex(node.userData.baseColor);
    node.material.opacity = 0.15;
    node.scale.set(1, 1, 1);
  });
  // Reset lines
  lines.forEach((obj) => {
    gsap.killTweensOf(obj.line.material);
    obj.line.material.opacity = 0.05;
  });

  if (step === 0) {
    layerMeshes[0].forEach((node) => {
      gsap.to(node.material, { opacity: 1.0, duration: 0.5 });
      gsap.to(node.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.5 });
    });
  } else if (step === 1) {
    layerMeshes[0].forEach((n) => (n.material.opacity = 0.5));
    layerMeshes[1].forEach((n) => (n.material.opacity = 0.5));
    lines.forEach((obj) => {
      if (obj.layerIndex === 0) gsap.to(obj.line.material, { opacity: 0.4, duration: 1 });
    });
  } else if (step === 2) {
    lines.forEach((obj) => {
      if (Math.random() > 0.5) {
        gsap.to(obj.line.material, { opacity: 0.5, duration: 0.2, yoyo: true, repeat: -1 });
      }
    });
  } else if (step === 3) {
    layerMeshes[0].forEach((n) => (n.material.opacity = 0.8));
    layerMeshes[1].forEach((n) => (n.material.opacity = 0.8));
    propagationInterval = setInterval(() => {
      let from = Math.floor(Math.random() * layerMeshes[0].length);
      let to = Math.floor(Math.random() * layerMeshes[1].length);
      spawnPacket(layerMeshes[0][from], layerMeshes[1][to]);
    }, 50);
  } else if (step === 4) {
    [1, 2].forEach((l) => {
      layerMeshes[l].forEach((node) => {
        gsap.to(node.material, { opacity: 0.8, duration: 0.5 });
      });
    });
  } else if (step === 5) {
    [1, 2].forEach((l) => {
      layerMeshes[l].forEach((node) => {
        if (Math.random() > 0.3) {
           gsap.to(node.material, { opacity: 1.0, duration: 0.3, yoyo: true, repeat: -1 });
           gsap.to(node.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, yoyo: true, repeat: -1 });
        }
      });
    });
  } else if (step === 6) {
    nodes.forEach((n) => (n.material.opacity = 0.3));
    lines.forEach((obj) => (obj.line.material.opacity = 0.1));
    propagationInterval = setInterval(() => {
      let l = Math.floor(Math.random() * 3);
      let from = Math.floor(Math.random() * layerMeshes[l].length);
      let to = Math.floor(Math.random() * layerMeshes[l + 1].length);
      spawnPacket(layerMeshes[l][from], layerMeshes[l + 1][to]);
    }, 50);
  } else if (step === 7) {
    [1, 2].forEach((l) => {
      layerMeshes[l].forEach((node) => {
        if (Math.random() > 0.5) {
           gsap.to(node.material, { opacity: 0.0, duration: 0.5 }); 
           gsap.to(node.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 0.5 });
        } else {
           gsap.to(node.material, { opacity: 0.8, duration: 0.5 });
           gsap.to(node.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.5 });
        }
      });
    });
  } else if (step === 8) {
    layerMeshes[3].forEach((node) => {
      gsap.to(node.material, { opacity: 1.0, duration: 0.5 });
      gsap.to(node.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.5 });
    });
    lines.forEach((obj) => {
      if (obj.layerIndex === 2) gsap.to(obj.line.material, { opacity: 0.3, duration: 1 });
    });
  } else if (step === 9) {
    layerMeshes[3].forEach((node, idx) => {
      let isWinner = idx === 2;
      node.material.color.setHex(isWinner ? 0x00ffcc : 0xff0055);
      let intensity = isWinner ? 1.0 : 0.2;
      let scale = isWinner ? 2.5 : 0.8;
      gsap.to(node.material, { opacity: intensity, duration: 0.2, yoyo: true, repeat: -1 });
      gsap.to(node.scale, { x: scale, y: scale, z: scale, duration: 0.2, yoyo: true, repeat: -1 });
    });
  } else if (step === 10) {
    nodes.forEach((n) => {
      n.material.color.setHex(n.userData.baseColor);
      gsap.to(n.material, { opacity: 0.3, overwrite: true, duration: 1 });
    });
  }
}

'''
    new_content = content[:start_index] + new_logic + content[end_index:]
    with open('src/js/deep-learning.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("FAILED TO FIND")
