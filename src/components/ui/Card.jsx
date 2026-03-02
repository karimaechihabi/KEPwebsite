import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  animation = true,
  delay = 0,
  ...props 
}) => {
  const baseClasses = "card p-6";
  const hoverClasses = hover ? "hover:scale-[1.02] cursor-pointer" : "";
  const finalClasses = `${baseClasses} ${hoverClasses} ${className}`;

  if (animation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: "-100px" }}
        className={finalClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={finalClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;