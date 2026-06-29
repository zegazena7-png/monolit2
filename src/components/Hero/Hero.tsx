'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set([headingRef.current, ruleRef.current, subtitleRef.current, taglineRef.current, scrollIndicatorRef.current], { opacity: 1 })
      return
    }

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.5'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.3'
      )

    gsap.to(imageRef.current, {
      scale: 1.08,
      x: '-2%',
      y: '-1%',
      duration: 18,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress
        if (imageRef.current) {
          gsap.set(imageRef.current, { y: `${p * 14}%` })
        }
        if (headingRef.current) {
          gsap.set(headingRef.current, { opacity: 1 - p * 1.8, y: p * -30 })
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div ref={imageRef} className={styles.imageWrapper}>
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85"
          alt="MONOLITH Architecture"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div ref={overlayRef} className={styles.overlay} />

      <div className={styles.content}>
        <h1 ref={headingRef} className={styles.heading}>
          MONOLITH
        </h1>
        <div ref={ruleRef} className={styles.rule} />
        <p ref={subtitleRef} className={styles.subtitle}>
          Architecture &amp; Interior Design
        </p>
        <p ref={taglineRef} className={styles.tagline}>
          Designing timeless spaces.
        </p>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  )
}
