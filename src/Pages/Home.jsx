import Navigation from "../Components/Navigation"
// import Footer from "../Components/Footer"
import { Link } from "react-router-dom"
import Beach from "../assets/beach.jpg"

function Home() {
  return (
    <div className="Home">
      <Navigation />
      <main>
        <div>
          <section className="mt-15 py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12 lg:px-20 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-2/3">
                <div>
                  <h3 className="bg-secondary p-1.5 sm:p-2 rounded-md inline font-medium text-black/80 text-xs sm:text-sm md:text-base bricolage-grotesque">Luxury Wellness Travel Club</h3>
                  <h1 className="bricolage-grotesque text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 sm:mt-8 md:mt-10 text-pretty leading-tight sm:leading-snug md:leading-relaxed lg:leading-20 font-semibold">Where Luxury Meets {" "}
                    <span className="text-secondary">Holistic Wellness</span></h1>

                  <p className="mt-2 text-black/80 text-sm sm:text-base md:text-lg lg:text-xl">A global travel and wellness club designed for high-achieving individuals who seek more than a getaway. We offer transformation through ocean cruises, elite travel, personalized coaching, and spiritual alignment.</p>
                  <div>
                    <Link className="flex justify-center md:inline-block mt-4 bg-secondary py-2 px-4 rounded-md text-black/80">Begin Your Transformation</Link>
                    <Link className="flex justify-center   md:inline-block mt-4 md:ml-4 bg-transparent border border-black py-2 px-4 rounded-md text-black/80">Explore Destinations</Link>
                  </div>

                  <div className="flex flex-col gap-10 sm:flex-row sm:gap-4 mt-15 md:mt-6">
                    <div>
                      <h3 className="font-medium text-sm md:text-lg text-black/80 text-center">500+</h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Members Transformed</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-sm md:text-lg text-black/80 text-center">25+</h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Luxury Destinations</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-sm md:text-lg text-black/80 text-center">98%</h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Satisfaction Rate</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-8 sm:mt-0">
                <img src={Beach} alt="Luxury Wellness Travel" className="rounded-lg shadow-lg w-full h-auto" />
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Home