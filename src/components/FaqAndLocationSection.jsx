import { useState } from 'react'
import { ChevronDown, MapPin, Phone, Wallet, ExternalLink, Instagram, Facebook } from 'lucide-react'
import hotelData from '../data/hotelData.json'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import { assetUrl } from '../utils/assetUrl'

export default function FaqAndLocationSection({ lang, t }) {
  const [openIdx, setOpenIdx] = useState(0)
  const { address, addressTe, mapPinQuery, phoneLinks } = hotelData.hotel
  const { upiQrEnabled, upiQrImage, instagramUrl, facebookUrl } = hotelData.featureFlags
  const ref = useRevealOnScroll()

  const encodedQuery = encodeURIComponent(mapPinQuery)
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <div ref={ref}>
      {/* FAQ & Policies Section */}
      <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 reveal-on-scroll">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C5C3E] mb-2">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#221E1B]">
            {t.faq.title}
          </h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={item.q}
                className="reveal-on-scroll bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#221E1B]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7C5C3E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-[15px] sm:text-base font-medium text-[#2c2219] leading-relaxed border-t border-[#F3EFE8] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="location" className="py-16 sm:py-24 bg-[#EFEAE2] border-t border-[#E2D9CE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 reveal-on-scroll">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7C5C3E] mb-2">
              {t.location.eyebrow}
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#221E1B]">
              {t.location.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Details Card */}
            <div className="reveal-on-scroll lg:col-span-5 bg-white rounded-2xl border border-[#E6DFD5] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C5C3E] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t.location.addressLabel}</span>
                  </div>
                  <p className="text-base font-medium text-[#2c2219] leading-relaxed">
                    {lang === 'te' ? addressTe : address}
                  </p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#7C5C3E] hover:underline"
                  >
                    <span>{t.location.openMaps}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="pt-5 border-t border-[#EFEAE2]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C5C3E] mb-3">
                    <Phone className="w-4 h-4" />
                    <span>{t.location.phonesLabel}</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {phoneLinks.map((p) => (
                      <a
                        key={p.tel}
                        href={p.tel}
                        className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold text-[#221E1B] hover:text-[#7C5C3E] transition-colors"
                      >
                        <span className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#DDD4C8] flex items-center justify-center text-[#7C5C3E]">
                          <Phone className="w-4 h-4" />
                        </span>
                        <span>{p.display}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EFEAE2]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C5C3E] mb-2.5">
                    <Wallet className="w-4 h-4" />
                    <span>{t.location.paymentsLabel}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#DDD4C8] px-3.5 py-2 rounded-xl text-sm font-bold text-[#221E1B]">
                    <span>{t.location.cashUpiBadge}</span>
                  </div>
                  {upiQrEnabled && upiQrImage && (
                    <img
                      src={assetUrl(upiQrImage)}
                      alt="UPI Payment QR"
                      className="mt-3 w-36 h-36 rounded-xl border border-[#DDD4C8]"
                    />
                  )}
                </div>
              </div>

              {/* Social Links Provision */}
              <div className="pt-5 border-t border-[#EFEAE2] flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#6B6158]">
                  {instagramUrl || facebookUrl ? t.location.socialLabel : t.location.socialSoon}
                </span>
                <div className="flex items-center gap-2">
                  {instagramUrl ? (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="p-2 rounded-full bg-[#FAF8F5] border border-[#DDD4C8] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      title="Instagram coming soon"
                      className="p-2 rounded-full bg-[#FAF8F5] border border-[#E6DFD5] text-[#B5AAA0]"
                    >
                      <Instagram className="w-4 h-4" />
                    </span>
                  )}
                  {facebookUrl ? (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="p-2 rounded-full bg-[#FAF8F5] border border-[#DDD4C8] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  ) : (
                    <span
                      title="Facebook coming soon"
                      className="p-2 rounded-full bg-[#FAF8F5] border border-[#E6DFD5] text-[#B5AAA0]"
                    >
                      <Facebook className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="reveal-on-scroll lg:col-span-7 min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-[#DDD4C8] bg-white shadow-sm" style={{ animationDelay: '120ms' }}>
              <iframe
                title="RK Residency Nellore Google Map"
                src={mapsEmbedUrl}
                className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
