import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface NeuralCoreProps {
  interactive?: boolean;
}

export const NeuralCoreCanvas: React.FC<NeuralCoreProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isSoftwareMode, setIsSoftwareMode] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability and software rasterizer
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch (e) {
        return true;
      }
    })();

    setIsSoftwareMode(isSoftwareGl);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch (e) {
      console.warn('WebGL context creation failed; using fallback');
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.028);

    // Studio Environment Reflections via RoomEnvironment for authentic PBR metals and optical glass
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      // Fallback if environment generation fails
    }

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.5);
    const targetCameraZ = 6.8;

    // Master Machine Assembly
    const machine = new THREE.Group();
    scene.add(machine);

    // -------------------------------------------------------------
    // REALISTIC INDUSTRIAL PBR MATERIALS
    // -------------------------------------------------------------
    // 1. Dark Brushed Titanium Alloy (CNC milled structural gimbal)
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      metalness: 0.94,
      roughness: 0.28,
    });

    // 2. Anodized Aerospace Gunmetal (secondary frame & hubs)
    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x2e3848,
      metalness: 0.92,
      roughness: 0.22,
    });

    // 3. Polished Chrome / Steel Accents (fasteners, pivot bearings, shafts)
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.12,
    });

    // 4. Cryogenic Gold Plating (thermal coupling conduits & bus bars)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      metalness: 0.95,
      roughness: 0.2,
    });

    // 5. Braided Pure Copper Thermal Tubing
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb4643c,
      metalness: 0.92,
      roughness: 0.26,
    });

    // 6. Optical Fused Quartz / Sapphire Crystal (Refractive core chamber)
    const opticalCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.05,
      roughness: 0.04,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 0.95,
      ior: 1.76, // Real sapphire index of refraction
      thickness: 2.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      attenuationColor: new THREE.Color(0x38bdf8),
      attenuationDistance: 2.5,
    });

    // 7. Micro-Silicon Circuit Wafer Texture (Procedural Integrated Circuit Die)
    const chipCanvas = document.createElement('canvas');
    chipCanvas.width = 512;
    chipCanvas.height = 512;
    const chipCtx = chipCanvas.getContext('2d');
    if (chipCtx) {
      // Silicon substrate dark obsidian
      chipCtx.fillStyle = '#080d16';
      chipCtx.fillRect(0, 0, 512, 512);

      // Gold circuitry tracks
      chipCtx.strokeStyle = '#cda250';
      chipCtx.lineWidth = 1.5;

      // Circuit grid array
      for (let i = 40; i < 480; i += 24) {
        chipCtx.beginPath();
        chipCtx.moveTo(i, 40);
        chipCtx.lineTo(i, 472);
        chipCtx.stroke();

        chipCtx.beginPath();
        chipCtx.moveTo(40, i);
        chipCtx.lineTo(472, i);
        chipCtx.stroke();
      }

      // Central processor core die
      chipCtx.fillStyle = '#111827';
      chipCtx.strokeStyle = '#38bdf8';
      chipCtx.lineWidth = 3;
      chipCtx.strokeRect(160, 160, 192, 192);
      chipCtx.fillRect(160, 160, 192, 192);

      // Micro interconnect bonding pads
      chipCtx.fillStyle = '#f59e0b';
      for (let p = 175; p <= 335; p += 20) {
        chipCtx.fillRect(p, 165, 8, 8);
        chipCtx.fillRect(p, 339, 8, 8);
        chipCtx.fillRect(165, p, 8, 8);
        chipCtx.fillRect(339, p, 8, 8);
      }
    }
    const chipTexture = new THREE.CanvasTexture(chipCanvas);
    chipTexture.colorSpace = THREE.SRGBColorSpace;
    chipTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const siliconDieMat = new THREE.MeshStandardMaterial({
      map: chipTexture,
      metalness: 0.85,
      roughness: 0.15,
    });

    // -------------------------------------------------------------
    // 1. CENTRAL CRYOGENIC OPTICAL CHAMBER (The Physical Core)
    // -------------------------------------------------------------
    const coreAssembly = new THREE.Group();
    machine.add(coreAssembly);

    // Thick Beveled Octahedral Crystal Prism
    const crystalGeom = new THREE.OctahedronGeometry(1.2, 0);
    const crystalMesh = new THREE.Mesh(crystalGeom, opticalCrystalMat);
    coreAssembly.add(crystalMesh);

    // Suspended Silicon Quantum Processor Die (Suspended horizontally inside crystal)
    const dieGeom = new THREE.BoxGeometry(0.85, 0.04, 0.85);
    const dieMesh = new THREE.Mesh(dieGeom, siliconDieMat);
    coreAssembly.add(dieMesh);

    // Precision Gold Micro-Tension Mounting Needles (holding the die inside the optics)
    const pinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    for (let i = 0; i < 4; i++) {
      const pin = new THREE.Mesh(pinGeom, goldMat);
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      pin.position.set(0.52 * Math.cos(angle), 0, 0.52 * Math.sin(angle));
      pin.rotation.z = Math.PI / 2;
      pin.rotation.y = -angle;
      coreAssembly.add(pin);
    }

    // Cryo Heat Sink Hubs (Upper and lower axial heatsink caps)
    const heatsinkGeom = new THREE.CylinderGeometry(0.35, 0.45, 0.28, 24);
    const topHeatsink = new THREE.Mesh(heatsinkGeom, titaniumMat);
    topHeatsink.position.y = 1.05;
    coreAssembly.add(topHeatsink);

    const bottomHeatsink = new THREE.Mesh(heatsinkGeom, titaniumMat);
    bottomHeatsink.position.y = -1.05;
    bottomHeatsink.rotation.x = Math.PI;
    coreAssembly.add(bottomHeatsink);

    // Internal Soft Quantum Luminescence (Subtle physical light, not cartoon neon)
    const internalCoreLight = new THREE.PointLight(0x7dd3fc, 2.2, 5);
    internalCoreLight.position.set(0, 0, 0);
    coreAssembly.add(internalCoreLight);

    // -------------------------------------------------------------
    // 2. INNER ROTATING GIMBAL & STATOR BLADES
    // -------------------------------------------------------------
    const innerGimbal = new THREE.Group();
    machine.add(innerGimbal);

    // Machined Inner Gimbal Ring
    const innerRingGeom = new THREE.TorusGeometry(1.9, 0.048, 16, 96);
    const innerRingMesh = new THREE.Mesh(innerRingGeom, gunmetalMat);
    innerGimbal.add(innerRingMesh);

    // Radial Stator Cooling Vanes (24 precision blades around inner perimeter)
    const vaneCount = 24;
    const vaneGeom = new THREE.BoxGeometry(0.015, 0.16, 0.06);
    const vaneMesh = new THREE.InstancedMesh(vaneGeom, titaniumMat, vaneCount);
    const dummyMat4 = new THREE.Matrix4();

    for (let i = 0; i < vaneCount; i++) {
      const angle = (i / vaneCount) * Math.PI * 2;
      dummyMat4.identity();
      dummyMat4.makeRotationZ(angle);
      dummyMat4.setPosition(1.78 * Math.cos(angle), 1.78 * Math.sin(angle), 0);
      vaneMesh.setMatrixAt(i, dummyMat4);
    }
    vaneMesh.instanceMatrix.needsUpdate = true;
    innerRingMesh.add(vaneMesh);

    // Braided Copper Thermal Conduits (Loops routing around the inner ring)
    const curvePoints: THREE.Vector3[] = [];
    const copperCurveCount = 36;
    for (let i = 0; i <= copperCurveCount; i++) {
      const theta = (i / copperCurveCount) * Math.PI * 2;
      const r = 2.05 + Math.sin(theta * 4) * 0.08;
      const y = Math.cos(theta * 3) * 0.18;
      curvePoints.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
    }
    const copperPath = new THREE.CatmullRomCurve3(curvePoints);
    const copperTubeGeom = new THREE.TubeGeometry(copperPath, 64, 0.022, 8, true);
    const copperTubeMesh = new THREE.Mesh(copperTubeGeom, copperMat);
    innerGimbal.add(copperTubeMesh);

    // -------------------------------------------------------------
    // 3. MID HIGH-SPEED PRECISION GIMBAL RING
    // -------------------------------------------------------------
    const midGimbal = new THREE.Group();
    machine.add(midGimbal);

    // Beveled Toroidal Ring
    const midRingGeom = new THREE.TorusGeometry(2.65, 0.06, 16, 110);
    const midRingMesh = new THREE.Mesh(midRingGeom, titaniumMat);
    midRingMesh.rotation.x = Math.PI / 3;
    midGimbal.add(midRingMesh);

    // Precision CNC Calibration Markings (48 micro hex studs)
    const studCount = 48;
    const studGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.07, 6);
    const studMesh = new THREE.InstancedMesh(studGeom, chromeMat, studCount);

    for (let i = 0; i < studCount; i++) {
      const angle = (i / studCount) * Math.PI * 2;
      dummyMat4.identity();
      dummyMat4.makeRotationZ(angle);
      dummyMat4.setPosition(2.65 * Math.cos(angle), 2.65 * Math.sin(angle), 0.06);
      studMesh.setMatrixAt(i, dummyMat4);
    }
    studMesh.instanceMatrix.needsUpdate = true;
    midRingMesh.add(studMesh);

    // Pivot Bearing Hubs on Gimbal Axis
    const pivotGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 16);
    const pivot1 = new THREE.Mesh(pivotGeom, gunmetalMat);
    pivot1.position.set(2.65, 0, 0);
    pivot1.rotation.z = Math.PI / 2;
    midRingMesh.add(pivot1);

    const pivot2 = new THREE.Mesh(pivotGeom, gunmetalMat);
    pivot2.position.set(-2.65, 0, 0);
    pivot2.rotation.z = Math.PI / 2;
    midRingMesh.add(pivot2);

    // -------------------------------------------------------------
    // 4. OUTER STRUCTURAL CHASSIS & MAGNETIC SUSPENSION HOUSING
    // -------------------------------------------------------------
    const outerChassis = new THREE.Group();
    machine.add(outerChassis);

    // Outer Aerospace Alloy Gimbal
    const outerRingGeom = new THREE.TorusGeometry(3.35, 0.075, 18, 120);
    const outerRingMesh = new THREE.Mesh(outerRingGeom, gunmetalMat);
    outerRingMesh.rotation.y = Math.PI / 4;
    outerChassis.add(outerRingMesh);

    // 4 Heavy-Duty Magnetic Suspension Clamps (Cardinal anchor pods)
    const clampGeom = new THREE.BoxGeometry(0.24, 0.42, 0.22);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const clamp = new THREE.Mesh(clampGeom, titaniumMat);
      clamp.position.set(3.4 * Math.cos(angle), 3.4 * Math.sin(angle), 0);
      clamp.rotation.z = angle + Math.PI / 2;

      // Polished chrome hydraulic actuator rod
      const rodGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12);
      const rod = new THREE.Mesh(rodGeom, chromeMat);
      rod.position.y = -0.22;
      clamp.add(rod);

      // Micro status optical pin (subtle cold white/cyan status indicator)
      const indicatorGeom = new THREE.SphereGeometry(0.025, 8, 8);
      const indicatorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const indicator = new THREE.Mesh(indicatorGeom, indicatorMat);
      indicator.position.set(0, 0, 0.12);
      clamp.add(indicator);

      outerRingMesh.add(clamp);
    }

    // -------------------------------------------------------------
    // 5. NATURAL SPECULAR AIR MOTES (Clean, realistic atmospheric dust)
    // -------------------------------------------------------------
    const moteCount = isSoftwareGl ? 200 : 600;
    const moteGeom = new THREE.BufferGeometry();
    const motePositions = new Float32Array(moteCount * 3);
    const moteSpeeds: { vx: number; vy: number; vz: number; baseR: number; angle: number }[] = [];

    for (let i = 0; i < moteCount; i++) {
      const r = 2.0 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;

      motePositions[i * 3] = r * Math.cos(angle);
      motePositions[i * 3 + 1] = y;
      motePositions[i * 3 + 2] = r * Math.sin(angle);

      moteSpeeds.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: 0.003 + Math.random() * 0.008,
        vz: (Math.random() - 0.5) * 0.005,
        baseR: r,
        angle: angle,
      });
    }

    moteGeom.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));

    // Subtle natural soft circular particle map
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.3, 'rgba(224, 242, 254, 0.45)');
      grad.addColorStop(0.8, 'rgba(186, 230, 253, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const moteTexture = new THREE.CanvasTexture(pCanvas);
    moteTexture.colorSpace = THREE.SRGBColorSpace;

    const moteMat = new THREE.PointsMaterial({
      size: 0.08,
      map: moteTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const motes = new THREE.Points(moteGeom, moteMat);
    scene.add(motes);

    // -------------------------------------------------------------
    // 6. PHOTOGRAPHIC STUDIO LIGHTING RIG (Balanced Color Temperature)
    // -------------------------------------------------------------
    // Key Light: 5500K Neutral-Cool Photographic Key Light
    const keyLight = new THREE.DirectionalLight(0xf0f9ff, 3.2);
    keyLight.position.set(6, 7, 7);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Fill Light: 3400K Warm Tungsten Bounce for rich metallic temperature contrast
    const fillLight = new THREE.DirectionalLight(0xffedd5, 1.6);
    fillLight.position.set(-6, -4, -3);
    scene.add(fillLight);

    // Specular Rim: 6500K Sharp Cool Grazing Rim Light (catches CNC bevels)
    const rimLight = new THREE.DirectionalLight(0xbae6fd, 2.8);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // Ground Contact Light / Ambient Occlusion Fill
    const ambientLight = new THREE.AmbientLight(0x0a101d, 0.85);
    scene.add(ambientLight);

    // -------------------------------------------------------------
    // 7. REALISTIC KINEMATICS & SMOOTH CURSOR PARALLAX
    // -------------------------------------------------------------
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let scrollDepthOffset = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.35;
      targetRotX = -ny * 0.25;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollDepthOffset = Math.min(scrollY / 800, 2.5);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // 8. ANIMATION LOOP (Authentic Precision Mechanical Movement)
    // -------------------------------------------------------------
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera Arrival: Smooth cinematic dolly
      if (camera.position.z > targetCameraZ + 0.05) {
        camera.position.z += (targetCameraZ - camera.position.z) * (delta * 1.6);
      } else {
        camera.position.z = targetCameraZ + scrollDepthOffset * 0.75;
      }

      // 1. Quantum Optical Crystal Chamber - Slow Majestic Drift
      crystalMesh.rotation.y += delta * 0.16;
      crystalMesh.rotation.x += delta * 0.09;

      // Silicon die counter-aligning
      dieMesh.rotation.y -= delta * 0.22;

      // 2. Inner Gimbal - Moderate High-Speed Rotation
      innerGimbal.rotation.y += delta * 0.32;
      innerGimbal.rotation.z += delta * 0.12;

      // 3. Mid Gimbal - Opposing Differential Precession
      midGimbal.rotation.x -= delta * 0.22;
      midGimbal.rotation.z -= delta * 0.16;

      // 4. Outer Chassis - Very Slow Stately Anchor Movement
      outerChassis.rotation.z += delta * 0.06;
      outerChassis.rotation.y -= delta * 0.04;

      // 5. Specular Motes - Natural Laminar Drift
      const posArray = moteGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < moteCount; i++) {
        const s = moteSpeeds[i];
        s.angle += delta * 0.08;
        posArray[i * 3] = s.baseR * Math.cos(s.angle);
        posArray[i * 3 + 1] += s.vy;
        posArray[i * 3 + 2] = s.baseR * Math.sin(s.angle);

        // Reset if drifted too high
        if (posArray[i * 3 + 1] > 3.0) {
          posArray[i * 3 + 1] = -3.0;
        }
      }
      moteGeom.attributes.position.needsUpdate = true;

      // 6. Smooth Mouse Parallax Damping
      currentRotX += (targetRotX - currentRotX) * 0.04;
      currentRotY += (targetRotY - currentRotY) * 0.04;

      machine.rotation.x = currentRotX + scrollDepthOffset * 0.12;
      machine.rotation.y = currentRotY + elapsed * 0.035;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Thorough cleanup
      crystalGeom.dispose();
      dieGeom.dispose();
      pinGeom.dispose();
      heatsinkGeom.dispose();
      innerRingGeom.dispose();
      vaneGeom.dispose();
      copperTubeGeom.dispose();
      midRingGeom.dispose();
      studGeom.dispose();
      pivotGeom.dispose();
      outerRingGeom.dispose();
      clampGeom.dispose();
      moteGeom.dispose();

      titaniumMat.dispose();
      gunmetalMat.dispose();
      chromeMat.dispose();
      goldMat.dispose();
      copperMat.dispose();
      opticalCrystalMat.dispose();
      siliconDieMat.dispose();
      chipTexture.dispose();
      moteMat.dispose();
      moteTexture.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-radial from-slate-900 to-[#02040a] overflow-hidden">
        <div className="relative w-80 h-80 rounded-full border border-slate-700/40 flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border border-slate-600/30 flex items-center justify-center" />
          <div className="w-32 h-32 rounded-full bg-cyan-500/5 blur-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {isSoftwareMode && (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 text-[11px] font-mono text-slate-400 bg-slate-900/80 rounded border border-slate-800">
          Software Performance Mode
        </div>
      )}
    </div>
  );
};
