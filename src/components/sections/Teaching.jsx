import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, GraduationCap } from 'lucide-react';

const Teaching = ({ data, sectionTitle = "Teaching" }) => {
  if (!data) return null;

  const { sections } = data;
  // Check for teaching, skills, or education data
  const teachingSection = sections.teaching || sections.skills || sections.education;

  if (!teachingSection) return null;
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="teaching" className="min-h-screen section-padding bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="h-0.5 w-16 bg-midnight-500 dark:bg-midnight-400 mb-6"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            {teachingSection.name || sectionTitle}
          </h2>
          {teachingSection.description && (
            <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl">
              {teachingSection.description}
            </p>
          )}
        </motion.div>

        {/* Teaching Philosophy */}
        {teachingSection.philosophy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 border-l-2 border-midnight-500 dark:border-midnight-400 pl-6"
          >
            <p className="text-lg md:text-xl font-light text-gray-700 dark:text-gray-300 italic leading-relaxed">
              {teachingSection.philosophy}
            </p>
          </motion.div>
        )}

        {/* Courses */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8">
            Courses
          </h3>

          <div className="space-y-4">
            {teachingSection.elements.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-gray-200 dark:border-gray-800"
              >
                {/* Course Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h4 className="text-lg font-light text-gray-900 dark:text-white">
                        {course.courseCode}: {course.courseName}
                      </h4>
                      <span className="text-sm font-light text-gray-500 dark:text-gray-500">
                        {course.semester}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 dark:text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                      expandedIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Course Details */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-200 dark:border-gray-800">
                        {/* Description */}
                        <p className="text-base font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Course Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          <div>
                            <div className="text-xs font-light text-gray-500 dark:text-gray-500 mb-1">
                              Level
                            </div>
                            <div className="text-sm font-light text-gray-900 dark:text-white">
                              {course.level}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-light text-gray-500 dark:text-gray-500 mb-1">
                              Enrollment
                            </div>
                            <div className="text-sm font-light text-gray-900 dark:text-white">
                              {course.enrollment}
                            </div>
                          </div>
                          {course.evaluations && (
                            <div>
                              <div className="text-xs font-light text-gray-500 dark:text-gray-500 mb-1">
                                Rating
                              </div>
                              <div className="text-sm font-light text-gray-900 dark:text-white">
                                {course.evaluations}
                              </div>
                            </div>
                          )}
                          {course.materials && course.materials.length > 0 && (
                            <div>
                              <div className="text-xs font-light text-gray-500 dark:text-gray-500 mb-1">
                                Materials
                              </div>
                              <div className="text-sm font-light text-gray-900 dark:text-white">
                                {course.materials.length} items
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supervision Statistics */}
        {teachingSection.supervision && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8">
              Student Supervision
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center py-6 border border-gray-200 dark:border-gray-800">
                <GraduationCap className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                  {teachingSection.supervision.currentPhD}
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Current PhD
                </div>
              </div>

              <div className="text-center py-6 border border-gray-200 dark:border-gray-800">
                <GraduationCap className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                  {teachingSection.supervision.graduatedPhD}
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Graduated PhD
                </div>
              </div>

              <div className="text-center py-6 border border-gray-200 dark:border-gray-800">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                  {teachingSection.supervision.currentMasters}
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Current Masters
                </div>
              </div>

              <div className="text-center py-6 border border-gray-200 dark:border-gray-800">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                  {teachingSection.supervision.graduatedMasters}
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Graduated Masters
                </div>
              </div>

              <div className="text-center py-6 border border-gray-200 dark:border-gray-800">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <div className="text-3xl font-light text-gray-900 dark:text-white mb-1">
                  {teachingSection.supervision.postdocs}
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Postdocs
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Teaching;
