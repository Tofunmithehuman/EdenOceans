import Navigation from "../Components/Navigation"
import { Link } from "react-router-dom"
import Beach from "../assets/beach.jpg"
import BeachOne from "../assets/beach01.jpg"
import BeachTwo from "../assets/beach02.jpg"
import Wellness from "../assets/wellness.jpg"
import safari from "../assets/safari.jpg"
import Boat from "../assets/boat.jpg"
import Club from "../assets/club.jpg"
import ResortOne from "../assets/resort01.jpg"
import ResortTwo from "../assets/resort02.jpg"
import ResortThree from "../assets/resort03.jpg"
import ResortFour from "../assets/resort04.jpg"
import ResortFive from "../assets/resort05.jpg"
import ResortSix from "../assets/resort06.jpg"
import ResortSeven from "../assets/resort07.jpg"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const images = [Beach, BeachOne, BeachTwo]
  const { scrollYProgress } = useScroll()
  const servicesRef = useRef(null)
  const galleryRef = useRef(null)
  const membershipRef = useRef(null)
  const contactRef = useRef(null)
  const isServicesInView = useInView(servicesRef, { once: false, margin: "-100px" })
  const isGalleryInView = useInView(galleryRef, { once: false, margin: "-100px" })
  const isMembershipInView = useInView(membershipRef, { once: false, margin: "-100px" })
  const isContactInView = useInView(contactRef, { once: false, margin: "-100px" })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [images.length])

  const zoomLevel = Math.min(1.2, 1 + scrollY * 0.0005)

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        ease: [0.6, -0.05, 0.01, 0.99]
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

  const imageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const serviceImageVariants = {
    hidden: { scale: 1, opacity: 0.8 },
    visible: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const galleryImageVariants = {
    hidden: { scale: 1, opacity: 0.8 },
    visible: {
      scale: 1.05,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };



  const Faqs = [
    {
      question: "Purpose",
      answer: "To address common questions about EdenOceans, ensuring clarity for prospective members, and to provide a comprehensive understanding of our offerings and values.",
      defaultChecked: true,
    },
    {
      question: "Eligibility",
      answer: "EdenOceans is for high achieving individuals seeking holistic wellness. We welcome applications from women and men globally.",
    },
    {
      question: "Retreat Schedule",
      answer: "Our retreats and cruises are held quarterly in stunning destinations like the Maldives, Seychelles, and Bali.Members receive schedules upon joining.",
    },
    {
      question: "Faith Component",
      answer: "“Our faith based empowerment programs are optional and designed to support spiritual growth for those who seek it",
    }
  ];

  const people = [
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Leslie Alexander',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    // More people...
  ]


  return (
    <div className="Home">
      <Navigation />
      <main>
        <div>
          <section className="relative px-4 py-4 sm:py-6 md:py-8 sm:px-4 md:px-12 lg:px-20 max-w-screen-2xl mx-auto h-full min-h-screen flex items-center overflow-hidden">
            {/* Background Image and Overlay Container */}
            <div className="absolute inset-0 h-full">
              <AnimatePresence>
                <motion.div
                  key={currentImage}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out h-full"
                  style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/70 sm:bg-black/80 backdrop-blur-[0.5px] sm:backdrop-blur-[1px]" />
            </div>

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
                    className="bricolage-grotesque text-left sm:text-center text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-6 sm:mt-8 md:mt-10 text-pretty leading-tight sm:leading-snug md:leading-relaxed lg:leading-20 font-semibold text-white"
                    variants={titleVariants}
                  >
                    Signature wellness {" "}
                    <motion.span
                      className="text-secondary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      Reimagined for you
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="mt-2 text-white/90 text-left sm:text-center text-sm sm:text-base md:text-lg lg:text-xl text-pretty font-medium max-w-3xl mx-auto"
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
                      <button className="text-center w-full bg-secondary cursor-pointer py-3 px-6 rounded-md text-primary block font-medium"
                        onClick={() => scrollToSection("about-section")}>
                        Begin Your Transformation
                      </button>
                    </motion.div>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                      className="w-full sm:w-auto"
                    >
                      <button className="text-center w-full bg-transparent border-2 border-white py-3 px-6 rounded-md text-white block font-medium hover:bg-white hover:text-primary transition-colors"
                        onClick={() => scrollToSection("gallery-section")}>
                        Explore Destinations
                      </button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-center flex-col gap-10 sm:flex-row sm:gap-8 mt-20 md:mt-10 bricolage-grotesque"
                    variants={statsVariants}
                  >
                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                      >
                        500+
                      </motion.h3>
                      <p className="text-base text-white/80">Members Transformed</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                      >
                        25+
                      </motion.h3>
                      <p className="text-base text-white/80">Luxury Destinations</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                      >
                        98%
                      </motion.h3>
                      <p className="text-base text-white/80">Satisfaction Rate</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="about-section" className="px-4 py-20 md:py-20 lg:py-24 max-w-screen-xl mx-auto">
            <div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl text-left text-primary font-semibold mb-3 md:mb-6 bricolage-grotesque"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                About Us
              </motion.h2>

              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl text-left text-secondary font-semibold mb-2 bricolage-grotesque"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Who We Are
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-left text-primary/70 mb-8 max-w-2xl bricolage-grotesque text-pretty font-medium"
                variants={itemVariants}
              >
                “EdenOceans is where luxury meets holistic wellness. We are a global travel and
                wellness club designed for high-achieving women and men who seek more than a getaway we
                offer transformation. Through ocean cruises, riverboat cruises, elite travel, personalized
                coaching, and spiritual alignment, we guide our members toward vitality, joy, and meaningful
                connection in destinations like Phuket, Seychelles, and beyond.”
              </motion.p>
            </div>

            <div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-left text-secondary font-semibold mb-3 bricolage-grotesque">Core Values</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-secondary/30 p-6 rounded-lg border-2 border-slate-100">
                    <h1 className="text-lg font-semibold flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-plus-icon lucide-house-plus"><path d="M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354" /><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M15 6h6" /><path d="M18 3v6" /></svg>Intentional Living</h1>
                    <p className="text-base text-black/80 font-medium text-pretty">We believe in living with purpose, presence, and mindfulness.
                      Every experience we curate empowers our members to align their inner wellbeing with their
                      outer lifestyle.</p>
                  </div>

                  <div className="bg-secondary/30 p-6 rounded-lg border-2 border-slate-100">
                    <h1 className="text-lg font-semibold flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plane-takeoff-icon lucide-plane-takeoff"><path d="M2 22h20" /><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" /></svg>Transformational Travel</h1>
                    <p className="text-base text-black/80 font-medium text-pretty">We view travel not as escape, but as elevation, gateway to
                      healing, self-discovery, and renewal in the most inspiring places on Earth.</p>
                  </div>

                  <div className="bg-secondary/30 p-6 rounded-lg border-2 border-slate-100">
                    <h1 className="text-lg font-semibold flex items-center gap-2 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-heart-icon lucide-hand-heart"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" /><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 15 6 6" /><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" /></svg>Service Excellence</h1>
                    <p className="text-base text-black/80 font-medium text-pretty">We are uncompromising in our standards. From curated retreats
                      to concierge services, every detail is designed to deliver elegance, privacy, and lasting impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services-section" className="pt-16" ref={servicesRef}>
            <motion.div
              className="container mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isServicesInView ? "visible" : "hidden"}
            >
              <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-screen-2xl lg:px-8">
                  <motion.p
                    className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl bricolage-grotesque"
                    variants={titleVariants}
                  >
                    Services & Experience
                  </motion.p>

                  <motion.div
                    className="mt-10 p-6 grid gap-8 sm:mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 max-w-7xl mx-auto"
                    variants={containerVariants}
                  >
                    <motion.div
                      className="rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <div className="p-3">
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                          Ocean Cruises
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-30">
                          Luxurious cruises in destinations like the Maldives, and Fiji
                          Islands, offering wellness activities onboard and shore excursions to pristine beaches and
                          luxury resorts.
                        </p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={Boat}
                        alt="Boat Cruise"
                        variants={serviceImageVariants}
                      />
                    </motion.div>

                    <motion.div
                      className="rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <div className="p-3">
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                          Luxury Wellness Retreats
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-30">
                          Experience immersive experiences in beautiful destinations like Mauritius, Barbados, and Cape Verde, blending relaxation, adventure, and
                          healing at luxury resorts.
                        </p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={Wellness}
                        alt="Wellness Retreat"
                        variants={serviceImageVariants}
                      />
                    </motion.div>

                    <motion.div
                      className="rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <div className="p-3">
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                          Safari & Wellness Journeys
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-30">
                          Enjoy unique and captivating experiences in Kenya, Rawanda and Tanzania, combining
                          safaris with wellness retreats for a transformative and rejuvenating adventure.
                        </p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={safari}
                        alt="Safari & Wellness Journeys"
                        variants={serviceImageVariants}
                      />
                    </motion.div>

                    <motion.div
                      className="rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <div className="p-3">
                        <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                          Exclusive Events
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-30">
                          Book Clubs, Game Nights, Dance, Painting and Cooking Classes, and more,
                          fostering creativity and connection, often hosted at luxury resorts in destinations like Dubai.
                        </p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={Club}
                        alt="Exclusive Events"
                        variants={serviceImageVariants}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>


          <section id="gallery-section" ref={galleryRef}>
            <motion.div
              className="container mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isGalleryInView ? "visible" : "hidden"}
            >
              <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                  <motion.p
                    className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl bricolage-grotesque"
                    variants={titleVariants}
                  >
                    Gallery
                  </motion.p>
                  <motion.div
                    className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] max-w-7xl mx-auto"
                    variants={containerVariants}
                  >
                    <motion.div
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortOne}
                        alt="Beach Scene"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortTwo}
                        alt="Beach View"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortThree}
                        alt="Coastal Landscape"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortFour}
                        alt="Wellness Retreat"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortFive}
                        alt="Safari Journey"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortSix}
                        alt="Ocean Cruise"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <motion.div
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortSeven}
                        alt="Exclusive Event"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>


          <section id="membership-section" ref={membershipRef}>
            <motion.div
              className="container mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate={isMembershipInView ? "visible" : "hidden"}
            >
              <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                  <motion.p
                    className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-primary sm:text-5xl bricolage-grotesque"
                    variants={titleVariants}
                  >
                    Membership
                  </motion.p>
                  <motion.p
                    className="mt-6 max-w-2xl mx-auto text-center text-lg sm:text-xl md:text-2xl text-gray-600"
                    variants={itemVariants}
                  >
                    Join our exclusive community of high achieving individuals and experience the transformative power of luxury wellness travel.
                  </motion.p>
                  <motion.div
                    className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                    variants={containerVariants}
                  >
                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${ResortOne})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Royal Membership</h1>
                        <p className="text-white/90 text-sm">
                          Begin your journey with Eden Oceans through our Royal Membership, designed for individuals who are just starting to explore a world of wellness and lifestyle refinement. Enjoy curated experiences, exclusive access, and foundational privileges that open the door to something greater.
                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Join Royal
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${ResortTwo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Premium Membership</h1>
                        <p className="text-white/90 text-sm">
                          The Premium Membership is for those ready to embrace a richer journey. With access to immersive wellness escapes, premium experiences across Nigeria, and invitations to members-only empowerment events, you’ll step deeper into the Eden Oceans lifestyle.
                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Join Premium
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${ResortThree})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Elite Membership</h1>
                        <p className="text-white/90 text-sm">
                          Our Elite Membership is reserved for those who demand the best. Gain VIP access to international retreats, private yacht cruises, luxury spa escapes, and personalized wellness planning. This is your all-access pass to the most exclusive offerings Eden Oceans has to offer.
                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Join Elite
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>


          <section id="faq" className="">
            <motion.div
              className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-4xl font-semibold text-center text-primary mb-8 bricolage-grotesque"
                variants={titleVariants}
              >
                Frequently Asked Questions
              </motion.h2>

              <div className="max-w-3xl mx-auto">
                {Faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="mb-6 border-b border-gray-200 pb-4"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-secondary mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </section>


          <section>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white py-24 sm:py-32">
              <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-xl">
                  <motion.h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl"
                    variants={titleVariants}
                  >
                    Meet our directors and team
                  </motion.h2>
                  <motion.p className="mt-6 text-lg/8 text-gray-600"
                    variants={titleVariants}>
                    We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
                    best results for our clients.
                  </motion.p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                  {people.map((person) => (
                    <li key={person.name}>
                      <motion.div className="flex items-center gap-x-6" variants={titleVariants}>
                        <img alt="" src={person.imageUrl} className="size-16 rounded-full" />
                        <div>
                          <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                          <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>


          <section id="contact-section" className="pt-16" ref={contactRef}>
            <div className="Footer">
              <div className="bg-primary text-white">
                <div className="max-w-7xl mx-auto pt-16 pb-8 px-6 sm:px-10">
                  <motion.div
                    className="flex flex-col md:flex-row items-start gap-10 md:gap-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >

                    <motion.div variants={sectionVariants}>
                      <h1 className="bricolage-grotesque font-semibold text-2xl mb-5">
                       Contact
                      </h1>
                      <nav className="flex flex-col gap-3">
                        <motion.div variants={itemVariants}>
                          <a
                            href="https://instagram.com/edenoceans_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            Instagram
                          </a>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <a
                            href="https://linkedin.com/edenoceans_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            LinkedIn
                          </a>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <a
                            href="https://whatsapp.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            Whatsapp
                          </a>
                        </motion.div>
                      </nav>
                    </motion.div>
                    <motion.div variants={sectionVariants}>
                      <h1 className="bricolage-grotesque font-semibold text-2xl mb-5">
                        Explore
                      </h1>
                      <nav className="flex flex-col gap-3">
                        <motion.div variants={itemVariants}>
                          <Link
                            onClick={() => scrollToSection("about-section")}
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            About
                          </Link>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <Link
                            to="/skills"
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            Gallery
                          </Link>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <Link
                            to="/socials"
                            className="text-white hover:text-[#DDF48C] transition-colors duration-300"
                          >
                            Membership Teirs
                          </Link>
                        </motion.div>
                      </nav>
                    </motion.div>



                    <motion.div variants={sectionVariants}>
                      <h1 className="bricolage-grotesque font-semibold text-2xl mb-5">
                        Destinations
                      </h1>
                      <nav className="flex flex-col gap-3">
                        <motion.div variants={itemVariants}>
                          <p className="text-white">Maldives</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-white">Mauritiuss</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-white">Dubai</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-white">Bali</p>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <p className="text-white">More</p>
                        </motion.div>
                      </nav>
                    </motion.div>
                  </motion.div>

                  <div className="border-t border-secondary my-8"></div>

                  <p className="mb-4">
                    Mulliner Towers <br />
                    39 Alfred Rewane Road <br />
                    Ikoyi, Lagos, Nigeria <br />
                  </p>

                  <div className="pb-8">
                    <nav className="flex flex-col md:flex-row md:items-center gap-4">
                      <p className="text-sm text-white">
                        {getYear()} © EdenOceans
                      </p>
                      <a
                        href="mailto:  info@edenoceans.com"
                        className="text-sm text-[#E1E1E1] hover:text-white transition-colors duration-300"
                      >
                        info@edenoceans.com
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home