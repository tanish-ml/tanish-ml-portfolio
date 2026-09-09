import * as d3 from "d3";
import "/adaptive-fps.js";

function revealBody() {
  requestAnimationFrame(() => {
    document.body.classList.add("fade-in-loaded");
  });
}
if (document.readyState === "complete") {
  revealBody();
} else {
  window.addEventListener("load", revealBody);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (
      link &&
      link.hostname === window.location.hostname &&
      link.target !== "_blank" &&
      link.href.includes(".html")
    ) {
      if (link.hash && link.pathname === window.location.pathname) return;
      e.preventDefault();
      document.body.classList.remove("fade-in-loaded");
      setTimeout(() => {
        window.location.href = link.href;
      }, 500);
    }
  });
});

// --- STRUCTURED D3 DATA ---
const treeData = {
  name: "Tanish Mittal",
  desc: "Core System. Architecting Intelligence at the Edge.",
  color: "#ffffff",
  children: [
    {
      name: "Technical Skills",
      desc: "The engineering core. High-performance software and AI systems.",
      color: "#00ffcc",
      children: [
        {
          name: "Artificial Intelligence",
          desc: "The computational brain. Neural networks and classical learning.",
          color: "#ff0055",
          children: [
            {
              name: "Deep Learning",
              desc: "High-dimensional neural architectures.",
              color: "#ff3377",
              children: [
                {
                  name: "PyTorch",
                  desc: "Advanced tensor computation and dynamic neural networks.",
                  color: "#ff6699",
                },
                {
                  name: "Computer Vision",
                  desc: "Giving machines the ability to see and parse visual data.",
                  color: "#ff6699",
                  children: [
                    {
                      name: "CNN",
                      desc: "Convolutional Neural Networks for spatial feature extraction.",
                      color: "#ff99bb",
                    },
                  ],
                },
                {
                  name: "NLP",
                  desc: "Natural Language Processing. Teaching machines to read and generate text.",
                  color: "#ff6699",
                  children: [
                    {
                      name: "Transformers",
                      desc: "Attention is all you need. State-of-the-art sequence models.",
                      color: "#ff99bb",
                    },
                    {
                      name: "RNN",
                      desc: "Recurrent Neural Networks for temporal and sequential data.",
                      color: "#ff99bb",
                    },
                  ],
                },
              ],
            },
            {
              name: "Machine Learning",
              desc: "Classical predictive modeling and statistical inference.",
              color: "#ff3377",
              children: [
                {
                  name: "Scikit-Learn",
                  desc: "The standard library for baseline models and clustering.",
                  color: "#ff6699",
                },
                {
                  name: "Federated Learning",
                  desc: "Decentralized, privacy-preserving AI trained across edge devices.",
                  color: "#ff6699",
                },
              ],
            },
          ],
        },
        {
          name: "Data Systems",
          desc: "The circulatory system. Pipelines, processing, and persistence.",
          color: "#0055ff",
          children: [
            {
              name: "Databases",
              desc: "High-performance storage architectures.",
              color: "#3377ff",
              children: [
                {
                  name: "SQL",
                  desc: "Relational data structuring and complex querying.",
                  color: "#6699ff",
                },
                {
                  name: "MongoDB",
                  desc: "NoSQL document storage for unstructured data.",
                  color: "#6699ff",
                },
                {
                  name: "Redis",
                  desc: "In-memory data structure store for extreme speed caching.",
                  color: "#6699ff",
                },
                {
                  name: "Influx",
                  desc: "Time-series database built for high-frequency telemetry.",
                  color: "#6699ff",
                },
              ],
            },
            {
              name: "Data Processing",
              desc: "Wrangling and streaming massive datasets.",
              color: "#3377ff",
              children: [
                {
                  name: "Pandas & NumPy",
                  desc: "Vectorized matrix operations and data manipulation.",
                  color: "#6699ff",
                },
                {
                  name: "Kafka",
                  desc: "High-throughput distributed event streaming platform.",
                  color: "#6699ff",
                },
                {
                  name: "MQTT",
                  desc: "Lightweight messaging protocol optimized for IoT and Edge devices.",
                  color: "#6699ff",
                },
              ],
            },
          ],
        },
        {
          name: "System Design",
          desc: "Architecting scalable, resilient, and highly available backends.",
          color: "#aa00ff",
          children: [
            {
              name: "Microservices",
              desc: "Decoupling monolithic architectures into independent, scalable services.",
              color: "#cc66ff",
            },
            {
              name: "Distributed Systems",
              desc: "Designing for fault tolerance, consensus, and horizontal scaling.",
              color: "#cc66ff",
            },
            {
              name: "Load Balancing",
              desc: "Efficiently routing traffic across multiple server instances.",
              color: "#cc66ff",
            },
            {
              name: "API Gateways",
              desc: "Managing authentication, rate limiting, and routing for external clients.",
              color: "#cc66ff",
            },
          ],
        },
        {
          name: "Software & Web",
          desc: "The interface. Bridging complex models to human interaction.",
          color: "#00ffcc",
          children: [
            {
              name: "Backend APIs",
              desc: "Serving ML models to the web securely and rapidly.",
              color: "#33ffdd",
              children: [
                {
                  name: "Flask & FastAPI",
                  desc: "High-performance Python routing and inference serving.",
                  color: "#66ffee",
                },
                {
                  name: "Firebase",
                  desc: "Real-time backend-as-a-service and authentication.",
                  color: "#66ffee",
                },
              ],
            },
            {
              name: "Frontend",
              desc: "User-facing architecture and visualizations.",
              color: "#33ffdd",
              children: [
                {
                  name: "WebDev",
                  desc: "HTML, CSS, JavaScript, and modern WebGL.",
                  color: "#66ffee",
                },
                {
                  name: "Streamlit",
                  desc: "Rapid dashboarding and data-app prototyping.",
                  color: "#66ffee",
                },
                {
                  name: "UI/UX",
                  desc: "Designing intuitive, cyberpunk-inspired user experiences.",
                  color: "#66ffee",
                },
              ],
            },
          ],
        },
        {
          name: "DevOps & Cloud",
          desc: "The infrastructure. Scalability and version control.",
          color: "#ffaa00",
          children: [
            {
              name: "AWS",
              desc: "Amazon Web Services. Cloud compute, S3, and scalable ML deployment.",
              color: "#ffbb33",
            },
            {
              name: "Docker",
              desc: "Containerizing environments to ensure 'it works on my machine' works everywhere.",
              color: "#ffbb33",
            },
            {
              name: "Git",
              desc: "Distributed version control and collaborative repository management.",
              color: "#ffbb33",
            },
          ],
        },
      ],
    },
    {
      name: "Non-Technical Skills",
      desc: "The human element. Strategy, leadership, and execution.",
      color: "#ffff00",
      children: [
        {
          name: "Communication",
          desc: "Translating complex mathematical concepts into clear business value for stakeholders.",
          color: "#ffff66",
        },
        {
          name: "Dedication",
          desc: "Relentless pursuit of optimization and seeing complex projects through to completion.",
          color: "#ffff66",
        },
        {
          name: "Problem Solving",
          desc: "Analytical mindset to break down seemingly impossible architectures into viable steps.",
          color: "#ffff66",
        },
        {
          name: "Cross-functional Leadership",
          desc: "Bridging the gap between Data Scientists, Backend Engineers, and Product Managers.",
          color: "#ffff66",
        },
        {
          name: "Agile Execution",
          desc: "Iterative development, sprint planning, and rapid prototyping in fast-paced environments.",
          color: "#ffff66",
        },
      ],
    },
  ],
};

// --- D3.js 2D TREE LOGIC ---

const container = document.getElementById("tree-container");
const width = container.clientWidth;
const height = container.clientHeight;

// Node sizing (vertical and horizontal spacing)
const dy = width / 6; // Horizontal distance between levels
const dx = 40; // Vertical distance between nodes
const margin = { top: 20, right: 120, bottom: 20, left: 100 };

// Initialize Zoom behavior
const zoom = d3
  .zoom()
  .scaleExtent([0.3, 3])
  .on("zoom", (event) => {
    g.attr("transform", event.transform);
  });

const svg = d3
  .select("#tree-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(zoom)
  .on("click", () => {
    // Close terminal if clicking empty space
    document.getElementById("terminal-popup").classList.remove("visible");
  });

const g = svg.append("g");

// Center the root node on load
const initialTransform = d3.zoomIdentity
  .translate(margin.left, height / 2)
  .scale(1);
svg.call(zoom.transform, initialTransform);

const tree = d3.tree().nodeSize([dx, dy]);
const root = d3.hierarchy(treeData);

root.x0 = 0;
root.y0 = 0;

// Collapse all nodes except the absolute root on initial load
root.descendants().forEach((d, i) => {
  d.id = i;
  d._children = d.children; // Save children state
  if (
    d.depth &&
    d.name !== "Technical Skills" &&
    d.name !== "Non-Technical Skills"
  ) {
    d.children = null; // Collapse nodes deeper than level 1
  }
});

update(root);

function update(source) {
  const duration = 500;
  const nodes = root.descendants().reverse();
  const links = root.links();

  // Compute the new tree layout
  tree(root);

  // Normalize for fixed-depth
  nodes.forEach((d) => {
    d.y = d.depth * dy;
  });

  // --- NODES ---
  const node = g.selectAll("g.node").data(nodes, (d) => d.id);

  // Enter any new nodes at the parent's previous position
  const nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
    .on("click", (event, d) => {
      event.stopPropagation(); // Prevent background click from closing UI immediately

      // Toggle children
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
      }
      update(d);
      centerNode(d);
      updateTerminal(d);
    });
  // Add invisible oversized Hitbox for massive click area
  nodeEnter
    .append("circle")
    .attr("class", "hitbox")
    .attr("r", 35)
    .style("fill", "transparent")
    .style("cursor", "pointer");

  // Add visual Circle
  nodeEnter
    .append("circle")
    .attr("class", "visual-node")
    .attr("r", 1e-6)
    .style("fill", (d) => (d._children ? d.data.color : "#010302"))
    .style("stroke", (d) => d.data.color);

  // Add Text labels
  nodeEnter
    .append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => (d._children && !d.children ? -13 : 13)) // Left if closed, Right if open
    .attr("text-anchor", (d) => (d._children && !d.children ? "end" : "start"))
    .text((d) => d.data.name)
    .style("fill-opacity", 1e-6)
    .style("fill", (d) => (d.data.color === "#ffffff" ? "#ffffff" : "#e0e0e0"));

  const nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate
    .transition()
    .duration(duration)
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  // Update the node attributes and style
  nodeUpdate
    .select("circle.visual-node")
    .attr("r", 6)
    .style("fill", (d) =>
      d._children && !d.children ? d.data.color : "#010302",
    )
    .style("stroke", (d) => d.data.color)
    .style("stroke-width", (d) => (d._children && !d.children ? "0px" : "2px")); // Solid if closed, hollow if open

  nodeUpdate
    .select("text")
    .attr("x", (d) => (d._children && !d.children ? -13 : 13))
    .attr("text-anchor", (d) => (d._children && !d.children ? "end" : "start"))
    .style("fill-opacity", 1);

  // Remove exiting nodes
  const nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", (d) => `translate(${source.y},${source.x})`)
    .remove();

  nodeExit.select("circle.visual-node").attr("r", 1e-6);
  nodeExit.select("text").style("fill-opacity", 1e-6);

  // --- LINKS ---
  const link = g.selectAll("path.link").data(links, (d) => d.target.id);

  // Enter any new links at the parent's previous position
  const linkEnter = link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .style("stroke", (d) => d.target.data.color)
    .attr("d", (d) => {
      const o = { x: source.x0, y: source.y0 };
      return diagonal(o, o);
    });

  const linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate
    .transition()
    .duration(duration)
    .attr("d", (d) => diagonal(d.source, d.target));

  // Remove any exiting links
  link
    .exit()
    .transition()
    .duration(duration)
    .attr("d", (d) => {
      const o = { x: source.x, y: source.y };
      return diagonal(o, o);
    })
    .remove();

  // Store the old positions for transition
  nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Smooth curved path generation
function diagonal(s, d) {
  return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
}

// Smooth Camera Movement (Pan to center the clicked node)
function centerNode(source) {
  const scale = d3.zoomTransform(svg.node()).k;
  let x = -source.y0;
  let y = -source.x0;

  // Offset slightly to the left so the expanded children appear in the center
  x = x * scale + width / 4;
  y = y * scale + height / 2;

  svg
    .transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
}

function updateTerminal(d) {
  const terminal = document.getElementById("terminal-popup");
  document.getElementById("terminal-title").innerText = "> " + d.data.name;
  document.getElementById("terminal-desc").innerText = d.data.desc;

  terminal.style.borderColor = d.data.color;
  terminal.style.borderLeftColor = d.data.color;
  document.getElementById("terminal-title").style.color = d.data.color;
  document.getElementById("terminal-title").style.textShadow =
    `0 0 10px ${d.data.color}80`;

  terminal.classList.add("visible");
}

// --- PARTICLE FIELD LOGIC (Reacts to D3 Nodes) ---
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let pWidth = (canvas.width = window.innerWidth);
let pHeight = (canvas.height = window.innerHeight);

const particles = [];
const numParticles = 350;

// Adaptive performance: cut particles by 50%
const limit = window.reduceParticles
  ? Math.floor(numParticles / 2)
  : numParticles;
for (let i = 0; i < limit; i++) {
  particles.push({
    x: Math.random() * pWidth,
    y: Math.random() * pHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    baseRadius: Math.random() * 2 + 1,
  });
}

window.addEventListener("fpsDowngrade", () => {
  window.reduceParticles = true;
});

function animateParticles() {
  ctx.clearRect(0, 0, pWidth, pHeight);

  // Get current D3 zoom transform
  const transform = d3.zoomTransform(svg.node());
  const scale = transform.k;
  const tx = transform.x;
  const ty = transform.y;

  // Extract visible node screen coordinates purely from memory
  const visibleNodes = root.descendants().filter((d) => {
    // Ensure it's currently rendered (not collapsed away)
    // Actually, d3 tree doesn't remove descendants from root.descendants(),
    // wait, root.descendants() gets all. D3 standard update(root) only creates DOM for linked nodes.
    // Let's grab the actual DOM nodes bound data using D3!
    return true;
  });

  // To be perfectly accurate with what's visible, we grab the currently bound data array from the SVG:
  const activeNodesData = [];
  svg.selectAll("g.node").each(function (d) {
    activeNodesData.push(d);
  });

  particles.forEach((p) => {
    // Normal wandering movement
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < 0) p.x = pWidth;
    if (p.x > pWidth) p.x = 0;
    if (p.y < 0) p.y = pHeight;
    if (p.y > pHeight) p.y = 0;

    // Repel from D3 Nodes
    let repulseX = 0;
    let repulseY = 0;

    activeNodesData.forEach((d) => {
      // Calculate screen position of the D3 node
      const screenX = d.y * scale + tx;
      const screenY = d.x * scale + ty;

      const dx = p.x - screenX;
      const dy = p.y - screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const repelRadius = 150 * scale; // Repulsion field scales with zoom

      if (distance < repelRadius && distance > 0) {
        const force = (repelRadius - distance) / repelRadius;
        repulseX += (dx / distance) * force * 5;
        repulseY += (dy / distance) * force * 5;

        // Draw connecting energy tether if very close
        if (distance < repelRadius * 0.6) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = `rgba(0, 255, 204, ${0.3 * force})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    // Apply forces
    p.x += repulseX;
    p.y += repulseY;

    // Draw Particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Update canvas resize handler
window.addEventListener("resize", () => {
  pWidth = canvas.width = window.innerWidth;
  pHeight = canvas.height = window.innerHeight;
});

// Handle Window Resize properly
window.addEventListener("resize", () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;
  svg.attr("width", newWidth).attr("height", newHeight);
});
