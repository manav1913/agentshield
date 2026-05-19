import CTASection from "@/components/landing/CTA"
import Features from "@/components/landing/Features"
import Footer from "@/components/landing/Footer"
import Hero from "@/components/landing/Hero"
import HowItWorks from "@/components/landing/HowItWorks"
import Navbar from "@/components/landing/Navbar"
import Pricing from "@/components/landing/Pricing"
import Problem from "@/components/landing/Problem"


const page = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Problem/>
      <HowItWorks/>
      <Features/>
      <Pricing/>
      <CTASection/>
      <Footer/>
    </main>
  )
}

export default page