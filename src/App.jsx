import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Home from "./components/sections/Home";
import Research from "./components/sections/Research";
import ProfessionalService from "./components/sections/ProfessionalService";
import Teaching from "./components/sections/Teaching";
import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";
import Publications from "./components/sections/Publications";
import { usePortfolioData } from "./hooks/usePortfolioData";

const App = ({}) => {
  // Dev mode: Allow switching between portfolio types
  const isDev = false;
  const [portfolioFile, setPortfolioFile] = useState("portfolio-data.json");
  const [currentSection, setCurrentSection] = useState("home");

  const { data, loading, error } = usePortfolioData(portfolioFile);

  // Section ID to display name mapping
  const sectionDisplayNames = {
    home: "Home",
    research: "Research",
    professionalservice: "Professional Service",
    teaching: "Teaching",
    team: "Team",
    contact: "Contact",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    publications: "Research",
    education: "Education",
  };

  // Build sections array dynamically from portfolioConfig
  const enabledSections = data?.portfolioConfig?.enabledSections || [
    "home",
    "contact",
  ];
  const sections = enabledSections.map((id) => ({
    id,
    name: sectionDisplayNames[id] || id,
  }));

  // Reset to first section when portfolio file changes - MUST BE BEFORE RETURNS
  useEffect(() => {
    if (enabledSections && enabledSections.length > 0) {
      setCurrentSection(enabledSections[0]);
    }
  }, [portfolioFile]);

  // Debug logging
  console.log("=== Portfolio Debug ===");
  console.log("Portfolio File:", portfolioFile);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);
  console.log("Current Section:", currentSection);
  console.log("=====================");

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Error loading portfolio data: {error}</p>
        </div>
      </div>
    );
  }

  // If no data after loading, show message
  if (!data || !data.personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <p className="text-xl font-light text-gray-900 dark:text-white mb-2">
            No portfolio data available
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check console for errors
          </p>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            <p>Expected file: {portfolioFile}</p>
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
          </div>
        </div>
      </div>
    );
  }

  const handleSectionChange = (newSection) => {
    setCurrentSection(newSection);
  };

  // Simple fade animation variants
  const fadeVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Render section based on current section
  const renderSection = () => {
    // Check if section is enabled
    if (!enabledSections.includes(currentSection)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">
              Section not available
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This section is not enabled in the current portfolio
              configuration.
            </p>
          </div>
        </div>
      );
    }

    // Map section IDs to their data keys and components
    const sectionMap = {
      home: { component: Home, dataKey: null },
      research: { component: Research, dataKey: "research" },
      projects: { component: Research, dataKey: "projects" },
      publications: { component: Publications, dataKey: "publications" },
      professionalservice: {
        component: ProfessionalService,
        dataKey: "professionalService",
      },
      experience: { component: ProfessionalService, dataKey: "experience" },
      teaching: { component: Teaching, dataKey: "teaching" },
      skills: { component: Teaching, dataKey: "skills" },
      education: { component: Teaching, dataKey: "education" },
      team: { component: Team, dataKey: "team" },
      contact: { component: Contact, dataKey: null },
    };

    const sectionConfig = sectionMap[currentSection];

    if (!sectionConfig) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">
              {sections.find((s) => s.id === currentSection)?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Section coming soon...
            </p>
          </div>
        </div>
      );
    }

    const SectionComponent = sectionConfig.component;
    const dataKey = sectionConfig.dataKey;

    // For Home and Contact, pass full data
    if (!dataKey) {
      return (
        <SectionComponent
          data={data}
          sectionTitle={sectionDisplayNames[currentSection]}
          onSectionChange={handleSectionChange}
        />
      );
    }

    // For other sections, check if data exists and pass it with the section data
    const sectionData = data.sections?.[dataKey];
    if (!sectionData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-gray-900 dark:text-white">
              No data available
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The "{dataKey}" section has no content in the portfolio data.
            </p>
          </div>
        </div>
      );
    }

    // Pass data with the specific section mapped correctly
    const adaptedData = {
      ...data,
      sections: {
        ...data.sections,
        // Map the current section data to what the component expects
        research:
          dataKey === "projects"
            ? sectionData
            : data.sections?.research,
        publications:
          dataKey === "publications"
            ? sectionData
            : data.sections?.publications,
        professionalService:
          dataKey === "experience"
            ? sectionData
            : data.sections?.professionalService,
        teaching:
          dataKey === "skills" || dataKey === "education"
            ? sectionData
            : data.sections?.teaching,
        team: data.sections?.team,
      },
    };

    return (
      <SectionComponent
        data={adaptedData}
        sectionTitle={sectionDisplayNames[currentSection]}
      />
    );
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950">
      <Navigation
        personalInfo={data.personalInfo}
        sections={sections}
        onSectionChange={handleSectionChange}
        currentSection={currentSection}
      />

      {/* Simple fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={fadeVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Dev Mode: Portfolio Type Switcher */}
      {isDev && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gray-900 dark:bg-white border-2 border-gray-800 dark:border-gray-200 rounded-lg shadow-2xl p-4">
            <div className="text-xs font-light text-gray-400 dark:text-gray-600 mb-2 uppercase tracking-wider">
              Dev Mode - Portfolio Switcher
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setPortfolioFile("portfolio-data.json")}
                className={`w-full px-4 py-2 text-sm font-light transition-colors ${
                  portfolioFile === "portfolio-data.json"
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
                }`}
              >
                Professor
              </button>
              <button
                onClick={() => setPortfolioFile("research-engineer.json")}
                className={`w-full px-4 py-2 text-sm font-light transition-colors ${
                  portfolioFile === "research-engineer.json"
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
                }`}
              >
                Research Engineer
              </button>
              <button
                onClick={() => setPortfolioFile("phd-student.json")}
                className={`w-full px-4 py-2 text-sm font-light transition-colors ${
                  portfolioFile === "phd-student.json"
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900"
                }`}
              >
                PhD Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
