export default function ProjectSection() {
  const projects = [
    {
      title: 'Personal Portfolio Website',
      github: 'https://github.com/ZhiqiaoGong/portfolio',
      demo: 'https://portfolio-nu-sage-24.vercel.app/',
      images: [],
      description:
        'A full-stack portfolio website built with React, Vite, and Tailwind CSS, with an Express + PostgreSQL backend supporting a real-time message board. Deployed on Vercel (frontend) and Render (backend).',
      tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Vercel', 'Render'],
    },
    {
      title: 'Chinese Font Generation (GAN)',
      github: 'https://github.com/ZhiqiaoGong/Pix-Font-Generative-Adversarial-Network',
      demo: null,
      images: ['OriginalAutoEncoder_test.gif', 'BestGAN_test.gif'],
      description:
        'Built a deep learning system for Chinese font style transfer using AutoEncoder and multiple GAN variants including CycleGAN and ResNet-based generators. Implemented skip connections and residual blocks to improve training stability and output clarity. Conducted comparative evaluation across architectures, analyzing L1 loss convergence and visual quality on real Chinese font datasets.',
      tags: ['Python', 'PyTorch', 'GAN', 'CycleGAN', 'AutoEncoder', 'ResNet', 'Deep Learning'],
    },
    {
      title: '3D Streaming System',
      github: 'https://github.com/ZhiqiaoGong/3D-Streaming-Demo',
      demo: null,
      images: ['3dstreaming-publisher.png', '3dstreaming-receiver.png'],
      description:
        'Built an end-to-end 3D video streaming stack with Node.js signaling server, WebRTC publisher/receiver, and Three.js playback, achieving low-latency stable streaming in WebXR.',
      tags: ['Node.js', 'WebRTC', 'WebSocket', 'Three.js', 'React', 'WebXR'],
    },
    {
      title: 'Manual Implementation of Neural Networks for Retinal Disease Detection',
      github: 'https://github.com/ZhiqiaoGong/Manual-Implementation-of-Neural-Networks-for-Retinal-Disease-Detection',
      demo: null,
      images: ['oct_model_comparison.png', 'oct_densenet_training.png'],
      description:
        'Implemented and compared multiple deep learning architectures including CNN, U-Net, ResNet, EfficientNet, and DenseNet for OCT retinal image classification. Evaluated models across conditions including CNV, DME, and Drusen, with comprehensive performance analysis.',
      tags: ['Python', 'PyTorch', 'CNN', 'U-Net', 'DenseNet', 'EfficientNet', 'Medical Imaging'],
    },
    {
      title: 'AR Assembly Guidance System',
      github: 'https://github.com/ZhiqiaoGong/AR-assembly-interaction-guidance-system',
      demo: null,
      images: ['arguidance-1.gif', 'arguidance-2.gif'],
      description:
        "Built an AR guidance system using Unity3D and Vuforia that overlays real-time assembly instructions onto physical objects. Integrated deep learning-based state detection to dynamically update instructions based on the user's progress.",
      tags: ['Unity3D', 'C#', 'Vuforia', 'Deep Learning', 'AR'],
    },
    {
      title: 'Steam Gaming Recommendation System',
      github: null,
      demo: null,
      images: [],
      description:
        'Implemented a personalized recommender combining Bayesian Personalized Ranking with a popularity model. Tuned thresholds and regularization to improve recall, and added a bias-only baseline for play duration prediction.',
      tags: ['Python', 'NumPy', 'BPR', 'Recommender Systems'],
    },
    {
      title: 'LLM-Assisted Medical Diagnosis (PAS)',
      github: null,
      demo: null,
      images: [],
      description:
        'Applied GPT-4 to automate structured feature extraction from clinical MRI and ultrasound reports for Placenta Accreta Spectrum diagnosis. Designed and evaluated prompt engineering strategies for pattern analysis and grade prediction, achieving perfect recall on ultrasound markers.',
      tags: ['Python', 'GPT-4', 'Prompt Engineering', 'NLP', 'Medical AI'],
    },
  ];

  return (
    <section id="projects" className="mt-20">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="space-y-10">
        {projects.map((project, index) => (
          <div key={index} className="border-b border-gray-700 pb-8 last:border-0">

            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl font-semibold text-blue-300">{project.title}</span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 border border-gray-600 rounded px-2 py-0.5 hover:text-white hover:border-gray-400 transition"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 border border-gray-600 rounded px-2 py-0.5 hover:text-white hover:border-gray-400 transition"
                >
                  Live
                </a>
              )}
            </div>

            <p className="text-sm text-gray-300 mb-3">{project.description}</p>

            {project.images.length > 0 && (
              <div className={`grid gap-3 mb-3 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={`/${img}`}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="rounded-lg border border-gray-700 w-full"
                    style={{ maxHeight: '320px', objectFit: 'cover', objectPosition: 'top' }}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-purple-800 text-white text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}