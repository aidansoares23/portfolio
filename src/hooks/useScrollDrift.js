import { useEffect } from 'react'

// Moves an element at a fraction of the scroll speed while it's near the top of the page,
// so a photo appears to sit slightly behind the page. Skipped entirely for reduced motion.
export function useScrollDrift(ref, { speed = 0.15 } = {}) {
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const offset = Math.min(window.scrollY, window.innerHeight * 1.25)
      element.style.transform = `translate3d(0, ${offset * speed}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ref, speed])
}
