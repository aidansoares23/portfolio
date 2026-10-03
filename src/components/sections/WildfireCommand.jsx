import { wildfireCommand as project } from '../../content/projects'
import ArrowLink from '../ui/ArrowLink'
import Reveal from '../ui/Reveal'
import Showcase from '../ui/Showcase'
import SectionLabel from '../ui/SectionLabel'
import TechList from '../ui/TechList'
import './WildfireCommand.css'

export default function WildfireCommand() {
  return (
    <article className="wf page" id={project.id} aria-labelledby="wf-title">
      <SectionLabel className="wf__label">{project.label}</SectionLabel>

      <Reveal className="wf__head">
        <h3 className="wf__title display" id="wf-title">
          {project.title}
        </h3>
        <p className="wf__summary">{project.summary}</p>
      </Reveal>

      <div className="wf__media">
        <Showcase
          tone="stone"
          image={project.image}
          caption={project.caption}
          sizes="(max-width: 960px) 100vw, 60vw"
        />
      </div>

      <Reveal className="wf__body" delay={120}>
        <p className="body">{project.description}</p>
        {project.contribution && (
          <div className="wf__contribution">
            <p className="wf__contribution-label">My contribution</p>
            <p className="body">{project.contribution}</p>
          </div>
        )}
        <TechList className="wf__stack" items={project.stack} />
        <div className="link-row">
          {project.links.map((link) => (
            <ArrowLink key={link.label} href={link.href}>
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </Reveal>
    </article>
  )
}
