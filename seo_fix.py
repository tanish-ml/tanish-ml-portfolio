import re

files = {
    'skill-tree.html': {
        'url': 'https://tanish-ml.github.io/skill-tree.html',
        'title': 'Interactive Skill Tree | Tanish Mittal',
        'desc': "Explore Tanish Mittal's skills in Machine Learning, Deep Learning, and Data Engineering through an interactive 2D node network."
    },
    'deep-learning-architecture.html': {
        'url': 'https://tanish-ml.github.io/deep-learning-architecture.html',
        'title': 'Deep Learning Scrollytelling | Tanish Mittal',
        'desc': "Interactive 3D visualization of a Multi-Layer Perceptron. Trace forward propagation in real-time through the matrix."
    },
    'federated-learning.html': {
        'url': 'https://tanish-ml.github.io/federated-learning.html',
        'title': 'Federated Edge AI Scrollytelling | Tanish Mittal',
        'desc': "Interactive 3D visualization of Federated Learning. See how AI models train on edge devices without transferring raw data."
    }
}

for filename, data in files.items():
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove existing og/twitter tags so we don't duplicate
    content = re.sub(r'<meta property="og:.*?>', '', content, flags=re.DOTALL)
    content = re.sub(r'<meta property="twitter:.*?>', '', content, flags=re.DOTALL)
    content = re.sub(r'<link rel="canonical".*?>', '', content, flags=re.DOTALL)
    content = re.sub(r'<meta name="author".*?>', '', content, flags=re.DOTALL)
    
    seo_tags = f'''
    <meta name="author" content="Tanish Mittal" />
    <link rel="canonical" href="{data['url']}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{data['url']}" />
    <meta property="og:title" content="{data['title']}" />
    <meta property="og:description" content="{data['desc']}" />
    <meta property="og:image" content="https://tanish-ml.github.io/rsz_image.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{data['url']}" />
    <meta property="twitter:title" content="{data['title']}" />
    <meta property="twitter:description" content="{data['desc']}" />
    <meta property="twitter:image" content="https://tanish-ml.github.io/rsz_image.png" />
    </head>
    '''
    
    content = content.replace('</head>', seo_tags)
    
    # Also add aria-label to any canvas
    content = content.replace('<canvas id="webgl-container"', '<canvas id="webgl-container" role="img" aria-label="Interactive 3D Visualization"')
    content = content.replace('<canvas id="network-canvas"', '<canvas id="network-canvas" role="img" aria-label="Interactive Node Network"')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
