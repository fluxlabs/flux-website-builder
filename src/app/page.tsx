import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Pricing from "@/components/Pricing/Pricing";
import Portfolio from "@/components/Portfolio/Portfolio";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Pricing />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
