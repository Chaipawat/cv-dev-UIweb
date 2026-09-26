"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

const CLOCK_DEPRECATION = "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.";
if (typeof window !== "undefined") {
  const previous = THREE.getConsoleFunction();
  THREE.setConsoleFunction((type: "log" | "warn" | "error", message: string, ...params: unknown[]) => {
    if (type === "warn" && message === CLOCK_DEPRECATION) return;
    if (previous) return previous(type, message, ...params);
    console[type](message, ...params);
  });
}

const COLORS = {
  ivory: "#f2ede3",
  warmWhite: "#fff8eb",
  charcoal: "#1c1b18",
  silver: "#aaa394",
  darkSilver: "#625f58",
  orange: "#f04a2a",
  amber: "#c97916",
} as const;

interface ContactDeskSceneProps {
  compact: boolean;
  reducedMotion: boolean;
  onReady: () => void;
  onFail: () => void;
}

function PointerRig({ compact, reducedMotion, children }: { compact: boolean; reducedMotion: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ x: 0, y: 0 });
  const dragging = useRef<{ id: number; x: number; y: number; startX: number; startY: number } | null>(null);
  const { gl, invalidate } = useThree();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = gl.domElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const parallaxY = compact ? THREE.MathUtils.degToRad(2) : THREE.MathUtils.degToRad(8);
    const parallaxX = compact ? THREE.MathUtils.degToRad(1) : THREE.MathUtils.degToRad(4);
    const dragLimit = THREE.MathUtils.degToRad(12);

    const move = (event: PointerEvent) => {
      const active = dragging.current;
      if (active) {
        drag.current.x = THREE.MathUtils.clamp(active.startX + (event.clientX - active.x) * 0.006, -dragLimit, dragLimit);
        drag.current.y = THREE.MathUtils.clamp(active.startY + (event.clientY - active.y) * 0.006, -dragLimit, dragLimit);
      } else {
        const rect = canvas.getBoundingClientRect();
        pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * parallaxY * 2;
        pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * parallaxX * 2;
      }
      invalidate();
    };
    const down = (event: PointerEvent) => {
      if (compact || !finePointer) return;
      dragging.current = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: drag.current.x, startY: drag.current.y };
      canvas.setPointerCapture(event.pointerId);
    };
    const up = (event: PointerEvent) => {
      if (dragging.current?.id !== event.pointerId) return;
      dragging.current = null;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const leave = () => {
      if (!dragging.current) pointer.current = { x: 0, y: 0 };
      invalidate();
    };

    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [compact, gl, invalidate, reducedMotion]);

  useFrame((_state, delta) => {
    const current = group.current;
    if (!current || reducedMotion) return;
    const totalLimit = THREE.MathUtils.degToRad(12);
    const targetY = THREE.MathUtils.clamp(pointer.current.x + drag.current.x, -totalLimit, totalLimit);
    const targetX = THREE.MathUtils.clamp(-pointer.current.y + drag.current.y, -totalLimit, totalLimit);
    const ease = 1 - Math.exp(-delta * 6);
    current.rotation.y += (targetY - current.rotation.y) * ease;
    current.rotation.x += (targetX - current.rotation.x) * ease;
    if (Math.abs(targetY - current.rotation.y) + Math.abs(targetX - current.rotation.x) > 0.0003) invalidate();
  });

  return <group ref={group}>{children}</group>;
}

function Laptop({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const screenMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { invalidate } = useThree();
  const codeLines = useMemo(
    () => [
      { x: -0.59, y: 0.35, width: 0.64, color: COLORS.orange },
      { x: -0.43, y: 0.09, width: 0.92, color: COLORS.ivory },
      { x: -0.5, y: -0.17, width: 0.76, color: "#b3c4ae" },
      { x: -0.33, y: -0.43, width: 1.04, color: COLORS.silver },
    ],
    [],
  );

  useFrame((_state, delta) => {
    const material = screenMaterial.current;
    if (!material) return;
    const target = hovered && !reducedMotion ? 0.86 : 0.48;
    material.emissiveIntensity += (target - material.emissiveIntensity) * (1 - Math.exp(-delta * 8));
    if (Math.abs(target - material.emissiveIntensity) > 0.005) invalidate();
  });

  return (
    <group position={compact ? [-0.55, 0.05, 0] : [-1.15, 0.08, -0.28]} scale={compact ? 1.08 : 1}>
      <mesh castShadow position={[0, 0.13, 0.32]}>
        <boxGeometry args={[2.7, 0.1, 1.62]} />
        <meshStandardMaterial color={COLORS.silver} metalness={0.72} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0.19, 0.32]}>
        <boxGeometry args={[2.35, 0.014, 1.24]} />
        <meshStandardMaterial color={COLORS.charcoal} metalness={0.12} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 1.09]}>
        <boxGeometry args={[0.65, 0.016, 0.08]} />
        <meshStandardMaterial color={COLORS.darkSilver} metalness={0.6} roughness={0.35} />
      </mesh>
      <group position={[0, 1.02, -0.49]} rotation={[-0.1, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.72, 1.82, 0.1]} />
          <meshStandardMaterial color={COLORS.silver} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh
          position={[0, 0, 0.056]}
          onPointerEnter={() => {
            setHovered(true);
            invalidate();
          }}
          onPointerLeave={() => {
            setHovered(false);
            invalidate();
          }}
        >
          <planeGeometry args={[2.44, 1.53]} />
          <meshStandardMaterial ref={screenMaterial} color="#171a17" emissive="#283529" emissiveIntensity={0.48} roughness={0.42} />
        </mesh>
        {codeLines.map((line, index) => (
          <mesh key={index} position={[line.x, line.y, 0.066]}>
            <planeGeometry args={[line.width, 0.055]} />
            <meshBasicMaterial color={line.color} transparent opacity={index === 1 ? 0.78 : 0.9} />
          </mesh>
        ))}
        <mesh position={[-0.83, 0.62, 0.067]}>
          <circleGeometry args={[0.025, 12]} />
          <meshBasicMaterial color={COLORS.orange} />
        </mesh>
      </group>
    </group>
  );
}

function MechanicalKeyboard() {
  const keys = useMemo(() => {
    const rows = [11, 11, 10, 8];
    return rows.flatMap((count, row) =>
      Array.from({ length: count }, (_, column) => ({
        key: `${row}-${column}`,
        x: (column - (count - 1) / 2) * 0.18,
        z: (row - 1.5) * 0.19,
      })),
    );
  }, []);
  return (
    <group position={[-0.7, 0.22, 1.2]} rotation={[0, -0.04, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2.25, 0.12, 0.92]} />
        <meshStandardMaterial color={COLORS.darkSilver} metalness={0.55} roughness={0.44} />
      </mesh>
      {keys.map((key) => (
        <mesh key={key.key} position={[key.x, 0.075, key.z]} castShadow>
          <boxGeometry args={[0.14, 0.06, 0.13]} />
          <meshStandardMaterial color={COLORS.ivory} roughness={0.64} />
        </mesh>
      ))}
    </group>
  );
}

function Mouse() {
  return (
    <mesh position={[1.05, 0.34, 1.13]} rotation={[-0.08, -0.2, 0]} scale={[0.38, 0.22, 0.56]} castShadow>
      <sphereGeometry args={[1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color={COLORS.charcoal} metalness={0.18} roughness={0.48} />
    </mesh>
  );
}

function BeerGlass({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const highlight = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { invalidate } = useThree();
  const bubbles = useMemo(
    () => [
      [-0.12, 0.2, 0.19, 0.025],
      [0.12, 0.36, 0.17, 0.022],
      [-0.03, 0.55, 0.2, 0.027],
      [0.14, 0.7, 0.1, 0.018],
      [-0.14, 0.82, 0.08, 0.02],
    ] as const,
    [],
  );

  useFrame((_state, delta) => {
    const current = group.current;
    if (!current) return;
    const active = hovered && !reducedMotion;
    const ease = 1 - Math.exp(-delta * 7);
    current.position.y += ((active ? 0.17 : 0) - current.position.y) * ease;
    current.rotation.z += ((active ? THREE.MathUtils.degToRad(4) : 0) - current.rotation.z) * ease;
    if (highlight.current) highlight.current.emissiveIntensity += ((active ? 0.65 : 0.2) - highlight.current.emissiveIntensity) * ease;
    if (Math.abs((active ? 0.17 : 0) - current.position.y) > 0.002) invalidate();
  });

  return (
    <group position={compact ? [1.45, 0.17, 0.34] : [2.05, 0.17, 0.42]}>
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.59, 0.59, 0.055, 40]} />
        <meshStandardMaterial color={COLORS.orange} roughness={0.72} />
      </mesh>
      <group
        ref={group}
        onPointerEnter={() => {
          setHovered(true);
          invalidate();
        }}
        onPointerLeave={() => {
          setHovered(false);
          invalidate();
        }}
      >
        <mesh castShadow position={[0, 0.77, 0]}>
          <cylinderGeometry args={[0.39, 0.31, 1.52, 40, 1, true]} />
          <meshPhysicalMaterial color={COLORS.warmWhite} transparent opacity={0.28} roughness={0.08} metalness={0.03} transmission={0.72} thickness={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.67, 0]}>
          <cylinderGeometry args={[0.345, 0.285, 1.2, 40]} />
          <meshPhysicalMaterial color={COLORS.amber} transparent opacity={0.88} roughness={0.25} transmission={0.08} />
        </mesh>
        <mesh position={[0, 1.31, 0]}>
          <cylinderGeometry args={[0.35, 0.34, 0.18, 40]} />
          <meshStandardMaterial color={COLORS.ivory} roughness={0.88} />
        </mesh>
        <mesh position={[0.33, 0.72, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.3, 0.045, 12, 32]} />
          <meshPhysicalMaterial color={COLORS.warmWhite} transparent opacity={0.38} roughness={0.1} transmission={0.64} />
        </mesh>
        <mesh position={[-0.245, 0.72, 0.29]} rotation={[0, 0, 0.03]}>
          <planeGeometry args={[0.055, 1.02]} />
          <meshStandardMaterial ref={highlight} color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={0.2} transparent opacity={0.4} />
        </mesh>
        {bubbles.map(([x, y, z, radius], index) => (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[radius, 8, 8]} />
            <meshBasicMaterial color={COLORS.warmWhite} transparent opacity={0.72} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function DeskVignette({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  return (
    <PointerRig compact={compact} reducedMotion={reducedMotion}>
      <group position={compact ? [0, -0.62, 0] : [0, -0.48, 0]} rotation={[0.02, -0.09, 0]}>
        {!compact ? (
          <>
            <mesh position={[0, -0.01, 0.15]} receiveShadow castShadow>
              <boxGeometry args={[6.35, 0.16, 3.35]} />
              <meshStandardMaterial color="#d9d2c5" roughness={0.82} metalness={0.08} />
            </mesh>
            <mesh position={[0, -0.105, 0.15]}>
              <boxGeometry args={[5.85, 0.045, 3.0]} />
              <meshStandardMaterial color={COLORS.charcoal} roughness={0.7} />
            </mesh>
            <MechanicalKeyboard />
            <Mouse />
          </>
        ) : null}
        <Laptop compact={compact} reducedMotion={reducedMotion} />
        <BeerGlass compact={compact} reducedMotion={reducedMotion} />
      </group>
      <mesh position={[0, compact ? -0.72 : -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <shadowMaterial transparent opacity={compact ? 0.09 : 0.13} />
      </mesh>
    </PointerRig>
  );
}

function CameraController({ compact }: { compact: boolean }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    const position: [number, number, number] = compact ? [4.25, 3.05, 6.6] : [5.4, 3.7, 7.5];
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(0, 0.35, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, compact, invalidate]);
  return null;
}

export default function ContactDeskScene({ compact, reducedMotion, onReady, onFail }: ContactDeskSceneProps) {
  const handleCreated = useCallback(
    ({ gl, invalidate }: { gl: THREE.WebGLRenderer; invalidate: () => void }) => {
      gl.domElement.addEventListener("webglcontextlost", onFail, { once: true });
      gl.outputColorSpace = THREE.SRGBColorSpace;
      gl.setClearColor(0x000000, 0);
      requestAnimationFrame(() => {
        invalidate();
        requestAnimationFrame(onReady);
      });
    },
    [onFail, onReady],
  );

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ fov: compact ? 35 : 32, position: [5.4, 3.7, 7.5], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{
        position: "absolute",
        inset: 0,
        background: "transparent",
        cursor: compact ? "default" : "grab",
        touchAction: compact ? "pan-y" : "none",
      }}
      onCreated={handleCreated}
    >
      <CameraController compact={compact} />
      <ambientLight intensity={1.25} color="#fff8ee" />
      <hemisphereLight args={["#fff4e3", "#746f66", 1.15]} />
      <directionalLight
        castShadow
        position={[4.5, 7, 5]}
        intensity={2.35}
        color="#fff2dc"
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={1}
        shadow-camera-far={18}
        shadow-bias={-0.00025}
      />
      <pointLight position={[-3, 2.5, 2.5]} intensity={0.55} color={COLORS.orange} distance={8} />
      <DeskVignette compact={compact} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
