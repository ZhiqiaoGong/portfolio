export default function ExperienceSection() {
    const data = [
      {
        time: 'Jun. 2024 – Present',
        title: 'Software Engineer Intern',
        company: 'UCSD Human-centered eXtended Intelligence Lab',
        description:
          'Developed an AR medical assistance system on Apple Vision Pro using Unity3D, ARKit, and MRTK3. Designed interactive 3D UI widgets achieving <50ms input latency. Built RESTful API + GraphQL backend, reducing sensor pipeline delay from 300ms to 50ms. Integrated MongoDB + Redis to handle 100GB+ multimodal medical data. Contributed to Swift-based AVP integration and cross-platform compatibility.',
        tags: ['Unity3D', 'ARKit', 'MRTK3', 'REST API', 'GraphQL', 'MongoDB', 'Redis', 'Swift'],
      },
      {
        time: 'Jul. 2023 – Sep. 2023',
        title: 'Software Engineer Intern',
        company: 'Baidu Inc (Research Group)',
        description:
          'Built a model evaluation platform with React frontend and FastAPI backend, supporting WebSocket-based real-time interaction. Conducted large-scale LLM benchmarking, improving reasoning accuracy by 22% via prompt optimization. Used PostgreSQL + SQLAlchemy with composite indexing to cut query latency by 50%. Delivered interactive visual analytics for performance comparison against ChatGPT.',
        tags: ['React', 'FastAPI', 'WebSocket', 'PostgreSQL', 'SQLAlchemy', 'Data Visualization'],
      },
      {
        time: 'Jun. 2021 – Sep. 2022',
        title: 'VR Software Engineer Coop',
        company: 'Shandong Dareway Technology',
        description:
          'Developed a 360° VR campus tour system using Unity3D and Node.js, enabling dynamic speed adjustment based on walking pace for enhanced immersion. Implemented gaze-based path switching and redirected walking algorithms for small-space VR navigation. Built Node.js + MongoDB backend and optimized video storage via FFmpeg, reducing storage requirements by 70%.',
        tags: ['Unity3D', 'Node.js', 'FFmpeg', 'VR', 'Redirected Walking', 'MongoDB'],
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
  