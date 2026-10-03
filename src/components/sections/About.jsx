import { User } from 'lucide-react'
import { about } from '../../content/profile'
import { portraitImage } from '../../content/media'
import Media from '../ui/Media'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import TechList from '../ui/TechList'
import './About.css'

// Small hand-drawn sprigs, each drawn pointing "up" (outward from the portrait).
const sprigs = {
  tree: (
    <g>
      <path d="M12 1.5 7 8h2.5L5.5 13.5h3L4 19.5h16l-4.5-6h3L14.5 8H17Z" fill="var(--ring-forest)" />
      <path d="M11 19.5h2V23h-2Z" fill="var(--ring-bark)" />
    </g>
  ),
  pine: (
    <g fill="none" stroke="var(--ring-forest)" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 22V3" />
      <path d="M12 7 8.5 4.5M12 7l3.5-2.5M12 11 7.5 7.5M12 11l4.5-3.5M12 15l-5-3.5M12 15l5-3.5M12 19l-4.5-3M12 19l4.5-3" />
    </g>
  ),
  leaf: (
    <g>
      <path d="M12 22C5.5 16 5.5 7.5 12 2c6.5 5.5 6.5 14 0 20Z" fill="var(--ring-moss)" />
      <path d="M12 21V6" stroke="var(--ring-sage-light)" strokeWidth="1" strokeLinecap="round" />
    </g>
  ),
  cone: (
    <g>
      <ellipse cx="12" cy="11.5" rx="5" ry="8" fill="var(--ring-bark)" />
      <path d="M7.5 9.5 12 12l4.5-2.5M7 13.5l5 2.5 5-2.5M8 6.5 12 8.5l4-2" fill="none" stroke="var(--ring-bark-light)" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 19.5V22" stroke="var(--ring-bark)" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  ),
  fern: (
    <g fill="var(--ring-sage)">
      <path d="M12 22c0-6 .5-13 0-19" fill="none" stroke="var(--ring-sage)" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="9" cy="17" rx="3" ry="1.3" transform="rotate(-25 9 17)" />
      <ellipse cx="15" cy="16" rx="3" ry="1.3" transform="rotate(25 15 16)" />
      <ellipse cx="9.3" cy="12.5" rx="2.6" ry="1.2" transform="rotate(-30 9.3 12.5)" />
      <ellipse cx="14.7" cy="11.5" rx="2.6" ry="1.2" transform="rotate(30 14.7 11.5)" />
      <ellipse cx="9.8" cy="8" rx="2" ry="1" transform="rotate(-35 9.8 8)" />
      <ellipse cx="14.2" cy="7.2" rx="2" ry="1" transform="rotate(35 14.2 7.2)" />
    </g>
  ),
  berries: (
    <g>
      <path d="M12 22v-8m0 0-3.5-5M12 14l3.5-6M12 14V5" fill="none" stroke="var(--ring-forest)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8.5" cy="8" r="2.2" fill="var(--ring-ochre)" />
      <circle cx="15.5" cy="7" r="2.2" fill="var(--ring-ochre)" />
      <circle cx="12" cy="4" r="2.2" fill="var(--ring-rust)" />
    </g>
  ),
}

const ring = ['tree', 'leaf', 'berries', 'tree', 'fern', 'cone', 'tree', 'leaf', 'pine', 'tree', 'berries', 'fern']

// Decorative: sprigs tucked behind the portrait that unfurl outward on hover.
function NatureRing() {
  return (
    <div className="nature-ring" aria-hidden="true" style={{ '--n': ring.length }}>
      {ring.map((kind, i) => (
        <span
          key={i}
          className="nature-ring__item"
          style={{
            '--i': i,
            '--angle': `${(360 / ring.length) * i}deg`,
            '--tilt': `${(i % 3) * 8 - 8}deg`,
          }}
        >
          <svg viewBox="0 0 24 24">{sprigs[kind]}</svg>
        </span>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section className="about page grid" id="about" aria-labelledby="about-heading">
      <Reveal className="about__label">
        <SectionLabel as="h2" id="about-heading">
          About
        </SectionLabel>
      </Reveal>

      {/* Sits in the empty column left of the text; the text column itself doesn't move. */}
      <Reveal className="about__portrait" delay={40}>
        <NatureRing />
        {portraitImage.src ? (
          <Media image={portraitImage} sizes="10rem" />
        ) : (
          <div className="about__portrait-placeholder" role="img" aria-label="Portrait coming soon">
            <User aria-hidden="true" size={28} strokeWidth={1.25} />
          </div>
        )}
      </Reveal>

      <Reveal className="about__content" delay={80}>
        <p className="about__lede display">{about.lede}</p>
        <div className="about__body">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      <Reveal className="about__tools" delay={140}>
        <h3 className="about__tools-label">Tools I use</h3>
        <TechList items={about.tools} className="about__tools-list" />
      </Reveal>
    </section>
  )
}
