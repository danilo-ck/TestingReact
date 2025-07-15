import React from 'react';
import Button from './Button.jsx';

const Hero = ({ 
  title, 
  highlightedText, 
  description, 
  secondaryDescription, 
  primaryButtonText, 
  primaryButtonAction,
  secondaryButtons = []
}) => {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
        {highlightedText && (
          <span className="text-primary-600 block">{highlightedText}</span>
        )}
      </h1>
      
      {description && (
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      
      {secondaryDescription && (
        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
          {secondaryDescription}
        </p>
      )}
      
      {/* Call to Action Principal */}
      {primaryButtonText && (
        <div className="mb-8">
          <Button
            text={primaryButtonText}
            onClick={primaryButtonAction}
            variant="primary"
            fullWidth={false}
          />
        </div>
      )}
      
      {/* Botones Secundarios */}
      {secondaryButtons.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {secondaryButtons.map((button, index) => (
            <Button
              key={index}
              text={button.text}
              onClick={button.action}
              variant={button.variant || 'secondary'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
