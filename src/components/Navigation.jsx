import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navigation = ({
  personalInfo,
  sections = [],
  onSectionChange,
  currentSection,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show navigation after initial page load with animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const handleNavClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = sections.map((section, index) => ({
    name: section.name,
    id: section.id,
    number: String(index + 1).padStart(2, "0"),
    isActive: currentSection === section.id,
  }));

  return (
    <>
      {/* Desktop Navigation - Fixed top with glassmorphism */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavClick("home")}
            >
              <motion.div
                // animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-8 h-8 border-2 border-gray-900 dark:border-white rounded-full flex items-center justify-center"
              >
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="relative rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-900"
                />
              </motion.div>
              <span className="text-sm font-light tracking-wider uppercase text-gray-900 dark:text-white">
                {personalInfo.name}
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className="hidden lg:flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-5 py-2 text-sm font-light tracking-wide text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Number indicator */}
                  <span className="absolute -top-1 -right-1 text-[10px] text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.number}
                  </span>

                  {/* Active indicator */}
                  {item.isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-midnight-500 dark:via-midnight-400 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-2 text-gray-900 dark:text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-950 z-50 lg:hidden shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-gray-900 dark:border-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-midnight-500 dark:bg-midnight-400 rounded-full" />
                    </div>
                    <span className="text-xs font-light tracking-wider uppercase text-gray-600 dark:text-gray-400">
                      Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <motion.div
                    className="space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`block w-full text-left group relative overflow-hidden rounded-lg transition-all ${
                          item.isActive
                            ? "bg-gray-100 dark:bg-gray-800"
                            : "hover:bg-gray-50 dark:hover:bg-gray-900"
                        }`}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-light text-gray-400 dark:text-gray-600 min-w-[2rem]">
                              {item.number}
                            </span>
                            <span
                              className={`text-xl font-light ${
                                item.isActive
                                  ? "text-midnight-600 dark:text-midnight-400"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          {/* Active indicator */}
                          {item.isActive && (
                            <motion.div
                              layoutId="mobileActiveSection"
                              className="w-2 h-2 bg-midnight-500 dark:bg-midnight-400 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>

                        {/* Hover line */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-midnight-500 dark:via-midnight-400 to-transparent"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-600">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
                    <span className="font-light tracking-wider">
                      Minimalist Portfolio
                    </span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
