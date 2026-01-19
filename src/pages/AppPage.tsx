import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageProcessor from '../components/ImageProcessor';

const AppPage: React.FC = () => {
  useEffect(() => {
    // Force dark mode for PS theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-ps-base">
      <Header />
      <main className="flex-1">
        <ImageProcessor />
      </main>
      <Footer />
    </div>
  );
};

export default AppPage;
