import { useState, useEffect } from 'react';

export const scrollToSection = (sectionId, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const getActiveSection = (sectionIds, offset = 100) => {
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const element = document.getElementById(sectionIds[i]);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom >= 0) {
        return sectionIds[i];
      }
    }
  }
  return sectionIds[0];
};

export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getActiveSection(sectionIds, offset);
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};