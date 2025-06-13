import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0); // Store scroll position

  // Handle scroll to toggle blurred background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock/unlock body scroll when mobile nav is open/closed
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      setScrollPosition(window.scrollY);
      // Prevent scrolling by setting overflow to hidden and fixing position
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`; // Preserve scroll position
    } else {
      // Restore scrolling and position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // Restore scroll position only when closing
      window.scrollTo(0, scrollPosition);
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen, scrollPosition]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Temporarily unlock scroll to allow smooth scrolling
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition); // Restore scroll position before scrolling
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  };

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonBackgroundVariants = {
    closed: {
      scale: 0,
      rotate: 0,
    },
    open: {
      scale: 1,
      rotate: 180,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="Navigation">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <header className="py-3 px-3 md:px-6 sm:py-4 flex justify-between items-center max-w-screen-2xl mx-auto">
          <nav>
            <a
              href="/"
              className="font-semibold flex flex-row-reverse gap-1 items-center text-xl text-white bricolage-grotesque"
            >
              <img src={Logo} width={90} alt="EdenOceans Logo" />
            </a>
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="nav-links flex space-x-5 text-sm text-white font-medium bricolage-grotesque">
              <li>
                <button
                  onClick={() => scrollToSection("about-section")}
                  className="hover:text-secondary cursor-pointer transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services-section")}
                  className="hover:text-secondary cursor-pointer transition-colors duration-200"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery-section")}
                  className="hover:text-secondary cursor-pointer transition-colors duration-200"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("membership-section")}
                  className="hover:text-secondary cursor-pointer transition-colors duration-200"
                >
                  Membership Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact-section")}
                  className="hover:text-secondary cursor-pointer transition-colors duration-200"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <nav className="md:hidden relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex items-center justify-center relative z-50 overflow-hidden"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <motion.div
                className="absolute inset-0 bg-secondary rounded-full"
                variants={buttonBackgroundVariants}
                animate={isOpen ? "open" : "closed"}
              />

              <motion.div
                className="relative z-10"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-secondary"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M21 12H9" />
                    <path d="M21 18H7" />
                    <path d="M21 6H3" />
                  </motion.svg>
                )}
              </motion.div>
            </motion.button>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 bricolage-grotesque"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsOpen(false)}
                  />

                  {/* Menu Panel */}
                  <motion.nav
                    className="fixed inset-y-0 right-0 bg-black/30 backdrop-blur-sm flex flex-col pl-10 pr-6 justify-center text-white space-y-8 text-2xl z-40 w-[100%] shadow-2xl"
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="space-y-8 bricolage-grotesque"
                    >
                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection("about-section")}
                        className="text-left block hover:text-amber-300 transition-colors duration-200"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        About Us
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection("services-section")}
                        className="block hover:text-amber-300 transition-colors duration-200"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Services
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection("gallery-section")}
                        className="block hover:text-amber-300 transition-colors duration-200"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Gallery
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection("membership-section")}
                        className="block hover:text-amber-300 transition-colors duration-200"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Membership Tiers
                      </motion.button>

                      <motion.button
                        variants={itemVariants}
                        onClick={() => scrollToSection("contact-section")}
                        className="block hover:text-amber-300 transition-colors duration-200"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contact Us
                      </motion.button>
                    </motion.div>
                  </motion.nav>
                </>
              )}
            </AnimatePresence>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default Navigation;