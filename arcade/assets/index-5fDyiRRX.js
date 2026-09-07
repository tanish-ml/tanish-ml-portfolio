const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DfyXtSNG.js","./ui-MGXCfiiX.js","./index-LJsz0jT-.js","./index-BFX1cH5B.js","./index-DGMIGfn1.js","./index-CRSvVfT_.js","./index-BxSFIBPY.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function K(){const e=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),t=window.innerWidth<=768;if(e||t)throw document.body.innerHTML=`
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
        `,new Error("Mobile device blocked.")}const N="modulepreload",$=function(e,t){return new URL(e,t).href},D={},m=function(t,n,s){let o=Promise.resolve();if(n&&n.length>0){const d=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));o=Promise.allSettled(n.map(a=>{if(a=$(a,s),a in D)return;D[a]=!0;const u=a.endsWith(".css"),r=u?'[rel="stylesheet"]':"";if(!!s)for(let E=d.length-1;E>=0;E--){const _=d[E];if(_.href===a&&(!u||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${r}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":N,u||(g.as="script"),g.crossOrigin="",g.href=a,c&&g.setAttribute("nonce",c),document.head.appendChild(g),u)return new Promise((E,_)=>{g.addEventListener("load",E),g.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return o.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},R=e=>btoa(JSON.stringify(e)),U=e=>{try{return JSON.parse(atob(e))}catch{return null}},L="_stage_progress",V="_dev_mode";sessionStorage.getItem(L)||sessionStorage.setItem(L,R({highestUnlockedStage:1,answers:{}}));function I(){return U(sessionStorage.getItem(L))||{highestUnlockedStage:1,answers:{}}}function z(e){sessionStorage.setItem(L,R(e))}function H(){return C()?99:I().highestUnlockedStage||1}function W(e){const t=I();e>t.highestUnlockedStage&&(t.highestUnlockedStage=e,z(t))}function ee(e,t){const n=I();n.answers||(n.answers={}),n.answers[e]=t,z(n)}function te(e){const t=I();return t.answers?t.answers[e]:null}function C(){return sessionStorage.getItem(V)==="true"}function Y(){const e=C();return sessionStorage.setItem(V,(!e).toString()),!e}const F={"stage-1":()=>m(()=>import("./index-DfyXtSNG.js"),__vite__mapDeps([0,1]),import.meta.url),"stage-2":()=>m(()=>import("./index-TBnW1n08.js"),[],import.meta.url),"stage-3":()=>m(()=>import("./index-LJsz0jT-.js"),__vite__mapDeps([2,1]),import.meta.url),"stage-4":()=>m(()=>import("./index-BFX1cH5B.js"),__vite__mapDeps([3,1]),import.meta.url),"stage-5":()=>m(()=>import("./index-DGMIGfn1.js"),__vite__mapDeps([4,1]),import.meta.url),"stage-6":()=>m(()=>import("./index-CRSvVfT_.js"),__vite__mapDeps([5,1]),import.meta.url),"stage-7":()=>m(()=>import("./index-BxSFIBPY.js"),__vite__mapDeps([6,1]),import.meta.url),"stage-8":()=>m(()=>import("./index-BKMnEwam.js"),[],import.meta.url)};let p=null,k=!1;async function T(){if(k)return;k=!0;let e=window.location.hash.replace("#/","");e||(e="stage-1",window.history.replaceState(null,"","#/stage-1"));const t=e.match(/stage-(\d+)/),n=t?parseInt(t[1],10):1,s=H();if(n>s&&!C()){console.warn(`[Anti-Cheat] Attempted to access stage ${n}. Highest unlocked is ${s}.`),window.location.hash=`#/stage-${s}`,k=!1;return}if(F[e]){p&&p.destroy&&p.destroy();try{const o=await F[e]();p=o,window.history.pushState({stage:e},"",`#/${e}`),o.init&&o.init()}catch(o){console.error("Failed to load stage:",o),document.getElementById("app").innerHTML=`
                <div style="padding: 20px;">
                    <h2>Error loading stage</h2>
                    <p>${o.message}</p>
                </div>
            `}}else window.location.hash="#/stage-1";k=!1}window.__isProgrammaticNav=!1;window.goToStage=function(e){window.__isProgrammaticNav=!0;const t="stage-"+e;window.history.pushState({stage:t},"","#/"+t),T(),setTimeout(()=>{window.__isProgrammaticNav=!1},200)};window.transitionToStage=function(e){if(window.__isTransitioning)return;window.__isTransitioning=!0;const t=document.createElement("canvas");t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100vw",t.style.height="100vh",t.style.zIndex="1000000",t.style.pointerEvents="all",t.style.opacity="0",t.style.transition="opacity 0.3s ease-in",document.body.appendChild(t),t.width=window.innerWidth,t.height=window.innerHeight;const n=t.getContext("2d");n.fillStyle="#000",n.fillRect(0,0,t.width,t.height),setTimeout(()=>{t.style.opacity="1"},10);const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";n.fillStyle="#0f0",n.font="16px monospace";const o=Math.floor(t.width/10),i=Math.floor(t.height/16),d=o*i;let l=Array.from({length:d},(r,h)=>h);for(let r=l.length-1;r>0;r--){const h=Math.floor(Math.random()*(r+1));[l[r],l[h]]=[l[h],l[r]]}let c=0;const a=Math.ceil(d/75);let u;setTimeout(()=>{u=setInterval(()=>{for(let r=0;r<a;r++){if(c>=l.length){clearInterval(u);break}const h=l[c++],g=h%o,E=Math.floor(h/o),_=s[Math.floor(Math.random()*s.length)];n.fillText(_,g*10,E*16+16)}},16)},300),setTimeout(()=>{clearInterval(u),window.goToStage(e),setTimeout(()=>{t.style.transition="opacity 1s ease-out",t.style.opacity="0",setTimeout(()=>{t.remove(),window.__isTransitioning=!1},1e3)},100)},2e3)};function G(){T(),window.addEventListener("hashchange",()=>{T()}),window.addEventListener("keydown",e=>{(e.key==="F5"||e.ctrlKey&&e.key.toLowerCase()==="r")&&(e.preventDefault(),p?(p.destroy&&p.destroy(),p.init&&p.init()):T())})}let f=new Audio,b=new Audio,M="A",v=!1,P=null;const j=.5;let A=j;function oe(e){const t="./";let n=e.startsWith("/")?e.substring(1):e;const s=t.endsWith("/")?t+n:t+"/"+n;if(v){const o=M==="A"?f:b;if(o.src.endsWith(n)||o.src.endsWith(e)){o.volume=A;return}o.pause(),o.src=s,o.loop=!0,o.currentTime=0,o.volume=A,o.play().catch(i=>console.error(i))}else P=s}function ne(e){if(A=e,v){const t=M==="A"?f:b;t.volume=A}}function ie(){return A}let x,w,S,O=!1;function se(){if(!O)try{const e=window.AudioContext||window.webkitAudioContext;x=new e,w=x.createAnalyser(),w.fftSize=128,S=new Uint8Array(w.frequencyBinCount),f.crossOrigin="anonymous",b.crossOrigin="anonymous";const t=x.createMediaElementSource(f),n=x.createMediaElementSource(b);t.connect(w),n.connect(w),w.connect(x.destination),O=!0}catch(e){console.warn("[Audio] Failed to initialize AudioContext analyzer:",e)}}function re(){if(!O||!w)return{energy:0,dataArray:null};x&&x.state==="suspended"&&x.resume(),w.getByteFrequencyData(S);let e=0;for(let t=0;t<S.length;t++)e+=S[t];return{energy:S.length>0?e/S.length:0,dataArray:S}}function X(){if(console.log("[Audio] Initializing global audio listener..."),v||window._audioInitialized)return;f.style.display="none",b.style.display="none",document.body.appendChild(f),document.body.appendChild(b);const e=()=>{window._audioInitialized||(console.log("[Audio] First interaction detected! Starting playback..."),window._audioInitialized=!0,v=!0,P&&(f.src=P,f.loop=!0,f.volume=A,f.play().catch(t=>console.error(t)),M="A")),document.removeEventListener("click",e),document.removeEventListener("keydown",e)};document.addEventListener("click",e),document.addEventListener("keydown",e)}function ae(){return v?(v=!1,f.pause(),b.pause()):(v=!0,(M==="A"?f:b).play().catch(t=>console.error(t))),v}let y=null;function B(e){const t=window.location.hash;if(!["#stage3","#stage4","#stage5","#stage6"].includes(t))return;if(e.type==="keydown"){const d=e.key.toLowerCase();if(!["w","a","s","d"," ","arrowup","arrowdown","arrowleft","arrowright"].includes(d))return}y||(y=new(window.AudioContext||window.webkitAudioContext)),y.state==="suspended"&&y.resume();const n=y.createOscillator(),s=y.createGain(),o=[130.81,155.56,174.61,196,233.08,261.63,311.13,349.23,392,466.16,523.25,622.25,698.46,783.99,932.33];n.frequency.value=o[Math.floor(Math.random()*o.length)],n.type=Math.random()>.5?"square":"triangle",n.connect(s),s.connect(y.destination);const i=y.currentTime;s.gain.setValueAtTime(0,i),s.gain.linearRampToValueAtTime(.3,i+.01),s.gain.exponentialRampToValueAtTime(.001,i+.15),n.start(i),n.stop(i+.2)}window.addEventListener("click",B);window.addEventListener("keydown",B);function J(){const e=document.createElement("div");e.id="neon-cursor",e.style.cssText=`
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
    `,document.body.appendChild(e);const t=[];for(let c=0;c<8;c++){const a=document.createElement("div");a.style.cssText=`
            position: fixed;
            top: 0; left: 0;
            width: ${10-c}px; height: ${10-c}px;
            background: rgba(0, 255, 0, ${.7-c*.08});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999999;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(0,255,0,0.5);
            display: none;
        `,document.body.appendChild(a),t.push({el:a,x:-100,y:-100})}let n=-100,s=-100,o=!1,i=!1;window.addEventListener("mousemove",c=>{n=c.clientX,s=c.clientY;const a=c.target;a.closest("a")||a.closest("button")||a.closest("input")||window.getComputedStyle(a).cursor==="pointer"?(e.style.width="20px",e.style.height="20px",e.style.backgroundColor="#fff",e.style.boxShadow="0 0 15px #fff, 0 0 30px #0f0"):(e.style.width="12px",e.style.height="12px",e.style.backgroundColor="#0f0",e.style.boxShadow="0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0")});function d(){const c=window.location.hash||"";return!(c.includes("stage-4")||c.includes("stage-5"))}function l(){if(d()){!o&&n>0&&(e.style.display="block",t.forEach(r=>r.el.style.display="block"),o=!0),i||(document.body.classList.add("custom-cursor-active"),i=!0),e.style.left=n+"px",e.style.top=s+"px";let a=n,u=s;for(let r=0;r<t.length;r++)t[r].x+=(a-t[r].x)*.45,t[r].y+=(u-t[r].y)*.45,t[r].el.style.left=t[r].x+"px",t[r].el.style.top=t[r].y+"px",a=t[r].x,u=t[r].y}else o&&(e.style.display="none",t.forEach(a=>a.el.style.display="none"),o=!1),i&&(document.body.classList.remove("custom-cursor-active"),i=!1);requestAnimationFrame(l)}l()}try{K()}catch(e){console.warn(e.message)}G();X();J();window.addEventListener("keydown",e=>{if(e.shiftKey&&e.key.toLowerCase()==="f"&&!e.ctrlKey&&!e.altKey){e.preventDefault(),window.toggleFullscreen();return}if(e.shiftKey&&e.key.toLowerCase()==="l"&&!e.ctrlKey&&!e.altKey){e.preventDefault();const n=(window.location.hash||"#/stage-1").match(/stage-(\d+)/);if(n){let s=parseInt(n[1]);if(s<8){let o=s+1;W(o),window.transitionToStage?window.transitionToStage(o):window.location.hash="#/stage-"+o}}return}if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==="q"){e.preventDefault();const t=Y();q(t)}});function q(e){let t=document.getElementById("dev-mode-overlay");e?t||(t=document.createElement("div"),t.id="dev-mode-overlay",t.style.cssText=`
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
            `,document.body.appendChild(t)):t&&t.remove()}C()&&q(!0);function Z(){if(sessionStorage.getItem("welcomeShown"))return;const e=document.createElement("div");e.id="global-welcome-popup",e.style.cssText=`
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.95); z-index: 99999;
        display: flex; justify-content: center; align-items: center;
        flex-direction: column; color: #0f0; font-family: monospace;
        padding: 20px; text-align: center;
    `,e.innerHTML=`
        <h1 style="font-size: 36px; margin-bottom: 20px; text-shadow: 0 0 15px #0f0;">SYSTEM INITIALIZATION</h1>
        <div style="font-size: 18px; max-width: 650px; line-height: 1.8; text-align: left; background: #050505; padding: 30px; border: 2px solid #0f0; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);">
            <p style="margin-bottom: 15px;">> The whole game needs to be solved to get to the message.</p>
            <p style="margin-bottom: 15px;">> The game only holds in session memory, so any information or password set will not be present in the next session.</p>
            <p style="margin-bottom: 15px;">> For the best experience, we need you to go full screen.</p>
            <p style="margin-bottom: 15px;">> You can press <strong style="color: #fff; background: #333; padding: 2px 6px; border-radius: 4px;">H</strong> to get instructions of the current stage.</p>
            <p>> Please ignore any bugs if you find any :)</p>
        </div>
        <button id="btn-welcome-continue" style="margin-top: 40px; padding: 15px 40px; font-size: 22px; background: transparent; color: #0f0; border: 2px solid #0f0; cursor: pointer; font-family: monospace; font-weight: bold; text-shadow: 0 0 10px #0f0; box-shadow: 0 0 15px rgba(0,255,0,0.5); border-radius: 5px; transition: all 0.3s ease;">CONTINUE</button>
    `,document.body.appendChild(e);const t=document.getElementById("btn-welcome-continue");t.addEventListener("mouseover",()=>{t.style.background="#0f0",t.style.color="#000"}),t.addEventListener("mouseout",()=>{t.style.background="transparent",t.style.color="#0f0"}),t.addEventListener("click",()=>{sessionStorage.setItem("welcomeShown","true"),e.remove(),document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().catch(n=>{console.warn("Fullscreen request denied or not supported:",n)})})}Z();function Q(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen().catch(e=>console.log(e))}window.toggleFullscreen=Q;export{ee as a,te as b,se as c,re as d,oe as f,ie as g,C as i,ne as s,ae as t,W as u};
