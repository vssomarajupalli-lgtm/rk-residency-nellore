import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import hotelData from '../data/hotelData.json'

export default function Header({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const primaryPhone = hotelData.hotel.phoneLinks[0]

  const navItems = [
    { href: '#rooms', label: t.nav.rooms },
    { href: '#ideal-stay', label: t.nav.idealStay },
    { href: '#amenities', label: t.nav.amenities },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#faq', label: t.nav.faq },
    { href: '#location', label: t.nav.location },
  ]

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#FDF8EE] via-[#FAF3E5] to-[#FDF8EE] backdrop-blur-md border-b-2 border-[#C89D54]/45 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 lg:gap-4">
        {/* Brand: 3D Monogram Crest + 3D Embossed Metallic Title */}
        <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <span
            aria-hidden="true"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-b from-[#3A291C] to-[#1E140D] border-2 border-[#C89D54] shadow-[0_3px_0_#7A5B36,0_6px_14px_rgba(45,33,24,0.28)] flex items-center justify-center font-serif-display text-base sm:text-lg font-bold tracking-wider text-[#F7E7CE] shrink-0 group-hover:brightness-110 transition-all"
          >
            RK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif-display text-2xl md:text-3xl font-bold tracking-tight text-[#2B1C10] [text-shadow:0_1px_0_#D8B26E,0_2px_0_#9B7036,0_4px_8px_rgba(43,28,16,0.22)] whitespace-nowrap">
              {hotelData.hotel.name}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#7A5B36] font-semibold whitespace-nowrap">
              {lang === 'te'
                ? hotelData.hotel.taglineTe
                : lang === 'hi'
                  ? hotelData.hotel.taglineHi
                  : hotelData.hotel.tagline}
            </span>
          </span>
        </a>

        {/* Desktop Nav — Clean & Flat */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[15px] font-semibold text-[#3B2A1A]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#9C6F34] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions: Language Toggle + Call Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10">
          <div
            className="inline-flex items-center rounded-full border border-[#DDD4C8] bg-white p-0.5 text-[11px] sm:text-sm font-semibold shrink-0 touch-manipulation"
            role="group"
            aria-label="Language switcher"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 sm:px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap touch-manipulation ${
                lang === 'en'
                  ? 'bg-[#7C5C3E] text-white'
                  : 'text-[#5C534B] hover:text-[#221E1B]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('te')}
              className={`px-2 sm:px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap touch-manipulation ${
                lang === 'te'
                  ? 'bg-[#7C5C3E] text-white'
                  : 'text-[#5C534B] hover:text-[#221E1B]'
              }`}
            >
              తెలుగు
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2 sm:px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap touch-manipulation ${
                lang === 'hi'
                  ? 'bg-[#7C5C3E] text-white'
                  : 'text-[#5C534B] hover:text-[#221E1B]'
              }`}
            >
              हिंदी
            </button>
          </div>

          <a
            href={primaryPhone.tel}
            className="hidden sm:inline-flex items-center gap-2 bg-[#7C5C3E] hover:bg-[#664B32] text-white text-[15px] font-bold px-5 py-2.5 rounded-full shadow-md transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>{primaryPhone.display}</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4F4740] hover:bg-[#EFEAE2]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#E6DFD5] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm font-medium text-[#221E1B] hover:bg-[#EFEAE2]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={primaryPhone.tel}
            className="mt-2 flex items-center justify-center gap-2 w-full bg-[#7C5C3E] text-white text-sm font-semibold px-4 py-3 rounded-xl"
          >
            <Phone className="w-4 h-4" />
            <span>{t.nav.callToBook}: {primaryPhone.display}</span>
          </a>
        </div>
      )}
    </header>
  )
}
