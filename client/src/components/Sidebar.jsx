export default function Sidebar() {
  return (
    <aside className="w-64 px-6 py-12 fixed top-0 left-0 h-full border-r border-gray-700">
      <div className="text-3xl font-bold mb-4">Zhiqiao Gong</div>
      <div className="text-gray-400 text-sm mb-6">Full Stack | Backend | XR & HCI</div>

      <div className="flex gap-4 mb-10">
        <a
          href="https://github.com/ZhiqiaoGong"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white text-xs transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/zhiqiao-gong/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white text-xs transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:zqgong86@gmail.com"
          className="text-gray-400 hover:text-white text-xs transition"
        >
          Email
        </a>
      </div>

      <nav className="space-y-4 text-gray-400 text-sm">
        <a href="#experience" className="hover:text-white block">EXPERIENCE</a>
        <a href="#projects" className="hover:text-white block">PROJECTS</a>
        <a href="#messages" className="hover:text-white block">MESSAGE</a>
      </nav>
    </aside>
  );
}