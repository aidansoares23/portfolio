import SiteHeader from './components/sections/SiteHeader'
import Hero from './components/sections/Hero'
import Work from './components/sections/Work'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <About />
      </main>
      <Contact />
    </>
  )
}
