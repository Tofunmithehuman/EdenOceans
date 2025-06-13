import Navigation from "../Components/Navigation"
import { Link } from "react-router-dom"
import EdenoceansVideo from "../assets/edenoceans.mp4"
import Beach from "../assets/beach.jpg"
import BeachOne from "../assets/beach01.jpg"
import BeachTwo from "../assets/beach02.jpg"
import Wellness from "../assets/wellness.jpeg"
import safari from "../assets/safari.jpg"
import Boat from "../assets/boat.jpeg"
import Tems from "../assets/tems.jpeg"
import ceoOne from "../assets/ceoOne.jpeg"
import ceoTwo from "../assets/ceoTwo.jpeg"
import Concierge from "../assets/Concierge.jpeg"
import ResortOne from "../assets/resort01.jpeg"
import ResortTwo from "../assets/resort02.jpg"
import ResortThree from "../assets/resort03.jpeg"
import ResortFour from "../assets/resort04.jpeg"
import ResortFive from "../assets/resort05.jpg"
import ResortSix from "../assets/resort06.jpeg"
import ResortSeven from "../assets/resort07.jpg"
import memberOne from "../assets/member01.jpg"
import memberTwo from "../assets/member02.jpg"
import memberThree from "../assets/member03.jpg"
import whoweare from "../assets/whoweare.jpg"
import vision from "../assets/vision.jpg"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"

function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  const images = [Beach, BeachOne, BeachTwo]
  const { scrollYProgress } = useScroll()
  const videoRef = useRef(null)
  const servicesRef = useRef(null)
  const galleryRef = useRef(null)
  const membershipRef = useRef(null)
  const contactRef = useRef(null)
  const isServicesInView = useInView(servicesRef, { once: false, margin: "-100px" })
  const isGalleryInView = useInView(galleryRef, { once: false, margin: "-100px" })
  const isMembershipInView = useInView(membershipRef, { once: false, margin: "-100px" })
  const isContactInView = useInView(contactRef, { once: false, margin: "-100px" })

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle user interaction for mobile autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true)
      if (videoRef.current && isMobile) {
        // Try to play video immediately on first interaction
        videoRef.current.play().catch(console.log)
      }
    }

    // Listen for multiple interaction types to catch user interaction as early as possible
    const events = ['touchstart', 'touchend', 'click', 'scroll', 'keydown']

    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [isMobile])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [images.length])

  // Video initialization with mobile optimization
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoLoaded(true)
      setIsVideoReady(true)

      // Attempt autoplay for both desktop and mobile
      if (!isMobile) {
        video.play().catch((error) => {
          console.log("Desktop autoplay failed:", error)
        })
      } else {
        // For mobile, try to play if user has already interacted
        if (userInteracted) {
          video.play().catch(console.log)
        }
      }
    }

    const handleLoadedData = () => {
      setVideoLoaded(true)
    }

    const handleError = () => {
      console.log("Video failed to load")
      setIsVideoReady(false)
      setVideoLoaded(false)
    }

    // Set video attributes for better mobile compatibility
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x5-playsinline', 'true')
    video.muted = true
    video.loop = true

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    // Load the video
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [isMobile, userInteracted])

  const zoomLevel = Math.min(1.2, 1 + scrollY * 0.0005)

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getYear = () => {
    return new Date().getFullYear()
  }

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
  }

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
      answer: "Our retreats and cruises are held quarterly in stunning destinations like the Maldives, Seychelles, and Bali. Members receive schedules upon joining.",
    },
    {
      question: "Faith Component",
      answer: "Our faith-based empowerment programs are optional and designed to support spiritual growth for those who seek it",
    }
  ]

  const people = [
    {
      name: 'Olasimbo Davison',
      role: 'Director of Travel & Lifestyle Management',
      imageUrl: ceoOne
    },
    {
      name: 'Nene Aderibigbe',
      role: 'Director of Home service and VIP Events',
      imageUrl: ceoTwo
    }
  ]

  return (
    <div className="Home">
      <Navigation />
      <main>
        <div>
          <section className="relative px-4 py-4 sm:py-6 md:py-8 sm:px-4 md:px-12 lg:px-20 max-w-screen-2xl mx-auto h-full min-h-screen flex items-center overflow-hidden">
            {/* Background Image/Video and Overlay Container */}
            <div className="absolute inset-0 h-full">
              <AnimatePresence>
                {/* Fallback Image - shows while video loads or if video fails */}
                <motion.div
                  key="image"
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out h-full ${isVideoReady && videoLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                  style={{
                    backgroundImage: `url(${BeachOne})`,
                    transform: `scale(${isMobile ? Math.min(zoomLevel, 1.05) : zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                />

                {/* Video Background */}
                <motion.video
                  ref={videoRef}
                  key="video"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoReady && videoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  poster={BeachOne}
                  style={{
                    transform: `scale(${isMobile ? Math.min(zoomLevel, 1.05) : zoomLevel})`,
                    transformOrigin: 'center center',
                    minHeight: '100%',
                    minWidth: '100%',
                    objectPosition: 'center center'
                  }}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >x
                  <source src={EdenoceansVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              </AnimatePresence>

              {/* Mobile Video Play Button (optional - shows if video doesn't autoplay) */}
              {isMobile && !userInteracted && videoLoaded && (
                <motion.button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-4 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
                  onClick={() => {
                    setUserInteracted(true)
                    if (videoRef.current) {
                      videoRef.current.play()
                    }
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 sm:bg-black/40 backdrop-blur-[0.5px] sm:backdrop-blur-[1px]" />
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
                    At EdenOceans, we believe that advanced wellness is not just a destination, but a journey of mind, body, and soul. Our curated experiences are tailored for special women from all walks of life who value physical, emotional, and spiritual wellness, exponential growth, social impact, personal effectiveness, luxury travel, and enhanced lifestyles
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
                      <button
                        className="text-center w-full bg-secondary cursor-pointer py-3 px-6 rounded-md text-primary block font-medium"
                        onClick={() => scrollToSection("about-section")}
                      >
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
                      <button
                        className="text-center w-full bg-transparent cursor-pointer border-2 border-white py-3 px-6 rounded-md text-white block font-medium hover:bg-white hover:text-primary transition-colors"
                        onClick={() => scrollToSection("gallery-section")}
                      >
                        Explore Destinations
                      </button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex justify-center flex-col gap-10 sm:flex-row sm:gap-8 mt-20 md:mt-10 bricolage-grotesque mb-4"
                    variants={statsVariants}
                  >
                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                      >
                        5+
                      </motion.h3>
                      <p className="text-base text-white/80">Continents</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                      >
                        5+
                      </motion.h3>
                      <p className="text-base text-white/80">Celebrity Networks</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                      <motion.h3
                        className="font-bold text-3xl text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                      >
                        50+
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
                        60+
                      </motion.h3>
                      <p className="text-base text-white/80">Privileged Access Partners</p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="about-section" className="md:px-4 py-0 lg:py-24 max-w-screen-xl mx-auto">
            {/* <div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl text-left text-primary font-semibold mb-2 md:mb-4 bricolage-grotesque"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Who we are
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-left text-primary/70 mb-8 max-w-2xl bricolage-grotesque text-pretty font-medium"
                variants={itemVariants}
              >
                “EdenOceans is an exclusive Celebrity Club established to accelerate physical, emotional and spiritual wellness, and stimulate self-discovery, personal growth, lifestyle transformation, social impact, and personal effectiveness.
                At EdenOceans, we offer our special members advanced wellness options including luxury retreats & personalized wellness services. We also provide elite travel arrangements, concierge services, access to celebrity red carpet events, and access to unique member deals.”

              </motion.p>


              <motion.h2
                className="text-3xl lg:text-4xl text-left text-primary font-semibold mb-2 bricolage-grotesque"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                Vision
              </motion.h2>


              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-left text-primary/70 mb-8 max-w-2xl bricolage-grotesque text-pretty font-medium"
                variants={itemVariants}
              >
                “To be the world's most exclusive integrated wellness club, empowering high-achieving individuals to experience
                holistic rejuvenation, relaxation, restoration and life style transformation at the finest luxury destinations across the globe”
              </motion.p>

            </div> */}

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <div className="flex flex-col md:flex-row items-center gap-6  max-w-screen-xl bg-secondary/30 m-auto md:mb-10">
                <div className="w-full">
                  <div className="px-6 py-4">
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-5 lucide lucide-lightbulb-icon lucide-lightbulb mb-2 text-primary"
                      variants={itemVariants}
                    >
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </motion.svg>                    <motion.h1
                      className="bricolage-grotesque text-2xl lg:text-3xl text-left text-primary font-semibold mb-3"
                      variants={titleVariants}
                    >
                      Who we are
                    </motion.h1>
                    <motion.p className="text-base text-black/80 font-medium text-pretty mb-4" variants={itemVariants}
                    >
                      EdenOceans is an exclusive Celebrity Club established to accelerate physical, emotional and spiritual wellness, and stimulate self-discovery, personal growth, lifestyle transformation, social impact, and personal effectiveness.
                      At EdenOceans, we offer our special members advanced wellness options including luxury retreats & personalized wellness services. We also provide elite travel arrangements, concierge services, access to celebrity red carpet events, and access to unique member deals.
                    </motion.p>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                      className="w-full sm:w-auto "
                    >
                      <button
                        className="text-center w-full bg-white cursor-pointer border-2 border-primary py-3 px-6 rounded-md text-primary  block font-medium hover:bg-white hover:text-primary transition-colors"
                        onClick={() => scrollToSection("membership-section")}
                      >
                        Explore Membership
                      </button>
                    </motion.div>
                  </div>
                </div>
                <div className="w-full">
                  <motion.img
                    src={whoweare}
                    alt="Image 1"
                    className="w-full h-auto md:min-h-[400px]"
                    variants={itemVariants}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <div className="flex flex-col-reverse md:flex-row items-center gap-6  max-w-screen-xl bg-secondary/30 m-auto mb-10">
                <div className="w-full">
                  <motion.img
                    src={vision}
                    alt="Image 1"
                    className="w-full h-auto md:min-h-[400px]"
                    variants={itemVariants}
                  />
                </div>
                <div className="w-full">
                  <div className="px-6 py-4">
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-5 lucide lucide-lightbulb-icon lucide-lightbulb mb-2 text-primary" variants={itemVariants}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></motion.svg>
                    <motion.h1
                      className="bricolage-grotesque text-2xl lg:text-3xl text-left text-primary font-semibold mb-3"
                      variants={titleVariants}
                    >
                      Vision
                    </motion.h1>
                    <motion.p className="text-base text-black/80 font-medium text-pretty mb-4" variants={itemVariants}
                    >
                      To be the world's most exclusive integrated wellness club, empowering high-achieving individuals to experience
                      holistic rejuvenation, relaxation, restoration and life style transformation at the finest luxury destinations across the globe.
                    </motion.p>

                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                      className="w-full sm:w-auto "
                    >
                      <button
                        className="text-center w-full bg-white cursor-pointer border-2 border-primary py-3 px-6 rounded-md text-primary  block font-medium hover:bg-white hover:text-primary transition-colors"
                        onClick={() => scrollToSection("membership-section")}
                      >
                        Explore Concierge
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>



            <div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-left text-primary font-semibold mb-3 bricolage-grotesque">Core Values</h1>

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
                          Red Carpet Event Access
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-50 md:h-45">
                          At EdenOceans we facilitate access to Celebrity red carpet events including award nights, musical shows, film premieres and international festivals. We also organize members’ red carpet events including Dinner & Dance events, music nights, theatrical performances, Black tie ballroom events and much more.</p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={Tems}
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
                          Advanced Wellness and Lifestyle Management
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center  h-50 md:h-45">
                          Experience the beauty and transformative power of our advanced wellness options including complete Home SPAs, specialist wellness evaluations, full makeover retreats, international telemedicine consultations, life coaching, and global wellness retreats.
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
                          Safari Retreats
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center  h-50 md:h-45 ">
                          Enjoy unique and captivating experiences in Kenya, Rwanda and Tanzania, combining
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
                          Ocean Cruises
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center  h-50 md:h-45 ">
                          Enjoy the best of private, adults-only 5-star cruises around the world including European cruises, Asian cruises visiting Singapore, South Korea, Thailand, Malaysia, and Japan, and Caribbean cruises to popular Caribbean destinations and private island resorts.
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
                          High-Value Concierge Services
                        </p>
                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center h-65 md:h-50 text-pretty">
                          EdenOceans offers personalized, added-value concierge services such as bridal shopping assistance in any country of your choice, event planning support in any country of your choice, airport protocol services, business and professional airport pickups and drop-offs in Nigeria, Europe, and other travel destinations, and international escort services for seniors or persons with disabilities.
                        </p>
                      </div>
                      <motion.img
                        className="w-full rounded-b-lg"
                        src={Concierge}
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
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortOne}
                        alt="Maldives Beach Scene"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Dubai</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortTwo}
                        alt="Dubai Beach View"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Barbados</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortThree}
                        alt="Bali Coastal Landscape"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Thailand</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortFour}
                        alt="Santorini Wellness Retreat"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Spain</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortFive}
                        alt="Kenya Safari Journey"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Nigeria</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 lg:col-span-1 row-span-1 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortSix}
                        alt="Caribbean Ocean Cruise"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Mauritius</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg shadow overflow-hidden relative"
                      variants={itemVariants}
                    >
                      <motion.img
                        className="w-full h-full object-cover"
                        src={ResortSeven}
                        alt="Paris Exclusive Event"
                        variants={galleryImageVariants}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-1/3 flex items-end">
                        <p className="text-white text-lg font-semibold p-4">Paris</p>
                      </div>
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
                    At EdenOceans  we welcome interested women of like minds  who love to network, and prioritize : personal growth, physical, emotional & spiritual wellness, social impact, purposeful  travel, and lifestyle transformation. Whatever your needs are, We have three membership tiers you can select from.
                  </motion.p>
                  <motion.div
                    className="mt-10 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                    variants={containerVariants}
                  >
                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${memberOne})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Royal Membership</h1>
                        <p className="text-white/90 text-sm h-50">
                          Royal Membership is designed for young women 21-49 who are ready to discover or enhance purposeful living,  and secure and build meaningful social and community connections to thrive and prosper, using their new strengths, gifts, skills and  talents. At EdenOceans our vision for Royal members is to stimulate self-discovery and improve skills in the area of show business, music, movie production, acting, performing arts and other non traditional career paths.                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => scrollToSection("contact-section")}
                          >
                            Apply Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${memberTwo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Premium Membership</h1>
                        <p className="text-white/90 text-sm h-50">
                          Premium membership is a best fit for women aged 35-50 who are mid career and keen to: embrace optimal health and wellness, launch & scale their businesses, or explore strategic decisions, relationships and personal development needs through upscale local & international retreats. Premium members can also build valuable new social connections and  partnerships through our exclusive red carpet events.                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => scrollToSection("contact-section")}
                          >
                            Apply Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg relative overflow-hidden"
                      variants={itemVariants}
                      style={{ backgroundImage: `url(${memberThree})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                      <div className="relative p-6 text-white">
                        <h1 className="text-xl font-semibold mb-2 bricolage-grotesque text-secondary">Elite Membership</h1>
                        <p className="text-white/90 text-sm h-50">
                          Elite Membership is the best choice for you if you are 40 years or older, at the peak of your career, or expanding your business,  but seeking a more meaningful lifestyle, new  networking opportunities, optimal wellness, exciting travel retreats, social or community impact, or an advanced leadership role.                        </p>
                        <div className="mt-4 flex justify-center">
                          <motion.button
                            className="bg-secondary text-primary font-medium py-2 px-4 rounded-lg w-full cursor-pointer"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => scrollToSection("contact-section")}
                          >
                            Apply Now
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
                    Meet our Directors and team
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
                          <p className="text-sm/6 font-semibold text-primary">{person.role}</p>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          <section id="contact-section" className="contact-section" ref={contactRef}>
            <motion.div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8" variants={containerVariants}>
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                  className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                  }}
                ></div>
              </div>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl bricolage-grotesque">Contact Us</h2>
                <p className="mt-2 text-lg/8 text-gray-600 bricolage-grotesque">Get in touch with us, we’d love to hear from you!</p>
              </div>
              <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">First name</label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">Last name</label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="Country" className="block text-sm/6 font-semibold text-gray-900">Country</label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="Country"
                        id="Country"
                        autoComplete="organization"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">Email</label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">Phone number</label>
                    <div className="mt-2.5">
                      <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-primary">
                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            aria-label="Country"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                          >
                            <option>US</option>
                            <option>CA</option>
                            <option>EU</option>
                            <option>UK</option>
                            <option>NG</option>
                            <option>GH</option>
                            <option>KE</option>
                            <option>ZA</option>
                            <option>Other</option>
                          </select>
                          <svg
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">Message</label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows="4"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary"
                      ></textarea>
                    </div>
                  </div>

                </div>
                <div className="mt-10">
                  <button
                    type="reset"
                    className="block w-full cursor-pointer rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Let's talk
                  </button>
                </div>
              </form>
            </motion.div>
          </section>




          <section id="footer-section" className="pt-16">
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
                        Socials
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