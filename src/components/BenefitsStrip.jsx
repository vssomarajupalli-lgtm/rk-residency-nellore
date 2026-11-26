import { BadgeIndianRupee, Car, Building2, Clock } from 'lucide-react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const icons = [BadgeIndianRupee, Car, Building2, Clock]

export default function BenefitsStrip({ t }) {
  const ref = useRevealOnScroll()

  return (
    <section className="bg-[#EFEAE2] border-y border-[#E2D9CE]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.benefits.map((item, idx) => {
            const Icon = icons[idx] || BadgeIndianRupee
            return (
              <div key={item.title} className="reveal-on-scroll flex items-start gap-3.5" style={{ animationDelay: `${idx * 90}ms` }}>
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DDD4C8] flex items-center justify-center text-[#7C5C3E]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-[#221E1B]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#2c2219] font-medium mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
