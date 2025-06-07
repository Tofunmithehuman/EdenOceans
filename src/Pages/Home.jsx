import Navigation from "../Components/Navigation"
// import Footer from "../Components/Footer"
import { Link } from "react-router-dom"
import Beach from "../assets/beach.jpg"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate zoom based on scroll position
  const zoomLevel = Math.min(1.2, 1 + scrollY * 0.0005)

  // Parallax effects - removed opacity transform
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2
      }
    }
  }

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <div className="Home">
      <Navigation />
      <main>
        <div>
          <section className="relative py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12 lg:px-20 max-w-screen-2xl mx-auto min-h-screen flex items-center">
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
              style={{
                backgroundImage: `url(${Beach})`,
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[0.5px]" />

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center text-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ y }}
            >
              <div className="w-full max-w-4xl mt-30">
                <div>
                  <motion.h1
                    className="bricolage-grotesque text-left md:text-center text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 sm:mt-8 md:mt-10 text-pretty leading-tight sm:leading-snug md:leading-relaxed lg:leading-20 font-semibold text-white"
                    variants={titleVariants}
                  >
                    Where Luxury Meets {" "}
                    <motion.span
                      className="text-secondary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      Holistic Wellness
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="mt-2 text-white/90 text-left md:text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-3xl mx-auto"
                    variants={itemVariants}
                  >
                    A global travel and wellness club designed for high achieving individuals who seek more than a getaway. We offer transformation through ocean cruises, elite travel, personalized coaching, and spiritual alignment.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 my-8"
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full sm:w-auto"
                    >
                      <Link className="text-center w-full bg-secondary py-3 px-6 rounded-md text-primary block font-medium">
                        Begin Your Transformation
                      </Link>
                    </motion.div>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                      className="w-full sm:w-auto"
                    >
                      <Link className="text-center w-full bg-transparent border-2 border-white py-3 px-6 rounded-md text-white block font-medium hover:bg-white hover:text-primary transition-colors">
                        Explore Destinations
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-center flex-col gap-10 sm:flex-row sm:gap-8 mt-10 bricolage-grotesque"
                    variants={statsVariants}
                  >
                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-2xl md:text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                      >
                        500+
                      </motion.h3>
                      <p className="text-sm md:text-base text-white/80">Members Transformed</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-2xl md:text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                      >
                        25+
                      </motion.h3>
                      <p className="text-sm md:text-base text-white/80">Luxury Destinations</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-2xl md:text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                      >
                        98%
                      </motion.h3>
                      <p className="text-sm md:text-base text-white/80">Satisfaction Rate</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Home