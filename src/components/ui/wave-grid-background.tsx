"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const MAX_TRAIL = 16;

function overrideVertexShader(vertexShader: string): string {
  return vertexShader
    .replace(
      "#include <common>",
      /* glsl */ `#include <common>
      varying float vHeight;
      attribute vec2 aOffset;
      uniform sampler2D uTrailTexture;
      uniform int       uTrailCount;
      uniform float     uWaveSpeed;
      uniform float     uWaveFreq;
      uniform float     uWaveWidth;
      uniform float     uFadeTime;
      uniform float     uAmplitude;
      uniform float     uJitter;
      uniform float     uMaxHeight;

      vec2 hash2( vec2 p ) {
        p = vec2( dot( p, vec2( 127.1, 311.7 ) ), dot( p, vec2( 269.5, 183.3 ) ) );
        return fract( sin( p ) * 43758.5453123 ) - 0.5;
      }`,
    )
    .replace(
      "#include <begin_vertex>",
      /* glsl */ `#include <begin_vertex>

      vHeight = 0.0;

      if ( position.y > 0.0 ) {
        vec2 jitter  = hash2( aOffset ) * uJitter;
        vec2 worldXZ = aOffset + jitter;
        float waveHeight  = 0.0;
        float totalWeight = 0.0;

        for ( int i = 0; i < 16; i++ ) {
          if ( i >= uTrailCount ) break;
          vec4 td = texture2D( uTrailTexture, vec2( ( float(i) + 0.5 ) / 16.0, 0.5 ) );
          float dist      = length( worldXZ - td.rg );
          float wavefront = uWaveSpeed * td.b;
          float relDist   = dist - wavefront;

          float window = exp( -( relDist * relDist ) / ( uWaveWidth * uWaveWidth ) );
          float fade   = exp( -td.b / uFadeTime );
          float atten  = 1.0 / ( 1.0 + dist * 0.1 );
          float weight = fade * window * atten * td.a;

          waveHeight  += weight * cos( uWaveFreq * relDist );
          totalWeight += weight;
        }

        waveHeight /= max( totalWeight, 1.0 );

        float displacement = clamp( waveHeight * uAmplitude, -uMaxHeight, uMaxHeight );
        transformed.y += displacement;
        vHeight = displacement;
      }`,
    );
}

export interface WaveGridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridSize?: number;
  colorBase?: string;
  colorHigh?: string;
  waveAmplitude?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveWidth?: number;
  waveMaxHeight?: number;
  waveJitter?: number;
  autoAnimate?: boolean;
  vignette?: boolean;
}

export function WaveGridBackground({
  children,
  className,
  gridSize = 24,
  colorBase = "#ffffff",
  colorHigh = "#0055ff",
  waveAmplitude = 0.4,
  waveSpeed = 6.0,
  waveFrequency = 1.2,
  waveWidth = 3.0,
  waveMaxHeight = 0.4,
  waveJitter = 0.2,
  autoAnimate = true,
}: WaveGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const propsRef = useRef({
    colorBase,
    colorHigh,
    waveAmplitude,
    waveSpeed,
    waveFrequency,
    waveWidth,
    waveMaxHeight,
    waveJitter,
    autoAnimate,
  });

  useEffect(() => {
    propsRef.current = {
      colorBase,
      colorHigh,
      waveAmplitude,
      waveSpeed,
      waveFrequency,
      waveWidth,
      waveMaxHeight,
      waveJitter,
      autoAnimate,
    };
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const cubeWidth = 1.05;
    const cubeHeight = 3;
    const gap = 0.02;
    const bounds = gridSize * (cubeWidth + gap);

    const getSize = () => ({
      width: container.clientWidth || 1,
      height: container.clientHeight || 1,
      pixelRatio: Math.min(window.devicePixelRatio, 1.25),
    });
    let size = getSize();

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(colorBase).multiplyScalar(0.5);
    scene.background = bgColor;

    const alphaRange = Math.PI * 0.03;
    const betaRange = Math.PI * 0.05;
    const mouse = new THREE.Vector2(0, 0);
    const lerpedMouse = new THREE.Vector2(0, 0);

    const camera = new THREE.PerspectiveCamera(40, size.width / size.height, 0.1, 200);
    let cameraRadius = 12;
    const fitCamera = () => {
      const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
      const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * camera.aspect);
      const halfBounds = bounds / 2;
      cameraRadius =
        Math.min(
          halfBounds / Math.tan(verticalHalfFov),
          halfBounds / Math.tan(horizontalHalfFov),
        ) *
          0.9 +
        cubeHeight * 0.5;
    };
    const positionCamera = (mx: number, my: number) => {
      const alpha = my * alphaRange;
      const beta = mx * betaRange;
      camera.position.set(
        -cameraRadius * Math.cos(alpha) * Math.sin(beta),
        cameraRadius * Math.cos(alpha) * Math.cos(beta),
        cameraRadius * Math.sin(alpha),
      );
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    };
    fitCamera();
    positionCamera(0, 0);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3.5);
    keyLight.position.set(-20, 12, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#ffffff", 1.2);
    fillLight.position.set(10, 6, -4);
    scene.add(fillLight);

    const trailData = new Float32Array(MAX_TRAIL * 4);
    const trailTexture = new THREE.DataTexture(
      trailData,
      MAX_TRAIL,
      1,
      THREE.RGBAFormat,
      THREE.FloatType,
    );
    trailTexture.needsUpdate = true;

    const trailUniforms = {
      uTrailTexture: { value: trailTexture },
      uTrailCount: { value: 0 },
      uFadeTime: { value: 2.0 },
      uWaveSpeed: { value: waveSpeed },
      uWaveFreq: { value: waveFrequency },
      uWaveWidth: { value: waveWidth },
      uAmplitude: { value: waveAmplitude },
      uJitter: { value: waveJitter },
      uMaxHeight: { value: waveMaxHeight },
    };
    const colorUniforms = {
      uColorBase: { value: new THREE.Color(colorBase) },
      uColorHigh: { value: new THREE.Color(colorHigh) },
    };

    const trail: { x: number; z: number; age: number; distDelta: number }[] = [];
    let lastPoint: { x: number; z: number } | null = null;
    let timeSinceLastMove = 0;
    let randomPointTimer = 0;
    let placingRandom = true;
    const fadeTime = 2.0;
    const trailSpacing = 0.25;

    const rayPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(bounds, bounds),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false }),
    );
    rayPlane.rotation.x = -Math.PI / 2;
    rayPlane.updateMatrixWorld(true);

    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let lastPointerTime = 0;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointerTime < 32) return;
      lastPointerTime = now;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerNDC.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      mouse.copy(pointerNDC);
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(rayPlane);
      if (hits.length === 0) return;
      const { x, z } = hits[0].point;

      let distDelta = 0.8;
      if (lastPoint) {
        const dx = x - lastPoint.x;
        const dz = z - lastPoint.z;
        distDelta = Math.sqrt(dx * dx + dz * dz);
        if (distDelta < trailSpacing) return;
      }
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta });
      lastPoint = { x, z };
      timeSinceLastMove = 0;
      placingRandom = false;
      randomPointTimer = 0;
    };
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    const onPointerLeave = () => {
      mouse.set(0, 0);
      lastPoint = null;
    };
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const addRandomPoint = () => {
      const x = (Math.random() * 0.5 - 0.25) * bounds;
      const z = (Math.random() * 0.5 - 0.25) * bounds;
      const distDelta = 0.8 + Math.random() * 0.2;
      if (trail.length >= MAX_TRAIL) trail.shift();
      trail.push({ x, z, age: 0, distDelta });
    };

    const updateTrail = (delta: number) => {
      const expiry = fadeTime * 3.5;
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += delta;
        if (trail[i].age > expiry) trail.splice(i, 1);
      }

      timeSinceLastMove += delta;
      if (timeSinceLastMove >= 2.5 && !placingRandom && propsRef.current.autoAnimate) {
        placingRandom = true;
        randomPointTimer = 0;
      }
      if (placingRandom && propsRef.current.autoAnimate) {
        randomPointTimer += delta;
        if (randomPointTimer >= 1.4) {
          addRandomPoint();
          randomPointTimer = 0;
        }
      }

      const count = Math.min(trail.length, MAX_TRAIL);
      if (count > 0 || trailUniforms.uTrailCount.value > 0) {
        for (let i = 0; i < count; i++) {
          const ti = i * 4;
          trailData[ti] = trail[i].x;
          trailData[ti + 1] = trail[i].z;
          trailData[ti + 2] = trail[i].age;
          trailData[ti + 3] = trail[i].distDelta;
        }
        trailTexture.needsUpdate = true;
        trailUniforms.uTrailCount.value = count;
      }
    };

    const count = gridSize * gridSize;
    const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeWidth);
    const offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(count * 2), 2);
    geometry.setAttribute("aOffset", offsetAttribute);

    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, trailUniforms, colorUniforms);
      shader.vertexShader = overrideVertexShader(shader.vertexShader);
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
          varying float vHeight;
          uniform vec3  uColorBase;
          uniform vec3  uColorHigh;
          uniform float uMaxHeight;`,
        )
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
          float t = clamp( vHeight / uMaxHeight, 0.0, 1.0 );
          diffuseColor.rgb = mix( uColorBase, uColorHigh, t );`,
        );
    };

    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(instancedMesh);

    const dummy = new THREE.Object3D();
    const spacing = cubeWidth + gap;
    const offset = ((gridSize - 1) * spacing) / 2;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const x = i * spacing - offset;
        const z = j * spacing - offset;
        dummy.position.set(x, 0, z);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(index, dummy.matrix);
        offsetAttribute.setXY(index, x, z);
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    offsetAttribute.needsUpdate = true;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.85;
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(size.pixelRatio);

    const applySize = () => {
      size = getSize();
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      fitCamera();
      positionCamera(lerpedMouse.x, lerpedMouse.y);
      renderer.setSize(size.width, size.height);
      renderer.setPixelRatio(size.pixelRatio);
    };
    window.addEventListener("resize", applySize, { passive: true });

    let isVisible = false;
    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const p = propsRef.current;

      trailUniforms.uWaveSpeed.value = p.waveSpeed;
      trailUniforms.uWaveFreq.value = p.waveFrequency;
      trailUniforms.uWaveWidth.value = p.waveWidth;
      trailUniforms.uAmplitude.value = p.waveAmplitude;
      trailUniforms.uJitter.value = p.waveJitter;
      trailUniforms.uMaxHeight.value = p.waveMaxHeight;

      updateTrail(delta);
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.05;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.05;
      positionCamera(lerpedMouse.x, lerpedMouse.y);
      renderer.render(scene, camera);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          clock.getDelta();
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", applySize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);

      geometry.dispose();
      material.dispose();
      rayPlane.geometry.dispose();
      (rayPlane.material as THREE.Material).dispose();
      trailTexture.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(8, 8, 9, 0.65) 100%)",
        }}
      />
      {children != null && <div className="pointer-events-none absolute inset-0">{children}</div>}
    </div>
  );
}

export default WaveGridBackground;
