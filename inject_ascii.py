import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'</a>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>',
    '''</a>
                </div>
                <!-- ASCII Art Container -->
                <div style="position: absolute; transform: translate3d(0px, 0px, -11100px); margin-left: -400px; margin-top: -300px; width: 800px; height: 600px; display: flex; justify-content: center; align-items: center;">
                    <canvas id="ascii-canvas" style="filter: drop-shadow(0 0 15px rgba(0,255,102,0.6)); pointer-events: none;"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>''',
    content
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Injected ASCII canvas")
