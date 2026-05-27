import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="pt-36 md:pt-0 md:ml-64 px-12 py-8 max-w-4xl mx-auto">
        <ExperienceSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}
