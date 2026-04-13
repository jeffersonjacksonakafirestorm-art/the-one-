import ProductCard from './ProductCard'

const FITNESS_URL = process.env.NEXT_PUBLIC_GUMROAD_FITNESS_URL

export default function FitnessSection() {
  return (
    <section id="fitness" className="bg-black py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-3">Fitness Programs</p>
          <h2 className="section-heading mb-4">ParkerFitness</h2>
          <p className="section-sub max-w-xl">
            Training consistently since I was 13. These programs are what I built and
            tested on myself over 4 years — straightforward, progressive, and
            designed to actually work for people with a real schedule.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
          <ProductCard
            title="ParkerFitness Training Program"
            description="A structured, progressive workout program built from 4 years of personal training. Covers compound lifts, accessory work, and weekly programming — adaptable to home or gym."
            price="See on Gumroad"
            features={[
              '12-week progressive structure',
              'Gym and home-friendly variations',
              'Compound lift technique guides',
              'Weekly progression system',
              'Nutrition basics included',
            ]}
            buyUrl={FITNESS_URL}
            badge="Available Now"
          />
          <ProductCard
            title="Cutting Program"
            description="A dedicated program focused on maintaining strength while losing body fat — the approach I use personally during a cut phase."
            price="See on Gumroad"
            features={[
              'Calorie and macro guidance',
              'Training adjustments for a deficit',
              'Cardio programming options',
              'Strength retention strategies',
              'Week-by-week check-in system',
            ]}
            comingSoon
          />
        </div>

      </div>
    </section>
  )
}
