import { cityInsight as project } from '../../content/projects'
import ArrowLink from '../ui/ArrowLink'
import { GithubIcon } from '../ui/BrandIcons'
import DetailList from '../ui/DetailList'
import Reveal from '../ui/Reveal'
import CityInsightCollage from './CityInsightCollage'
import SectionLabel from '../ui/SectionLabel'
import './CityInsight.css'

// The homepage summary. The full engineering story is on the case study page.
export default function CityInsight() {
  const primaryLinks = project.links.filter((link) => link.kind !== 'source')
  const sourceLinks = project.links.filter((link) => link.kind === 'source')

  return (
    <article className="ci" id={project.id} aria-labelledby="ci-title">
      <header className="ci-intro page grid">
        <Reveal className="ci-intro__heading">
          <SectionLabel>{project.label}</SectionLabel>
          <h3 className="ci-intro__title display" id="ci-title">
            {project.title}
          </h3>
        </Reveal>
        <Reveal className="ci-intro__copy" delay={80}>
          <p className="ci-intro__summary">{project.summary}</p>
          <p className="body">{project.ownership}</p>
        </Reveal>
        <Reveal className="ci-intro__aside" delay={160}>
          <DetailList items={project.facts} />
          <div className="ci-intro__links">
            <div className="link-row">
              {primaryLinks.map((link) => (
                <ArrowLink key={link.label} href={link.href} external={link.kind !== 'internal'}>
                  {link.label}
                </ArrowLink>
              ))}
            </div>
            <div className="link-row ci-intro__source">
              <span className="ci-intro__source-label">Source</span>
              {sourceLinks.map((link) => (
                <ArrowLink key={link.label} href={link.href} icon={<GithubIcon size={15} />}>
                  {link.label}
                </ArrowLink>
              ))}
            </div>
          </div>
        </Reveal>
      </header>

      <CityInsightCollage
        className="ci-lead"
        image={project.leadImage}
        pieces={project.collage}
        caption={project.leadCaption}
      />
    </article>
  )
}
