import About from "../components/landing-page/about";
import Footer from "../components/landing-page/footer";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";

export default function Home() {
  return (
    <div className="bg-content-body min-h-screen">
      <Header />
      <section
        className="py-2 md:py-12"
      >
        <Hero />
      </section>
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-8 md:py-12">
          <About />
        </section>
      </main>
      <Footer/>
    </div>
  );
}
