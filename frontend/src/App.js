import React, { useState } from 'react';
import './App.css';
import { 
  FloatingParticles, 
  Header, 
  LoginModal, 
  RegisterModal, 
  GamesSection, 
  FeaturesSection, 
  Footer 
} from './components';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-900/20 to-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-900/30 via-black/80 to-gray-900/90" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Header */}
      <Header 
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />
      
      {/* Main Content */}
      <main className="relative z-10 pt-40 pb-20">
        {/* Hero Section */}
        <section className="text-center px-6 mb-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-amber-300 font-light mb-8 opacity-90">
              Premium Online Casino Experience
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
              Join thousands of players in the ultimate gaming destination. Experience luxury, 
              security, and excitement with every spin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
              >
                Start Playing Now
              </button>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-black/40 backdrop-blur-sm border-2 border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Already a Member?
              </button>
            </div>
          </div>
        </section>
        
        {/* Games Section */}
        <GamesSection />
        
        {/* Features Section */}
        <FeaturesSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)} 
      />
    </div>
  );
}

export default App;