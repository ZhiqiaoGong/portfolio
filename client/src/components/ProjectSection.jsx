export default function ProjectSection() {
    const projects = [
    {
        title: 'Chinese Font Generating System Using GAN',
        description:
            'Built a FastAPI-based font generation system. Improved L1 loss by 40% using GAN and AutoEncoder variants. Enabled distributed training with Docker and Redis.',
        tags: ['Python', 'GAN', 'FastAPI', 'Docker', 'Redis', 'Numpy'],
        },
        {
        title: 'Campus Secondhand Trading Platform',
        description:
            'Built a Spring Boot-based backend with MySQL and Redis. Used Java Socket for real-time messaging. Query response time improved from 800ms to 150ms.',
        tags: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Java Socket'],
        },
        {
        title: 'OpenGL COVID Animation',
        description:
            'Created a 2D animation to promote public safety during COVID-19 using OpenGL, GLSL, and keyframe interpolation. Included people interaction and particle systems.',
        tags: ['C++', 'OpenGL', 'GLSL', 'Animation', 'Catmull-Rom Curve', 'Particle System'],
        },
];
  
    return (
        <section id="projects" className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="text-sm text-gray-400">{project.time}</div>
              <div className="text-xl font-semibold mt-1 text-blue-300">
                {project.title}
              </div>
              <p className="mt-2 text-gray-300">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-800 text-white text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  