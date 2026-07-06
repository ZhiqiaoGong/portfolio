import Reveal from './Reveal';

export default function ExperienceSection() {
    const data = [
      {
        time: 'Jan. 2026 – Present',
        title: 'Web Application Developer',
        company: 'Party Eight',
        description:
          'Analyzed inventory workflows across Shopify and Etsy to identify inefficiencies in product categorization and discoverability. Redesigned the Shopify catalog architecture by replacing text-based search with a structured tag system, enabling consistent cross-category filtering. Designed and implemented a user-friendly navigation UI, customizing Shopify\'s underlying theme code to achieve layouts not supported out of the box.',
        tags: ['Shopify', 'JavaScript', 'UI Design', 'E-commerce'],
      },
      {
        time: 'Aug. 2025 – Feb. 2026',
        title: 'Backend Developer Volunteer',
        company: 'Qualcomm Institute',
        description:
          'Designed and implemented the backend of an e-commerce platform for medical assistant kits using Node.js and MongoDB, supporting configurable packages and dynamic pricing. Integrated Stripe Checkout and webhooks for secure payments, handling idempotent order updates and automated workflows. Improved backend performance through Redis caching and optimized MongoDB queries, reducing checkout API latency.',
        tags: ['Node.js', 'Express', 'MongoDB', 'Stripe API', 'REST API'],
      },
      {
        time: 'Jun. 2024 – Jun. 2025',
        title: 'Software Engineer Intern',
        company: 'UCSD Human-centered eXtended Intelligence Lab',
        description:
          'Built an AI-powered AR medical assistant system supporting real-time multimodal interaction. Implemented WebSocket-based communication for real-time audio streaming between client and backend. Refactored APIs and optimized the WebSocket protocol, significantly reducing round-trip latency and improving system responsiveness.',
        tags: ['Unity3D', 'C#', 'Node.js', 'WebSocket', 'Redis', 'MongoDB'],
      },
      {
        time: 'Jul. 2023 – Sep. 2023',
        title: 'Software Engineer Intern',
        company: 'Baidu Inc (Research Group)',
        description:
          'Developed an LLM evaluation platform used by internal teams, supporting large-scale prompt testing and model comparison. Built backend services using FastAPI, PostgreSQL, and Redis, optimizing queries with composite indexes and significantly reducing query latency. Improved system throughput by implementing batched processing, supporting stable performance under concurrent workloads.',
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      },
      {
        time: 'Jun. 2021 – Sep. 2022',
        title: 'VR Software Engineer Coop',
        company: 'Shandong Dareway Technology',
        description:
          'Designed a scalable VR media pipeline, automating panoramic video transcoding and adaptive streaming with FFmpeg, Airflow, and AWS. Deployed containerized jobs on Kubernetes for scalability testing and integrated Unity3D clients with redirected walking, enabling smooth VR campus tour demos.',
        tags: ['Unity3D', 'C#', 'FFmpeg', 'Airflow', 'AWS', 'Docker', 'Kubernetes'],
      },
    ];
  
    return (
      <section id="experience" className="mt-24 scroll-mt-28 md:scroll-mt-8">
        <Reveal className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Where I’ve worked</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Experience</h2>
        </Reveal>
        <div className="space-y-6 border-l border-gray-700 pl-5 sm:pl-7">
          {data.map((item, index) => (
            <Reveal key={`${item.company}-${item.time}`} delay={Math.min(index * 90, 270)}>
            <article className="group relative rounded-xl border border-gray-800 bg-gray-800/30 p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="absolute -left-[1.75rem] top-7 h-2.5 w-2.5 rounded-full bg-blue-400 ring-4 ring-gray-900 transition group-hover:bg-blue-300 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)] sm:-left-[2.05rem]" aria-hidden="true" />
              <div className="text-sm text-gray-400">{item.time}</div>
              <h3 className="mt-1 text-xl font-semibold">
                {item.title} ·{' '}
                <span className="text-blue-400">{item.company}</span>
              </h3>
              <p className="mt-3 leading-relaxed text-gray-300">{item.description}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-blue-900/70 px-2.5 py-1 text-xs font-medium text-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }
  
