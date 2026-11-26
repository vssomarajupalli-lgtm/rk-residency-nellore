import { useEffect, useRef, useState } from 'react'
import { Phone, MapPin, Volume2, Pause } from 'lucide-react'
import hotelData from '../data/hotelData.json'
import { assetUrl } from '../utils/assetUrl'

export default function Hero({ lang = 'en', t }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioRef = useRef(null)

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

  // Stop audio cleanly whenever user switches EN | తెలుగు or unmounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setIsPlayingAudio(false)
  }, [lang])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlayingAudio(false)
      return
    }

    const src = assetUrl(lang === 'te' ? 'audio/welcome-te.mp3' : 'audio/welcome-en.mp3')
    const audio = new Audio(src)
    audioRef.current = audio
    audio.onended = () => {
      setIsPlayingAudio(false)
      audioRef.current = null
    }
    audio.onerror = () => {
      setIsPlayingAudio(false)
      audioRef.current = null
    }
    audio.play()
      .then(() => setIsPlayingAudio(true))
      .catch(() => setIsPlayingAudio(false))
  }

  const currentSlide = slides[activeSlide]
  const listenLabel = lang === 'te' ? 'హోటల్ వివరాలు వినండి' : 'Listen Hotel Info (25s)'
  const pauseLabel = lang === 'te' ? 'ఆపండి' : 'Pause Audio'

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
          src={assetUrl(heroVideoUrl)}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            key={currentSlide.src}
            src={assetUrl(currentSlide.src)}
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

          {/* Optional Click-to-Listen Welcome Audio Pill (100% silent by default) */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={toggleAudio}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                isPlayingAudio
                  ? 'bg-[#8A6542]/90 border-[#E4B88A] text-white shadow-md'
                  : 'bg-black/35 hover:bg-black/50 border-white/30 text-[#FAF5EE]'
              }`}
              aria-pressed={isPlayingAudio}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4 text-[#E4B88A] shrink-0" />
                  <span>{pauseLabel}</span>
                  <span className="inline-flex items-end gap-0.5 h-3.5 ml-0.5" aria-hidden="true">
                    <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-1 origin-bottom" />
                    <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-2 origin-bottom" />
                    <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-3 origin-bottom" />
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#E4B88A] shrink-0" />
                  <span>{listenLabel}</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#F2EAE0] font-semibold">
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
