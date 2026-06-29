'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Navigation.module.css'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      [logoRef.current, linksRef.current],
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.1, delay: 0.8 }
    )

    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add(styles.scrolled)
      } else {
        nav.classList.remove(styles.scrolled)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className={styles.nav}>
      <div ref={logoRef} className={styles.logo}>
        MONOLITH
      </div>
      <div ref={linksRef} className={styles.links}>
        <button onClick={() => scrollTo('projects')} className={styles.link}>
          Projects
        </button>
        <button onClick={() => scrollTo('contact')} className={styles.link}>
          Contact
        </button>
      </div>
    </nav>
  )
}
