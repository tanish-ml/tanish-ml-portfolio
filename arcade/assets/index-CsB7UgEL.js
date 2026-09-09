import { f as M, s as z, g as A, t as F } from "./index-DDIxlFBJ.js";
import { a as C } from "./ui-MGXCfiiX.js";
let v,
  l,
  i,
  n,
  a,
  f = 0,
  T = 0,
  y = !1,
  m = !1,
  b = !1,
  u = !1,
  S = !1,
  c = !1,
  k,
  B,
  L,
  D,
  h,
  R;
function W() {
  (M("/music/hitslab-cyberpunk-cyberpunk-music-542589.mp3"), z(0.3));
  const o = document.getElementById("app");
  ((o.innerHTML = `
        <div class="stage3-flappy-container">
            <div class="flappy-score" id="flappy-score">0</div>
            <div class="flappy-warning" id="flappy-warning">GRAVITY INVERTED</div>
            <div class="flappy-start-popup" id="flappy-popup">Use 'W' to flap UP<br>Use 'S' to flap DOWN</div>
            <canvas id="flappy-canvas"></canvas>
            
            <div class="flappy-overlay" id="flappy-overlay">
                <h2 id="overlay-title">SYSTEM FAILURE</h2>
                <p id="overlay-msg">Collision detected.</p>
                <button class="flappy-btn" id="btn-restart">Reboot Sequence</button>
            </div>

            <div class="flappy-overlay" id="flappy-win-overlay" style="border-color:#0f0; box-shadow:0 0 20px #0f0;">
                <h2 style="color:#0f0; text-shadow:0 0 10px #0f0;">NICE SKILLS</h2>
            </div>
            
            <div id="instruction-popup" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:9999; justify-content:center; align-items:center; flex-direction:column; color:#0f0; font-family:monospace; padding: 20px; text-align:center;">
                <h2 style="font-size: 32px; margin-bottom: 20px; text-shadow: 0 0 10px #0f0;">STAGE 3 INSTRUCTIONS</h2>
                <p style="font-size: 18px; margin-bottom: 10px;">Use 'W' to flap up, or 'S' to flap down when gravity inverts.</p>
                <p style="font-size: 18px; margin-bottom: 30px;">Navigate through the firewall pipes. Survive as long as you can.</p>
                <p style="font-size: 14px; opacity: 0.7;">Press 'H' to resume.</p>
                <p style="font-size: 14px; opacity: 0.7;">Press Shift+F to toggle fullscreen.</p>
                <div style="margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <label for="vol-slider-3" style="font-size: 14px;">Music Volume</label>
                    <input type="range" id="vol-slider-3" min="0" max="1" step="0.05" style="width: 200px; accent-color: #0f0;">
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button id="btn-toggle-music-3" style="background: transparent; border: 1px solid #0f0; color: #0f0; padding: 5px 15px; cursor: pointer; font-family: monospace;">Toggle Music</button>
                        <button onclick="window.toggleFullscreen()" style="background: transparent; border: 1px solid #0f0; color: #0f0; padding: 5px 15px; cursor: pointer; font-family: monospace;">[ ] Fullscreen</button>
                    </div>
                </div>
            </div>
        </div>
    `),
    (l = document.getElementById("flappy-canvas")),
    (i = l.getContext("2d")),
    (h = () => {
      document.querySelector(".stage3-flappy-container") &&
        ((l.width = Math.min(1200, window.innerWidth)),
        (l.height = Math.min(600, window.innerHeight * 0.8)));
    }),
    window.addEventListener("resize", h),
    h(),
    (L = () => w()),
    document.getElementById("btn-restart").addEventListener("click", L));
  const r = document.querySelector("#instruction-popup h2");
  (r && C(r),
    (k = (e) => {
      if (e.key.toLowerCase() === "h") {
        if (
          ((c = !c),
          (document.getElementById("instruction-popup").style.display = c
            ? "flex"
            : "none"),
          c)
        ) {
          const s = document.getElementById("vol-slider-3");
          s && (s.value = A());
        }
        return;
      }
      if (m && e.code === "Enter") {
        const s = document.getElementById("flappy-win-overlay");
        s && s.style.display === "flex" && goNext();
      }
      y ||
        m ||
        !b ||
        c ||
        ((e.code === "KeyW" || e.key === "w" || e.code === "ArrowUp") &&
          !u &&
          (e.preventDefault(), E()),
        (e.code === "KeyS" || e.key === "s" || e.code === "ArrowDown") &&
          u &&
          (e.preventDefault(), E()),
        y && e.code === "Enter" && w());
    }),
    (B = (e) => {}),
    (R = (e) => {
      e.target === l && !y && !m && (e.preventDefault(), E());
    }),
    document.addEventListener("keydown", k),
    document.addEventListener("mousedown", B),
    document.addEventListener("touchstart", R, { passive: !1 }));
  const p = document.getElementById("vol-slider-3");
  p &&
    p.addEventListener("input", (e) => {
      z(parseFloat(e.target.value));
    });
  const t = document.getElementById("btn-toggle-music-3");
  (t &&
    t.addEventListener("click", () => {
      F();
    }),
    w(),
    x());
}
function w() {
  ((n = {
    x: l.width / 3,
    y: l.height / 2,
    velocity: 0,
    gravity: 0.12,
    jump: -3.5,
    size: 20,
  }),
    (a = []),
    (f = 0),
    (T = 0),
    (y = !1),
    (m = !1),
    (b = !1),
    (u = !1),
    (S = !1),
    (c = !1),
    (document.getElementById("flappy-score").innerText = f),
    document.getElementById("flappy-score").classList.remove("glitch-win"),
    (document.getElementById("flappy-warning").style.display = "none"),
    (document.getElementById("flappy-overlay").style.display = "none"),
    (document.getElementById("flappy-win-overlay").style.display = "none"));
  const o = document.getElementById("flappy-popup");
  o &&
    ((o.style.display = "block"),
    setTimeout(() => {
      ((o.style.display = "none"), (b = !0));
    }, 3e3));
}
function E() {
  n.velocity = n.jump;
}
let g = 0,
  I = 0;
function x(o) {
  g || (g = o);
  let r = o - g;
  ((g = o), r > 100 && (r = 16.66));
  const p = (r / 16.66) * 1.2;
  if (y || m) {
    if (!m) {
      const t = document.getElementById("flappy-overlay");
      t.style.display !== "flex" &&
        ((t.style.display = "flex"),
        (document.getElementById("overlay-title").innerText = "SYSTEM FAILURE"),
        (document.getElementById("overlay-title").style.color = "#0ff"),
        (document.getElementById("overlay-msg").innerText =
          "Collision detected."),
        (document.getElementById("overlay-msg").style.color = "#0ff"),
        (document.getElementById("btn-restart").style.display = "inline-block"),
        (document.getElementById("btn-trap").style.display = "inline-block"));
    }
    v = requestAnimationFrame(x);
    return;
  }
  if (c) {
    ((g = o), (v = requestAnimationFrame(x)));
    return;
  }
  if (b) {
    if (
      ((n.velocity += n.gravity * p), (n.y += n.velocity * p), f === 3 && !u)
    ) {
      ((u = !0), (n.gravity = -0.12), (n.jump = 3.5));
      const t = document.getElementById("flappy-warning");
      ((t.innerText = "GRAVITY INVERTED"),
        (t.style.display = "block"),
        setTimeout(() => {
          t.style.display = "none";
        }, 2e3));
    }
    if ((f === 4 && (S = !0), (I += p), I >= 150)) {
      I = 0;
      let t = 300;
      const e = 50;
      l.height < t + e * 2 && (t = l.height - e * 2);
      const s = l.height - e - t,
        d = Math.random() * (s - e) + e;
      a.push({
        x: l.width,
        top: d,
        gap: t,
        width: 50,
        passed: !1,
        timeOffset: Math.random() * Math.PI * 2,
      });
    }
    for (let t = 0; t < a.length; t++) {
      let e = a[t];
      ((e.x -= 1.5 * p),
        S && (e.top += Math.sin(T / 20 + e.timeOffset) * 2 * p),
        n.x + n.size > e.x &&
          n.x < e.x + e.width &&
          (n.y < e.top || n.y + n.size > e.top + e.gap) &&
          (y = !0),
        e.x + e.width < n.x &&
          !e.passed &&
          (f++,
          (e.passed = !0),
          (document.getElementById("flappy-score").innerText = f)));
    }
    (a.length > 0 && a[0].x + a[0].width < 0 && a.shift(),
      (n.y + n.size > l.height || n.y < 0) && (y = !0));
  }
  ((i.fillStyle = "#000"),
    i.fillRect(0, 0, l.width, l.height),
    (i.strokeStyle = "#020"),
    (i.lineWidth = 1),
    i.beginPath());
  for (let t = 0; t < l.height; t += 40) (i.moveTo(0, t), i.lineTo(l.width, t));
  (i.stroke(),
    (i.fillStyle = "#000"),
    (i.strokeStyle = "#0f0"),
    (i.lineWidth = 2));
  for (let t = 0; t < a.length; t++) {
    let e = a[t];
    (i.fillRect(e.x, 0, e.width, e.top), i.strokeRect(e.x, 0, e.width, e.top));
    const s = e.top + e.gap;
    (i.fillRect(e.x, s, e.width, l.height - s),
      i.strokeRect(e.x, s, e.width, l.height - s),
      (i.fillStyle = "#0f0"),
      (i.font = "10px monospace"));
    for (let d = 20; d < e.top; d += 30) i.fillText("//", e.x + 15, d);
    for (let d = s + 20; d < l.height; d += 30) i.fillText("//", e.x + 15, d);
    i.fillStyle = "#000";
  }
  ((i.fillStyle = "#0f0"),
    i.fillRect(n.x, n.y, n.size, n.size),
    (i.fillStyle = "#000"),
    i.fillRect(n.x + 12, u ? n.y + 12 : n.y + 4, 4, 4),
    T++,
    (v = requestAnimationFrame(x)));
}
function G() {
  (cancelAnimationFrame(v),
    document.removeEventListener("keydown", k),
    document.removeEventListener("mousedown", B),
    document.removeEventListener("touchstart", R),
    window.removeEventListener("resize", h));
  const o = document.getElementById("btn-restart");
  o && o.removeEventListener("click", L);
  const r = document.getElementById("btn-trap");
  r && r.removeEventListener("click", D);
}
export { G as destroy, W as init };
