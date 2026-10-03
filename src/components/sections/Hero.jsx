import { useRef } from 'react'
import { ArrowDown, FileText, MapPin } from 'lucide-react'
import { useScrollDrift } from '../../hooks/useScrollDrift'
import { profile } from '../../content/profile'
import { heroImage } from '../../content/media'
import Media from '../ui/Media'
import './Hero.css'

export default function Hero() {
  const [firstName, lastName] = profile.name.split(' ')
  const driftRef = useRef(null)
  useScrollDrift(driftRef)

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero__visual">
        <div className="hero__drift" ref={driftRef}>
          <Media className="hero__photo" image={heroImage} sizes="(max-width: 820px) 100vw, 42vw" priority />
        </div>
      </div>

      <div className="hero__text">
        <h1 className="hero__name display" id="hero-name">
          <span className="hero__line">{firstName}</span>{' '}
          <span className="hero__line">{lastName}</span>
        </h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>

        <div className="hero__actions">
          <a className="hero__cta" href="#work">
            View selected work
            <span className="hero__cta-icon" aria-hidden="true">
              <ArrowDown size={16} strokeWidth={1.75} />
            </span>
          </a>
          <a className="link hero__secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero__meta meta">
        <p className="hero__location">
          <MapPin aria-hidden="true" size={14} strokeWidth={1.75} />
          {profile.location} · {profile.availability}
        </p>
        <a className="hero__resume" href={profile.links.resume}>
          <FileText aria-hidden="true" size={14} strokeWidth={1.75} />
          <span className="link">Résumé</span>
        </a>
      </div>
    </section>
  )
}
