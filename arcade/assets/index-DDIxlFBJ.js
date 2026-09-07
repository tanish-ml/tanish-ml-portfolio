const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CDJ-IAHN.js","./ui-MGXCfiiX.js","./index-CsB7UgEL.js","./index-D1I1mbYm.js","./index-UOZEi__u.js","./index--hRlN7ld.js","./index-DcAmot-v.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();function K(){const e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),t=window.innerWidth<=768;if(e||t)throw document.body.innerHTML=`
            <div style="
                position: fixed; 
                top: 0; left: 0; width: 100vw; height: 100vh; 
                background: #000; color: #0f0; 
                display: flex; align-items: center; justify-content: center; 
                text-align: center; font-family: monospace; padding: 20px;
                z-index: 999999;
            ">
                <div>
                    <h2>Mobile/Tablet Detected</h2>
                    <p>This experience is designed exclusively for desktop/laptop browsers.</p>
                    <p>Please open this link on a larger device.</p>
                </div>
            </div>
        `,new Error("Mobile device blocked.")}const q="modulepreload",U=function(e,t){return new URL(e,t).href},I={},m=function(t,o,s){let n=Promise.resolve();if(o&&o.length>0){const d=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(o.map(r=>{if(r=U(r,s),r in I)return;I[r]=!0;const f=r.endsWith(".css"),c=f?'[rel="stylesheet"]':"";if(!!s)for(let b=d.length-1;b>=0;b--){const S=d[b];if(S.href===r&&(!f||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${c}`))return;const p=document.createElement("link");if(p.rel=f?"stylesheet":q,f||(p.as="script"),p.crossOrigin="",p.href=r,l&&p.setAttribute("nonce",l),document.head.appendChild(p),f)return new Promise((b,S)=>{p.addEventListener("load",b),p.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${r}`)))})}))}function i(d){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=d,window.dispatchEvent(a),!a.defaultPrevented)throw d}return n.then(d=>{for(const a of d||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},R=e=>btoa(JSON.stringify(e)),N=e=>{try{return JSON.parse(atob(e))}catch{return null}},k="_stage_progress",V="_dev_mode";sessionStorage.getItem(k)||sessionStorage.setItem(k,R({highestUnlockedStage:1,answers:{}}));function L(){return N(sessionStorage.getItem(k))||{highestUnlockedStage:1,answers:{}}}function z(e){sessionStorage.setItem(k,R(e))}function $(){return M()?99:L().highestUnlockedStage||1}function W(e){const t=L();e>t.highestUnlockedStage&&(t.highestUnlockedStage=e,z(t))}function Z(e,t){const o=L();o.answers||(o.answers={}),o.answers[e]=t,z(o)}function ee(e){const t=L();return t.answers?t.answers[e]:null}function M(){return sessionStorage.getItem(V)==="true"}function G(){const e=M();return sessionStorage.setItem(V,(!e).toString()),!e}const D={"stage-1":()=>m(()=>import("./index-CDJ-IAHN.js"),__vite__mapDeps([0,1]),import.meta.url),"stage-2":()=>m(()=>import("./index-CYmQCLbW.js"),[],import.meta.url),"stage-3":()=>m(()=>import("./index-CsB7UgEL.js"),__vite__mapDeps([2,1]),import.meta.url),"stage-4":()=>m(()=>import("./index-D1I1mbYm.js"),__vite__mapDeps([3,1]),import.meta.url),"stage-5":()=>m(()=>import("./index-UOZEi__u.js"),__vite__mapDeps([4,1]),import.meta.url),"stage-6":()=>m(()=>import("./index--hRlN7ld.js"),__vite__mapDeps([5,1]),import.meta.url),"stage-7":()=>m(()=>import("./index-DcAmot-v.js"),__vite__mapDeps([6,1]),import.meta.url),"stage-8":()=>m(()=>import("./index-B5MnlhJn.js"),[],import.meta.url)};let g=null,C=!1;async function A(){if(C)return;C=!0;let e=window.location.hash.replace("#/","");e||(e="stage-1",window.history.replaceState(null,"","#/stage-1"));const t=e.match(/stage-(\d+)/);if(t&&parseInt(t[1],10),$(),D[e]){g&&g.destroy&&g.destroy();try{const o=await D[e]();g=o,window.history.pushState({stage:e},"",`#/${e}`),o.init&&o.init()}catch(o){console.error("Failed to load stage:",o),document.getElementById("app").innerHTML=`
                <div style="padding: 20px;">
                    <h2>Error loading stage</h2>
                    <p>${o.message}</p>
                </div>
            `}}else window.location.hash="#/stage-1";C=!1}window.__isProgrammaticNav=!1;window.goToStage=function(e){window.__isProgrammaticNav=!0;const t="stage-"+e;window.history.pushState({stage:t},"","#/"+t),A(),setTimeout(()=>{window.__isProgrammaticNav=!1},200)};window.transitionToStage=function(e){if(window.__isTransitioning)return;window.__isTransitioning=!0;const t=document.getElementById("app");t&&(t.innerHTML=`
            <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; color: #0f0; font-family: monospace;">
                <h1 style="font-size: 3rem; margin-bottom: 20px; text-shadow: 0 0 10px #0f0;">MODULE COMPLETE</h1>
                <p style="font-size: 1.5rem;">[ Returning to mainframe... ]</p>
            </div>
        `),setTimeout(()=>{window.parent&&window.parent.postMessage("game_won","*")},2e3)};function H(){A(),window.addEventListener("hashchange",()=>{A()}),window.addEventListener("keydown",e=>{(e.key==="F5"||e.ctrlKey&&e.key.toLowerCase()==="r")&&(e.preventDefault(),g?(g.destroy&&g.destroy(),g.init&&g.init()):A())})}let u=new Audio,x=new Audio,T="A",v=!1,O=null;const Y=.5;let E=Y;function te(e){const t="./";let o=e.startsWith("/")?e.substring(1):e;const s=t.endsWith("/")?t+o:t+"/"+o;if(v){const n=T==="A"?u:x;if(n.src.endsWith(o)||n.src.endsWith(e)){n.volume=E;return}n.pause(),n.src=s,n.loop=!0,n.currentTime=0,n.volume=E,n.play().catch(i=>console.error(i))}else O=s}function ne(e){if(E=e,v){const t=T==="A"?u:x;t.volume=E}}function oe(){return E}let w,y,_,P=!1;function ie(){if(!P)try{const e=window.AudioContext||window.webkitAudioContext;w=new e,y=w.createAnalyser(),y.fftSize=128,_=new Uint8Array(y.frequencyBinCount),u.crossOrigin="anonymous",x.crossOrigin="anonymous";const t=w.createMediaElementSource(u),o=w.createMediaElementSource(x);t.connect(y),o.connect(y),y.connect(w.destination),P=!0}catch(e){console.warn("[Audio] Failed to initialize AudioContext analyzer:",e)}}function re(){if(!P||!y)return{energy:0,dataArray:null};w&&w.state==="suspended"&&w.resume(),y.getByteFrequencyData(_);let e=0;for(let t=0;t<_.length;t++)e+=_[t];return{energy:_.length>0?e/_.length:0,dataArray:_}}function j(){if(console.log("[Audio] Initializing global audio listener..."),v||window._audioInitialized)return;u.style.display="none",x.style.display="none",document.body.appendChild(u),document.body.appendChild(x);const e=()=>{window._audioInitialized||(console.log("[Audio] First interaction detected! Starting playback..."),window._audioInitialized=!0,v=!0,O&&(u.src=O,u.loop=!0,u.volume=E,u.play().catch(t=>console.error(t)),T="A")),document.removeEventListener("click",e),document.removeEventListener("keydown",e)};document.addEventListener("click",e),document.addEventListener("keydown",e)}function se(){return v?(v=!1,u.pause(),x.pause()):(v=!0,(T==="A"?u:x).play().catch(t=>console.error(t))),v}let h=null;function B(e){const t=window.location.hash;if(!["#stage3","#stage4","#stage5","#stage6"].includes(t))return;if(e.type==="keydown"){const d=e.key.toLowerCase();if(!["w","a","s","d"," ","arrowup","arrowdown","arrowleft","arrowright"].includes(d))return}h||(h=new(window.AudioContext||window.webkitAudioContext)),h.state==="suspended"&&h.resume();const o=h.createOscillator(),s=h.createGain(),n=[130.81,155.56,174.61,196,233.08,261.63,311.13,349.23,392,466.16,523.25,622.25,698.46,783.99,932.33];o.frequency.value=n[Math.floor(Math.random()*n.length)],o.type=Math.random()>.5?"square":"triangle",o.connect(s),s.connect(h.destination);const i=h.currentTime;s.gain.setValueAtTime(0,i),s.gain.linearRampToValueAtTime(.3,i+.01),s.gain.exponentialRampToValueAtTime(.001,i+.15),o.start(i),o.stop(i+.2)}window.addEventListener("click",B);window.addEventListener("keydown",B);function X(){const e=document.createElement("div");e.id="neon-cursor",e.style.cssText=`
        position: fixed;
        top: 0; left: 0;
        width: 12px; height: 12px;
        background: #0f0;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000000;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0;
        display: none;
        transition: width 0.2s, height 0.2s, background-color 0.2s;
    `,document.body.appendChild(e);const t=[];for(let l=0;l<8;l++){const r=document.createElement("div");r.style.cssText=`
            position: fixed;
            top: 0; left: 0;
            width: ${10-l}px; height: ${10-l}px;
            background: rgba(0, 255, 0, ${.7-l*.08});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999999;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(0,255,0,0.5);
            display: none;
        `,document.body.appendChild(r),t.push({el:r,x:-100,y:-100})}let o=-100,s=-100,n=!1,i=!1;window.addEventListener("mousemove",l=>{o=l.clientX,s=l.clientY;const r=l.target;r.closest("a")||r.closest("button")||r.closest("input")||window.getComputedStyle(r).cursor==="pointer"?(e.style.width="20px",e.style.height="20px",e.style.backgroundColor="#fff",e.style.boxShadow="0 0 15px #fff, 0 0 30px #0f0"):(e.style.width="12px",e.style.height="12px",e.style.backgroundColor="#0f0",e.style.boxShadow="0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0")});function d(){const l=window.location.hash||"";return!(l.includes("stage-4")||l.includes("stage-5"))}function a(){if(d()){!n&&o>0&&(e.style.display="block",t.forEach(c=>c.el.style.display="block"),n=!0),i||(document.body.classList.add("custom-cursor-active"),i=!0),e.style.left=o+"px",e.style.top=s+"px";let r=o,f=s;for(let c=0;c<t.length;c++)t[c].x+=(r-t[c].x)*.45,t[c].y+=(f-t[c].y)*.45,t[c].el.style.left=t[c].x+"px",t[c].el.style.top=t[c].y+"px",r=t[c].x,f=t[c].y}else n&&(e.style.display="none",t.forEach(r=>r.el.style.display="none"),n=!1),i&&(document.body.classList.remove("custom-cursor-active"),i=!1);requestAnimationFrame(a)}a()}try{K()}catch(e){console.warn(e.message)}H();j();X();window.addEventListener("keydown",e=>{if(e.shiftKey&&e.key.toLowerCase()==="f"&&!e.ctrlKey&&!e.altKey){e.preventDefault(),window.toggleFullscreen();return}if(e.shiftKey&&e.key.toLowerCase()==="l"&&!e.ctrlKey&&!e.altKey){e.preventDefault();const o=(window.location.hash||"#/stage-1").match(/stage-(\d+)/);if(o){let s=parseInt(o[1]);if(s<8){let n=s+1;W(n),window.transitionToStage?window.transitionToStage(n):window.location.hash="#/stage-"+n}}return}if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==="q"){e.preventDefault();const t=G();F(t)}});function F(e){let t=document.getElementById("dev-mode-overlay");e?t||(t=document.createElement("div"),t.id="dev-mode-overlay",t.style.cssText=`
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                background: rgba(0, 0, 0, 0.9);
                color: #0ff;
                padding: 10px;
                font-family: monospace;
                border-bottom: 1px solid #0ff;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
            `,t.innerHTML=`
                <strong>[ DEV MODE ]</strong>
                <a href="#/stage-1" style="color: #0f0; text-decoration: none;">Stage 1</a> |
                <a href="#/stage-2" style="color: #0f0; text-decoration: none;">Stage 2</a> |
                <a href="#/stage-3" style="color: #0f0; text-decoration: none;">Stage 3</a> |
                <a href="#/stage-4" style="color: #0f0; text-decoration: none;">Stage 4</a> |
                <a href="#/stage-5" style="color: #0f0; text-decoration: none;">Stage 5</a> |
                <a href="#/stage-6" style="color: #0f0; text-decoration: none;">Stage 6</a> |
                <a href="#/stage-7" style="color: #0f0; text-decoration: none;">Stage 7</a> |
                <a href="#/stage-8" style="color: #0f0; text-decoration: none;">Stage 8</a> |
                <a href="#/stage-9" style="color: #0f0; text-decoration: none;">Stage 9 (Trial)</a>
            `,document.body.appendChild(t)):t&&t.remove()}M()&&F(!0);function J(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen().catch(e=>console.log(e))}window.toggleFullscreen=J;export{Z as a,ee as b,ie as c,re as d,te as f,oe as g,M as i,ne as s,se as t,W as u};
