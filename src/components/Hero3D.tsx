import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DProps {
  onLoaded?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    
    // Increased FOV and z-distance to eliminate any canvas clipping
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    const isMobile = window.innerWidth < 768;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ROOT GROUP
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. MAIN CYBER SCULPTURE (Icosahedron / Tech Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.22, 2);
    
    // Glossy metallic dark material
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f1115,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // 2. NEON WIREFRAME OVERLAY (Electric Volt Color)
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.24, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xD2F532,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    rootGroup.add(wireframeMesh);

    // 3. INNER GLOWING NUCLEUS (Pulsing cyber core)
    const nucleusGeometry = new THREE.OctahedronGeometry(0.68, 0);
    const nucleusMaterial = new THREE.MeshBasicMaterial({
      color: 0xD2F532,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    rootGroup.add(nucleusMesh);

    // 4. TELEMETRY ORBIT RINGS (Tuned radii for seamless full-frame visibility)
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    // Ring 1 - Outer Volt Ring
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.012, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xD2F532,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 - Stealth Carbon Ring with ticks
    const ring2Geo = new THREE.TorusGeometry(2.05, 0.008, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x5a5e73,
      transparent: true,
      opacity: 0.45,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    ringGroup.add(ring2);

    // Ring 3 - Speed Ring
    const ring3Geo = new THREE.TorusGeometry(1.55, 0.01, 16, 64, Math.PI * 1.4);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    ringGroup.add(ring3);

    // 5. FLOATING CYBER TELEMETRY PARTICLES
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.7 + Math.random() * 0.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xD2F532,
      size: 0.03,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xD2F532, 2.5);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4080ff, 1.8);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xD2F532, 3, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // MOUSE INTERACTION & SMOOTH EASING
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        rootGroup.rotation.y += deltaMove.x * 0.008;
        rootGroup.rotation.x += deltaMove.y * 0.008;

        previousMousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousedown', handleMouseDown);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let lastTime = performance.now();

    // Pause WebGL rendering loop when offscreen to preserve mobile GPU/CPU
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const animate = (currentTime: number = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      // Gentle continuous rotation
      if (!isDragging) {
        targetRotationY = mouseX * 0.8;
        targetRotationX = -mouseY * 0.6;
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;
      }

      // Self-rotation of inner components
      coreMesh.rotation.y += delta * 0.25;
      wireframeMesh.rotation.y += delta * 0.25;
      wireframeMesh.rotation.x += delta * 0.1;

      nucleusMesh.rotation.y -= delta * 0.6;
      nucleusMesh.rotation.z += delta * 0.4;

      // Orbit rings rotation
      ring1.rotation.z += delta * 0.5;
      ring2.rotation.y += delta * 0.35;
      ring3.rotation.z -= delta * 0.7;

      // Particles rotation & shimmer
      particles.rotation.y += delta * 0.1;
      particles.rotation.x -= delta * 0.05;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    if (onLoaded) {
      onLoaded();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [onLoaded]);

  return (
    <div 
      className="relative w-full h-[320px] sm:h-[460px] lg:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full flex items-center justify-center overflow-visible" />
    </div>
  );
};
