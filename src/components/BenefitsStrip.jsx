import { BadgeIndianRupee, ShieldCheck, Car, Building2 } from 'lucide-react'

const icons = [BadgeIndianRupee, ShieldCheck, Car, Building2]

export default function BenefitsStrip({ t }) {
  return (
    <section className="bg-[#EFE5D6] border-y border-[#DECBB0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.benefits.map((item, idx) => {
            const Icon = icons[idx] || BadgeIndianRupee
            return (
              <div
                key={item.title}
                className="bg-gradient-to-br from-[#FFF9EE] to-[#F1DBB6] border-2 border-[#C89D54]/75 rounded-2xl p-4 shadow-[0_5px_0_#D8B784,0_10px_20px_rgba(43,28,16,0.10)] animate-benefit-breathe hover:[animation-play-state:paused] flex items-start gap-3.5"
                style={{ animationDelay: `${idx * 2}s` }}
              >
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#EED9B5] text-[#7A4F1D] flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-[#2B1A0E]">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-[#3B2A1A] font-medium mt-0.5 leading-snug">
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
