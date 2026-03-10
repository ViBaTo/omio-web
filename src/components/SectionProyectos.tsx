'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import HorizontalScroll from './HorizontalScroll';
import ProjectCard from './ProjectCard';
import { PROYECTOS } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';
import { useIsMobile } from '@/lib/useMediaQuery';

function MobileProjects() {
  return (
    <div className="flex flex-col gap-8 mt-16">
      {PROYECTOS.projects.map((project, i) => (
        <div key={project.slug} className="snap-start">
          <ProjectCard
            project={project}
            index={i}
            total={PROYECTOS.projects.length}
          />
        </div>
      ))}
    </div>
  );
}

export default function SectionProyectos() {
  const isMobile = useIsMobile();
  const projects = PROYECTOS.projects;

  return (
    <section id="proyectos" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Header area */}
      <div className="px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionLabel
            number="05"
            label="PROYECTOS"
            accentColor="#B8956A"
            numberColor="#C0C0C0"
          />

          <motion.div className="mt-8">
            <AnimatedText
              text={PROYECTOS.title}
              as="h2"
              className="font-artesano italic text-[clamp(2rem,5vw,4.5rem)] leading-[1.05]"
              splitBy="word"
            />
          </motion.div>

          <motion.p
            className="font-body text-base md:text-lg leading-relaxed mt-10 max-w-3xl"
            style={{ color: '#F5F0EB', opacity: 0.7 }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PROYECTOS.intro}
          </motion.p>

          <motion.p
            className="font-artesano italic text-lg md:text-xl leading-relaxed mt-6 max-w-2xl"
            style={{ color: '#B8956A' }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PROYECTOS.phrase}
          </motion.p>
        </div>
      </div>

      {/* Gallery */}
      {isMobile ? (
        <MobileProjects />
      ) : (
        <HorizontalScroll itemCount={projects.length}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </HorizontalScroll>
      )}
    </section>
  );
}
