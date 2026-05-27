import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white md:flex">
      <Sidebar />
      <main className="pt-36 md:pt-0 flex-1 min-w-0 px-12 py-8">
        <div className="max-w-3xl ml-12">
          <ExperienceSection />
          <ProjectSection />
          <MessageSection />
        </div>
      </main>
    </div>
  )
}
