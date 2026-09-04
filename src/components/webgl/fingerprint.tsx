"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * The dealer's own name and their one professionally-presented car converge on
 * the same word: "Trust", and the Suzuki Ciaz's advertised "بصمة" — fingerprint
 * — keyless trim, which is the single spec their poster gives the most room to.
 *
 * So the signature piece is a real fingerprint. Not an image of one: a loop
 * pattern generated from a closed-form spiral phase function and displaced into
 * actual geometry on a dense plane, standing on an ink platen and swept once
 * per cycle by a red scanning bar. Moving the pointer over it re-arms the sweep
 * from the bottom, the way a reader restarts when a finger lands on it.
 */

const SIZE = 3.4;
const SEGMENTS = 360;
/** ~46 rad per unit of radius puts about 25 ridges across the platen, which is
 *  roughly what a real print carries. Relief is a seventh of the wavelength —
 *  enough slope for a raking light to separate every ridge. */
const FREQ = 58;
const RELIEF = 0.0155;
/** The bezel, and therefore the outermost thing on the platen. */
const PLATEN = SIZE * 1.09;
/** Seconds for one full sweep of the platen, plus the pause before the next. */
const SWEEP = 2.6;
const PAUSE = 1.5;

/**
 * A whorl: ridges that spiral once around a single core rather than closing
 * into rings. Written with a winding number of exactly 1, so the 2π jump in
 * `atan2` across its branch cut cancels against the phase and the field is
 * continuous everywhere — a fractional winding leaves a straight seam running
 * off the core, which is what the first pass rendered.
 */
function ridgeHeight(x: number, y: number) {
  // The core sits above and left of centre, on a slightly oval field.
  const px = x - 0.14;
  const py = (y + 0.22) * 1.18;
  // Two smooth low-frequency warps break the bullseye. Every term is
  // continuous over the whole plate, so neither introduces a seam.
  const wx = px + 0.13 * Math.sin(1.45 * py + 0.7) + 0.05 * Math.sin(2.9 * py - 1.2);
  const wy = py + 0.1 * Math.sin(1.65 * px - 0.4);
  const r = Math.sqrt(wx * wx + wy * wy);
  const theta = Math.atan2(wy, wx);
  const ridge = Math.sin(FREQ * r + theta);
  // No relief exactly at the core (it is a singularity) and none at the edge.
  const inner = Math.min(1, r * 5.5);
  const outer = Math.exp(-Math.pow(r * 0.66, 3.2));
  return ridge * RELIEF * inner * outer;
}

function Print({ armRef }: { armRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const barRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const clock = useRef(0);
  // Read once on the client: calling matchMedia during render would both
  // disagree with the server's HTML and trip the compiler's purity rule.
  const still = useRef(false);
  useEffect(() => {
    still.current = prefersReducedMotion();
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, ridgeHeight(pos.getX(i), pos.getY(i)));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (still.current) return;
    clock.current += Math.min(delta, 0.05);

    // A pointer landing on the platen restarts the sweep rather than nudging it.
    if (armRef.current > 0) {
      clock.current = 0;
      armRef.current = 0;
    }

    const t = clock.current % (SWEEP + PAUSE);
    const travelling = t < SWEEP;
    const y = -PLATEN / 2 + (t / SWEEP) * PLATEN;

    if (barRef.current && glowRef.current) {
      barRef.current.position.y = y;
      glowRef.current.position.y = y;
      // Fade in and out at the ends so the bar never pops at the platen edge.
      const edge = Math.min(t / 0.18, (SWEEP - t) / 0.35, 1);
      const a = travelling ? Math.max(0, edge) : 0;
      (barRef.current.material as THREE.MeshBasicMaterial).opacity = a;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = a * 0.26;
    }
    if (groupRef.current) {
      // A reader does not swing. Only enough movement to keep the specular
      // highlight alive across the ridges.
      groupRef.current.rotation.x = -0.035 + Math.sin(clock.current * 0.16) * 0.008;
      groupRef.current.rotation.y = Math.sin(clock.current * 0.11) * 0.005;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.035, 0, 0]}>
      {/* The platen's own bezel, sitting a hair behind the ridged face. */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[PLATEN, PLATEN]} />
        <meshStandardMaterial color="#141414" roughness={0.9} metalness={0} />
      </mesh>
      <mesh geometry={geometry}>
        {/* Matte, not polished: a specular sheen riding every crest is what
            made the first pass read as a ripple on water. */}
        <meshStandardMaterial color="#4a4842" roughness={0.68} metalness={0.03} />
      </mesh>
      <mesh ref={glowRef} position={[0, 0, 0.14]}>
        <planeGeometry args={[PLATEN, 0.22]} />
        <meshBasicMaterial
          color="#c21414"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={barRef} position={[0, 0, 0.15]}>
        <planeGeometry args={[PLATEN, 0.024]} />
        <meshBasicMaterial color="#ff4a44" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Frames the platen against the live frustum rather than a guessed world
 *  constant, so it fills a square column and a phone-width block alike. */
function Fit({ children }: { children: React.ReactNode }) {
  const viewport = useThree((s) => s.viewport);
  const scale = (Math.min(viewport.width, viewport.height) * 0.95) / PLATEN;
  return <group scale={scale}>{children}</group>;
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Fingerprint({ className, alt }: { className?: string; alt: string }) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const armRef = useRef(0);

  useEffect(() => {
    // A capability probe cannot be lifted out of an effect: reading `window` in
    // a lazy initialiser makes the first client render disagree with the HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  // Bound to the window and hit-tested, because the copy column and the reveal
  // bar are siblings of this wrapper — a listener on the wrapper alone never
  // fires once anything is layered over it.
  useEffect(() => {
    let inside = false;
    const onMove = (e: PointerEvent) => {
      const rect = hostRef.current?.getBoundingClientRect();
      if (!rect) return;
      const hit =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (hit && !inside) armRef.current = 1;
      inside = hit;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className} role="img" aria-label={alt}>
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <rect x="4" y="4" width="92" height="92" fill="#232221" />
          {[10, 16, 22, 28, 34, 40].map((r, i) => (
            <circle
              key={r}
              cx="52"
              cy="46"
              r={r}
              fill="none"
              stroke="#8a8783"
              strokeWidth="1.6"
              strokeDasharray={i % 2 ? "62 10" : "none"}
            />
          ))}
          <rect x="4" y="60" width="92" height="1.6" fill="#c21414" />
        </svg>
      </div>
    );
  }

  const fov = 34;
  const camZ = 3 / (2 * Math.tan((fov / 2) * (Math.PI / 180)));

  return (
    <div ref={hostRef} className={className} role="img" aria-label={alt}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
          transition: "opacity 900ms ease",
        }}
        camera={{ position: [0, 0, camZ], fov }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          bind(gl.domElement);
          setReady(true);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.05} />
          {/* Raking key light: the ridges only read because the light crosses
              them, the way a print only shows under an angled lamp. The fill
              from the opposite corner keeps the far side of the platen from
              falling to solid black. */}
          <directionalLight position={[-2.6, 2.4, 1.1]} intensity={3.3} color="#fff4ea" />
          <directionalLight position={[2.4, -1.9, 2.2]} intensity={0.9} color="#c21414" />
          <directionalLight position={[1.6, 2.2, 2.6]} intensity={0.55} color="#cfd6de" />
          <Fit>
            <Print armRef={armRef} />
          </Fit>
        </Suspense>
      </Canvas>
    </div>
  );
}
