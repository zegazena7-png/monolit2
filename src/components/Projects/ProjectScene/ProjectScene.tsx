'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/types'
import styles from './ProjectScene.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ProjectSceneProps {
  project: Project
  isBlueprint: boolean
  index: number
}

export default function ProjectScene({ project, isBlueprint, index }: ProjectSceneProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const photoLayerRef = useRef<HTMLDivElement>(null)
  const blueprintLayerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const prevBlueprintRef = useRef(isBlueprint)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section || prefersReduced) return

    gsap.fromTo(
      imageWrapperRef.current,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      [numberRef.current, titleRef.current, metaRef.current, descRef.current],
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  useEffect(() => {
    if (prevBlueprintRef.current === isBlueprint) return
    prevBlueprintRef.current = isBlueprint

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReduced ? 0 : 0.75

    gsap.to(photoLayerRef.current, {
      opacity: isBlueprint ? 0 : 1,
      duration,
      ease: 'power2.inOut',
    })
    gsap.to(blueprintLayerRef.current, {
      opacity: isBlueprint ? 1 : 0,
      duration,
      ease: 'power2.inOut',
    })
  }, [isBlueprint])

  const isEven = index % 2 === 0

  return (
    <section
      ref={sectionRef}
      className={`${styles.scene} ${isEven ? styles.sceneEven : styles.sceneOdd}`}
    >
      <div
        ref={imageWrapperRef}
        className={styles.imageWrapper}
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div ref={photoLayerRef} className={styles.layer}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className={styles.image}
          />
        </div>

        <div ref={blueprintLayerRef} className={`${styles.layer} ${styles.blueprintLayer}`} style={{ opacity: 0 }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className={`${styles.image} ${styles.blueprintImage}`}
          />
          <div className={styles.blueprintOverlay} />
        </div>

        <div className={styles.gridOverlay} />
      </div>

      <div className={styles.info}>
        <span ref={numberRef} className={styles.number}>
          {project.id}
        </span>
        <h2 ref={titleRef} className={styles.title}>
          {project.title}
        </h2>
        <div ref={metaRef} className={styles.meta}>
          <span>{project.location}</span>
          <span className={styles.metaDot}>·</span>
          <span>{project.year}</span>
          <span className={styles.metaDot}>·</span>
          <span>{project.area}</span>
        </div>
        <p ref={descRef} className={styles.description}>
          {project.description}
        </p>
      </div>
    </section>
  )
}
