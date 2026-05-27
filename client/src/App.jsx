import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />

      {/* Mobile Header */}
      <main className="pt-28 md:pt-0 md:ml-64 flex-1 p-8 max-w-5xl">
        <ExperienceSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}