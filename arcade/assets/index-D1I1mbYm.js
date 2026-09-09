import {
  s as m,
  f as A,
  i as L,
  g as M,
  t as N,
  u as B,
} from "./index-DDIxlFBJ.js";
import { a as R } from "./ui-MGXCfiiX.js";
let u,
  t,
  l = !1,
  S = !1,
  c = [],
  f = window.innerWidth / 2,
  y = window.innerHeight / 2,
  p = null,
  d = 2e3,
  g = null,
  a = !1,
  x,
  h,
  k,
  v;
function D() {
  (A("/music/monume-cyberpunk-519219.mp3"), m(0.5));
  const o = document.getElementById("app");
  ((o.innerHTML = `
        <div class="stage4-container" id="stage4-container">
            <div class="audio-overlay" id="audio-overlay">
                <h2>STAGE 4: THE BLIND HACKER</h2>
                <p style="margin-bottom: 20px; font-size: 16px;">This challenge requires audio. Pinpoint the hidden data node using sonar.</p>
                <p style="margin-bottom: 40px; font-size: 16px; color:#a00;">WARNING: Multiple corrupted signals detected.</p>
                <button class="btn-start-audio" id="btn-start">ENABLE AUDIO SCANNERS</button>
            </div>
            
            <div class="win-overlay" id="win-overlay">
                <h1>NODE EXTRACTED</h1>
                <p>DECRYPTION KEY ACQUIRED</p>
                <p>Redirecting to Stage 5...</p>
            </div>
            
            <div class="ui-tracker">
                <div class="radar-sweep"></div>
                STATUS: SCANNING...
            </div>
            
            <div id="instruction-popup" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:9999; justify-content:center; align-items:center; flex-direction:column; color:#0f0; font-family:monospace; padding: 20px; text-align:center;">
                <h2 style="font-size: 32px; margin-bottom: 20px; text-shadow: 0 0 10px #0f0;">STAGE 4 INSTRUCTIONS</h2>
                <p style="font-size: 18px; margin-bottom: 10px;">You are blind. Use the audio sonar to locate the data node.</p>
                <p style="font-size: 18px; margin-bottom: 30px;">The node emits a high-pitched, clean sine wave. Click when the true signal is loudest.</p>
                   <p style="font-size: 18px; margin-bottom: 10px;">Use mouse to find where the pitch is correct. It is advised to move your mouse slowly.</p>
                <p style="font-size: 14px; opacity: 0.7;">Press 'H' to resume.</p>
                <p style="font-size: 14px; opacity: 0.7;">Press Shift+F to toggle fullscreen.</p>
                <div style="margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <label for="vol-slider-4" style="font-size: 14px;">Music Volume</label>
                    <input type="range" id="vol-slider-4" min="0" max="1" step="0.05" style="width: 200px; accent-color: #0f0;">
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button id="btn-toggle-music-4" style="background: transparent; border: 1px solid #0f0; color: #0f0; padding: 5px 15px; cursor: pointer; font-family: monospace;">Toggle Music</button>
                        <button onclick="window.toggleFullscreen()" style="background: transparent; border: 1px solid #0f0; color: #0f0; padding: 5px 15px; cursor: pointer; font-family: monospace;">[ ] Fullscreen</button>
                    </div>
                </div>
            </div>
        </div>
    `),
    (u = document.getElementById("stage4-container")),
    m(0.15),
    (a = !1),
    (c = []));
  const n = 100,
    s = window.innerWidth - n * 2,
    r = window.innerHeight - n * 2;
  if (
    (c.push({
      x: n + Math.random() * s,
      y: n + Math.random() * r,
      type: "true",
    }),
    L())
  )
    for (let i of c) {
      const e = document.createElement("div");
      ((e.style.position = "absolute"),
        (e.style.left = i.x + "px"),
        (e.style.top = i.y + "px"),
        (e.style.width = "20px"),
        (e.style.height = "20px"),
        (e.style.transform = "translate(-50%, -50%)"),
        (e.style.borderRadius = "50%"),
        (e.style.pointerEvents = "none"),
        i.type === "true"
          ? ((e.style.background = "#0f0"),
            (e.style.boxShadow = "0 0 20px #0f0"))
          : ((e.style.background = "#f00"),
            (e.style.boxShadow = "0 0 20px #f00")),
        u.appendChild(e));
    }
  ((k = () => {
    ((document.getElementById("audio-overlay").style.display = "none"), z());
  }),
    document.getElementById("btn-start").addEventListener("click", k),
    (x = (i) => {
      !l || a || ((f = i.clientX), (y = i.clientY), C());
    }),
    (h = (i) => {
      if (!(!l || a || i.target.tagName === "BUTTON")) {
        for (let e of c)
          if (Math.hypot(e.x - f, e.y - y) < 80) {
            e.type === "true" ? O() : G();
            return;
          }
      }
    }));
  const w = document.querySelector("#instruction-popup h2");
  (w && R(w),
    (v = (i) => {
      if (i.key.toLowerCase() === "h" && !S)
        if (
          ((a = !a),
          (document.getElementById("instruction-popup").style.display = a
            ? "flex"
            : "none"),
          a)
        ) {
          const e = document.getElementById("vol-slider-4");
          (e && (e.value = M()),
            clearTimeout(p),
            t && t.state === "running" && t.suspend());
        } else (t && t.state === "suspended" && t.resume(), l && b());
    }),
    document.addEventListener("mousemove", x),
    document.addEventListener("click", h),
    document.addEventListener("keydown", v));
  const T = document.getElementById("vol-slider-4");
  T &&
    T.addEventListener("input", (i) => {
      m(parseFloat(i.target.value));
    });
  const E = document.getElementById("btn-toggle-music-4");
  E &&
    E.addEventListener("click", () => {
      N();
    });
}
function z() {
  const o = window.AudioContext || window.webkitAudioContext;
  ((t = new o()), (l = !0), C(), b());
}
function C() {
  let o = 1 / 0,
    n = null;
  for (let s of c) {
    const r = Math.hypot(s.x - f, s.y - y);
    r < o && ((o = r), (n = s));
  }
  ((d = o),
    (g = n),
    d < 80 ? u.classList.add("glitching") : u.classList.remove("glitching"));
}
function b() {
  if (!l) return;
  if (g) {
    const n = t.createOscillator(),
      s = t.createGain();
    (n.connect(s),
      s.connect(t.destination),
      g.type === "true"
        ? ((n.type = "sine"), (n.frequency.value = 400 + Math.max(0, 800 - d)))
        : ((n.type = "square"),
          (n.frequency.value = 100 + Math.max(0, 300 - d * 0.5))));
    const r = Math.max(0.1, 1 - d / 1e3);
    (s.gain.setValueAtTime(r, t.currentTime),
      s.gain.exponentialRampToValueAtTime(0.01, t.currentTime + 0.1),
      n.start(),
      n.stop(t.currentTime + 0.1));
  }
  const o = Math.max(40, Math.min(1e3, d));
  p = setTimeout(b, o);
}
function G() {
  ((l = !1), clearTimeout(p), t && t.close());
  const o = document.getElementById("win-overlay");
  ((o.innerHTML = `
        <h1 style="color:red; text-shadow:0 0 10px red;">CORRUPTED NODE</h1>
        <p style="color:red;">Rebooting Scanner...</p>
    `),
    (o.style.display = "flex"),
    (o.style.borderColor = "red"),
    (o.style.boxShadow = "0 0 20px red"),
    setTimeout(() => {
      (typeof I == "function" && I(), D());
    }, 2e3));
}
function O() {
  ((l = !1),
    (S = !0),
    clearTimeout(p),
    t && t.close(),
    u.classList.remove("glitching"),
    (document.getElementById("win-overlay").style.display = "flex"),
    setTimeout(() => {
      (B(5), window.transitionToStage(5));
    }, 2e3));
}
function I() {
  ((l = !1),
    m(1),
    clearTimeout(p),
    t && t.close(),
    document.removeEventListener("mousemove", x),
    document.removeEventListener("click", h),
    document.removeEventListener("keydown", v));
}
export { I as destroy, D as init };
