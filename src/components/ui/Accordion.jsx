import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from './Card';

const AccordionItem = ({ 
  title, 
  children, 
  isOpen, 
  onToggle, 
  subtitle = null, 
  badge = null,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card hover={false} animation={false} className="overflow-hidden">
        <button
          onClick={onToggle}
          className="w-full text-left p-0 bg-transparent border-none focus:outline-none"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                {badge && (
                  <span className="px-2.5 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="text-gray-400 dark:text-gray-500 transition-transform duration-200">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

const Accordion = ({ 
  items, 
  allowMultiple = false, 
  defaultOpen = null,
  className = '' 
}) => {
  const [openItems, setOpenItems] = useState(
    defaultOpen ? (Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : []
  );

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          badge={item.badge}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
          delay={index * 0.1}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;