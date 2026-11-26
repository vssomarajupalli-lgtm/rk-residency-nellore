import hotelData from '../data/hotelData.json'

export default function TopTicker({ t }) {
  const items = t.ticker
  const primaryTel = hotelData.hotel.phoneLinks[0].tel

  return (
    <div className="relative z-50 w-full min-h-[40px] py-2 bg-[#2d2118] text-[#f7e7ce] text-sm md:text-base font-medium border-b border-[#463426] overflow-hidden select-none">
      <a
        href={primaryTel}
        className="block ticker-wrapper group cursor-pointer"
        aria-label="Direct booking highlights"
      >
        <div className="ticker-track flex items-center whitespace-nowrap">
          {[0, 1].map((dupIdx) => (
            <div key={dupIdx} className="flex items-center shrink-0">
              {items.map((text, idx) => (
                <span
                  key={`${dupIdx}-${idx}`}
                  className="inline-flex items-center tracking-wide px-5"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E4B88A] mr-3 shrink-0" />
                  <span>{text}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </a>
    </div>
  )
}
