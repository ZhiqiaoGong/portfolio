import Reveal from './Reveal';

const CARD_HOVER =
  'transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-blue-500/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0';

function ProjectLinks({ project }) {
  return (
    <>
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
    </>
  );
}

function ProjectTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-purple-900/70 px-2.5 py-1 text-xs font-medium text-purple-100">
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectMedia({ project, className }) {
  const mediaClass =
    'w-full max-h-56 rounded-lg border border-gray-700 object-cover object-top transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100';

  return (
    <div className={className}>
      {project.media.map((item, i) =>
        item.endsWith('.mp4') ? (
          <video key={item} className={mediaClass} autoPlay loop muted playsInline preload="metadata" aria-label={`${project.title} demo ${i + 1}`}>
            <source src={`/${item}`} type="video/mp4" />
          </video>
        ) : (
          <img key={item} className={mediaClass} src={`/${item}`} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" decoding="async" />
        )
      )}
    </div>
  );
}

export default function ProjectSection() {
  const projects = [
    {
      title: 'Yifa — ZH-EN Translation Relay for claude.ai',
      featured: true,
      priority: 1,
      github: 'https://github.com/ZhiqiaoGong/Claude-ZH-EN-Relay',
      demo: null,
      media: ['yifa-main.mp4', 'yifa-modes.mp4'],
      description:
        "A shipped Chrome extension (Manifest V3) that cuts token cost on claude.ai, where Chinese runs ~1.5–2× the tokens of English: it sends your input as English and renders Claude's replies back in Chinese. A resilient DOM-level relay with a review-before-send guard, a code-block-preserving reply layout, and a three-engine translation layer (Google, DeepL, Gemini) with graceful fallback.",
      tags: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'DeepL', 'Gemini'],
    },
    {
      title: 'Fleet 360° VR Training System',
      github: null,
      demo: null,
      media: [],
      description:
        "A fleet 360° VR training-video system: a Unity C# walking-VR client with equirectangular playback, gaze-driven branch selection at route forks, and playback speed that follows the user's pace. Backed by durable PostgreSQL job orchestration (transactional outbox with FOR UPDATE SKIP LOCKED leases and crash recovery) and FFmpeg HLS packaging, sustaining a median 16,400 telemetry events/s.",
      tags: ['Unity3D', 'C#', 'PostgreSQL', 'FFmpeg'],
    },
    {
      title: 'AI Job Application Drafter',
      github: 'https://github.com/ZhiqiaoGong/ai-job-application-drafter',
      demo: null,
      media: [],
      description:
        "A Chrome extension (Manifest V3) that drafts answers to open-ended job application questions in place, with Shorter / Redo / Refine revisions that keep the original context. Field detection separates real questions from routine autofill and skips code editors and comboboxes, and each request sends only four things — system prompt, resume, job description, current question — for about 2,600 tokens. Runs on the user's own OpenAI key with no server and no tracking.",
      tags: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'OpenAI API', 'Prompt Engineering'],
    },
    {
      title: 'SponsorLens — Job Sponsorship Checker',
      github: 'https://github.com/ZhiqiaoGong/sponsorlens-job-sponsorship-checker',
      demo: null,
      media: [],
      description:
        'A Chrome extension (Manifest V3) that scans job listings for sponsorship, work authorization, citizenship, export control, and security clearance language, returning a color-coded verdict with the exact supporting text from the page. Rule-based analysis runs entirely on-device with no server or external AI calls, resolves conflicting policies conservatively, and is covered by a regression test suite.',
      tags: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'Text Analysis'],
    },
    {
      title: 'Personal Portfolio Website',
      github: 'https://github.com/ZhiqiaoGong/portfolio',
      demo: 'https://zhiqiaogong.com/',
      media: [],
      description:
        'A full-stack portfolio website built with React, Vite, and Tailwind CSS, with an Express + PostgreSQL backend supporting a real-time message board. Deployed on Vercel (frontend) and Render (backend).',
      tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Vercel', 'Render'],
    },
    {
      title: 'Chinese Font Generation (GAN)',
      featured: true,
      priority: 4,
      github: 'https://github.com/ZhiqiaoGong/Pix-Font-Generative-Adversarial-Network',
      demo: null,
      media: ['OriginalAutoEncoder_test.mp4', 'BestGAN_test.mp4'],
      description:
        'Built a deep learning system for Chinese font style transfer using AutoEncoder and multiple GAN variants including CycleGAN and ResNet-based generators. Implemented skip connections and residual blocks to improve training stability and output clarity. Conducted comparative evaluation across architectures, analyzing L1 loss convergence and visual quality on real Chinese font datasets.',
      tags: ['Python', 'PyTorch', 'GAN', 'CycleGAN', 'AutoEncoder', 'ResNet', 'Deep Learning'],
    },
    {
      title: '3D Streaming System',
      featured: true,
      priority: 2,
      github: 'https://github.com/ZhiqiaoGong/3D-Streaming-Demo',
      demo: null,
      media: ['3dstreaming-publisher.png', '3dstreaming-receiver.png'],
      description:
        'Built an end-to-end 3D video streaming stack with Node.js signaling server, WebRTC publisher/receiver, and Three.js playback, achieving low-latency stable streaming in WebXR.',
      tags: ['Node.js', 'WebRTC', 'WebSocket', 'Three.js', 'React', 'WebXR'],
    },
    {
      title: 'Manual Implementation of Neural Networks for Retinal Disease Detection',
      featured: true,
      priority: 5,
      github: 'https://github.com/ZhiqiaoGong/Manual-Implementation-of-Neural-Networks-for-Retinal-Disease-Detection',
      demo: null,
      media: ['oct_model_comparison.png', 'oct_densenet_training.png'],
      description:
        'Implemented and compared multiple deep learning architectures including CNN, U-Net, ResNet, EfficientNet, and DenseNet for OCT retinal image classification. Evaluated models across conditions including CNV, DME, and Drusen, with comprehensive performance analysis.',
      tags: ['Python', 'PyTorch', 'CNN', 'U-Net', 'DenseNet', 'EfficientNet', 'Medical Imaging'],
    },
    {
      title: 'AR Assembly Guidance System',
      featured: true,
      priority: 3,
      github: 'https://github.com/ZhiqiaoGong/AR-assembly-interaction-guidance-system',
      demo: null,
      media: ['arguidance-1.mp4', 'arguidance-2.mp4'],
      description:
        "Built an AR guidance system using Unity3D and Vuforia that overlays real-time assembly instructions onto physical objects. Integrated deep learning-based state detection to dynamically update instructions based on the user's progress.",
      tags: ['Unity3D', 'C#', 'Vuforia', 'Deep Learning', 'AR'],
    },
    {
      title: 'Steam Gaming Recommendation System',
      github: null,
      demo: null,
      media: [],
      description:
        'Implemented a personalized recommender combining Bayesian Personalized Ranking with a popularity model. Tuned thresholds and regularization to improve recall, and added a bias-only baseline for play duration prediction.',
      tags: ['Python', 'NumPy', 'BPR', 'Recommender Systems'],
    },
    {
      title: 'LLM-Assisted Medical Diagnosis (PAS)',
      github: null,
      demo: null,
      media: [],
      description:
        'Applied GPT-4 to automate structured feature extraction from clinical MRI and ultrasound reports for Placenta Accreta Spectrum diagnosis. Designed and evaluated prompt engineering strategies for pattern analysis and grade prediction, achieving perfect recall on ultrasound markers.',
      tags: ['Python', 'GPT-4', 'Prompt Engineering', 'NLP', 'Medical AI'],
    },
  ];

  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.priority - b.priority);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mt-24 scroll-mt-28 md:scroll-mt-8">
      <Reveal className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Things I’ve built</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Selected Work</h2>
      </Reveal>

      <div className="space-y-8">
        {featured.map((project, index) => (
          <Reveal key={project.title}>
            <article
              className={`group rounded-xl border border-gray-700/80 bg-gray-800/40 p-5 sm:p-7 md:grid md:grid-cols-5 md:items-center md:gap-8 ${CARD_HOVER}`}
            >
              <div className={`md:col-span-3 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-blue-300 sm:text-2xl">{project.title}</h3>
                  <span className="rounded-full bg-blue-900/70 px-2.5 py-1 text-xs font-medium text-blue-100">Featured</span>
                  <ProjectLinks project={project} />
                </div>
                <p className="mb-5 leading-relaxed text-gray-300">{project.description}</p>
                <ProjectTags tags={project.tags} />
              </div>
              <ProjectMedia
                project={project}
                className={`mt-5 space-y-3 md:col-span-2 md:mt-0 ${index % 2 === 1 ? 'md:order-1' : ''}`}
              />
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {others.map((project) => (
          <Reveal key={project.title} className="h-full">
            <article className={`flex h-full flex-col rounded-xl border border-gray-700/80 bg-gray-800/40 p-5 ${CARD_HOVER}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-blue-300">{project.title}</h3>
                <ProjectLinks project={project} />
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">{project.description}</p>
              <ProjectTags tags={project.tags} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
