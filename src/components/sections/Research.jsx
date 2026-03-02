import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award } from 'lucide-react';

const Research = ({ data, sectionTitle = "Research" }) => {
  if (!data) return null;

  const { sections } = data;
  // Check for research, projects, or publications data
  const researchSection = sections.research || sections.projects || sections.publications;

  if (!researchSection) return null;
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Get unique tags and years for filtering
  const allTags = [...new Set(researchSection.elements.flatMap(item => item.tags || []))];
  const allYears = [...new Set(researchSection.elements.map(item => item.year))].sort().reverse();

  // Filter research items
  const filteredItems = researchSection.elements.filter(item => {
    const matchesTag = selectedFilter === 'all' || (item.tags && item.tags.includes(selectedFilter));
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    return matchesTag && matchesYear;
  });

  return (
    <section id="research" className="min-h-screen section-padding bg-white dark:bg-gray-950">
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
            {researchSection.name || sectionTitle}
          </h2>
          {researchSection.description && (
            <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl">
              {researchSection.description}
            </p>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          {/* Tag Filter */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 text-sm font-light transition-all ${
                  selectedFilter === 'all'
                    ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedFilter(tag)}
                  className={`px-4 py-2 text-sm font-light transition-all ${
                    selectedFilter === tag
                      ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-light focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
            >
              <option value="all">All Years</option>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Research Grid */}
        <div className="space-y-8">
          {filteredItems.map((item, index) => (
            <motion.article
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Year Badge */}
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 text-sm font-light text-gray-500 dark:text-gray-500">
                    <Calendar size={16} />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white group-hover:text-midnight-600 dark:group-hover:text-midnight-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Venue */}
                  {item.venue && (
                    <div className="flex items-center gap-2 text-sm font-light text-midnight-600 dark:text-midnight-400">
                      <Award size={16} />
                      <span>{item.venue}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-base font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags and Link */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    {/* Tags */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-light text-gray-500 dark:text-gray-500 border border-gray-300 dark:border-gray-700 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Link */}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <span>View Publication</span>
                        <ExternalLink
                          size={14}
                          className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light mb-6">
              No research items match the current filters
            </p>
            <button
              onClick={() => {
                setSelectedFilter('all');
                setSelectedYear('all');
              }}
              className="px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-light hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Research;
