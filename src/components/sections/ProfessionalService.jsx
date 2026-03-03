import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProfessionalService = ({ data, sectionTitle = "Professional Service" }) => {
  if (!data) return null;

  const { sections } = data;
  // Check for professionalService or experience data
  const serviceSection = sections.professionalService || sections.experience;

  if (!serviceSection) return null;

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'editorial':
        return 'border-midnight-500 dark:border-midnight-400';
      case 'conference':
        return 'border-gray-400 dark:border-gray-600';
      case 'advisory':
        return 'border-gray-500 dark:border-gray-500';
      case 'funding':
        return 'border-gray-600 dark:border-gray-400';
      default:
        return 'border-gray-400 dark:border-gray-600';
    }
  };

  return (
    <section id="professionalservice" className="min-h-screen section-padding bg-white dark:bg-gray-950">
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
            {serviceSection.name || sectionTitle}
          </h2>
          {serviceSection.description && (
            <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl">
              {serviceSection.description}
            </p>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden md:block"></div>

          <div className="space-y-12">
            {serviceSection.elements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-12"
              >
                {/* Dot indicator */}
                <div className={`absolute left-0 top-2 w-2 h-2 bg-gray-900 dark:bg-white rounded-full transform -translate-x-1 hidden md:block`}></div>

                <div className="space-y-2">
                  {/* Time period */}
                  <div className="text-sm font-light text-gray-500 dark:text-gray-500">
                    {item.period || item.year}
                  </div>

                  {/* Role/Title */}
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white">
                    {item.role || item.title}
                  </h3>

                  {/* Organization */}
                  <div className="text-base font-light text-midnight-600 dark:text-midnight-400">
                    {item.organization || item.venue}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-base font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl pt-2">
                      {item.description}
                    </p>
                  )}

                  {/* Links */}
                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 pt-2">
                      {item.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                        >
                          <ExternalLink size={13} />
                          <span>{link.name}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Category */}
                  {item.category && (
                    <div className="pt-2">
                      <span className={`inline-block text-xs font-light text-gray-600 dark:text-gray-400 border-l-2 ${getCategoryColor(item.category)} pl-2`}>
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalService;
