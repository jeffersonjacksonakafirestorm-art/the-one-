import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TradingSection from '@/components/TradingSection'
import FitnessSection from '@/components/FitnessSection'
import LeadMagnet from '@/components/LeadMagnet'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TradingSection />
        <FitnessSection />
        <LeadMagnet />
      </main>
      <Footer />
    </>
  )
}
