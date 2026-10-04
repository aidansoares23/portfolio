import { techLogos } from '../../content/logos'

export default function TechList({ items, className = '' }) {
  return (
    <ul className={`tech-list ${className}`}>
      {items.map((tech) => {
        const logo = techLogos[tech]
        return (
          <li key={tech}>
            {logo && (
              <img
                className={`tech-list__logo ${logo.pixelArt ? 'tech-list__logo--pixel' : ''}`}
                src={logo.src}
                alt=""
                width="16"
                height="16"
              />
            )}
            {tech}
          </li>
        )
      })}
    </ul>
  )
}
