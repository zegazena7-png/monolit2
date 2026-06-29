import Navigation from '@/components/Navigation/Navigation'
import Hero from '@/components/Hero/Hero'
import Projects from '@/components/Projects/Projects'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
