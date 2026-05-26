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
        tags: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe API', 'REST API'],
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
      <section id="experience">
        <h2 className="text-2xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          {data.map((item, index) => (
            <div key={index}>
              <div className="text-sm text-gray-400">{item.time}</div>
              <div className="text-xl font-semibold mt-1">
                {item.title} ·{' '}
                <span className="text-blue-400">{item.company}</span>
              </div>
              <p className="text-sm text-gray-300 whitespace-pre-line">{item.description}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-800 text-white text-xs px-2 py-1 rounded"
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
  