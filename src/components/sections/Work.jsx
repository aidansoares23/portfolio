import SectionLabel from '../ui/SectionLabel'
import CityInsight from './CityInsight'
import WildfireCommand from './WildfireCommand'
import ClientWork from './ClientWork'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading">
      {/* Each project carries its own visible label; this heading gives the outline a parent. */}
      <h2 className="visually-hidden" id="work-heading">
        Selected work
      </h2>
      <CityInsight />
      <WildfireCommand />
      <ClientWork />
    </section>
  )
}
