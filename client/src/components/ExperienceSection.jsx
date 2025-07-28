export default function ExperienceSection() {
    const data = [
    {
        time: 'Jun. 2024 – Present',
        title: 'Software Engineer Intern',
        company: 'UCSD Human-centered eXtended Intelligence Lab',
        description:
        'Built AR medical assistant system on Apple Vision Pro using Unity3D, ARKit, MRTK3. Designed 3D UI with <50ms latency. Built RESTful API and GraphQL backend, cut sensor latency from 300ms to 50ms. Integrated MongoDB + Redis for 100GB+ data. Assisted Swift integration.',
        tags: ['Unity3D', 'ARKit', 'MRTK3', 'REST API', 'GraphQL', 'MongoDB', 'Redis', 'Swift'],
        },
        {
        time: 'Jul. 2023 – Sep. 2023',
        title: 'Software Engineer Intern',
        company: 'Baidu Inc (Research Group)',
        description:
            'Built React + FastAPI model evaluation interface with WebSocket support. Improved model accuracy by 22%. Used PostgreSQL + SQLAlchemy to reduce latency by 50%.',
        tags: ['React', 'FastAPI', 'WebSocket', 'PostgreSQL', 'SQLAlchemy', 'Data Visualization'],
        },
        {
        time: 'Jun. 2021 – Sep. 2022',
        title: 'VR Software Engineer Coop',
        company: 'Shandong Dareway Technology',
        description:
            'Developed 360° VR tour system with Unity & Node.js. Used FFmpeg to reduce storage by 70%. Designed gaze-based redirected walking for limited-space VR navigation.',
        tags: ['Unity', 'Node.js', 'FFmpeg', 'VR', 'Redirected Walking'],
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
  