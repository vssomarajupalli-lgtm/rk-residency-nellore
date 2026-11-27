import {
  ArrowUpDown,
  Car,
  Snowflake,
  Wifi,
  Zap,
  ConciergeBell,
  Stethoscope,
  Shirt,
  Droplets,
  ShoppingBag,
} from 'lucide-react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const iconMap = {
  lift: ArrowUpDown,
  parking: Car,
  ac: Snowflake,
  wifi: Wifi,
  power: Zap,
  reception: ConciergeBell,
  doctor: Stethoscope,
  laundry: Shirt,
  bathroom: Droplets,
  delivery: ShoppingBag,
}

export default function AmenitiesSection({ t }) {
  const ref = useRevealOnScroll()

  return (
    <section id="amenities" className="py-16 sm:py-24 bg-[#F3E9DA] border-b border-[#E2D3BC]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14 reveal-on-scroll">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A6728] mb-2">
            {t.amenities.eyebrow}
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1A0E] leading-tight">
            {t.amenities.title}
          </h2>
          <p className="mt-3 text-base font-medium text-[#2c2219] leading-relaxed">
            {t.amenities.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {t.amenities.items.map((item, idx) => {
            const Icon = iconMap[item.key] || Wifi
            return (
              <div
                key={item.key}
                className="reveal-on-scroll bg-[#FFFDF8] rounded-2xl border border-[#E2D3BC] border-t-4 border-t-[#C89D54] p-5 flex flex-col items-start gap-3 shadow-[0_8px_24px_rgba(60,40,20,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(60,40,20,0.14)] transition-all duration-300"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-[#F3E2C6] text-[#8A5A1E] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-[#2B1A0E] leading-snug">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
