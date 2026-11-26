import { Phone, MapPin } from 'lucide-react'
import hotelData from '../data/hotelData.json'

export default function MobileStickyBar({ t }) {
  const primaryPhone = hotelData.hotel.phoneLinks[0]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hotelData.hotel.mapPinQuery
  )}`

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#DDD4C8] px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={primaryPhone.tel}
          className="flex items-center justify-center gap-2 bg-[#7C5C3E] text-white text-base font-bold py-3.5 rounded-xl animate-pulse-soft-flat"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span>{primaryPhone.short}</span>
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-white border border-[#D4C9BC] text-[#221E1B] text-base font-semibold py-3.5 rounded-xl"
        >
          <MapPin className="w-4 h-4 text-[#7C5C3E] shrink-0" />
          <span>{t.mobileBar.directions}</span>
        </a>
      </div>
    </div>
  )
}
