import { ArrowLeft } from 'lucide-react'
import { cityInsight as project } from '../content/projects'
import { profile } from '../content/profile'
import ArrowLink from '../components/ui/ArrowLink'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import Showcase from '../components/ui/Showcase'
import TechList from '../components/ui/TechList'
import Contact from '../components/sections/Contact'
import '../components/sections/CityInsight.css'
import './CityInsightCaseStudy.css'

// The City Insight case study: what it does, what I owned, and the decisions that keep its data coherent.
export default function CityInsightCaseStudy() {
  const { caseStudy } = project

  return (
    <>
      <a className="skip-link" href="#case-study">
        Skip to content
      </a>
      <header className="cs-bar page" id="top">
        <a className="cs-bar__name" href="/">
          {profile.name}
        </a>
        <a className="cs-bar__back" href="/#work">
          <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.75} />
          <span className="link">All work</span>
        </a>
      </header>

      <main id="case-study">
        <article className="cs" aria-labelledby="cs-title">
          <header className="cs-intro page grid">
            <Reveal className="cs-intro__label">
              <SectionLabel>How I built it</SectionLabel>
            </Reveal>
            <Reveal className="cs-intro__heading" delay={60}>
              <h1 className="cs-intro__title display" id="cs-title">
                {project.title}
              </h1>
            </Reveal>
            <Reveal className="cs-intro__lede" delay={120}>
              <p>{caseStudy.description}</p>
            </Reveal>
            <Reveal className="cs-intro__copy" delay={180}>
              <p className="body">{caseStudy.overview}</p>
              <p className="body">{caseStudy.ownership}</p>
            </Reveal>
            <Reveal as="aside" className="cs-intro__aside" delay={240} aria-label="Project links">
              <ArrowLink href={caseStudy.live.href}>{caseStudy.live.label}</ArrowLink>
              <dl className="detail-list">
                <div>
                  <dt>Stack</dt>
                  <dd>
                    <TechList items={caseStudy.stack} />
                  </dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd className="cs-intro__sources">
                    {caseStudy.sources.map((link) => (
                      <ArrowLink key={link.label} href={link.href}>
                        {link.label}
                      </ArrowLink>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </header>

          <div className="cs-lead page">
            <Showcase
              image={caseStudy.leadImage}
              frame="browser"
              aspect="16 / 10"
              sizes="(max-width: 1240px) 100vw, 1180px"
              caption={caseStudy.leadCaption}
            />
          </div>

          <div className="cs-sections page">
            {caseStudy.sections.map((section, index) => (
              <section
                key={section.id}
                className={`cs-section ${section.callout ? 'cs-section--anchor' : ''}`}
                aria-labelledby={`cs-${section.id}`}
              >
                <Reveal className="cs-section__text">
                  <h2 className="cs-section__title" id={`cs-${section.id}`}>
                    <span className="cs-section__number">{String(index + 1).padStart(2, '0')}</span>
                    {section.title}
                  </h2>
                  {section.callout && <p className="cs-section__callout">{section.callout}</p>}
                  <div className="cs-section__body">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.link && (
                    <div className="cs-section__link">
                      <ArrowLink href={section.link.href}>{section.link.label}</ArrowLink>
                    </div>
                  )}
                </Reveal>
                {section.figure && (
                  <div className="cs-section__figure">
                    <Showcase
                      image={section.figure.image}
                      aspect={section.figure.aspect}
                      sizes="(max-width: 960px) 100vw, 55vw"
                      className="ci-showcase"
                    />
                  </div>
                )}
              </section>
            ))}

            <p className="cs-note">
              <span className="cs-note__label">Demo note</span>
              {caseStudy.demoNote}
            </p>
          </div>
        </article>
      </main>

      <Contact />
    </>
  )
}
