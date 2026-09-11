import re

with open('src/js/federated-learning.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_index = content.find('  if (step === 0) {')
end_index = content.find('// --- RENDER LOOP ---')

if start_index != -1 and end_index != -1:
    new_logic = '''  if (step === 0) {
      // Step 0: The Centralized Cloud
      gsap.to(camera.position, { x: 0, y: 10, z: 80, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x0044ff);
      gsap.to(serverCoreMat, { opacity: 0.6, duration: 1 });
      serverMat.color.setHex(0x00aaff);
      edgeNodes.forEach((node) => gsap.to(node.material, { opacity: 0, duration: 1 }));
      lines.forEach((line) => gsap.to(line.material, { opacity: 0, duration: 1 }));
      packetInterval = setInterval(() => { spawnExternalPacket(0x00aaff, 2.0, false); }, 200);
      
    } else if (step === 1) {
      // Step 1: Bottlenecks
      gsap.to(camera.position, { x: -20, y: 15, z: 70, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0xff0000);
      gsap.to(serverCoreMat, { opacity: 0.9, duration: 1 });
      serverMat.color.setHex(0xff3333);
      edgeNodes.forEach((node) => gsap.to(node.material, { opacity: 0, duration: 1 }));
      lines.forEach((line) => gsap.to(line.material, { opacity: 0, duration: 1 }));
      packetInterval = setInterval(() => { spawnExternalPacket(0xff1111, 1.0, true); }, 50);
      shakeInterval = setInterval(() => {
        serverNode.position.x = (Math.random() - 0.5) * 1.5;
        serverNode.position.y = (Math.random() - 0.5) * 1.5;
        serverCore.position.x = serverNode.position.x;
        serverCore.position.y = serverNode.position.y;
      }, 50);
      
    } else if (step === 2) {
      // Step 2: The Privacy Crisis
      gsap.to(camera.position, { x: 20, y: 10, z: 60, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0xff0055);
      gsap.to(serverCoreMat, { opacity: 1, duration: 0.5, yoyo: true, repeat: -1 });
      serverMat.color.setHex(0xff0055);
      edgeNodes.forEach((node) => gsap.to(node.material, { opacity: 0, duration: 1 }));
      lines.forEach((line) => gsap.to(line.material, { opacity: 0, duration: 1 }));
      packetInterval = setInterval(() => { spawnExternalPacket(0xff0055, 0.5, true); }, 30);
      shakeInterval = setInterval(() => {
        serverNode.position.x = (Math.random() - 0.5) * 2.0;
        serverNode.position.y = (Math.random() - 0.5) * 2.0;
        serverCore.position.x = serverNode.position.x;
        serverCore.position.y = serverNode.position.y;
      }, 40);

    } else if (step === 3) {
      // Step 3: The Decentralization Shift
      gsap.to(camera.position, { x: 0, y: 30, z: 60, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x00aaff);
      gsap.to(serverCoreMat, { opacity: 0.5, duration: 2 });
      serverMat.color.setHex(0x00aaff);
      lines.forEach((line) => {
        line.material.color.setHex(0x00aaff);
        gsap.to(line.material, { opacity: 0.05, duration: 2 });
      });
      edgeNodes.forEach((node, i) => {
        node.material.color.setHex(0x00ffcc);
        node.scale.set(0.1, 0.1, 0.1);
        gsap.to(node.material, { opacity: 0.4, duration: 1, delay: i * 0.01 });
        gsap.to(node.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "back.out", delay: i * 0.01 });
      });

    } else if (step === 4) {
      // Step 4: Model Deployment
      gsap.to(camera.position, { x: -10, y: 20, z: 70, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x00ffcc);
      gsap.to(serverCoreMat, { opacity: 0.8, duration: 1 });
      lines.forEach((line) => gsap.to(line.material, { opacity: 0.1, duration: 1 }));
      edgeNodes.forEach((node) => {
        node.material.color.setHex(0x00ffcc);
        gsap.to(node.material, { opacity: 0.6, duration: 1 });
      });
      let spawnCount = 0;
      packetInterval = setInterval(() => {
        if (spawnCount > 80) return;
        spawnInternalPacket(true, 0x00ffcc, 1.0);
        spawnCount++;
      }, 30);

    } else if (step === 5) {
      // Step 5: Local Training
      gsap.to(camera.position, { x: 30, y: 10, z: 50, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x002255);
      gsap.to(serverCoreMat, { opacity: 0.2, duration: 1 });
      lines.forEach((line) => gsap.to(line.material, { opacity: 0.01, duration: 1 }));
      edgeNodes.forEach((node) => {
        node.material.color.setHex(0x00ffcc);
        gsap.killTweensOf(node.material);
        gsap.killTweensOf(node.scale);
        gsap.to(node.material, { opacity: 1, duration: 0.4 + Math.random(), yoyo: true, repeat: -1 });
        gsap.to(node.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.4 + Math.random(), yoyo: true, repeat: -1 });
      });

    } else if (step === 6) {
      // Step 6: Gradient Extraction
      gsap.to(camera.position, { x: 15, y: 20, z: 40, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x002255);
      lines.forEach((line) => gsap.to(line.material, { opacity: 0.01, duration: 1 }));
      edgeNodes.forEach((node) => {
        node.material.color.setHex(0xaa00ff);
        gsap.killTweensOf(node.material);
        gsap.killTweensOf(node.scale);
        gsap.to(node.material, { opacity: 1, duration: 0.2, yoyo: true, repeat: -1 });
        gsap.to(node.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.2, yoyo: true, repeat: -1 });
      });

    } else if (step === 7) {
      // Step 7: Differential Privacy
      gsap.to(camera.position, { x: -15, y: 10, z: 40, duration: 2, ease: "power2.inOut" });
      edgeNodes.forEach((node) => {
        gsap.killTweensOf(node.material);
        gsap.killTweensOf(node.scale);
        node.material.color.setHex(0xaa00ff);
        gsap.to(node.material, { opacity: 0.3, duration: 0.1, yoyo: true, repeat: -1 });
        gsap.to(node.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.1 });
        gsap.to(node.position, {
          x: "+=0.5", y: "+=0.5", duration: 0.05, yoyo: true, repeat: -1
        });
      });

    } else if (step === 8) {
      // Step 8: Secure Aggregation
      gsap.to(camera.position, { x: 0, y: 20, z: 70, duration: 2, ease: "power2.inOut" });
      edgeNodes.forEach((node) => { gsap.killTweensOf(node.position); });
      serverCoreMat.color.setHex(0x00ff44);
      gsap.to(serverCoreMat, { opacity: 1, duration: 0.5, yoyo: true, repeat: -1 });
      serverMat.color.setHex(0x00ffcc);
      lines.forEach((line) => {
        line.material.color.setHex(0x00ff44);
        gsap.to(line.material, { opacity: 0.15, duration: 1 });
      });
      edgeNodes.forEach((node) => {
        gsap.killTweensOf(node.material);
        gsap.killTweensOf(node.scale);
        node.material.color.setHex(0x00ffcc);
        gsap.to(node.material, { opacity: 0.5, duration: 1 });
        gsap.to(node.scale, { x: 1, y: 1, z: 1, duration: 1 });
      });
      packetInterval = setInterval(() => { spawnInternalPacket(false, 0x00ff44, 0.4); }, 30);

    } else if (step === 9) {
      // Step 9: Global Optimization
      gsap.to(camera.position, { x: 0, y: -10, z: 80, duration: 2, ease: "power2.inOut" });
      serverCoreMat.color.setHex(0x00aaff);
      gsap.to(serverCoreMat, { opacity: 1, duration: 0.2, yoyo: true, repeat: -1 });
      serverMat.color.setHex(0x00aaff);
      lines.forEach((line) => {
        line.material.color.setHex(0x00aaff);
        gsap.to(line.material, { opacity: 0.3, duration: 1 });
      });
      edgeNodes.forEach((node) => {
        node.material.color.setHex(0x00aaff);
        gsap.to(node.material, { opacity: 0.8, duration: 1 });
      });
      packetInterval = setInterval(() => { spawnInternalPacket(true, 0x00aaff, 0.5); }, 20);

    } else if (step === 10) {
      // Step 10: Outro
      gsap.to(camera.position, { x: -10, y: 30, z: 90, duration: 2, ease: "power2.inOut" });
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
'''
    new_content = content[:start_index] + new_logic + "  }\n\n" + content[end_index:]
    with open('src/js/federated-learning.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("FAILED TO FIND")
