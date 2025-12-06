"use client";

import { useEffect } from "react";

interface Props {
  speedFactor?: number;
  starColor?: [number, number, number];
  starCount?: number;
}

export default function Starfield(props: Props) {
  const {
    speedFactor = 0.05,
    starColor = [255, 255, 255],
    starCount = 5000,
  } = props;

  useEffect(() => {
    const canvas = document.getElementById("starfield") as HTMLCanvasElement;

    if (!canvas) return;

    const c = canvas.getContext("2d");

    if (!c) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const setCanvasExtents = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    setCanvasExtents();

    const makeStars = (count: number) => {
      return Array.from({ length: count }, () => ({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }));
    };

    const stars = makeStars(starCount);

    const clear = () => {
      const gradient = c.createLinearGradient(0, 0, w, h);

      gradient.addColorStop(0, "rgba(60, 20, 100, 1)"); // lighter purple
      gradient.addColorStop(0.5, "rgba(35, 15, 80, 1)"); // lighter indigo core
      gradient.addColorStop(1, "rgba(15, 25, 70, 1)"); // lighter blue
      c.fillStyle = gradient;
      c.fillRect(0, 0, w, h);

      // --- NEBULA BLOBS - lichter en meer gecentreerd --- //

      // Purple nebula (top-left quadrant center)
      let neb = c.createRadialGradient(
        w * 0.25,
        h * 0.25,
        0,
        w * 0.25,
        h * 0.25,
        w * 0.3,
      );

      neb.addColorStop(0, "rgba(180, 100, 255, 0.4)"); // meer opacity
      neb.addColorStop(0.5, "rgba(180, 100, 255, 0.2)");
      neb.addColorStop(1, "rgba(180, 100, 255, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);

      // Blue nebula (bottom-right quadrant center)
      neb = c.createRadialGradient(
        w * 0.75,
        h * 0.75,
        0,
        w * 0.75,
        h * 0.75,
        w * 0.28,
      );
      neb.addColorStop(0, "rgba(100, 180, 255, 0.35)");
      neb.addColorStop(0.5, "rgba(100, 180, 255, 0.18)");
      neb.addColorStop(1, "rgba(100, 180, 255, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);

      // Indigo nebula (center)
      neb = c.createRadialGradient(
        w * 0.5,
        h * 0.5,
        0,
        w * 0.5,
        h * 0.5,
        w * 0.22,
      );
      neb.addColorStop(0, "rgba(140, 120, 255, 0.25)");
      neb.addColorStop(0.5, "rgba(140, 120, 255, 0.12)");
      neb.addColorStop(1, "rgba(140, 120, 255, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);

      // Violet nebula (right-middle quadrant)
      neb = c.createRadialGradient(
        w * 0.75,
        h * 0.5,
        0,
        w * 0.75,
        h * 0.5,
        w * 0.26,
      );
      neb.addColorStop(0, "rgba(210, 120, 255, 0.3)");
      neb.addColorStop(0.5, "rgba(210, 120, 255, 0.15)");
      neb.addColorStop(1, "rgba(210, 120, 255, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);

      // Cyan nebula (left-middle quadrant)
      neb = c.createRadialGradient(
        w * 0.25,
        h * 0.5,
        0,
        w * 0.25,
        h * 0.5,
        w * 0.24,
      );
      neb.addColorStop(0, "rgba(100, 255, 255, 0.22)");
      neb.addColorStop(0.5, "rgba(100, 255, 255, 0.11)");
      neb.addColorStop(1, "rgba(100, 255, 255, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);

      // Pink nebula (bottom-left quadrant)
      neb = c.createRadialGradient(
        w * 0.25,
        h * 0.75,
        0,
        w * 0.25,
        h * 0.75,
        w * 0.25,
      );
      neb.addColorStop(0, "rgba(255, 120, 200, 0.28)");
      neb.addColorStop(0.5, "rgba(255, 120, 200, 0.14)");
      neb.addColorStop(1, "rgba(255, 120, 200, 0)");
      c.fillStyle = neb;
      c.fillRect(0, 0, w, h);
    };

    const putPixel = (x: number, y: number, brightness: number) => {
      c.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${brightness})`;
      c.fillRect(x, y, 2, 2);
    };

    const moveStars = (distance: number) => {
      for (const s of stars) {
        s.z -= distance;
        if (s.z <= 1) s.z += 1000;
      }
    };

    let prevTime: number;
    const init = (time: number) => {
      prevTime = time;
      requestAnimationFrame(tick);
    };

    const tick = (time: number) => {
      const elapsed = time - prevTime;

      prevTime = time;

      moveStars(elapsed * speedFactor);

      clear();

      const cx = w / 2;
      const cy = h / 2;

      for (const star of stars) {
        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);

        if (x < 0 || x >= w || y < 0 || y >= h) continue;

        const d = star.z / 1000;
        const b = 1 - d * d;

        putPixel(x, y, b);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(init);

    const handleResize = () => setCanvasExtents();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [starColor, speedFactor, starCount]);

  return (
    <canvas
      id="starfield"
      style={{
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
        opacity: 1,
        pointerEvents: "none",
        mixBlendMode: "normal",
      }}
    />
  );
}
