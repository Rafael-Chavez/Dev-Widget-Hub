import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-deepsea-darkest shadow-sm border-b border-deepsea-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-deepsea-light">WidgetHub</h1>
            </div>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <a href="#" className="text-deepsea-lightest hover:text-deepsea-light px-3 py-2 text-sm font-medium transition-colors">
                Widgets
              </a>
              <a href="#" className="text-deepsea-light hover:text-deepsea-lightest px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#" className="text-deepsea-light hover:text-deepsea-lightest px-3 py-2 text-sm font-medium transition-colors">
                Help
              </a>
              <a href="#" className="text-deepsea-light hover:text-deepsea-lightest px-3 py-2 text-sm font-medium transition-colors">
                Blog
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-deepsea-light hover:text-deepsea-lightest px-3 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-deepsea-medium to-deepsea-light hover:from-deepsea-light hover:to-deepsea-lightest text-deepsea-lightest px-4 py-2 rounded-lg text-sm font-medium transition-all">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;