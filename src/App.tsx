import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageProcessor from './components/ImageProcessor';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <ImageProcessor />
      </main>
      <Footer />
    </div>
  );
}

export default App;