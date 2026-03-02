import { motion } from 'framer-motion';
import Card from './Card';

const Timeline = ({ items, className = '' }) => {
  const getTypeIcon = (type) => {
    const iconClasses = "w-3 h-3 rounded-full";
    switch (type) {
      case 'editorial':
        return <div className={`${iconClasses} bg-primary-500`}></div>;
      case 'conference':
        return <div className={`${iconClasses} bg-green-500`}></div>;
      case 'advisory':
        return <div className={`${iconClasses} bg-purple-500`}></div>;
      case 'funding':
        return <div className={`${iconClasses} bg-orange-500`}></div>;
      default:
        return <div className={`${iconClasses} bg-gray-500`}></div>;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'editorial':
        return 'border-primary-500';
      case 'conference':
        return 'border-green-500';
      case 'advisory':
        return 'border-purple-500';
      case 'funding':
        return 'border-orange-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex items-start space-x-4"
        >
          {/* Timeline Line and Icon */}
          <div className="flex flex-col items-center">
            <div className={`p-2 border-2 ${getTypeColor(item.type)} bg-white dark:bg-gray-900 rounded-full flex items-center justify-center`}>
              {getTypeIcon(item.type)}
            </div>
            {index < items.length - 1 && (
              <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2"></div>
            )}
          </div>

          {/* Content */}
          <Card className="flex-1" hover={false} animation={false}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.role}
              </h3>
              <span className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1 md:mt-0">
                {item.period}
              </span>
            </div>
            <p className="text-primary-700 dark:text-primary-300 font-medium mb-2">
              {item.organization}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
            {item.type && (
              <div className="mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.type === 'editorial' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' :
                  item.type === 'conference' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  item.type === 'advisory' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                  item.type === 'funding' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;