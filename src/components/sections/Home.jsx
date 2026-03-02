import { motion } from "framer-motion";
import { Download, ArrowRight, Mail } from "lucide-react";

const Home = ({ data, onSectionChange }) => {
  if (!data) return null;

  const { personalInfo, sections } = data;
  const homeSection = sections.home.elements[0];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 border border-midnight-500 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 left-1/3 w-64 h-64 border border-midnight-500/50 rounded-full"
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 border-2 border-midnight-500/20 dark:border-midnight-400/20"
        style={{ transform: "rotate(45deg)" }}
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 right-16 w-12 h-12 bg-midnight-500/5 dark:bg-midnight-400/10 rounded-full"
      />
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 right-24 w-20 h-20 border border-midnight-500/10 dark:border-midnight-400/20 rounded-lg"
        style={{ transform: "rotate(30deg)" }}
      />

      <div className="max-w-7xl mx-auto section-padding py-16 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Profile Image - Mobile/Tablet only */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:hidden mb-8"
            >
              {personalInfo.profileImage ? (
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full blur-xl opacity-20" />
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="relative w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-900"
                  />
                </div>
              ) : (
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full blur-xl opacity-20" />
                  <div className="relative w-32 h-32 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-900">
                    <div className="text-white text-4xl font-light">
                      {personalInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Minimal accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-0.5 bg-gradient-to-r from-midnight-500 to-transparent dark:from-midnight-400"
            />

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 dark:text-white tracking-tight leading-tight"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-midnight-600 dark:text-midnight-400">
                  {personalInfo.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                  {personalInfo.affiliation}
                </p>
              </motion.div>
            </div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-4"
            >
              <p className="text-base md:text-lg font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {homeSection.welcomeMessage}
              </p>
            </motion.div>

            {/* Highlights */}
            {homeSection.highlights && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-3"
              >
                {homeSection.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1 h-1 bg-midnight-500 dark:bg-midnight-400 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm md:text-base font-light text-gray-700 dark:text-gray-300">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {homeSection.ctaButtons?.map((button, index) => {
                const isPrimary = button.type === "primary";
                const isContact = button.link === "#contact";

                return (
                  <motion.a
                    key={index}
                    href={button.link}
                    onClick={(e) => {
                      // Handle internal section navigation
                      if (isContact && onSectionChange) {
                        e.preventDefault();
                        onSectionChange("contact");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    target={
                      isPrimary || button.link.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    rel={
                      button.link.startsWith("http")
                        ? "noopener noreferrer"
                        : ""
                    }
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden rounded-full transition-all ${
                      isPrimary
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white"
                    }`}
                  >
                    <motion.span
                      className={`absolute inset-0 ${
                        isPrimary
                          ? "bg-midnight-600 dark:bg-midnight-400"
                          : "bg-gray-900 dark:bg-white"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative flex items-center gap-2 font-medium">
                      {isContact ? <Mail size={18} /> : <Download size={18} />}
                      {button.text}
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Large Profile/Visual Element (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative">
              {/* Animated ring around profile */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-8 border border-dashed border-midnight-500/20 dark:border-midnight-400/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-16 border border-dotted border-midnight-500/10 dark:border-midnight-400/10 rounded-full"
              />

              {/* Profile container */}
              <div className="relative">
                {personalInfo.profileImage ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full blur-3xl opacity-20" />
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="relative w-80 h-80 rounded-full object-cover shadow-2xl border-8 border-white dark:border-gray-900"
                    />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full blur-3xl opacity-20" />
                    <div className="relative w-80 h-80 bg-gradient-to-br from-midnight-500 to-midnight-700 rounded-full flex items-center justify-center shadow-2xl border-8 border-white dark:border-gray-900">
                      <div className="text-white text-8xl font-light">
                        {personalInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                  </>
                )}

                {/* Floating accent dots */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 right-8 w-4 h-4 bg-midnight-500 dark:bg-midnight-400 rounded-full shadow-lg"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 left-8 w-3 h-3 bg-midnight-600 dark:bg-midnight-500 rounded-full shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
