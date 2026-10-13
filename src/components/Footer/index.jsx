import FooterTopSection from "@/components/Footer/components/FooterTopSection";
import CalculatorSection from "@/components/Footer/components/CalculatorSection";
import FooterTabs from "@/components/Footer/components/FooterLinksTabs";
import FooterAbout from "@/components/Footer/components/FooterBottom";

const Footer = () => {
  return (
    <footer className="w-full bg-primary-100 px-10 py-12 md:px-20 md:py-16">
      <FooterTopSection />
    </footer>
  );
};

export default Footer;
