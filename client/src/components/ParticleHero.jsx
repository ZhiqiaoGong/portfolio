import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

// Shape order must match ROLES in IntroSection:
// 0 = Backend (database), 1 = Full-Stack (</>), 2 = XR (headset)
function makePointSets(count) {
  const scratch = new THREE.Vector3();

  const sampleInto = (arr, start, n, geometry) => {
    const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).build();
    for (let i = 0; i < n; i++) {
      sampler.sample(scratch);
      arr[(start + i) * 3] = scratch.x;
      arr[(start + i) * 3 + 1] = scratch.y;
      arr[(start + i) * 3 + 2] = scratch.z;
    }
    geometry.dispose();
  };

  // Stacked cylinders — classic database icon
  const database = new Float32Array(count * 3);
  {
    const per = Math.floor(count / 3);
    [-0.75, 0, 0.75].forEach((y, i) => {
      const g = new THREE.CylinderGeometry(1, 1, 0.5, 48, 1, false);
      g.translate(0, y, 0);
      sampleInto(database, i * per, i === 2 ? count - 2 * per : per, g);
    });
  }

  // "</>" built from five thin bars
  const code = new Float32Array(count * 3);
  {
    const bar = (cx, cy, rot, len = 1.25) => {
      const g = new THREE.BoxGeometry(len, 0.16, 0.16);
      g.rotateZ(rot);
      g.translate(cx, cy, 0);
      return g;
    };
    const slash = new THREE.BoxGeometry(0.16, 2.1, 0.16);
    slash.rotateZ(0.38);
    const parts = [
      bar(-1.15, 0.32, 0.5),
      bar(-1.15, -0.32, -0.5),
      bar(1.15, 0.32, -0.5),
      bar(1.15, -0.32, 0.5),
      slash,
    ];
    const per = Math.floor(count / parts.length);
    parts.forEach((g, i) =>
      sampleInto(code, i * per, i === parts.length - 1 ? count - (parts.length - 1) * per : per, g)
    );
  }

  // Wraparound sport shades — one swept visor outline with a nose notch,
  // a heavy browline, and temples raking back. Sides curve rearward for the
  // wrap effect. Strokes read far better in a point cloud than solid volumes.
  const headset = new Float32Array(count * 3);
  {
    const wrapZ = (x) => -0.14 * x * x;
    const v = (x, y) => new THREE.Vector3(x, y, wrapZ(x));
    const parts = [];

    const outline = new THREE.CatmullRomCurve3(
      [
        v(-1.75, 0.45), v(0, 0.6), v(1.75, 0.45),
        v(1.88, 0.02), v(1.15, -0.48), v(0.4, -0.38),
        v(0, -0.02), v(-0.4, -0.38), v(-1.15, -0.48), v(-1.88, 0.02),
      ],
      true
    );
    parts.push([new THREE.TubeGeometry(outline, 160, 0.085, 8, true), 0.54]);

    const brow = new THREE.CatmullRomCurve3([v(-1.6, 0.33), v(0, 0.46), v(1.6, 0.33)]);
    parts.push([new THREE.TubeGeometry(brow, 60, 0.075, 8, false), 0.14]);

    [-1, 1].forEach((side) => {
      const temple = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 1.8, 0.3, -0.5),
        new THREE.Vector3(side * 1.98, 0.16, -1.0),
        new THREE.Vector3(side * 1.86, 0.02, -1.5),
      ]);
      parts.push([new THREE.TubeGeometry(temple, 40, 0.07, 8, false), 0.16]);
    });

    let start = 0;
    parts.forEach(([g, fraction], i) => {
      const n = i === parts.length - 1 ? count - start : Math.floor(count * fraction);
      sampleInto(headset, start, n, g);
      start += n;
    });
  }

  return [database, code, headset];
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uFrom;
  uniform float uTo;
  uniform float uSize;
  uniform float uDpr;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  attribute vec3 aShape0;
  attribute vec3 aShape1;
  attribute vec3 aShape2;
  attribute float aRand;
  varying float vRand;

  vec3 shapeOf(float idx) {
    if (idx < 0.5) return aShape0;
    if (idx < 1.5) return aShape1;
    return aShape2;
  }

  void main() {
    // per-particle staggered ease so shapes dissolve instead of sliding rigidly
    float t = clamp(uMorph * 1.35 - aRand * 0.35, 0.0, 1.0);
    float ease = t * t * (3.0 - 2.0 * t);
    vec3 pos = mix(shapeOf(uFrom), shapeOf(uTo), ease);

    // idle breathing
    pos += 0.035 * vec3(
      sin(uTime * 1.3 + aRand * 17.0),
      cos(uTime * 1.1 + aRand * 23.0),
      sin(uTime * 0.9 + aRand * 31.0)
    );

    // cursor repulsion field
    vec2 diff = pos.xy - uMouse.xy;
    float force = exp(-dot(diff, diff) * 2.2) * uMouseStrength;
    pos.xy += normalize(diff + vec2(1e-4)) * force;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uDpr * (0.7 + aRand * 0.6) * (6.0 / -mv.z);
    vRand = aRand;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vRand;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d2 = dot(c, c);
    if (d2 > 0.25) discard;
    float alpha = smoothstep(0.25, 0.05, d2) * 0.85;
    vec3 blue = vec3(0.376, 0.647, 0.98);
    vec3 purple = vec3(0.655, 0.545, 0.98);
    gl_FragColor = vec4(mix(blue, purple, vRand), alpha);
  }
`;

const MORPH_SECONDS = 1.1;
const _ray = new THREE.Vector3();
const _plane = new THREE.Vector3();

function Particles({ roleIndex, reducedMotion, count, hovered }) {
  const groupRef = useRef(null);
  const morphRef = useRef({ from: roleIndex, to: roleIndex, t: 1 });
  const invalidate = useThree((s) => s.invalidate);

  const { geometry, material } = useMemo(() => {
    const [db, code, headset] = makePointSets(count);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) rand[i] = Math.random();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(db.slice(), 3));
    geo.setAttribute('aShape0', new THREE.BufferAttribute(db, 3));
    geo.setAttribute('aShape1', new THREE.BufferAttribute(code, 3));
    geo.setAttribute('aShape2', new THREE.BufferAttribute(headset, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 1 },
        uFrom: { value: roleIndex },
        uTo: { value: roleIndex },
        uSize: { value: 3.2 },
        uDpr: { value: 1 },
        uMouse: { value: new THREE.Vector3(999, 999, 0) },
        uMouseStrength: { value: 0 },
      },
    });
    return { geometry: geo, material: mat };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useEffect(() => {
    const m = morphRef.current;
    if (roleIndex === m.to) return;
    m.from = m.to;
    m.to = roleIndex;
    m.t = reducedMotion ? 1 : 0;
    material.uniforms.uFrom.value = m.from;
    material.uniforms.uTo.value = m.to;
    material.uniforms.uMorph.value = m.t;
    invalidate();
  }, [roleIndex, reducedMotion, material, invalidate]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    u.uTime.value += delta;
    u.uDpr.value = state.gl.getPixelRatio();

    // Fill whatever canvas size the layout hands us, within sane bounds
    let scale = 1;
    if (groupRef.current) {
      const target = Math.min(
        1.45,
        Math.max(0.8, Math.min(state.viewport.width / 4.8, state.viewport.height / 3.4))
      );
      scale = groupRef.current.scale.x + (target - groupRef.current.scale.x) * 0.1;
      groupRef.current.scale.setScalar(scale);
    }

    const m = morphRef.current;
    if (m.t < 1) {
      m.t = Math.min(1, m.t + delta / MORPH_SECONDS);
      u.uMorph.value = m.t;
    }

    // Only engage the repulsion field while the pointer is really over the
    // canvas — R3F reports (0,0) before any pointer event, which would
    // otherwise blow a hole in the middle of the shape on load.
    if (hovered && !reducedMotion) {
      _ray.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      _ray.sub(state.camera.position).normalize();
      const dist = -state.camera.position.z / _ray.z;
      _plane.copy(state.camera.position).addScaledVector(_ray, dist);
      // uMouse lives in the particles' local space; undo the group scale
      u.uMouse.value.lerp(_plane.divideScalar(scale), 0.2);
      u.uMouseStrength.value += (0.55 - u.uMouseStrength.value) * 0.08;
    } else {
      u.uMouseStrength.value += (0 - u.uMouseStrength.value) * 0.08;
    }

    if (groupRef.current && !reducedMotion) {
      const g = groupRef.current;
      g.rotation.y += (state.pointer.x * 0.3 - g.rotation.y) * 0.05;
      g.rotation.x += (-state.pointer.y * 0.2 - g.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export default function ParticleHero({ roleIndex, onAdvance, particleCount = 4200 }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="h-full w-full cursor-pointer"
      onPointerDown={onAdvance}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      title="Click to switch role"
    >
      <Canvas
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Particles roleIndex={roleIndex} reducedMotion={reducedMotion} count={particleCount} hovered={hovered} />
      </Canvas>
    </div>
  );
}
