import TechList from './TechList'

// Label/value pairs set as a quiet ruled list, e.g. Stack → JavaScript, Phaser, Firebase.
// An item with `tech` (an array of names) renders those with their logos instead of `value`.
export default function DetailList({ items }) {
  return (
    <dl className="detail-list">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.tech ? <TechList items={item.tech} /> : item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
