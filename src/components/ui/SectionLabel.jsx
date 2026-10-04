export default function SectionLabel({ as: Tag = 'p', id, className = '', children }) {
  return (
    <Tag className={`section-label ${className}`} id={id}>
      {children}
    </Tag>
  )
}
