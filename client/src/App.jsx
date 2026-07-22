import { useEffect } from 'react'
import Lenis from 'lenis'
import Sidebar from './components/Sidebar'
import Spotlight from './components/Spotlight'
import IntroSection from './components/IntroSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectSection from './components/ProjectSection'
import MessageSection from './components/MessageSection'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ anchors: true })
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip bg-gray-900 text-white text-base md:flex">
      <Spotlight />
      <Sidebar />
      <main className="min-w-0 flex-1 px-6 pb-12 pt-28 sm:px-8 md:px-14 md:py-16 lg:px-20">
        <IntroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectSection />
        <MessageSection />
      </main>
    </div>
  )
}
