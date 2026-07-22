import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'messages', label: 'MESSAGE' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ZhiqiaoGong', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zhiqiao-gong/', external: true },
  { label: 'Email', href: 'mailto:zqgong86@gmail.com', external: false },
];

function useActiveSection() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Fires when a section crosses the upper-middle band of the viewport
      { rootMargin: '-30% 0px -60% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Sidebar() {
  const active = useActiveSection();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex flex-col w-72 shrink-0 px-10 py-12 min-h-screen border-r border-gray-700 sticky top-0 self-start">
        <div className="text-3xl font-bold mb-4">Zhiqiao Gong</div>
        <div className="text-gray-400 text-sm mb-6">Backend | Full-Stack | XR Systems</div>

        <div className="flex gap-4 mb-10">
          {SOCIAL_LINKS.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-gray-400 hover:text-white text-xs transition"
            >
              {label}
            </a>
          ))}
        </div>

        <nav className="space-y-4 text-sm">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`group flex items-center gap-3 transition ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? 'w-12 bg-white'
                      : 'w-6 bg-gray-600 group-hover:w-12 group-hover:bg-white'
                  }`}
                />
                {label}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xl font-bold">Zhiqiao Gong</div>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-gray-400 hover:text-white text-xs transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <nav className="flex gap-5 overflow-x-auto text-xs">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`transition ${
                active === id ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
