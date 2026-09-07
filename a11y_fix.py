import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add :focus-visible CSS and skip-link styles
a11y_css = """
      /* Accessibility Focus States */
      :focus-visible {
        outline: 2px dashed var(--accent) !important;
        outline-offset: 4px;
        transition: outline-offset 0.1s ease;
      }
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--bg);
        color: var(--accent);
        padding: 8px;
        z-index: 100000000;
        transition: top 0.2s ease;
      }
      .skip-link:focus {
        top: 0;
      }
"""
content = content.replace('/* --- AI COMPANION CURSOR --- */', a11y_css + '/* --- AI COMPANION CURSOR --- */')

# 2. Skip to main content link
skip_link = '<a href="#main-content" class="skip-link font-mono">Skip to main content</a>\n'
content = content.replace('<body>', '<body>\n' + skip_link)

# We should make <section id="projects"> into main content wrapper, or just add id="main-content" to the hero section.
content = content.replace(
    '<section\n      class="min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20"',
    '<main id="main-content">\n    <section\n      class="min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20"'
)
# Close main at the very end before scripts
content = content.replace('    <!-- AI Companion Cursor -->', '    </main>\n    <!-- AI Companion Cursor -->')


# 3. Add ARIA roles to interactive divs
card_pattern = re.compile(r'<div\s+class="card interactive"\s+onclick="([^"]+)">')
card_replacement = r'<div class="card interactive" onclick="\1" role="button" tabindex="0" onkeydown="if(event.key===\'Enter\'||event.key===\' \') this.click();">'
content = card_pattern.sub(card_replacement, content)

# 4. Hide decorative elements from screen readers
content = content.replace('id="bg-canvas"', 'id="bg-canvas" aria-hidden="true"')
content = content.replace('id="ascii-canvas"', 'id="ascii-canvas" aria-hidden="true"')
content = content.replace('class="crt-overlay"', 'class="crt-overlay" aria-hidden="true"')
content = content.replace('class="crt-vignette"', 'class="crt-vignette" aria-hidden="true"')
content = content.replace('class="blob blob-1"', 'class="blob blob-1" aria-hidden="true"')
content = content.replace('class="blob blob-2"', 'class="blob blob-2" aria-hidden="true"')
content = content.replace('id="ai-companion"', 'id="ai-companion" aria-hidden="true"')

# 5. Add aria-label to GitHub icon nav
content = content.replace(
    '<a\n            href="https://github.com/tanish-ml"\n            target="_blank"\n            class="hover:text-[#ff0055] transition"\n            ><i class="fab fa-github text-lg"></i\n          ></a>',
    '<a\n            href="https://github.com/tanish-ml"\n            target="_blank"\n            class="hover:text-[#ff0055] transition"\n            aria-label="GitHub Profile"\n            ><i class="fab fa-github text-lg" aria-hidden="true"></i\n          ></a>'
)

# 6. Make Menu Button accessible
content = content.replace(
    '<div class="interactive hover:text-[#ff0055] transition cursor-pointer text-xl ml-4" onclick="toggleMenu()">',
    '<div class="interactive hover:text-[#ff0055] transition cursor-pointer text-xl ml-4" onclick="toggleMenu()" role="button" tabindex="0" aria-label="Toggle Menu" onkeydown="if(event.key===\'Enter\'||event.key===\' \') this.click();">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("A11y fixes applied to index.html")
