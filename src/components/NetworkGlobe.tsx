import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

/**
 * A sphere of dots joined by short lines.
 * The points are fixed. Each frame we spin them so the globe turns.
 */
function buildGlobe(count: number) {
  const points: Point[] = [];
  // This angle spreads the dots evenly over the ball, instead of in rings.
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push({ x: Math.cos(theta) * ring, y, z: Math.sin(theta) * ring });
  }

  // Join dots that sit near each other. Those links do not change as it spins.
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const a = points[i];
      const b = points[j];
      const gap = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      if (gap < 0.46) edges.push([i, j]);
    }
  }

  return { points, edges };
}

const GLOBE = buildGlobe(170);

type NetworkGlobeProps = {
  className?: string;
};

/** Spinning network globe. It sits behind the code window and is not a link. */
export default function NetworkGlobe({ className = "" }: NetworkGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const pen = node.getContext("2d");
    if (!pen) return;
    // Copied into constants so the drawing functions can use them safely.
    const canvas: HTMLCanvasElement = node;
    const context: CanvasRenderingContext2D = pen;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let running = true;

    function size() {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.width * ratio));
      canvas.height = Math.max(1, Math.round(box.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function paint(time: number) {
      const box = canvas.getBoundingClientRect();
      const width = box.width;
      const height = box.height;
      context.clearRect(0, 0, width, height);

      // People who ask for less motion get one still view.
      const spin = motion.matches ? 0.7 : time * 0.00022;
      const tilt = motion.matches ? 0.35 : 0.35 + Math.sin(time * 0.00015) * 0.08;
      // Keep the whole ball inside the box, with a little room at the edges.
      const radius = Math.min(width, height) * 0.46;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const cosY = Math.cos(spin);
      const sinY = Math.sin(spin);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);

      const drawn = GLOBE.points.map((point) => {
        const x1 = point.x * cosY + point.z * sinY;
        const z1 = -point.x * sinY + point.z * cosY;
        const y2 = point.y * cosX - z1 * sinX;
        const z2 = point.y * sinX + z1 * cosX;
        return {
          x: centerX + x1 * radius,
          y: centerY + y2 * radius,
          z: z2,
        };
      });

      for (const [from, to] of GLOBE.edges) {
        const a = drawn[from];
        const b = drawn[to];
        const depth = (a.z + b.z) / 2;
        if (depth < -0.55) continue;
        // The side of the ball faces us less, so those lines need more strength to stay visible.
        const strength = 0.28 + Math.max(0, depth) * 0.5;
        context.strokeStyle = `rgba(74, 163, 198, ${Math.min(strength, 0.9)})`;
        context.lineWidth = depth > 0.2 ? 1.35 : 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      for (const dot of drawn) {
        if (dot.z < -0.45) continue;
        const front = Math.max(0, dot.z);
        context.fillStyle = `rgba(232, 244, 249, ${0.45 + front * 0.55})`;
        context.beginPath();
        context.arc(dot.x, dot.y, 1.3 + front * 1.8, 0, Math.PI * 2);
        context.fill();
      }
    }

    function tick(time: number) {
      if (!running) return;
      paint(time);
      if (!motion.matches) frame = window.requestAnimationFrame(tick);
    }

    size();
    const observer = new ResizeObserver(() => {
      size();
      if (motion.matches) paint(0);
    });
    observer.observe(canvas);
    frame = window.requestAnimationFrame(tick);

    function onMotionChange() {
      window.cancelAnimationFrame(frame);
      if (motion.matches) paint(0);
      else frame = window.requestAnimationFrame(tick);
    }
    motion.addEventListener("change", onMotionChange);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
