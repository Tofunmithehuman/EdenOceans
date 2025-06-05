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

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5
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
          <section className=" mt-20 sm:mt-40 py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12 lg:px-20 max-w-screen-2xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ y }}
            >
              <div className="w-full md:w-2/3">
                <div>
                  <motion.h3
                    className="bg-secondary p-1.5 sm:p-2 rounded-md inline font-medium text-black/80 text-xs sm:text-sm md:text-base bricolage-grotesque"
                    variants={itemVariants}
                  >
                    Luxury Wellness Travel Club
                  </motion.h3>

                  <motion.h1
                    className="bricolage-grotesque text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 sm:mt-8 md:mt-10 text-pretty leading-tight sm:leading-snug md:leading-relaxed lg:leading-20 font-semibold"
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
                    className="mt-2 text-black/80 text-sm sm:text-base md:text-lg lg:text-xl"
                    variants={itemVariants}
                  >
                    A global travel and wellness club designed for high-achieving individuals who seek more than a getaway. We offer transformation through ocean cruises, elite travel, personalized coaching, and spiritual alignment.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col md:flex-row gap-4 my-4"
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full md:w-auto"
                    >
                      <Link className="text-center w-full bg-secondary py-2 px-4 rounded-md text-black/80 block">
                        Begin Your Transformation
                      </Link>
                    </motion.div>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                      className="w-full md:w-auto"
                    >
                      <Link className="text-center w-full bg-transparent border border-black py-2 px-4 rounded-md text-black/80 block">
                        Explore Destinations
                      </Link>
                    </motion.div>
                  </motion.div>

                  <div className="md:hidden block mt-4">
                    <motion.div
                      className="overflow-hidden rounded-lg shadow-lg"
                      variants={imageVariants}
                    >
                      <motion.img
                        src={Beach}
                        alt="Luxury Wellness Travel"
                        className="w-full h-auto transition-transform duration-300 ease-out"
                        style={{
                          transform: `scale(${zoomLevel})`
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex justify-center md:justify-start flex-col gap-10 sm:flex-row sm:gap-4 mt-15 md:mt-6 bricolage-grotesque"
                    variants={statsVariants}
                  >
                    <motion.div variants={itemVariants}>
                      <motion.h3
                        className="font-medium text-sm md:text-lg text-black/80 text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                      >
                        500+
                      </motion.h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Members Transformed</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.h3
                        className="font-medium text-sm md:text-lg text-black/80 text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                      >
                        25+
                      </motion.h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Luxury Destinations</p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <motion.h3
                        className="font-medium text-sm md:text-lg text-black/80 text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                      >
                        98%
                      </motion.h3>
                      <p className="md:text-sm text-xs text-black/60 text-center">Satisfaction Rate</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <div className="w-full md:w-1/3 mt-8 sm:mt-0 hidden md:flex">
                <motion.div
                  className="overflow-hidden rounded-lg shadow-lg w-full"
                  variants={imageVariants}
                >
                  <motion.img
                    src={Beach}
                    alt="Luxury Wellness Travel"
                    className="w-full md:h-96 lg:h-[28rem] xl:h-[32rem] object-cover transition-transform duration-300 ease-out"
                    style={{
                      transform: `scale(${zoomLevel})`
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
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