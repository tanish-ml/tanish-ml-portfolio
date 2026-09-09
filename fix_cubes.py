import re

with open('src/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

target_gen = '''  const numCubes = 1500;
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
      const z = (Math.random() - 0.5) * 500;'''

replacement_gen = '''  const numCubes = 4000;
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
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 2000;'''

target_loop = '''        data.rx += 0.01;
        data.ry += 0.01;
        data.z += 0.1;
        if (data.z > 100) data.z = -400;'''

replacement_loop = '''        data.rx += 0.01;
        data.ry += 0.01;
        data.z += 0.2;
        if (data.z > camera.position.z + 200) {
          data.z = camera.position.z - 1800;
          data.x = (Math.random() - 0.5) * 600;
          data.y = (Math.random() - 0.5) * 300;
        }'''

if target_gen in content and target_loop in content:
    content = content.replace(target_gen, replacement_gen)
    content = content.replace(target_loop, replacement_loop)
    with open('src/js/main.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS")
else:
    print("FAILED: Targets not found")

