"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CuteRobot.module.css";

export function CuteRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const headRef = useRef<THREE.Group | null>(null);

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
    camera.position.set(0, 0.5, 4);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(-5, 3, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xff5f1f, 0.8);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // === CREATE ROBOT WITH PROPER HIERARCHY ===
    // Structure: RobotRoot > Torso > Neck > Head > Eyes

    // Materials
    const orangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5f1f,
      metalness: 0.4,
      roughness: 0.5,
    });

    const darkOrangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc4c19,
      metalness: 0.5,
      roughness: 0.4,
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.2,
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });

    // RobotRoot - main container
    const robotRoot = new THREE.Group();
    robotRoot.name = "RobotRoot";

    // === TORSO ===
    const torso = new THREE.Group();
    torso.name = "Torso";

    // Main torso body
    const torsoGeometry = new THREE.BoxGeometry(1.4, 1.6, 0.9);
    const torsoMesh = new THREE.Mesh(torsoGeometry, darkOrangeMaterial);
    torsoMesh.name = "TorsoMesh";
    torso.add(torsoMesh);

    // Chest plate
    const chestPlateGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.15);
    const chestPlate = new THREE.Mesh(chestPlateGeometry, orangeMaterial);
    chestPlate.position.z = 0.45;
    torso.add(chestPlate);

    // Chest light
    const chestLightGeometry = new THREE.CircleGeometry(0.18, 32);
    const chestLight = new THREE.Mesh(chestLightGeometry, glowMaterial);
    chestLight.position.set(0, 0.1, 0.53);
    torso.add(chestLight);

    // Torso accent lines
    const accentGeometry = new THREE.BoxGeometry(1.42, 0.06, 0.92);
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    });

    const accent1 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent1.position.y = 0.5;
    torso.add(accent1);

    const accent2 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent2.position.y = -0.5;
    torso.add(accent2);

    // === ARMS ===
    const armGeometry = new THREE.CapsuleGeometry(0.14, 0.7, 8, 16);

    const leftArm = new THREE.Mesh(armGeometry, orangeMaterial);
    leftArm.position.set(-0.95, 0, 0);
    leftArm.rotation.z = 0.25;
    torso.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, orangeMaterial);
    rightArm.position.set(0.95, 0, 0);
    rightArm.rotation.z = -0.25;
    torso.add(rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.16, 16, 16);
    const handMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa80,
      metalness: 0.4,
      roughness: 0.5,
    });

    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-1.1, -0.55, 0);
    torso.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(1.1, -0.55, 0);
    torso.add(rightHand);

    robotRoot.add(torso);

    // === NECK ===
    const neck = new THREE.Group();
    neck.name = "Neck";
    neck.position.set(0, 1.0, 0); // Position on top of torso

    const neckGeometry = new THREE.CylinderGeometry(0.22, 0.28, 0.25, 16);
    const neckMesh = new THREE.Mesh(neckGeometry, darkOrangeMaterial);
    neck.add(neckMesh);

    torso.add(neck);

    // === HEAD (This will rotate to follow cursor) ===
    const head = new THREE.Group();
    head.name = "Head";
    head.position.set(0, 0.4, 0); // Position on top of neck
    headRef.current = head;

    // Head base
    const headGeometry = new THREE.BoxGeometry(1.1, 0.9, 0.8);
    const headMesh = new THREE.Mesh(headGeometry, orangeMaterial);
    headMesh.name = "HeadMesh";
    head.add(headMesh);

    // Face plate (darker area for eyes)
    const facePlateGeometry = new THREE.BoxGeometry(0.95, 0.65, 0.12);
    const facePlate = new THREE.Mesh(facePlateGeometry, blackMaterial);
    facePlate.position.z = 0.4;
    head.add(facePlate);

    // === EYES ===
    const eyeGeometry = new THREE.SphereGeometry(0.13, 32, 32);

    const eyeLeft = new THREE.Mesh(eyeGeometry, whiteMaterial);
    eyeLeft.name = "Eye_L";
    eyeLeft.position.set(-0.22, 0.05, 0.45);
    head.add(eyeLeft);

    const eyeRight = new THREE.Mesh(eyeGeometry, whiteMaterial);
    eyeRight.name = "Eye_R";
    eyeRight.position.set(0.22, 0.05, 0.45);
    head.add(eyeRight);

    // Pupils
    const pupilGeometry = new THREE.SphereGeometry(0.055, 16, 16);
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const pupilLeft = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilLeft.position.set(-0.22, 0.05, 0.57);
    head.add(pupilLeft);

    const pupilRight = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilRight.position.set(0.22, 0.05, 0.57);
    head.add(pupilRight);

    // === ANTENNA ===
    const antennaBaseGeometry = new THREE.CylinderGeometry(
      0.09,
      0.09,
      0.12,
      16
    );
    const antennaBase = new THREE.Mesh(antennaBaseGeometry, darkOrangeMaterial);
    antennaBase.position.y = 0.5;
    head.add(antennaBase);

    const antennaStickGeometry = new THREE.CylinderGeometry(
      0.035,
      0.035,
      0.4,
      8
    );
    const antennaStick = new THREE.Mesh(
      antennaStickGeometry,
      darkOrangeMaterial
    );
    antennaStick.position.y = 0.75;
    head.add(antennaStick);

    const antennaBallGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const antennaBall = new THREE.Mesh(antennaBallGeometry, glowMaterial);
    antennaBall.position.y = 0.98;
    head.add(antennaBall);

    // === EARS ===
    const earGeometry = new THREE.BoxGeometry(0.18, 0.28, 0.18);

    const earLeft = new THREE.Mesh(earGeometry, darkOrangeMaterial);
    earLeft.position.set(-0.62, 0, 0);
    head.add(earLeft);

    const earRight = new THREE.Mesh(earGeometry, darkOrangeMaterial);
    earRight.position.set(0.62, 0, 0);
    head.add(earRight);

    // Add head to neck
    neck.add(head);

    // Position robot
    robotRoot.position.y = -0.5;
    scene.add(robotRoot);

    // Store references for animation
    const chestLightMat = chestLight.material as THREE.MeshStandardMaterial;
    const antennaBallMat = antennaBall.material as THREE.MeshStandardMaterial;
    const eyeLeftMat = eyeLeft.material as THREE.MeshStandardMaterial;
    const eyeRightMat = eyeRight.material as THREE.MeshStandardMaterial;

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
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

      // HEAD follows cursor (only the head rotates!)
      if (headRef.current) {
        const targetRotationY = mouseRef.current.x * 0.6;
        const targetRotationX = -mouseRef.current.y * 0.35;

        headRef.current.rotation.y +=
          (targetRotationY - headRef.current.rotation.y) * 0.1;
        headRef.current.rotation.x +=
          (targetRotationX - headRef.current.rotation.x) * 0.1;
      }

      // Subtle body bob (only the root, not the head)
      robotRoot.position.y = -0.5 + Math.sin(elapsedTime * 1.5) * 0.04;

      // Pulsing lights
      chestLightMat.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 2) * 0.3;
      antennaBallMat.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 3) * 0.4;

      // Eye glow
      const eyeGlow = 0.4 + Math.sin(elapsedTime * 4) * 0.2;
      eyeLeftMat.emissiveIntensity = eyeGlow;
      eyeRightMat.emissiveIntensity = eyeGlow;

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
    <div
      ref={containerRef}
      className={styles.robotContainer}
      aria-hidden="true"
    />
  );
}

export default CuteRobot;
