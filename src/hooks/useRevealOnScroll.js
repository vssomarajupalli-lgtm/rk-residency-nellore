import { useEffect, useRef } from 'react'

export default function useRevealOnScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const children = el.querySelectorAll('.reveal-on-scroll')
    children.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return ref
}
