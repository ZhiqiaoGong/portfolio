import { useEffect, useState } from 'react';
import Reveal from './Reveal';

const ROLES = ['Backend Engineer', 'Full-Stack Developer', 'XR Systems Builder'];

function useTypewriter(words, typeSpeed = 70, deleteSpeed = 35, pauseMs = 1800) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

export default function IntroSection() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="about" className="relative max-w-3xl scroll-mt-28 md:scroll-mt-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"
      />

      <Reveal>
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
          reliable, practical products across web platforms, real-time systems, and immersive applications.
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
    </section>
  )
}
