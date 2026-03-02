import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

const Contact = ({ data }) => {
  if (!data) return null;

  const { contact } = data;

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: contact.social?.linkedin,
      icon: Linkedin
    },
    {
      name: 'Google Scholar',
      url: contact.social?.googleScholar,
      icon: GraduationCap
    },
    {
      name: 'GitHub',
      url: contact.social?.github,
      icon: Github
    },
    {
      name: 'Twitter',
      url: contact.social?.twitter,
      icon: Twitter
    },
    {
      name: 'ResearchGate',
      url: contact.social?.researchGate,
      icon: ExternalLink
    }
  ].filter(link => link.url);

  return (
    <section id="contact" className="min-h-screen section-padding bg-white dark:bg-gray-950">
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
            Contact
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-600 dark:text-gray-400 max-w-3xl">
            I welcome collaborations, research discussions, and inquiries from students and researchers
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500">
                <Mail size={20} />
                <span className="text-sm font-light">Email</span>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-xl md:text-2xl font-light text-gray-900 dark:text-white hover:text-midnight-600 dark:hover:text-midnight-400 transition-colors"
              >
                {contact.email}
              </a>
            </div>

            {/* Office */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-500">
                <MapPin size={20} />
                <span className="text-sm font-light">Office</span>
              </div>
              <p className="text-base md:text-lg font-light text-gray-700 dark:text-gray-300">
                {contact.office}
              </p>
              {contact.address && (
                <address className="text-base font-light text-gray-600 dark:text-gray-400 not-italic pt-2">
                  {contact.address.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </address>
              )}
            </div>

            {/* Office Hours */}
            {contact.officeHours && (
              <div className="space-y-2">
                <span className="text-sm font-light text-gray-500 dark:text-gray-500">
                  Office Hours
                </span>
                <p className="text-base font-light text-gray-700 dark:text-gray-300">
                  {contact.officeHours}
                </p>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-8">
              Connect
            </h3>

            <div className="space-y-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-4 py-3 border-b border-gray-200 dark:border-gray-800 group hover:border-gray-900 dark:hover:border-white transition-colors"
                  >
                    <Icon
                      size={20}
                      className="text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                    />
                    <span className="text-base font-light text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {link.name}
                    </span>
                    <ExternalLink
                      size={14}
                      className="ml-auto text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 border-l-2 border-midnight-500 dark:border-midnight-400 pl-6"
        >
          <p className="text-base font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            For PhD inquiries, please include your CV and research interests. I typically respond within 2-3 business days.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
