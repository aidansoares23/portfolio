// A small label set under a full-width hairline: the visible boundary between sections.
export default function SectionLabel({ as: Tag = 'p', id, className = '', children }) {
  return (
    <Tag className={`section-label ${className}`} id={id}>
      {children}
    </Tag>
  )
}
