"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
}

export function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    // SSR guard - only run on client
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Transparent background
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent
    rendererRef.current = renderer;

    // Append canvas to container
    container.appendChild(renderer.domElement);

    // Create floating particles/points
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10; // x
      positions[i + 1] = (Math.random() - 0.5) * 10; // y
      positions[i + 2] = (Math.random() - 0.5) * 10; // z
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xff5f1f, // Orange accent
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create wireframe icosahedron (subtle geometric shape)
    const icoGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5f1f,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    // Create a second, smaller icosahedron rotating opposite
    const icoGeometry2 = new THREE.IcosahedronGeometry(0.8, 1);
    const icoMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const icosahedron2 = new THREE.Mesh(icoGeometry2, icoMaterial2);
    scene.add(icosahedron2);

    // Create connecting lines (subtle grid effect)
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array([
      -5,
      0,
      -2,
      5,
      0,
      -2, // horizontal line
      0,
      -5,
      -2,
      0,
      5,
      -2, // vertical line
    ]);
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xff5f1f,
      transparent: true,
      opacity: 0.1,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate icosahedrons
      icosahedron.rotation.x = elapsedTime * 0.1;
      icosahedron.rotation.y = elapsedTime * 0.15;

      icosahedron2.rotation.x = -elapsedTime * 0.15;
      icosahedron2.rotation.y = -elapsedTime * 0.1;

      // Subtle float animation
      icosahedron.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
      icosahedron2.position.y = Math.cos(elapsedTime * 0.5) * 0.15;

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      // Camera follows mouse slightly
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);

      // Dispose of Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      icoGeometry2.dispose();
      icoMaterial2.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();

      // Remove canvas from DOM
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

export default ThreeBackground;
