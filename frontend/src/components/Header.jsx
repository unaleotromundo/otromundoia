import React, { useState } from 'react';
import { Menu, X, Leaf, Camera, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ currentSection, setCurrentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Catálogo', key: 'catalog', icon: Leaf },
    { name: 'Crear Contenido', key: 'content', icon: Sparkles },
    { name: 'Chat Experta', key: 'chat', icon: MessageCircle },
    { name: 'Galería', key: 'gallery', icon: Camera },
    { name: 'Branding', key: 'branding', icon: Leaf }
  ];

  return (
    <header className="relative bg-gradient-to-r from-green-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-teal-600 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Top bar with brand */}
        <div className="px-6 py-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-pink-300 bg-clip-text text-transparent">
                  Otro Mundo
                </h1>
                <p className="text-sm text-green-200 font-medium">Suculentas que transforman espacios</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block px-6 py-4`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setCurrentSection(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    currentSection === item.key
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg'
                      : 'hover:bg-white/20 text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                  {currentSection === item.key && (
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;