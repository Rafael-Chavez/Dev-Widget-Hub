import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Widgets for
            <span className="text-primary-600 block">Your Website</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose from 20+ beautiful, customizable widgets to enhance your website.
            Easy to install, mobile-friendly, and works with any platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Browse Widgets
            </button>
            <button className="border border-gray-300 hover:border-primary-600 text-gray-700 hover:text-primary-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">20+</div>
              <div className="text-gray-600">Widgets</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">100+</div>
              <div className="text-gray-600">Platforms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">1M+</div>
              <div className="text-gray-600">Websites</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;