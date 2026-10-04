import { useInView } from '../../hooks/useInView'
import Media from './Media'
import Screenshot from './Screenshot'
import './Showcase.css'

// tone: "stone" (default) or "paper" (for use on the stone-100 band).
export default function Showcase({
  image,
  frame = 'bare',
  aspect = '16 / 10',
  sizes,
  tone = 'stone',
  detail,
  caption,
  reveal = true,
  className = '',
}) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -12% 0px' })
  const visible = !reveal || inView

  return (
    <figure className={`showcase ${className}`}>
      <div ref={ref} className={`showcase__panel showcase__panel--${tone} ${reveal ? 'showcase__panel--reveal' : ''} ${visible ? 'is-visible' : ''}`}>
        <div className="showcase__stage">
          <Screenshot image={image} frame={frame} aspect={aspect} sizes={sizes} className="showcase__shot" />
          {detail && (
            <div className="showcase__detail">
              <Media image={detail} kind="screenshot" aspect={detail.aspect} sizes="(max-width: 960px) 40vw, 420px" />
            </div>
          )}
        </div>
      </div>
      {caption && <figcaption className="showcase__caption">{caption}</figcaption>}
    </figure>
  )
}
