"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CuteRobot.module.css";

export function CuteRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const headRef = useRef<THREE.Group | null>(null);
  const eyesRef = useRef<{ left: THREE.Mesh; right: THREE.Mesh } | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff5f1f, 0.5);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Robot Group
    const robot = new THREE.Group();

    // === BODY ===
    const bodyGeometry = new THREE.BoxGeometry(1.2, 1.4, 0.8);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.5;
    robot.add(body);

    // Body accent lines
    const bodyAccentGeometry = new THREE.BoxGeometry(1.22, 0.05, 0.82);
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5f1f,
      emissive: 0xff5f1f,
      emissiveIntensity: 0.3,
    });
    const bodyAccent1 = new THREE.Mesh(bodyAccentGeometry, accentMaterial);
    bodyAccent1.position.y = -0.2;
    robot.add(bodyAccent1);

    const bodyAccent2 = new THREE.Mesh(bodyAccentGeometry, accentMaterial);
    bodyAccent2.position.y = -0.8;
    robot.add(bodyAccent2);

    // Chest light
    const chestLightGeometry = new THREE.CircleGeometry(0.15, 32);
    const chestLightMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5f1f,
      emissive: 0xff5f1f,
      emissiveIntensity: 0.8,
    });
    const chestLight = new THREE.Mesh(chestLightGeometry, chestLightMaterial);
    chestLight.position.set(0, -0.5, 0.41);
    robot.add(chestLight);

    // === HEAD (Group for rotation) ===
    const head = new THREE.Group();
    headRef.current = head;

    // Head base
    const headGeometry = new THREE.BoxGeometry(1, 0.8, 0.7);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.6,
      roughness: 0.4,
    });
    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headMesh);

    // Face plate
    const facePlateGeometry = new THREE.BoxGeometry(0.9, 0.6, 0.1);
    const facePlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const facePlate = new THREE.Mesh(facePlateGeometry, facePlateMaterial);
    facePlate.position.z = 0.35;
    head.add(facePlate);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.22, 0.05, 0.4);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.22, 0.05, 0.4);
    head.add(rightEye);

    eyesRef.current = { left: leftEye, right: rightEye };

    // Eye pupils (darker center)
    const pupilGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
    });

    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.22, 0.05, 0.52);
    head.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.22, 0.05, 0.52);
    head.add(rightPupil);

    // Antenna
    const antennaBaseGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    const antennaMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const antennaBase = new THREE.Mesh(antennaBaseGeometry, antennaMaterial);
    antennaBase.position.y = 0.45;
    head.add(antennaBase);

    const antennaStickGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8);
    const antennaStick = new THREE.Mesh(antennaStickGeometry, antennaMaterial);
    antennaStick.position.y = 0.65;
    head.add(antennaStick);

    const antennaBallGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const antennaBallMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5f1f,
      emissive: 0xff5f1f,
      emissiveIntensity: 0.6,
    });
    const antennaBall = new THREE.Mesh(antennaBallGeometry, antennaBallMaterial);
    antennaBall.position.y = 0.85;
    head.add(antennaBall);

    // Ears
    const earGeometry = new THREE.BoxGeometry(0.15, 0.25, 0.15);
    const earMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      metalness: 0.7,
      roughness: 0.3,
    });

    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.57, 0, 0);
    head.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.57, 0, 0);
    head.add(rightEar);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.2, 16);
    const neckMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.6,
      roughness: 0.4,
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = -0.5;
    head.add(neck);

    head.position.y = 0.6;
    robot.add(head);

    // === ARMS ===
    const armGeometry = new THREE.CapsuleGeometry(0.12, 0.6, 8, 16);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.6,
      roughness: 0.4,
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.85, -0.5, 0);
    leftArm.rotation.z = 0.2;
    robot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.85, -0.5, 0);
    rightArm.rotation.z = -0.2;
    robot.add(rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const handMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a4a4a,
      metalness: 0.7,
      roughness: 0.3,
    });

    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.95, -1, 0);
    robot.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.95, -1, 0);
    robot.add(rightHand);

    // Position robot
    robot.position.y = -0.3;
    scene.add(robot);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Head follows cursor
      if (headRef.current) {
        const targetRotationY = mouseRef.current.x * 0.5;
        const targetRotationX = -mouseRef.current.y * 0.3;

        headRef.current.rotation.y +=
          (targetRotationY - headRef.current.rotation.y) * 0.1;
        headRef.current.rotation.x +=
          (targetRotationX - headRef.current.rotation.x) * 0.1;
      }

      // Subtle body bob
      robot.position.y = -0.3 + Math.sin(elapsedTime * 2) * 0.03;

      // Antenna ball glow pulse
      antennaBallMaterial.emissiveIntensity =
        0.4 + Math.sin(elapsedTime * 3) * 0.3;

      // Chest light pulse
      chestLightMaterial.emissiveIntensity =
        0.6 + Math.sin(elapsedTime * 2) * 0.2;

      // Eye glow pulse
      eyeMaterial.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 4) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.robotContainer} aria-hidden="true" />
  );
}

export default CuteRobot;

