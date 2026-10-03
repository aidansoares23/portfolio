import { useInView } from '../../hooks/useInView'
import Media from '../ui/Media'
import Screenshot from '../ui/Screenshot'
import './CityInsightCollage.css'

// The City Insight lead: the home page with real pieces of the app layered around it.
// Each piece links to that part of the live app.
export default function CityInsightCollage({ image, pieces, caption, className = '' }) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -12% 0px' })

  return (
    <figure className={`showcase collage ${className}`}>
      <div
        ref={ref}
        className={`showcase__panel showcase__panel--reveal ${inView ? 'is-visible' : ''}`}
      >
        <div className="collage__stage">
          <div className="collage__main">
            <Screenshot image={image} frame="browser" aspect="16 / 10" sizes="(max-width: 700px) 100vw, 1000px" />
          </div>

          {pieces.map((piece) => (
            <a
              key={piece.id}
              className={`collage__piece collage__piece--${piece.id}`}
              href={piece.href}
              target="_blank"
              rel="noreferrer"
            >
              <Media image={piece.image} kind="screenshot" aspect={piece.aspect} sizes="(max-width: 700px) 50vw, 420px" />
              <span className="visually-hidden">
                {piece.label} (opens the live app in a new tab)
              </span>
            </a>
          ))}
        </div>
      </div>
      {caption && <figcaption className="showcase__caption">{caption}</figcaption>}
    </figure>
  )
}
