import { ServiceSection } from "../core/components/common/servicios/ServiceSection"
import { HeroSection } from "../core/layout/hero/HeroSection"
import { NavbarSection } from "../core/layout/navbar/NavbarSection"

export const HomePage = () => {
  return (
    <body className="bg-blue-950">
      <NavbarSection/>
      <HeroSection/>
      <ServiceSection />
    </body>
  )
}