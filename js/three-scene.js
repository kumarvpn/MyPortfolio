/**
 * 3D WebGL Graphics Engine using Three.js
 * - Background: Distributed Cloud & AI Neural Network Constellation
 * - Hero Scene: Interactive Cybernetic Hologram Core & Orbital AI Rings
 */

(function () {
  'use strict';

  // Ensure Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Visual canvas fallback active.');
    return;
  }

  /* ==========================================================================
     1. Global Background Neural Constellation
     ========================================================================== */
  function initBackgroundScene() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Mouse Tracking for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - windowHalfX) * 0.25;
      mouseY = (e.clientY - windowHalfY) * 0.25;
    });

    // Particle Cloud
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    const colorAzure = new THREE.Color(0x00d4ff);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 800;
      positions[i3 + 2] = (Math.random() - 0.5) * 600;

      // Assign color gradient between Azure, AI Violet, and Emerald
      const rand = Math.random();
      let c = colorAzure;
      if (rand > 0.65) c = colorViolet;
      else if (rand > 0.45) c = colorEmerald;

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.45,
        y: (Math.random() - 0.5) * 0.45,
        z: (Math.random() - 0.5) * 0.35
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture Generator
    const createParticleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 212, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(157, 78, 221, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.Texture(c);
      texture.needsUpdate = true;
      return texture;
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 7,
      vertexColors: true,
      map: createParticleTexture(),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Line Connections
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const maxConnections = particleCount * 5;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(scene.position);

      const pos = geometry.attributes.position.array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        // Boundary bounce
        if (Math.abs(pos[i3]) > 450) velocities[i].x *= -1;
        if (Math.abs(pos[i3 + 1]) > 450) velocities[i].y *= -1;
        if (Math.abs(pos[i3 + 2]) > 350) velocities[i].z *= -1;

        // Check proximity for network lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 110 && lineIndex < maxConnections) {
            const l6 = lineIndex * 6;
            linePositions[l6] = pos[i3];
            linePositions[l6 + 1] = pos[i3 + 1];
            linePositions[l6 + 2] = pos[i3 + 2];

            linePositions[l6 + 3] = pos[j3];
            linePositions[l6 + 4] = pos[j3 + 1];
            linePositions[l6 + 5] = pos[j3 + 2];

            // Blend colors for lines
            lineColors[l6] = colors[i3];
            lineColors[l6 + 1] = colors[i3 + 1];
            lineColors[l6 + 2] = colors[i3 + 2];

            lineColors[l6 + 3] = colors[j3];
            lineColors[l6 + 4] = colors[j3 + 1];
            lineColors[l6 + 5] = colors[j3 + 2];

            lineIndex++;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      particleSystem.rotation.y += 0.0006;
      linesMesh.rotation.y += 0.0006;

      renderer.render(scene, camera);
    }

    animate();
  }

  /* ==========================================================================
     2. Hero Section 3D Cyber Hologram Core & AI Neural Orb
     ========================================================================== */
  function initHeroScene() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1128, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00d4ff, 3.5, 50);
    cyanLight.position.set(10, 10, 15);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x9d4edd, 3.5, 50);
    purpleLight.position.set(-10, -10, 10);
    scene.add(purpleLight);

    // Group for entire interactive assembly
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 1. Inner Glowing Agentic Core (Polyhedron)
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0078d4,
      emissive: 0x1a237e,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    hologramGroup.add(coreMesh);

    // 2. Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(5.6, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    hologramGroup.add(wireMesh);

    // 3. Dual Orbital Quantum Torus Rings (Azure & GenAI)
    const ring1Geo = new THREE.TorusGeometry(7.2, 0.12, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.85
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    hologramGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8.2, 0.1, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.85
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    hologramGroup.add(ring2);

    // 4. Orbital Floating AI Agent Data Nodes
    const nodesCount = 18;
    const nodeSpheres = [];
    const nodeGeo = new THREE.SphereGeometry(0.32, 12, 12);
    const nodeMatCyan = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const nodeMatPurple = new THREE.MeshBasicMaterial({ color: 0xe0aaff });

    for (let i = 0; i < nodesCount; i++) {
      const isPurple = i % 2 === 0;
      const mesh = new THREE.Mesh(nodeGeo, isPurple ? nodeMatPurple : nodeMatCyan);
      const angle = (i / nodesCount) * Math.PI * 2;
      const radius = 6.8 + Math.sin(i * 2) * 1.5;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.8, Math.sin(angle) * radius);
      hologramGroup.add(mesh);
      nodeSpheres.push({ mesh, angle, radius, speed: 0.015 + (i % 3) * 0.005 });
    }

    // Interactive Mouse Tracking on Hero Container
    let mouseNormX = 0;
    let mouseNormY = 0;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseNormX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    });

    container.addEventListener('mouseleave', () => {
      mouseNormX = 0;
      mouseNormY = 0;
    });

    // Click interactive pulse
    let pulseScale = 1;
    container.addEventListener('click', () => {
      pulseScale = 1.35;
      coreMat.emissive.setHex(0xd946ef);
      setTimeout(() => {
        coreMat.emissive.setHex(0x1a237e);
      }, 400);
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth || 450;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Animation Loop
    function animateHero() {
      requestAnimationFrame(animateHero);

      // Natural continuous rotation
      coreMesh.rotation.x += 0.005;
      coreMesh.rotation.y += 0.008;

      wireMesh.rotation.x -= 0.004;
      wireMesh.rotation.y -= 0.006;

      ring1.rotation.z += 0.012;
      ring2.rotation.z -= 0.015;

      // Orbit data nodes
      nodeSpheres.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.radius;
        node.mesh.position.z = Math.sin(node.angle) * node.radius;
        node.mesh.position.y = Math.sin(node.angle * 2) * 1.8;
      });

      // Interactive mouse tilt interpolation
      hologramGroup.rotation.y += (mouseNormX * 0.8 - hologramGroup.rotation.y) * 0.08;
      hologramGroup.rotation.x += (-mouseNormY * 0.8 - hologramGroup.rotation.x) * 0.08;

      // Scale spring return from click pulse
      pulseScale += (1 - pulseScale) * 0.08;
      hologramGroup.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
    }

    animateHero();
  }

  // Initialize both scenes when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBackgroundScene();
      initHeroScene();
    });
  } else {
    initBackgroundScene();
    initHeroScene();
  }
})();
