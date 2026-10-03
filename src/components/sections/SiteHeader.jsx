import { useEffect, useState } from 'react'
import { profile } from '../../content/profile'
import './SiteHeader.css'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

// Stays out of the way in the hero, then appears once the visitor has scrolled into the page.
// The link for the section currently in view is marked with aria-current.
export default function SiteHeader() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 0.3), {
      threshold: [0, 0.3],
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    // Whichever section crosses the middle of the viewport is current.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header" data-visible={visible}>
      <div className="site-header__inner page">
        <a className="site-header__name" href="#top">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="site-header__nav">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={current === id ? 'location' : undefined}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.links.resume}>Résumé</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
