import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Product, FlavorOption } from '../../types';

interface ProteinTub3DProps {
  product: Product;
  selectedFlavor: FlavorOption;
  scrollProgress?: number; // 0 to 1
  interactive?: boolean;
  exploded?: boolean;
  wireframe?: boolean;
  lightingMode?: 'studio' | 'neon' | 'warm' | 'dark';
  className?: string;
  onRotate?: (angle: number) => void;
}

export const ProteinTub3D: React.FC<ProteinTub3DProps> = ({
  product,
  selectedFlavor,
  scrollProgress = 0,
  interactive = true,
  exploded = false,
  wireframe = false,
  lightingMode = 'studio',
  className = 'w-full h-full min-h-[360px]',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const tubGroupRef = useRef<THREE.Group | null>(null);
  const lidMeshRef = useRef<THREE.Mesh | null>(null);
  const bodyMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number>(0);
  const labelTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const lightsRef = useRef<{ [key: string]: THREE.Light }>({});

  // Mouse & Touch interaction state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0.003 });
  const userRotation = useRef({ x: 0.1, y: -0.2 });

  // Generate dynamic 2D canvas texture for the jar label
  const createLabelTexture = (prod: Product, flav: FlavorOption) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background gradient for label
    const gradient = ctx.createLinearGradient(0, 0, 1024, 0);
    gradient.addColorStop(0, '#0a0d14');
    gradient.addColorStop(0.3, '#121722');
    gradient.addColorStop(0.7, '#141a26');
    gradient.addColorStop(1, '#0a0d14');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // Helper for safe roundRect
    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
    };

    // Accent glow stripe
    ctx.fillStyle = flav.accentHex || '#dc2626';
    ctx.fillRect(0, 12, 1024, 8);
    ctx.fillRect(0, 492, 1024, 8);

    // Subtle metallic grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 1024; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 20);
      ctx.lineTo(i, 490);
      ctx.stroke();
    }

    // Brand Logo - WHEYSTED
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 60px Plus Jakarta Sans, sans-serif';
    ctx.fillText('WHEYSTED', 380, 95);

    // Brand sub-mark: PROTEIN STORE (Red badge)
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    drawRoundRect(710, 60, 220, 40, 6);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 18px Plus Jakarta Sans, sans-serif';
    ctx.fillText('PROTEIN STORE', 740, 86);

    // Product Title
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 44px Plus Jakarta Sans, sans-serif';
    ctx.fillText(prod.name, 380, 175);

    // Tagline / Category
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 20px Plus Jakarta Sans, sans-serif';
    ctx.fillText(prod.tagline.slice(0, 45) + '...', 380, 215);

    // Flavor Pill Tag
    ctx.fillStyle = flav.colorHex || '#dc2626';
    ctx.beginPath();
    drawRoundRect(380, 250, 420, 50, 25);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 22px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`FLAVOR: ${flav.name.toUpperCase()}`, 405, 283);

    // 3 Big Macro Metrics Badges
    const metrics = [
      { num: `${prod.proteinGrams}g`, label: 'PROTEIN' },
      { num: `${prod.bcaaGrams}g`, label: 'BCAAs' },
      { num: `${prod.sugarGrams}g`, label: 'SUGAR' },
    ];

    metrics.forEach((m, idx) => {
      const x = 380 + idx * 160;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      drawRoundRect(x, 330, 140, 90, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      ctx.fillStyle = flav.accentHex || '#ef4444';
      ctx.font = '800 36px Plus Jakarta Sans, sans-serif';
      ctx.fillText(m.num, x + 15, 375);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '700 15px Plus Jakarta Sans, sans-serif';
      ctx.fillText(m.label, x + 15, 405);
    });

    // Left barcode & certification stamp
    ctx.fillStyle = '#64748b';
    ctx.font = '600 16px monospace';
    ctx.fillText('BATCH: 2026-VOLT-A109', 60, 420);
    ctx.fillText('99.4% CFM PURITY YIELD', 60, 445);

    // Barcode lines
    for (let b = 60; b < 280; b += 6) {
      ctx.fillStyle = b % 12 === 0 ? '#cbd5e1' : '#475569';
      ctx.fillRect(b, 460, (b % 18 === 0 ? 4 : 2), 24);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 8;
    return texture;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 6.2);
    cameraRef.current = camera;

    // Renderer with anti-aliasing & alpha transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const mainSpot = new THREE.SpotLight(0xffffff, 3.5);
    mainSpot.position.set(5, 8, 7);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.8;
    mainSpot.castShadow = true;
    scene.add(mainSpot);
    lightsRef.current.spot = mainSpot;

    const rimLight = new THREE.DirectionalLight(new THREE.Color(selectedFlavor.accentHex || '#10b981'), 2.5);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);
    lightsRef.current.rim = rimLight;

    const topFill = new THREE.DirectionalLight(0xffffff, 1.2);
    topFill.position.set(0, 6, 2);
    scene.add(topFill);

    // 3D Protein Tub Group
    const tubGroup = new THREE.Group();
    tubGroupRef.current = tubGroup;
    scene.add(tubGroup);

    // 1. Jar Main Body (Cylinder with label mapped)
    const labelTexture = createLabelTexture(product, selectedFlavor);
    labelTextureRef.current = labelTexture;

    const bodyGeometry = new THREE.CylinderGeometry(1.25, 1.25, 2.5, 64, 16);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(product.tubColor || '#111827'),
      map: labelTexture,
      roughness: 0.28,
      metalness: 0.18,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
      wireframe: wireframe,
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    bodyMesh.position.y = 0;
    bodyMeshRef.current = bodyMesh;
    tubGroup.add(bodyMesh);

    // 2. Beveled Base Ring
    const baseGeo = new THREE.CylinderGeometry(1.22, 1.15, 0.25, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#080b11'),
      roughness: 0.5,
      metalness: 0.4,
      wireframe: wireframe,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.35;
    tubGroup.add(baseMesh);

    // 3. Metallic Neck Ring
    const neckGeo = new THREE.CylinderGeometry(1.05, 1.25, 0.2, 64);
    const neckMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFlavor.accentHex || '#10b981'),
      roughness: 0.2,
      metalness: 0.85,
      wireframe: wireframe,
    });
    const neckMesh = new THREE.Mesh(neckGeo, neckMat);
    neckMesh.position.y = 1.35;
    tubGroup.add(neckMesh);

    // 4. Ribbed Lid (Screw Top)
    const lidGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.45, 64, 4);
    const lidMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(product.lidColor || '#070a10'),
      roughness: 0.35,
      metalness: 0.5,
      wireframe: wireframe,
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 1.65;
    lidMesh.castShadow = true;
    lidMeshRef.current = lidMesh;
    tubGroup.add(lidMesh);

    // 5. Lid Top Seal Indent
    const lidTopGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.05, 48);
    const lidTopMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedFlavor.accentHex || '#10b981'),
      roughness: 0.3,
      metalness: 0.7,
    });
    const lidTopMesh = new THREE.Mesh(lidTopGeo, lidTopMat);
    lidTopMesh.position.y = 1.88;
    lidMesh.add(lidTopMesh);

    // 6. Floating Powder Burst Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.5 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;

      particlePositions[i * 3] = Math.cos(theta) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(theta) * radius;
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(selectedFlavor.accentHex || '#10b981'),
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    tubGroup.add(particles);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Mouse & Touch Drag Controls
    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive || !isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      userRotation.current.y += deltaX * 0.008;
      userRotation.current.x = Math.max(-0.6, Math.min(0.6, userRotation.current.x + deltaY * 0.005));

      rotationVelocity.current = {
        x: deltaY * 0.001,
        y: deltaX * 0.002,
      };

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Render & Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertia & slow auto-rotation if not actively dragging
      if (!isDragging.current) {
        userRotation.current.y += rotationVelocity.current.y;
        userRotation.current.x += rotationVelocity.current.x;
        // Damp velocity
        rotationVelocity.current.y = rotationVelocity.current.y * 0.96 + 0.0015;
        rotationVelocity.current.x *= 0.92;
      }

      // Apply rotations to tub group
      if (tubGroupRef.current) {
        // Base hover float effect
        const hoverOffset = Math.sin(elapsedTime * 1.5) * 0.08;
        
        // Scroll influence
        const scrollTilt = (scrollProgress - 0.5) * 0.8;
        tubGroupRef.current.position.y = hoverOffset - scrollTilt * 0.5;
        tubGroupRef.current.rotation.x = userRotation.current.x + Math.sin(elapsedTime * 0.8) * 0.03;
        tubGroupRef.current.rotation.y = userRotation.current.y;
        tubGroupRef.current.rotation.z = Math.cos(elapsedTime * 1.2) * 0.02;

        // Exploded view lid animation
        if (lidMeshRef.current) {
          const targetLidY = exploded ? 2.6 : 1.65;
          lidMeshRef.current.position.y = THREE.MathUtils.lerp(lidMeshRef.current.position.y, targetLidY, 0.08);
          lidMeshRef.current.rotation.y = elapsedTime * 0.8;
        }

        // Particle floating orbit animation
        if (particlesRef.current) {
          particlesRef.current.rotation.y = elapsedTime * 0.15;
          particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
    };
  }, [product.id, wireframe]);

  // Update dynamic label texture and materials when flavor or product props change
  useEffect(() => {
    if (!bodyMeshRef.current || !product || !selectedFlavor) return;
    const newTex = createLabelTexture(product, selectedFlavor);
    if (newTex) {
      if (labelTextureRef.current) labelTextureRef.current.dispose();
      labelTextureRef.current = newTex;
      
      const bodyMat = bodyMeshRef.current.material as THREE.MeshPhysicalMaterial;
      bodyMat.map = newTex;
      bodyMat.color = new THREE.Color(product.tubColor || '#111827');
      bodyMat.needsUpdate = true;
    }

    if (lightsRef.current.rim) {
      lightsRef.current.rim.color = new THREE.Color(selectedFlavor.accentHex || '#10b981');
    }

    if (particlesRef.current) {
      const partMat = particlesRef.current.material as THREE.PointsMaterial;
      partMat.color = new THREE.Color(selectedFlavor.accentHex || '#10b981');
      partMat.needsUpdate = true;
    }
  }, [selectedFlavor.id, product.id, lightingMode]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none cursor-grab active:cursor-grabbing touch-none ${className}`}
      title="Click and drag to spin 360°"
    />
  );
};
