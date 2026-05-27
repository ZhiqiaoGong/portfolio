import Sidebar from './components/Sidebar'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white text-base md:flex">
      <Sidebar />
      <main className="pt-32 md:pt-12 flex-1 min-w-0 px-10 md:px-20 pb-10 md:py-16">
        <ExperienceSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}
