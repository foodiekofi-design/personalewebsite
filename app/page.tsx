import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SkillsTicker from "./components/SkillsTicker";
import Work from "./components/Work";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SkillsTicker />
        <Work />
      </main>
      <Footer />
    </>
  );
}
