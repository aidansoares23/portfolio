import Media from './Media'

// `frame="browser"` adds a single hairline title bar; `frame="bare"` shows the image as-is.
export default function Screenshot({ image, frame = 'bare', aspect = '16 / 10', sizes, className = '' }) {
  return (
    <div className={`shot shot--${frame} ${className}`}>
      {frame === 'browser' && (
        <div className="shot__bar" aria-hidden="true">
          {image?.url && <span className="shot__address">{image.url}</span>}
        </div>
      )}
      <Media image={image} kind="screenshot" aspect={aspect} sizes={sizes} />
    </div>
  )
}
