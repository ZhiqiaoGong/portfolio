import Reveal from './Reveal';

const GROUPS = [
  {
    label: 'Languages',
    items: ['Go', 'Python', 'Java', 'TypeScript / JavaScript', 'SQL', 'C#', 'C / C++'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'FastAPI', 'Node.js', 'Express', 'REST & Webhooks', 'WebSocket & SSE', 'Asyncio'],
  },
  {
    label: 'AI & ML Systems',
    items: ['LLM Agents & Tool Calling', 'RAG', 'Evaluation Harnesses', 'LightGBM / Forecasting', 'OpenAI API', 'Pydantic'],
  },
  {
    label: 'Data & Messaging',
    items: ['PostgreSQL', 'Kafka', 'Redis', 'SQLite (FTS5)', 'MongoDB'],
  },
  {
    label: 'Frontend & AR/VR',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML / CSS', 'Unity3D', 'MRTK3'],
  },
  {
    label: 'Cloud & Tooling',
    items: ['AWS (EC2, S3)', 'Docker', 'Prometheus', 'GitHub Actions', 'CI/CD', 'Vercel / Render'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="mt-24 scroll-mt-28 md:scroll-mt-8">
      <Reveal className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">What I work with</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Skills</h2>
      </Reveal>

      <div className="space-y-4">
        {GROUPS.map((group, index) => (
          <Reveal key={group.label} delay={Math.min(index * 90, 270)}>
            <div className="rounded-xl border border-gray-800 bg-gray-800/30 p-5 sm:flex sm:items-start sm:gap-6">
              <h3 className="mb-3 shrink-0 text-sm font-semibold uppercase tracking-wider text-gray-400 sm:mb-0 sm:w-40 sm:pt-1">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1 text-sm text-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
