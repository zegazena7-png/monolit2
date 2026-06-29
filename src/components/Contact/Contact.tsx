'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      }
    )

    gsap.fromTo(
      [emailRef.current, footerRef.current],
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.inner}>
        <h2 ref={headingRef} className={styles.heading}>
          Let&apos;s build something
          <br />
          <em>remarkable.</em>
        </h2>

        <a
          ref={emailRef}
          href="mailto:contact@monolith-studio.com"
          className={styles.email}
        >
          contact@monolith-studio.com
        </a>
      </div>

      <div ref={footerRef} className={styles.footer}>
        <span className={styles.copyright}>&copy; 2025 MONOLITH</span>
        <span className={styles.offices}>Moscow &middot; New York &middot; Dubai</span>
      </div>
    </section>
  )
}
