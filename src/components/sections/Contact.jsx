import { ArrowUp, FileText } from 'lucide-react'
import { useInView } from '../../hooks/useInView'
import { profile } from '../../content/profile'
import { bearImage, contactImage } from '../../content/media'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import Media from '../ui/Media'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import './Contact.css'

const iconProps = { size: 17, strokeWidth: 1.75, 'aria-hidden': true, className: 'draw-icon' }

export default function Contact() {
  const links = [
    { label: 'LinkedIn', href: profile.links.linkedin, icon: <LinkedinIcon {...iconProps} />, external: true },
    { label: 'GitHub', href: profile.links.github, icon: <GithubIcon {...iconProps} />, external: true },
    { label: 'Résumé', href: profile.links.resume, icon: <FileText {...iconProps} />, external: false },
  ]

  const [emailName, emailDomain] = profile.email.split('@')
  // Reaching the very bottom clears the haze over the photo, echoing the hero, and offers a way back up.
  const [summitRef, reachedSummit] = useInView({ rootMargin: '0px' })

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-heading" data-summit={reachedSummit}>
      <div className="contact__inner page">
        <Reveal>
          <SectionLabel as="h2" id="contact-heading">
            Get in touch
          </SectionLabel>
        </Reveal>

        <Reveal delay={80}>
          <a className="contact__email display" href={`mailto:${profile.email}`}>
            {/* Break after the name, never mid-domain, when the address has to wrap. */}
            <span>
              {emailName}
              <wbr />@{emailDomain}
            </span>
          </a>
        </Reveal>

        <Reveal as="ul" className="contact__links" delay={160}>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {link.icon}
                <span className="link">{link.label}</span>
                {link.external && <span className="visually-hidden"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </Reveal>
      </div>

      <div className="contact__scene">
        <Media className="contact__photo" image={contactImage} sizes="100vw" />
        <div className="contact__bear" role="img" aria-label={bearImage.alt}>
          <img src={bearImage.body.src} srcSet={bearImage.body.srcSet} sizes="10rem" alt="" loading="lazy" decoding="async" />
          <img
            className="contact__bear-paw"
            src={bearImage.paw.src}
            srcSet={bearImage.paw.srcSet}
            sizes="10rem"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="contact__summit page" aria-hidden={!reachedSummit}>
          <a className="contact__summit-link" href="#top" tabIndex={reachedSummit ? undefined : -1}>
            <span className="link">Back to top</span>
            <span className="contact__summit-icon" aria-hidden="true">
              <ArrowUp size={15} strokeWidth={1.75} />
            </span>
          </a>
        </div>
      </div>

      <div className="contact__base page meta">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
      <div ref={summitRef} className="contact__summit-sentinel" aria-hidden="true" />
    </footer>
  )
}
