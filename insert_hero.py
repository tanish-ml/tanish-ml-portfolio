import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hero section using regex so it matches regardless of whitespace
pattern = r'<!-- Hero Section -->\s*<section.*?class="min-h-screen flex flex-col justify-center items-start[^>]*>.*?ACCESS_MAINFRAME</a>\s*</div>\s*</section>'

replacement_hero = '''<!-- Hero Section -->
        <section
          class="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20 relative"
        >
          <div class="flex flex-col md:flex-row items-center justify-between w-full gap-12">
            <div class="flex flex-col items-start">
              <p class="text-[#00aa44] font-mono mb-4 tracking-widest">
                &gt; SYSTEM_INITIALIZATION_COMPLETE
              </p>
              <h1 class="decode-title" data-value="TANISH MITTAL" id="decoder">
                TANISH MITTAL
              </h1>
              <p
                class="text-lg md:text-xl text-[#00aa44] mt-6 max-w-2xl leading-relaxed font-mono"
              >
                [ ROLE: MACHINE_LEARNING_ENGINEER ] <br />
                [ FOCUS: EDGE_AI | COMPUTER_VISION | GENERATIVE_NLP ]
              </p>
              <div class="flex gap-4 mt-12 font-mono">
                <a
                  class="border border-[var(--accent)] text-black bg-[var(--accent)] hover:bg-[#ff0055] hover:border-[#ff0055] hover:text-white px-8 py-3 transition font-bold tracking-widest shadow-[0_0_15px_rgba(0,255,204,0.4)]"
                  href="#projects"
                  >ACCESS_MAINFRAME</a
                >
              </div>
            </div>
            
            <!-- ASCII Art Profile Picture -->
            <div class="hidden md:flex justify-center items-center relative z-10 w-[350px] lg:w-[450px]">
              <div style="position: relative; width: 100%; border-radius: 20px; overflow: hidden; background: rgba(0,0,0,0.8); border: 2px solid rgba(0, 255, 102, 0.3); box-shadow: 0 0 30px rgba(0,255,102,0.15);">
                <canvas id="ascii-canvas" style="width: 100%; display: block; filter: drop-shadow(0 0 10px rgba(0,255,102,0.4));"></canvas>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 25px rgba(0,0,0,1); pointer-events: none; border-radius: 20px;"></div>
              </div>
            </div>
          </div>
        </section>'''

if re.search(pattern, content, re.DOTALL):
    content = re.sub(pattern, replacement_hero, content, flags=re.DOTALL)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Injected ASCII canvas into Hero")
else:
    print("FAILED: Could not find Hero Section pattern")

