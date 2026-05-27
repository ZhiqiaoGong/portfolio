import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="md:flex">
        <div className="hidden md:block md:w-64 shrink-0" />
        <main className="pt-36 md:pt-0 flex-1 p-8 max-w-5xl">
          <ExperienceSection />
          <ProjectSection />
          <MessageSection />
        </main>
      </div>
    </div>
  )
}
