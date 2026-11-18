import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

// Renders **highlighted** spans (usually metrics) brighter and heavier than the
// surrounding body text — the dark-theme stand-in for bold.
function renderEmphasis(text) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-white">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);

function ExperienceLinks({ github, demo }) {
  if (!github && !demo) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-300 transition hover:border-gray-400 hover:text-white"
        >
          <GitHubIcon />
          GitHub
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <ExternalLinkIcon />
          Live demo
        </a>
      )}
    </div>
  );
}

// Fills the timeline rail in sync with how far the list has scrolled into view.
function useTimelineProgress() {
  const listRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.height = '100%';
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = list.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - rect.top) / rect.height));
      fill.style.height = `${progress * 100}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { listRef, fillRef };
}

export default function ExperienceSection() {
    const data = [
      {
        time: 'Jan. 2026 – Present',
        title: 'Web Application Developer (Backend & ML Systems)',
        company: 'Party Eight',
        location: 'Hayward, CA',
        bullets: [
          '**Engineered an exactly-once multi-platform inventory sync core (Shopify/Etsy)** around a normalized stock table with **tiered SKU policies**, **replay-protected webhooks**, **atomic ledger/outbox transactions**, and **job-lease CAS concurrency control**, validated under multi-worker race and historical replay harnesses with **sub-millisecond local latency** and index-tuned drift reconciliation.',
          '**Architected resilient delivery and operational automation in Go, Python, and Kafka on AWS EC2 (Docker Compose)**, combining **idempotent absolute-set retries**, **per-platform token-bucket rate limiting**, and **dead-letter recovery** with automated **safety-stock demand forecasting** and **rule-validated LLM root-cause diagnostics** for Prometheus alerts.',
        ],
        tags: ['Go', 'Python', 'Apache Kafka', 'Distributed Systems', 'SQLite / PostgreSQL', 'AWS EC2', 'Docker', 'Prometheus', 'LLM Diagnostics', 'Forecasting'],
      },
      {
        time: 'Aug. 2025 – Feb. 2026',
        title: 'Software Engineer',
        company: 'Qualcomm Institute',
        location: 'San Diego, CA',
        github: 'https://github.com/ZhiqiaoGong/medkit-store',
        demo: 'https://medkit-store.vercel.app',
        bullets: [
          '**Built a real-time streaming voice and task-guidance assistant**, combining **low-latency conversational synthesis** with **task-state-aware context routing** and **automated LLM evaluation pipelines** to improve multi-turn accuracy and token efficiency over hybrid RAG baselines.',
          '**Engineered a full-stack configurable medical kit and fulfillment platform (Next.js, Express, MongoDB, Redis)**, enforcing **zero-oversell atomic state updates**, **O(1) version-keyed cache invalidation**, and **idempotent webhook state machines** under concurrent load.',
        ],
        tags: ['WebSockets', 'Large Language Models (LLM)', 'Python', 'Node.js / Express', 'Next.js / TypeScript', 'Redis', 'MongoDB'],
      },
      {
        time: 'Jun. 2024 – Jun. 2025',
        title: 'Software Engineer Intern',
        company: 'UC San Diego (Design Lab / HXI Lab)',
        location: 'San Diego, CA',
        bullets: [
          '**Developed a multimodal, voice-enabled medical AI assistant and two-tier safety gateway**, supporting **bidirectional low-latency audio streaming**, **spatial UI**, and **deterministic red-flag / LLM logprobs triage** for fixed emergency handoffs (911 / Poison Help / 988).',
          '**Grounded clinical and medication Q&A in schema-typed tool calls and bounded retrieval**, normalizing drug entities via **RxNorm** to cross-check **DDInter/openFDA interactions** and serving verified **MedlinePlus passages via SQLite FTS5** with **opt-in per-person memory isolation** and **Wilson-interval statistical release gates**.',
        ],
        tags: ['Java', 'Spring Boot', 'Python', 'SQLite (FTS5)', 'Large Language Models (LLM)', 'RAG', 'RxNorm / openFDA APIs', 'Multimodal / Spatial UI'],
      },
      {
        time: 'Jul. 2023 – Sep. 2023',
        title: 'Software Engineer Intern',
        company: 'Baidu',
        location: 'Beijing, China',
        bullets: [
          '**Engineered an async LLM evaluation harness and backend service (FastAPI, PostgreSQL, Redis, SSE)** featuring **semaphore-bounded, rate-limited fan-out** and **jittered backoff retries** that sustained high throughput with **zero drops under HTTP 429 storms**; designed **idempotent call caching and resume schemas** with **composite index tuning** for sub-millisecond history queries.',
          '**Developed statistical grading, RAG diagnostics, and sandboxed execution pipelines** across foundation models (ERNIE, Llama-2), combining **McNemar/bootstrap CI testing** and **dual-grader LLM-judge calibration** against blind human labels with **RAG hallucination audits** and **program-aided Python execution** for complex reasoning benchmarks.',
        ],
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Server-Sent Events (SSE)', 'Large Language Models (LLM)', 'Asyncio', 'Statistical Evaluation'],
      },
      {
        time: 'Jun. 2021 – May 2022',
        title: 'Virtual Reality Research Assistant',
        company: 'Shandong University',
        location: 'Jinan, China',
        bullets: [
          '**Built a 360° VR client in Unity (C#)** implementing **redirected walking algorithms** for continuous locomotion in constrained physical spaces, **equirectangular video playback**, and **gaze-driven branching**.',
          '**Engineered the media ingest and telemetry backend (PostgreSQL, FFmpeg)** supporting **checksum-verified HLS packaging**, **fault-tolerant job scheduling**, and **high-throughput event logging**.',
        ],
        tags: ['C#', 'Unity', 'PostgreSQL', 'FFmpeg / HLS', 'Virtual Reality (VR)'],
      },
    ];
  
    const { listRef, fillRef } = useTimelineProgress();

    return (
      <section id="experience" className="mt-24 scroll-mt-28 md:scroll-mt-8">
        <Reveal className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Where I’ve worked</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Experience</h2>
        </Reveal>
        <div ref={listRef} className="relative space-y-6 pl-5 sm:pl-7">
          <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-gray-700" />
          <div
            ref={fillRef}
            aria-hidden="true"
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-blue-400 to-purple-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
            style={{ height: 0 }}
          />
          {data.map((item, index) => (
            <Reveal key={`${item.company}-${item.time}`} delay={Math.min(index * 90, 270)}>
            <article className="group relative rounded-xl border border-gray-800 bg-gray-800/30 p-5 sm:p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="absolute -left-[1.75rem] top-7 h-2.5 w-2.5 rounded-full bg-blue-400 ring-4 ring-gray-900 transition group-hover:bg-blue-300 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.8)] sm:-left-[2.05rem]" aria-hidden="true" />
              <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                <span>{item.time}</span>
                {item.location && <span className="text-gray-500">{item.location}</span>}
              </div>
              <h3 className="mt-1 text-xl font-semibold">
                {item.title} ·{' '}
                <span className="text-blue-400">{item.company}</span>
              </h3>
              <ExperienceLinks github={item.github} demo={item.demo} />

              {item.lead && (
                <p className="mt-3 font-medium leading-relaxed text-gray-100">{item.lead}</p>
              )}
              <ul className={`${item.lead ? 'mt-2' : 'mt-3'} space-y-1.5`}>
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2.5 leading-relaxed text-gray-300">
                    <span aria-hidden="true" className="mt-[0.6rem] h-1 w-1 flex-none rounded-full bg-blue-400" />
                    <span>{renderEmphasis(bullet)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
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
  
