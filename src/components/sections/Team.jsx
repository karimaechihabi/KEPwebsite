import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail } from 'lucide-react';

const Team = ({ data }) => {
  if (!data) return null;

  const { sections } = data;
  const teamSection = sections.team;
  const [selectedFilter, setSelectedFilter] = useState('all');

  const currentMembers = teamSection.elements.filter(person => person.status === 'current');
  const alumni = teamSection.elements.filter(person => person.status === 'graduated');

  const filteredMembers = selectedFilter === 'all'
    ? currentMembers
    : currentMembers.filter(person =>
        person.role?.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <section id="team" className="min-h-screen section-padding bg-white dark:bg-gray-950">
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
            Team
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl">
            Brilliant researchers and students making our lab a vibrant hub of innovation and discovery
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2">
            {['all', 'postdoc', 'phd', 'master'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 text-sm font-light transition-all ${
                  selectedFilter === filter
                    ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Current Members */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8">
            Current Members
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((person, index) => (
              <motion.div
                key={`current-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                {/* Photo */}
                {person.photo && (
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800 mb-4 overflow-hidden">
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="space-y-2">
                  <h4 className="text-lg font-light text-gray-900 dark:text-white">
                    {person.name}
                  </h4>
                  <p className="text-sm font-light text-midnight-600 dark:text-midnight-400">
                    {person.role}
                  </p>
                  {person.researchAreas && (
                    <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                      {person.researchAreas.join(', ')}
                    </p>
                  )}

                  {/* Links */}
                  <div className="flex gap-4 pt-2">
                    {person.website && (
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                  </div>

                  {/* Stats */}
                  {(person.publications || person.awards) && (
                    <div className="flex gap-4 text-xs font-light text-gray-500 dark:text-gray-500 pt-2">
                      {person.publications && (
                        <span>{person.publications} publications</span>
                      )}
                      {person.awards && person.awards.length > 0 && (
                        <span>{person.awards.length} awards</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 font-light mb-4">
                No members match this filter
              </p>
              <button
                onClick={() => setSelectedFilter('all')}
                className="px-6 py-2 border border-gray-900 dark:border-white text-gray-900 dark:text-white font-light hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
              >
                Show All
              </button>
            </div>
          )}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8">
              Alumni
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((person, index) => (
                <motion.div
                  key={`alumni-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-l-2 border-gray-300 dark:border-gray-700 pl-4"
                >
                  <h4 className="text-base font-light text-gray-900 dark:text-white">
                    {person.name}
                  </h4>
                  <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                    {person.role}
                  </p>
                  {person.currentPosition && (
                    <p className="text-sm font-light text-gray-500 dark:text-gray-500 mt-1">
                      Now: {person.currentPosition}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
