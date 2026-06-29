'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'
import ProjectScene from './ProjectScene/ProjectScene'
import BlueprintToggle from '@/components/BlueprintToggle/BlueprintToggle'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const [mode, setMode] = useState<'photo' | 'blueprint'>('photo')
  const headerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      toggleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: toggleRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.header}>
        <div ref={headerRef} className={styles.headerText}>
          <span className={styles.sectionLabel}>Selected Work</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>
        <div ref={toggleRef} className={styles.toggleWrapper}>
          <BlueprintToggle mode={mode} onChange={setMode} />
        </div>
      </div>

      <div className={styles.scenes}>
        {projects.map((project, i) => (
          <ProjectScene
            key={project.id}
            project={project}
            isBlueprint={mode === 'blueprint'}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
