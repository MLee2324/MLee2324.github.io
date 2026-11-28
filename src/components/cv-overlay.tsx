"use client";

import { useEffect, useState } from "react";
import { ScanFace } from "lucide-react";
import marks from "@/data/headshot-landmarks.json";
import { useReducedMotion } from "@/lib/motion-pref";
import { cn } from "@/lib/utils";

// Computer-vision overlay for the hero headshot. The coordinates are real
// output from MediaPipe (FaceDetector, FaceLandmarker, PoseLandmarker) run on
// /assets/me.jpg, normalized to 0..1, so they line up with the 4:5 photo.
// The SVG uses an 800x1000 viewBox to match the image's pixel grid.

const W = 800;
const H = 1000;
const X = (v: number) => v * W;
const Y = (v: number) => v * H;

type Pose = { name: string; x: number; y: number; v: number };
const pose = marks.pose as Pose[];
const P = Object.fromEntries(pose.map((p) => [p.name, p])) as Record<string, Pose>;
const fb = marks.faceBox;

// upper-body box from the pose keypoints (shoulders for width, face for
// top), kept inside the frame since the shoulders run past the photo's edges
const clamp = (v: number) => Math.min(0.985, Math.max(0.015, v));
const body = P.l_shoulder && P.r_shoulder
  ? (() => {
      const x1 = clamp(Math.min(P.l_shoulder.x, P.r_shoulder.x) - 0.06);
      const x2 = clamp(Math.max(P.l_shoulder.x, P.r_shoulder.x) + 0.06);
      const y1 = clamp(fb.y - 0.12);
      return { x: x1, y: y1, w: x2 - x1, h: 0.985 - y1 };
    })()
  : null;

const SKELETON: [string, string][] = [
  ["l_shoulder", "r_shoulder"],
  ["l_ear", "l_eye"],
  ["l_eye", "nose"],
  ["nose", "r_eye"],
  ["r_eye", "r_ear"],
  ["mouth_l", "mouth_r"],
];

const Label = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-56} width={text.length * 27 + 28} height={56} rx={8} className="fill-emerald-400/90" />
    <text x={14} y={-15} className="fill-black font-mono text-[44px] font-semibold">
      {text}
    </text>
  </g>
);

export default function CvOverlay() {
  const { reducedMotion, ready } = useReducedMotion();
  const [on, setOn] = useState(true);
  const [scanDone, setScanDone] = useState(false);
  // with reduced motion there's no scan: show the overlay right away
  const scanned = scanDone || reducedMotion;
  // the photo is small on phones: drop the point cloud and labels there
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // play the scan once, then show everything
  useEffect(() => {
    if (!ready || reducedMotion) return;
    const t = setTimeout(() => setScanDone(true), 1600);
    return () => clearTimeout(t);
  }, [ready, reducedMotion]);

  const show = on && ready;

  return (
    <>
      {show && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {!scanned && (
            <rect x={0} width={W} height={6} className="cv-scan fill-emerald-400/80" />
          )}
          <g className={cn("transition-opacity duration-700", scanned ? "opacity-100" : "opacity-0")}>
            {/* face mesh: contours as lines, a sparse point cloud on top */}
            <g className="stroke-emerald-300/70" strokeWidth={1.2} vectorEffect="non-scaling-stroke">
              {marks.meshEdges.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            {!compact && (
              <g className="fill-emerald-200/70">
                {marks.points.map(([x, y], i) => (
                  <circle key={i} cx={X(x)} cy={Y(y)} r={2.4} />
                ))}
              </g>
            )}

            {/* pose skeleton */}
            <g className="stroke-sky-300" strokeWidth={2} vectorEffect="non-scaling-stroke">
              {SKELETON.filter(([a, b]) => P[a] && P[b]).map(([a, b]) => (
                <line
                  key={a + b}
                  x1={X(P[a].x)}
                  y1={Y(P[a].y)}
                  x2={X(P[b].x)}
                  y2={Y(P[b].y)}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
            <g className="fill-sky-300 stroke-slate-900" strokeWidth={1}>
              {pose.map((p) => (
                <circle key={p.name} cx={X(p.x)} cy={Y(p.y)} r={compact ? 9 : 7} />
              ))}
            </g>

            {/* detection boxes */}
            <rect
              x={X(fb.x)}
              y={Y(fb.y)}
              width={X(fb.w)}
              height={Y(fb.h)}
              rx={6}
              className="fill-none stroke-emerald-400"
              strokeWidth={2.5}
              vectorEffect="non-scaling-stroke"
            />
            {body && (
              <rect
                x={X(body.x)}
                y={Y(body.y)}
                width={X(body.w)}
                height={Y(body.h)}
                rx={6}
                className="fill-none stroke-sky-300/80"
                strokeWidth={2}
                strokeDasharray="10 8"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {!compact && (
              <>
                <Label x={X(fb.x)} y={Y(fb.y)} text={`face ${fb.score.toFixed(2)}`} />
                {body && <Label x={X(body.x)} y={Y(body.y)} text={`person ${Math.min(...pose.map((p) => p.v)).toFixed(2)}`} />}
              </>
            )}
          </g>
        </svg>
      )}

      {ready && (
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          title={on ? "Hide the computer-vision overlay" : "Show the computer-vision overlay"}
          className={cn(
            "absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2 py-1 font-mono text-[10px] text-white backdrop-blur transition-colors hover:bg-black/80",
            compact && "bottom-1 right-1 px-1.5"
          )}
        >
          <ScanFace className="h-3 w-3" aria-hidden />
          {!compact && (on ? "CV view: on" : "CV view: off")}
          <span className="sr-only">Toggle the computer-vision overlay</span>
        </button>
      )}
    </>
  );
}
