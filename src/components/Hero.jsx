import { useEffect, useRef, useState } from 'react'
import { Phone, MapPin, Volume2, Pause } from 'lucide-react'
import hotelData from '../data/hotelData.json'
import { assetUrl } from '../utils/assetUrl'

const AUDIO_META = {
  en: { file: 'audio/welcome-en.mp3', listen: 'Listen Hotel Info (25s)', pause: 'Pause Audio' },
  te: { file: 'audio/welcome-te.mp3', listen: 'హోటల్ వివరాలు వినండి', pause: 'ఆపండి' },
  hi: { file: 'audio/welcome-hi.mp3', listen: 'होटल की जानकारी सुनें', pause: 'रोकें' },
}

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

  // Stop audio cleanly whenever user switches EN | తెలుగు | हिंदी or unmounts
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

  const meta = AUDIO_META[lang] || AUDIO_META.en

  const toggleAudio = () => {
    if (isPlayingAudio && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlayingAudio(false)
      return
    }

    const audio = new Audio(assetUrl(meta.file))
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

  return (
    <section
      id="top"
      className="relative w-full min-h-[78vh] sm:min-h-[85vh] flex items-end overflow-hidden bg-[#1D1916]"
    >
      {/* Background: Video or Crisp Single Active Ken Burns Photo (100% unobstructed top 65-70%) */}
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

      {/* Smooth Bottom-Half Gradient Fade Only (top 50% stays 100% bright & clear) */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none" />

      {/* Zero-Box Horizontal Bottom Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Left: Location Badge + Tight Dark-Tint Text Block */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/25 text-[#FAF5EE] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
              <MapPin className="w-4 h-4 text-[#E4B88A] shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            <div className="bg-black/50 backdrop-blur-[2px] border border-white/15 rounded-2xl px-5 py-4 max-w-xl">
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-[3.1rem] font-bold text-[#FFF3D1] leading-[1.08] tracking-tight mb-2 [text-shadow:0_3px_14px_rgba(0,0,0,0.95)]">
                {t.hero.headline}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#F7EFE2] leading-snug font-medium [text-shadow:0_3px_14px_rgba(0,0,0,0.95)]">
                {t.hero.subheadline}
              </p>

              <p className="mt-2.5 text-xs sm:text-sm text-[#E4B88A] font-semibold [text-shadow:0_2px_8px_rgba(0,0,0,0.85)]">
                {t.hero.directNote}
              </p>
            </div>
          </div>

          {/* Right: 2-Row Symmetric Dark-Gold CTA Group */}
          <div className="flex flex-col gap-2.5 w-full lg:w-auto lg:min-w-[360px] shrink-0">
            {/* Row 1: Full-width Primary Focus */}
            <a
              href={p1.tel}
              className="inline-flex items-center justify-center gap-3 w-full bg-black/70 backdrop-blur-sm border-2 border-[#E4B88A] text-[#FFF3D1] font-bold text-lg px-6 py-3 rounded-full whitespace-nowrap animate-cta-pop hover:brightness-110 transition-all"
            >
              <Phone className="w-5 h-5 text-[#E4B88A] shrink-0" />
              <span>{p1.display}</span>
            </a>

            {/* Row 2: 2 Equal Side-by-Side Secondary Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
              <a
                href={p2.tel}
                className="inline-flex items-center justify-center gap-2 bg-black/60 hover:bg-black/75 border border-white/25 text-white text-sm font-medium rounded-full px-4 py-2.5 whitespace-nowrap transition-all"
              >
                <Phone className="w-4 h-4 text-[#E4B88A] shrink-0" />
                <span>{t.roomsSection.orCall}: {p2.display}</span>
              </a>

              <button
                type="button"
                onClick={toggleAudio}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium border transition-all cursor-pointer whitespace-nowrap ${
                  isPlayingAudio
                    ? 'bg-[#8A6542]/95 border-[#E4B88A] text-white shadow-md'
                    : 'bg-black/60 hover:bg-black/75 border-white/25 text-white'
                }`}
                aria-pressed={isPlayingAudio}
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4 text-[#E4B88A] shrink-0" />
                    <span>{meta.pause}</span>
                    <span className="inline-flex items-end gap-0.5 h-3.5 ml-0.5" aria-hidden="true">
                      <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-1 origin-bottom" />
                      <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-2 origin-bottom" />
                      <span className="w-0.5 h-full bg-[#E4B88A] rounded-full animate-soundbar-3 origin-bottom" />
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#E4B88A] shrink-0" />
                    <span>{meta.listen}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        {!heroVideoEnabled && (
          <div className="mt-5 flex items-center gap-2">
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
