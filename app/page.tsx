import Hero from "@/components/landing/Hero"
import HowItWorks from "@/components/landing/HowItWorks"
import Navbar from "@/components/landing/Navbar"
import Problem from "@/components/landing/Problem"


const page = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Problem/>
      <HowItWorks/>
    </main>
  )
}

export default page