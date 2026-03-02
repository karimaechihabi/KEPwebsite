import { motion } from 'framer-motion';
import { ExternalLink, Mail, Award } from 'lucide-react';
import Card from './Card';

const ProfileCard = ({ 
  person, 
  delay = 0, 
  showStatus = true,
  className = '' 
}) => {
  const {
    name,
    role,
    image,
    researchArea,
    startYear,
    status,
    expectedGraduation,
    graduationYear,
    currentPosition,
    bio,
    publications,
    awards = [],
    website,
    thesisTitle
  } = person;

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'graduated':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card delay={delay} className={`h-full ${className}`}>
      <div className="flex flex-col h-full">
        {/* Profile Image and Basic Info */}
        <div className="text-center mb-4">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                <div className="text-2xl font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {name}
          </h3>
          
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
            {role}
          </p>

          {showStatus && status && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>

        {/* Research Area */}
        {researchArea && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Research Area:</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {researchArea}
            </p>
          </div>
        )}

        {/* Timeline Info */}
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          {status === 'current' && (
            <>
              <p>Started: {startYear}</p>
              {expectedGraduation && (
                <p>Expected Graduation: {expectedGraduation}</p>
              )}
            </>
          )}
          {status === 'graduated' && (
            <>
              <p>Graduated: {graduationYear}</p>
              {currentPosition && (
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  Current: {currentPosition}
                </p>
              )}
            </>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
            {bio}
          </p>
        )}

        {/* Thesis Title for Graduated Students */}
        {thesisTitle && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Thesis:</p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              "{thesisTitle}"
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          {publications && (
            <div className="flex items-center">
              <span className="font-medium text-gray-900 dark:text-white">
                {publications}
              </span>
              <span className="ml-1">publications</span>
            </div>
          )}
        </div>

        {/* Awards */}
        {awards.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Award size={14} className="text-yellow-500 mr-1" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Awards
              </span>
            </div>
            <div className="space-y-1">
              {awards.map((award, index) => (
                <span 
                  key={index}
                  className="inline-block text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full mr-1 mb-1"
                >
                  {award}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {website && (
          <div className="flex items-center justify-center mt-auto pt-4">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <ExternalLink size={14} className="mr-1" />
              Website
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;