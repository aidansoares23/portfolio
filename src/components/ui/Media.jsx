import './ui.css'

// Renders a real image when `image.src` is set, otherwise a quiet placeholder
// that states what the finished image should be.
export default function Media({ image, kind = 'photo', aspect, sizes = '100vw', priority = false, className = '' }) {
  const style = aspect ? { aspectRatio: aspect } : undefined

  if (image?.src) {
    const img = (
      <img
        className={`media ${className}`}
        src={image.src}
        srcSet={image.srcSet ?? undefined}
        sizes={image.srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        style={style}
      />
    )
    // Animated images offer a still frame to visitors who prefer reduced motion.
    if (!image.still) return img
    return (
      <picture>
        <source media="(prefers-reduced-motion: reduce)" srcSet={image.still} />
        {img}
      </picture>
    )
  }

  return (
    <div className={`media media--placeholder media--${kind} ${className}`} style={style} role="img" aria-label={image?.alt}>
      <span className="media__note" aria-hidden="true">
        <strong>{kind === 'photo' ? 'Photograph' : 'Screenshot'}</strong>
        {image?.note}
      </span>
    </div>
  )
}
