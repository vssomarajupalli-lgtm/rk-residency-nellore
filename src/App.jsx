import { useState } from 'react'
import { translations } from './data/translations'
import TopTicker from './components/TopTicker'
import Header from './components/Header'
import Hero from './components/Hero'
import BenefitsStrip from './components/BenefitsStrip'
import RoomsSection from './components/RoomsSection'
import IdealStaySection from './components/IdealStaySection'
import AmenitiesSection from './components/AmenitiesSection'
import GallerySection from './components/GallerySection'
import FaqAndLocationSection from './components/FaqAndLocationSection'
import MobileStickyBar from './components/MobileStickyBar'

export default function App() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#221E1B] pb-20 md:pb-0">
      <TopTicker t={t} />
      <Header lang={lang} setLang={setLang} t={t} />
      <main className="flex-1">
        <Hero t={t} />
        <BenefitsStrip t={t} />
        <RoomsSection lang={lang} t={t} />
        <IdealStaySection t={t} />
        <AmenitiesSection t={t} />
        <GallerySection lang={lang} t={t} />
        <FaqAndLocationSection lang={lang} t={t} />
      </main>
      <footer className="bg-[#221E1B] text-[#D8CEC2] py-8 px-4 text-center text-xs sm:text-sm">
        <p className="font-medium text-white">© {new Date().getFullYear()} {t.footer.rights}</p>
        <p className="mt-1.5 text-[#B5AAA0]">{t.footer.directOnly}</p>
      </footer>
      <MobileStickyBar t={t} />
    </div>
  )
}
