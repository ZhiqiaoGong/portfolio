// src/App.jsx
import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* 左侧导航 */}
      <aside className="md:w-1/4 w-full px-6 py-8 border-gray-700">
        <Sidebar />
      </aside>

      {/* 右侧主要内容 */}
      <main className="flex-1 p-8 max-w-5xl ">
      <ExperienceSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}
