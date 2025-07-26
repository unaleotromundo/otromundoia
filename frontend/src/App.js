import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CatalogSection from './components/CatalogSection';
import ContentCreator from './components/ContentCreator';
import { Toaster } from './components/ui/toaster';

function App() {
  const [currentSection, setCurrentSection] = useState('catalog');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'catalog':
        return <CatalogSection />;
      case 'content':
        return <ContentCreator />;
      case 'gallery':
        return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">🖼️ Galería</h2>
            <p className="text-xl text-gray-600">Próximamente: Galería de todas tus creaciones</p>
          </div>
        </div>;
      case 'branding':
        return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">🎨 Branding</h2>
            <p className="text-xl text-gray-600">Próximamente: Gestión de logo y assets de marca</p>
          </div>
        </div>;
      default:
        return <CatalogSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main>
        {renderCurrentSection()}
      </main>
      <Toaster />
    </div>
  );
}

export default App;