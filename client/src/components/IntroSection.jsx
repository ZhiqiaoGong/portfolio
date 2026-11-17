import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Reveal from './Reveal';

const ParticleHero = lazy(() => import('./ParticleHero'));

const ROLES = ['Backend Engineer', 'Distributed Systems Engineer', 'AI Systems Engineer', 'AR/VR Developer'];

// Types out `word`, pauses, deletes, then asks the parent to advance the role.
// Resets cleanly if `word` changes mid-cycle (e.g. user clicks the particles).
function useTypewriter(word, onCycleComplete, typeSpeed = 50, deleteSpeed = 22, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setDeleting(false);
  }, [word]);

  useEffect(() => {
    let timeout;
    if (deleting) {
      if (text === '') {
        // Stale pause->delete transition landed after an external role switch.
        // Recover without advancing, otherwise a click can skip two roles.
        setDeleting(false);
      } else if (text.length === 1) {
        // Advance inside the timeout so a word change cancels it via cleanup.
        timeout = setTimeout(() => {
          setText('');
          setDeleting(false);
          onCycleComplete();
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      }
    } else if (text === word) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (word.startsWith(text)) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
    } else {
      // Word changed mid-type; restart cleanly.
      setText('');
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, word, onCycleComplete, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export default function IntroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const advanceRole = useCallback(() => setRoleIndex((i) => (i + 1) % ROLES.length), []);
  const typed = useTypewriter(ROLES[roleIndex], advanceRole);
  const isDesktop = useIsDesktop();

  return (
    <section id="about" className="relative max-w-3xl scroll-mt-28 md:scroll-mt-8 xl:flex xl:max-w-none xl:items-center xl:gap-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"
      />

      <Reveal className="relative z-10 xl:max-w-2xl xl:flex-[2]">
        <p className="mb-4 min-h-[1.5rem] text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          {typed}
          <span className="typewriter-cursor ml-0.5 inline-block w-[2px] bg-blue-400" aria-hidden="true">
            &nbsp;
          </span>
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          I build dependable systems for{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
            real-time, AI, and immersive
          </span>{' '}
          products.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
          I’m Zhiqiao Gong, a software engineer who enjoys turning complex workflows into
          reliable, practical products across distributed backends, AI systems, and AR/VR applications.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-md bg-blue-500 px-5 py-2.5 font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            View selected work
          </a>
        </div>
      </Reveal>

      {isDesktop && (
        <div className="relative hidden h-[26rem] xl:block xl:min-w-[18rem] xl:flex-1">
          <Suspense fallback={null}>
            <ParticleHero roleIndex={roleIndex} onAdvance={advanceRole} />
          </Suspense>
        </div>
      )}
    </section>
  )
}
