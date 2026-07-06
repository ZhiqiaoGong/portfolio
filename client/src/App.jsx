import Sidebar from './components/Sidebar'
import Spotlight from './components/Spotlight'
import IntroSection from './components/IntroSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white text-base md:flex">
      <Spotlight />
      <Sidebar />
      <main className="min-w-0 flex-1 px-6 pb-12 pt-28 sm:px-8 md:px-14 md:py-16 lg:px-20">
        <IntroSection />
        <ExperienceSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}
