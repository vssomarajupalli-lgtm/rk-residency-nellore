import { Stethoscope, Briefcase, GraduationCap, Navigation } from 'lucide-react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const icons = [Stethoscope, Briefcase, GraduationCap, Navigation]

export default function IdealStaySection({ t }) {
  const ref = useRevealOnScroll()

  return (
    <section id="ideal-stay" className="py-16 sm:py-24 bg-[#FCF7EE] border-y border-[#E2D3BC]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14 reveal-on-scroll">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#F2DFBE] border border-[#C89D54]/65 text-[#7A4B16] text-xs font-bold tracking-[0.16em] uppercase mb-3">
            {t.idealStay.eyebrow}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A220F] leading-tight">
            {t.idealStay.title}
          </h2>
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#C89D54] to-[#7A5529] mt-3 mb-4" />
          <p className="text-base font-medium text-[#2c2219] leading-relaxed">
            {t.idealStay.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {t.idealStay.cards.map((card, idx) => {
            const Icon = icons[idx] || Stethoscope
            return (
              <div
                key={card.title}
                className="reveal-on-scroll h-full bg-[#F7EFE1] rounded-2xl border border-[#C89D54]/40 border-t-4 border-t-[#C89D54] p-6 shadow-[0_10px_28px_rgba(60,40,20,0.07)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(60,40,20,0.14)] transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${idx * 90}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-[#EED9B5] text-[#7A4F1D] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-[23px] xl:text-[25px] font-bold text-[#2B1A0E] mb-2.5 whitespace-nowrap truncate">
                  {card.title}
                </h3>
                <p className="text-[15px] font-medium text-[#2B1A0E]/90 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
