import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './BrandIcons'

// `icon` (optional) is shown before the label. Links to GitHub get the GitHub mark by default.
// External links open in a new tab and point up-right; links within the site point right.
export default function ArrowLink({ href, children, icon, external = true }) {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {}
  const Arrow = external ? ArrowUpRight : ArrowRight
  const lead = icon ?? (href.includes('github.com') ? <GithubIcon size={15} /> : null)
  return (
    <a className={`arrow-link ${external ? '' : 'arrow-link--internal'}`} href={href} {...externalProps}>
      {lead && (
        <span className="arrow-link__lead" aria-hidden="true">
          {lead}
        </span>
      )}
      <span className="link">{children}</span>
      <span className="arrow-link__icon" aria-hidden="true">
        <Arrow size={15} strokeWidth={1.75} />
      </span>
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  )
}
