import { useEffect, useRef } from 'react'

export default function useRevealOnScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.querySelectorAll('.reveal-on-scroll'))
    if (children.length === 0) return

    const revealAll = () => {
      children.forEach((child) => child.classList.add('revealed'))
    }

    if (typeof IntersectionObserver === 'undefined') {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    children.forEach((child) => {
      const rect = child.getBoundingClientRect()
      if (rect.top < window.innerHeight + 60) {
        child.classList.add('revealed')
      } else {
        observer.observe(child)
      }
    })

    // Safety fallback: ensure no section/card ever stays stuck at opacity: 0 on nav jump or fast scroll
    const safetyTimer = setTimeout(revealAll, 600)

    return () => {
      clearTimeout(safetyTimer)
      observer.disconnect()
    }
  }, [])

  return ref
}
