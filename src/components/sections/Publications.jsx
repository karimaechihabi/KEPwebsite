import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, BookOpen, Presentation } from 'lucide-react';

const Publications = ({ data, sectionTitle = "Research" }) => {
  if (!data) return null;

  const { sections } = data;
  const pubSection = sections.publications;

  if (!pubSection || !pubSection.categories) return null;

  const categories = pubSection.categories;
  const categoryKeys = Object.keys(categories);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Flatten all items with their category key attached
  const allItems = categoryKeys.flatMap((key) =>
    (categories[key].items || []).map((item) => ({ ...item, _categoryKey: key }))
  );

  // All unique years across every category, sorted descending
  const allYears = [...new Set(allItems.map((item) => item.year))]
    .sort()
    .reverse();

  // Apply both filters
  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item._categoryKey === selectedCategory;
    const matchesYear =
      selectedYear === 'all' || item.year === selectedYear;
    return matchesCategory && matchesYear;
  });

  return (
    <section id="publications" className="min-h-screen section-padding bg-white dark:bg-gray-950">
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
            {pubSection.name || sectionTitle}
          </h2>
        </motion.div>

        {/* Filters — same style as Research section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          {/* Category filter buttons */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm font-light transition-all ${
                  selectedCategory === 'all'
                    ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 text-sm font-light transition-all ${
                    selectedCategory === key
                      ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                      : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {categories[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Year dropdown */}
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-light focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
            >
              <option value="all">All Years</option>
              {allYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Publication list */}
        <div className="space-y-8">
          {filteredItems.map((item, index) => (
            <motion.article
              key={`${item._categoryKey}-${index}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group border-b border-gray-200 dark:border-gray-800 pb-8 last:border-b-0"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Year */}
                <div className="flex-shrink-0 w-16 pt-1">
                  <span className="text-sm font-light text-gray-500 dark:text-gray-500">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-white group-hover:text-midnight-600 dark:group-hover:text-midnight-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Authors */}
                  {item.authors && (
                    <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                      {item.authors}
                    </p>
                  )}

                  {/* Venue */}
                  {item.venue && (
                    <p className="text-sm font-light text-midnight-600 dark:text-midnight-400 italic">
                      {item.venue}
                    </p>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    {item.pdf && (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <FileText size={14} />
                        <span>Paper</span>
                      </a>
                    )}
                    {item.doi && (
                      <a
                        href={item.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <ExternalLink size={14} />
                        <span>DOI</span>
                      </a>
                    )}
                    {item.slides && (
                      <a
                        href={item.slides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <Presentation size={14} />
                        <span>Slides</span>
                      </a>
                    )}
                    {item.summary && (
                      <a
                        href={item.summary}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <BookOpen size={14} />
                        <span>Summary</span>
                      </a>
                    )}
                    {item.poster && (
                      <a
                        href={item.poster}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors group/link"
                      >
                        <FileText size={14} />
                        <span>Poster</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light mb-6">
              No publications match the current filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
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

export default Publications;
