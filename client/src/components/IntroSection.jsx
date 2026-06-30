export default function IntroSection() {
  return (
    <section id="about" className="max-w-3xl scroll-mt-28 md:scroll-mt-8">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Backend | Full-Stack | XR Systems
      </p>
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
        I build dependable systems for real-time, AI, and immersive products.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
        I’m Zhiqiao Gong, a software engineer who enjoys turning complex workflows into
        reliable, practical products across web platforms, real-time systems, and immersive applications.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-md bg-blue-500 px-5 py-2.5 font-medium text-white transition hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          View selected work
        </a>
      </div>
    </section>
  )
}
