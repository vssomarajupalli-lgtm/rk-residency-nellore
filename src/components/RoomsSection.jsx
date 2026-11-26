import { useState } from 'react'
import { Phone, Maximize2, Check, Layers, Building2 } from 'lucide-react'
import hotelData from '../data/hotelData.json'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

function RoomCard({ room, lang, t, delay }) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [p1, p2] = hotelData.hotel.phoneLinks

  const name = lang === 'te' ? room.nameTe : room.nameEn
  const tariff = lang === 'te' ? room.tariffTe : room.tariffEn
  const dimensions = lang === 'te' ? room.dimensionsTe : room.dimensions
  const bedType = lang === 'te' ? room.bedTypeTe : room.bedTypeEn
  const desc = lang === 'te' ? room.descTe : room.descEn
  const highlights = lang === 'te' ? room.highlightsTe : room.highlightsEn

  return (
    <div
      className="reveal-on-scroll bg-white rounded-2xl border border-[#E6DFD5] border-t-4 border-t-[#9c7a4c] overflow-hidden shadow-[0_10px_28px_rgba(60,40,20,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(60,40,20,0.14)] transition-all duration-300 flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Main Image with smooth hover zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2] group">
        <img
          src={room.images[selectedImg]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3.5 left-3.5 bg-[#221E1B]/85 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
          {bedType}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {room.images.length > 1 && (
        <div className="flex gap-2 px-6 pt-4">
          {room.images.map((imgSrc, idx) => (
            <button
              key={imgSrc}
              type="button"
              onClick={() => setSelectedImg(idx)}
              className={`relative w-16 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === selectedImg
                  ? 'border-[#7C5C3E] ring-1 ring-[#7C5C3E]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={imgSrc} alt={`${name} view ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          <h3 className="font-serif-display text-3xl sm:text-[34px] font-bold text-[#221E1B]">
            {name}
          </h3>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF5EE] border border-[#DFC9AA] text-[#6B4A2B] text-lg md:text-xl font-extrabold shadow-[0_3px_0_#D4BC9A]">
            {tariff}
          </span>
        </div>

        {/* Floor Plan Dimensions */}
        <div className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2c2219] bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg px-3.5 py-2.5 mb-4">
          <Maximize2 className="w-4 h-4 text-[#7C5C3E] shrink-0" />
          <span>
            <strong className="text-[#221E1B]">{t.roomsSection.dimensionsLabel}:</strong> {dimensions}
          </span>
        </div>

        <p className="text-[15px] sm:text-base font-medium text-[#2c2219] leading-relaxed mb-5">
          {desc}
        </p>

        {/* Highlights */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[15px] font-medium text-[#2c2219]">
              <Check className="w-4 h-4 text-[#7C5C3E] shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Call Buttons */}
        <div className="mt-auto pt-4 border-t border-[#EFEAE2] flex flex-wrap items-center gap-3">
          <a
            href={p1.tel}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 bg-[#8A6542] text-white text-lg md:text-xl font-bold px-6 py-3.5 rounded-full shadow-[0_5px_0_#5c432c] active:translate-y-0.5 hover:brightness-110 transition-all whitespace-nowrap"
          >
            <Phone className="w-5 h-5 shrink-0" />
            <span>{p1.display}</span>
          </a>
          <a
            href={p2.tel}
            className="inline-flex items-center justify-center gap-1.5 border border-[#D4C9BC] hover:border-[#7C5C3E] text-[#221E1B] text-sm font-semibold px-4 py-3.5 rounded-full transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#7C5C3E] shrink-0" />
            <span>{p2.short}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function RoomsSection({ lang, t }) {
  const [activeFloor, setActiveFloor] = useState(0)
  const ref = useRevealOnScroll()

  return (
    <section id="rooms" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
      {/* Interactive 5-Floor Building Highlights Strip */}
      <div className="mb-14 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
          <div className="reveal-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C5C3E] mb-1">
              {t.floorPreview.eyebrow}
            </p>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#221E1B]">
              {t.floorPreview.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.floorPreview.levels.map((lvl, idx) => {
            const Icon = idx === 0 ? Layers : Building2
            const isActive = activeFloor === idx
            return (
              <button
                key={lvl.badge}
                type="button"
                onClick={() => setActiveFloor(idx)}
                className={`reveal-on-scroll text-left rounded-2xl p-5 sm:p-6 border border-t-4 transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                  isActive
                    ? 'bg-white border-[#DFC9AA] border-t-[#9c7a4c] shadow-[0_16px_34px_rgba(60,40,20,0.12)] -translate-y-1'
                    : 'bg-[#F6F1EA] border-[#E6DFD5] border-t-[#B89D7A] hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_30px_rgba(60,40,20,0.10)]'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#DDD4C8] flex items-center justify-center text-[#7C5C3E] shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EFE6D8] text-[#6B4A2B] mb-1.5">
                    {lvl.badge}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#221E1B]">
                    {lvl.title}
                  </h3>
                  <p className="text-[15px] text-[#2c2219] font-medium mt-1">
                    {lvl.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Rooms Header */}
      <div className="max-w-2xl mb-10 sm:mb-12 reveal-on-scroll">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C5C3E] mb-2">
          {t.roomsSection.eyebrow}
        </p>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#221E1B] leading-tight">
          {t.roomsSection.title}
        </h2>
        <p className="mt-3 text-base font-medium text-[#2c2219] leading-relaxed">
          {t.roomsSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {hotelData.rooms.map((room, idx) => (
          <RoomCard key={room.id} room={room} lang={lang} t={t} delay={idx * 120} />
        ))}
      </div>
    </section>
  )
}
