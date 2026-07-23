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
        title: 'Web Application Developer',
        company: 'Party Eight',
        location: 'Hayward, CA',
        github: 'https://github.com/ZhiqiaoGong/inventory-sync-system',
        demo: 'https://inventory-sync-demo.onrender.com',
        lead: 'Cross-platform inventory sync that keeps a Shopify + Etsy merchant from overselling.',
        bullets: [
          'Normalized single source of truth, with SKUs tiered by count trustworthiness so only verifiable stock is written back — no bundle or pack/unit oversells.',
          'Exactly-once order application — idempotent ingestion plus transactional outbox — sustaining **4,800 orders/s at p95 0.21 ms** in a multi-process race benchmark.',
          '**Go + Kafka** delivery pipeline with idempotent write-backs, dead-letter recovery, and HMAC-verified webhooks; four-service stack on AWS EC2 via Docker Compose.',
        ],
        tags: ['Node.js', 'Go', 'Kafka', 'Express', 'SQLite', 'Docker', 'REST API'],
      },
      {
        time: 'Aug. 2025 – Feb. 2026',
        title: 'Full-Stack Developer Volunteer',
        company: 'Qualcomm Institute',
        location: 'San Diego, CA',
        github: 'https://github.com/ZhiqiaoGong/medkit-store',
        demo: 'https://medkit-store.vercel.app',
        lead: 'A full-stack commerce platform for configurable medical kits.',
        bullets: [
          '**Next.js** storefront on Vercel — kit builder, live quotes, auth, and checkout — backed by an Express + MongoDB API.',
          'Inventory consistency under concurrent checkout via atomic conditional decrements and Stripe-session compensation on failure, verified for **zero oversell**.',
          'Version-based Redis cache invalidation reaching **1,870 RPS at p95 0.9 ms**, plus idempotent Stripe-webhook reconciliation against duplicate fulfillment.',
        ],
        tags: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe API'],
      },
      {
        time: 'Jun. 2024 – Jun. 2025',
        title: 'Software Engineer Intern',
        company: 'UCSD Human-centered eXtended Intelligence Lab / Design Lab',
        location: 'San Diego, CA',
        lead: 'An AI-powered AR medical assistant on a mixed-reality headset.',
        bullets: [
          'Bidirectional WebSocket audio streaming — sequence-numbered binary frames with jitter buffering upstream, gapless TTS playback downstream — cutting uplink bandwidth **26%** versus JSON transport.',
          'Cut end-of-speech-to-reply latency from **3.2 s to 2.2 s (p95)** with voice-activity detection and endpointing, plus **54 ms** barge-in and lossless recovery from mid-reply network drops.',
        ],
        tags: ['Unity3D', 'MRTK3', 'C#', 'Node.js', 'WebSocket'],
      },
      {
        time: 'Jul. 2023 – Sep. 2023',
        title: 'Software Engineer Intern',
        company: 'Baidu',
        location: 'Beijing, China',
        lead: 'An async LLM evaluation pipeline built for throughput and safe resumes.',
        bullets: [
          'Semaphore-bounded concurrency and token-bucket rate limiting raised benchmark throughput **12×**; backoff-with-jitter retries survived a **30% HTTP 429 storm** with zero lost results.',
          'PostgreSQL results store with unique-key idempotent resume, and a composite index cutting query p95 by **96% (19 ms → 0.7 ms over 300k rows)**; served over FastAPI + Redis with SSE live progress.',
        ],
        tags: ['Python', 'asyncio', 'httpx', 'FastAPI', 'PostgreSQL', 'Redis'],
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

              <p className="mt-3 font-medium leading-relaxed text-gray-100">{item.lead}</p>
              <ul className="mt-2 space-y-1.5">
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
  
