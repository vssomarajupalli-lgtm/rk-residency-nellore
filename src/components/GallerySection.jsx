import { useEffect, useState, useRef } from 'react'
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import hotelData from '../data/hotelData.json'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import { assetUrl } from '../utils/assetUrl'

export default function GallerySection({ lang, t }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [zoom, setZoom] = useState(1)
  const touchStartX = useRef(null)
  const ref = useRevealOnScroll()

  const filtered =
    activeCategory === 'all'
      ? hotelData.gallery
      : hotelData.gallery.filter((item) => item.category === activeCategory)

  const openLightbox = (idx) => {
    setLightboxIdx(idx)
    setZoom(1)
  }

  const closeLightbox = () => {
    setLightboxIdx(null)
    setZoom(1)
  }

  const goPrev = () => {
    if (lightboxIdx === null) return
    setZoom(1)
    setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length)
  }

  const goNext = () => {
    if (lightboxIdx === null) return
    setZoom(1)
    setLightboxIdx((lightboxIdx + 1) % filtered.length)
  }

  useEffect(() => {
    if (lightboxIdx === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(diff) > 45) {
      if (diff > 0) goPrev()
      else goNext()
    }
    touchStartX.current = null
  }

  const activePhoto = lightboxIdx !== null ? filtered[lightboxIdx] : null

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FFFDF8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 reveal-on-scroll">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A6728] mb-2">
            {t.gallery.eyebrow}
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1A0E] leading-tight">
            {t.gallery.title}
          </h2>
          <p className="mt-3 text-base font-medium text-[#2c2219] leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 reveal-on-scroll" style={{ animationDelay: '80ms' }}>
          {t.gallery.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id)
                setLightboxIdx(null)
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#7A5529] text-[#FFF8EB] shadow-sm'
                  : 'bg-[#F6EFE4] text-[#3B2A1A] border border-[#DECBB0] hover:border-[#7A5529]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filtered.map((item, idx) => {
            const title = lang === 'te' ? item.titleTe : lang === 'hi' ? item.titleHi : item.titleEn
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(idx)}
                className="reveal-on-scroll group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#E6DFD5] border border-[#DDD4C8] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7C5C3E]"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <img
                  src={assetUrl(item.src)}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs sm:text-sm font-semibold leading-snug">
                  {title}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 text-white border-b border-white/10">
            <div className="text-sm sm:text-base font-semibold truncate pr-4">
              {lang === 'te' ? activePhoto.titleTe : lang === 'hi' ? activePhoto.titleHi : activePhoto.titleEn}
              <span className="ml-2 text-xs text-white/60">
                ({lightboxIdx + 1} / {filtered.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t.gallery.zoomOut}
                title={t.gallery.zoomOut}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.5, Number((z + 0.5).toFixed(1))))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t.gallery.zoomIn}
                title={t.gallery.zoomIn}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="ml-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t.gallery.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Viewport */}
          <div className="relative flex-1 flex items-center justify-center overflow-auto p-4">
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full bg-black/55 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={assetUrl(activePhoto.src)}
              alt={lang === 'te' ? activePhoto.titleTe : lang === 'hi' ? activePhoto.titleHi : activePhoto.titleEn}
              style={{ transform: `scale(${zoom})` }}
              className="max-h-[80vh] max-w-full object-contain rounded-lg transition-transform duration-200 select-none"
            />

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full bg-black/55 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
