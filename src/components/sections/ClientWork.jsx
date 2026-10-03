import { redevs as project } from '../../content/projects'
import ArrowLink from '../ui/ArrowLink'
import Reveal from '../ui/Reveal'
import Showcase from '../ui/Showcase'
import SectionLabel from '../ui/SectionLabel'
import './ClientWork.css'

export default function ClientWork() {
  return (
    <article className="client" id={project.id} aria-labelledby="client-title">
      <div className="client__inner page">
        <SectionLabel className="client__label">{project.label}</SectionLabel>

        <Reveal className="client__head">
          <h3 className="client__title display" id="client-title">
            {project.title}
          </h3>
          <p className="client__summary">{project.summary}</p>
        </Reveal>

        <div className="client__media">
          <Showcase
            tone="paper"
            frame="browser"
            image={project.image}
            caption={project.caption}
            sizes="(max-width: 960px) 100vw, 55vw"
          />
        </div>

        <Reveal className="client__body" delay={120}>
          <p className="body">{project.description}</p>
          <div className="link-row">
            {project.links.map((link) => (
              <ArrowLink key={link.label} href={link.href}>
                {link.label}
              </ArrowLink>
            ))}
          </div>
          {project.otherWork && <p className="client__other">{project.otherWork}</p>}
        </Reveal>
      </div>
    </article>
  )
}
