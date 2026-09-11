import re

html_file = 'federated-learning.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace the entire <div id="scroll-container">...</div>
# but wait, it might be safer to replace the <div class="step" blocks.
# Let's extract the header and footer around the scroll-content
match = re.search(r'(<div class="scroll-content" id="scroll-container">)(.*?)(</div>\s*<canvas id="webgl-container")', content, re.DOTALL)
if match:
    prefix = match.group(1)
    suffix = match.group(3)
    
    new_steps = '''
      <!-- Step 0 -->
      <div class="step" data-step="0">
        <div class="step-content">
          <h2>1 // THE CLOUD PARADIGM</h2>
          <p>Traditional Machine Learning relies on centralized servers. Massive amounts of raw, sensitive user data are constantly uploaded to a single datacenter for processing and model training.</p>
          <div class="code-block" style="color: #00aaff; border-color: #0044aa">Central Server Online.<br />Awaiting 10TB user data...</div>
        </div>
      </div>
      <!-- Step 1 -->
      <div class="step right-align" data-step="1">
        <div class="step-content">
          <h2>2 // BOTTLENECKS & LATENCY</h2>
          <p>As the number of IoT devices scales to the billions, the cloud chokes. Pushing terabytes of raw video and sensor data to a remote server creates massive latency, bandwidth congestion, and high computational costs.</p>
          <div class="code-block" style="color: #ff3333; border-color: #551111">WARNING: Bandwidth Overloaded<br />Ping: 450ms...</div>
        </div>
      </div>
      <!-- Step 2 -->
      <div class="step" data-step="2">
        <div class="step-content">
          <h2>3 // THE PRIVACY CRISIS</h2>
          <p>Beyond latency, sending raw data off-device is a fundamental security flaw. Personal health metrics, private messages, and facial recognition data are exposed in transit and vulnerable to server-side data breaches.</p>
          <div class="code-block" style="color: #ff3333; border-color: #551111">ERROR: Data Privacy Compromised<br />Raw payload intercepted.</div>
        </div>
      </div>
      <!-- Step 3 -->
      <div class="step right-align" data-step="3">
        <div class="step-content">
          <h2>4 // THE DECENTRALIZATION SHIFT</h2>
          <p>Federated Learning flips the paradigm: instead of bringing the data to the model, we bring the model to the data. Millions of distributed edge devices form a massive, decentralized neural network.</p>
          <div class="code-block" style="color: #00ffcc; border-color: #0088aa">Spawning Edge Node Grid...<br />Status: Distributed.</div>
        </div>
      </div>
      <!-- Step 4 -->
      <div class="step" data-step="4">
        <div class="step-content">
          <h2>5 // MODEL DEPLOYMENT</h2>
          <p>The central server initializes a base neural network model. It broadcasts this identical, pre-trained global model directly to thousands of participating edge devices simultaneously.</p>
          <div class="code-block" style="color: #00ffcc; border-color: #0088aa">Broadcasting v1.0.4 Weights...<br />Transmission Complete.</div>
        </div>
      </div>
      <!-- Step 5 -->
      <div class="step right-align" data-step="5">
        <div class="step-content">
          <h2>6 // LOCAL TRAINING (ON-DEVICE)</h2>
          <p>Each edge device (smartphone, drone, EV) locally trains its copy of the model using its own private data cache. The raw data never leaves the physical hardware.</p>
          <div class="code-block" style="color: #00ffcc; border-color: #0088aa">Edge Node 0x7A Training...<br />Epoch 5/5. Loss: 0.041.</div>
        </div>
      </div>
      <!-- Step 6 -->
      <div class="step" data-step="6">
        <div class="step-content">
          <h2>7 // GRADIENT EXTRACTION</h2>
          <p>Instead of the data, the device extracts the "learnings"—a mathematical summary of weight updates (gradients) representing how the model improved. These matrix diffs are orders of magnitude smaller than raw data.</p>
          <div class="code-block" style="color: #aa00ff; border-color: #5500aa">Computing weight delta...<br />I"W extracted (1.2MB).</div>
        </div>
      </div>
      <!-- Step 7 -->
      <div class="step right-align" data-step="7">
        <div class="step-content">
          <h2>8 // DIFFERENTIAL PRIVACY</h2>
          <p>To prevent reverse-engineering of the gradients, Cryptographic Differential Privacy is applied. Mathematical noise is injected into the payload, masking individual contributions while preserving macro-trends.</p>
          <div class="code-block" style="color: #aa00ff; border-color: #5500aa">Applying Laplacian Noise...<br />Payload encrypted.</div>
        </div>
      </div>
      <!-- Step 8 -->
      <div class="step" data-step="8">
        <div class="step-content">
          <h2>9 // SECURE AGGREGATION</h2>
          <p>The edge devices transmit only their encrypted gradients back to the cloud. Using algorithms like FedAvg, the server securely averages millions of updates together into a single master improvement.</p>
          <div class="code-block" style="color: #00ff44; border-color: #00aa22">Receiving 50,000 updates...<br />Aggregating via FedAvg...</div>
        </div>
      </div>
      <!-- Step 9 -->
      <div class="step right-align" data-step="9">
        <div class="step-content">
          <h2>10 // GLOBAL OPTIMIZATION</h2>
          <p>The global model is mathematically upgraded. The server broadcasts the new, smarter v2.0 model back to the edge. The cycle repeats, achieving collective intelligence without centralized data.</p>
          <div class="code-block" style="color: #00aaff; border-color: #0044aa">Global Model v2.0 Compiled.<br />Beginning next round...</div>
        </div>
      </div>
      <!-- Step 10 -->
      <div class="step" data-step="10">
        <div class="step-content">
          <h2>FEDERATED EDGE AI</h2>
          <p>This is the future of Artificial Intelligence. High performance, zero latency, and uncompromising cryptographic privacy. We are building neural networks that scale organically across the globe.</p>
          <a href="index.html#projects" class="text-[var(--accent)] hover:text-[#ffffff] underline font-mono text-lg mt-4 inline-block">Return to Portfolio</a>
        </div>
      </div>
    '''
    
    new_content = content[:match.start()] + prefix + new_steps + suffix + content[match.end():]
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("MATCH NOT FOUND")
