export default function Sidebar() {
  return (
    <aside className="w-64 px-6 py-12 fixed top-0 left-0 h-full border-r border-gray-700">
      <div className="text-3xl font-bold mb-4">Your Name</div>
      <div className="text-gray-400 text-sm mb-10">Full Stack Developer</div>
      <nav className="space-y-4 text-gray-400 text-sm">
        <a href="#experience" className="hover:text-white block">EXPERIENCE</a>
        <a href="#projects" className="hover:text-white block">PROJECTS</a>
        <a href="#messages" className="hover:text-white block">MESSAGE</a> {/* 新增 */}
      </nav>
    </aside>
  );
}
