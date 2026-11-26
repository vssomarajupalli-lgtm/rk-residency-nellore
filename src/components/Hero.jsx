import { useEffect, useState } from 'react'
import { Phone, MapPin } from 'lucide-react'
import hotelData from '../data/hotelData.json'

export default function Hero({ t }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const slides = hotelData.heroSlides
  const { heroVideoEnabled, heroVideoUrl } = hotelData.featureFlags
  const [p1, p2] = hotelData.hotel.phoneLinks

  useEffect(() => {
    if (heroVideoEnabled) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [heroVideoEnabled, slides.length])

  const currentSlide = slides[activeSlide]

  return (
    <section
      id="top"
      className="relative w-full min-h-[78vh] sm:min-h-[84vh] flex items-center overflow-hidden bg-[#1D1916]"
    >
      {/* Background: Video or Crisp Single Active Ken Burns Photo */}
      {heroVideoEnabled ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideoUrl}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            key={currentSlide.src}
            src={currentSlide.src}
            alt={currentSlide.alt}
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
      )}

      {/* Subtle Left-Side Gradient Only — right side stays bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />

      {/* Content: Wider 3D Frosted-Glass Letter-Box Card */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
        <div className="max-w-2xl backdrop-blur-[3px] bg-[#1f1711]/25 border border-white/20 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 border border-white/25 text-[#FAF5EE] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            <MapPin className="w-4 h-4 text-[#E4B88A]" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="font-serif-display text-4xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4 hero-text-shadow">
            {t.hero.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#F5EFE6] leading-relaxed mb-7 font-medium hero-text-shadow">
            {t.hero.subheadline}
          </p>

          {/* Primary 3D Bevel Call Button with pulse + Secondary */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={p1.tel}
              className="inline-flex items-center justify-center gap-3 bg-[#8A6542] text-white font-bold px-7 py-4 rounded-full text-lg shadow-[0_6px_0_#5c432c] active:translate-y-1 hover:brightness-110 transition-all animate-pulse-soft whitespace-nowrap"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span>{p1.display}</span>
            </a>
            <a
              href={p2.tel}
              className="inline-flex items-center justify-center gap-2 bg-black/35 hover:bg-black/50 border border-white/30 text-white font-semibold px-5 py-3.5 rounded-full transition-all text-sm sm:text-base whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E4B88A] shrink-0" />
              <span>{t.roomsSection.orCall}: {p2.display}</span>
            </a>
          </div>

          <p className="mt-5 text-xs sm:text-sm text-[#F2EAE0] font-semibold">
            {t.hero.directNote}
          </p>
        </div>

        {/* Slide Indicators */}
        {!heroVideoEnabled && (
          <div className="mt-6 flex items-center gap-2 pl-2">
            {slides.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer shadow-sm ${
                  idx === activeSlide ? 'w-9 bg-[#E4B88A]' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
