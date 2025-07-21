import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogIn, Mail, Lock, Eye, EyeOff, Telegram, Diamond, Star, Crown, Shield, Globe } from 'lucide-react';

// Floating Particles Component
export const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 8 + 4,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 0.5,
          type: Math.random() > 0.5 ? 'diamond' : 'star'
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);

    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 50,
            y: particle.y + Math.cos(Date.now() * 0.001 + particle.id) * 30,
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.speed * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            opacity: particle.opacity,
          }}
        >
          {particle.type === 'diamond' ? (
            <Diamond 
              size={particle.size} 
              className="text-amber-400 drop-shadow-lg" 
              fill="currentColor"
            />
          ) : (
            <Star 
              size={particle.size} 
              className="text-yellow-300 drop-shadow-lg" 
              fill="currentColor"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Header Component
export const Header = ({ onLoginClick, onRegisterClick }) => {
  const [currentLang, setCurrentLang] = useState('En');
  const languages = ['Ua', 'En', 'Pl'];

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Support Email */}
        <div className="hidden md:block">
          <div className="bg-black/20 backdrop-blur-sm border border-amber-500/30 rounded-lg px-4 py-2">
            <span className="text-amber-400 text-sm font-medium">
              support@superomatic.gold
            </span>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <motion.h1
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text drop-shadow-2xl"
            style={{
              textShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
              fontFamily: 'serif'
            }}
          >
            SUPEROMATIC
            <span className="block text-2xl md:text-3xl italic text-amber-300">
              gold
            </span>
          </motion.h1>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex bg-black/20 backdrop-blur-sm border border-amber-500/30 rounded-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  currentLang === lang
                    ? 'bg-amber-500/30 text-amber-300'
                    : 'text-gray-300 hover:text-amber-400'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegisterClick}
              className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <User size={16} />
              <span className="hidden md:inline">Registration</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onLoginClick}
              className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <LogIn size={16} />
              <span className="hidden md:inline">Login</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Login Modal Component
export const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gray-900/90 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Login</h2>
            <p className="text-gray-300">Enter your email and password used during registration</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-amber-400 font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail or Phone"
                  className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 outline-none"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/60" size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-amber-400 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-400 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 hover:text-amber-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-500 bg-black/50 border-amber-500/30 rounded focus:ring-amber-400"
                />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>
              <button className="text-amber-400 hover:text-amber-300 text-sm transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-3 rounded-lg transition-all duration-300"
            >
              Login
            </motion.button>

            {/* Telegram Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Telegram size={20} />
              <span>Login via Telegram</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Registration Modal Component
export const RegisterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gray-900/90 backdrop-blur-xl border-2 border-amber-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-2">Registration</h2>
            <p className="text-gray-300">Create your account to start playing</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-amber-400 font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 outline-none"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/60" size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-amber-400 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-400 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 transition-all duration-300 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/60 hover:text-amber-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-amber-400 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-400 rounded-lg px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 outline-none"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/60" size={20} />
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-amber-500 bg-black/50 border-amber-500/30 rounded focus:ring-amber-400 mt-1"
              />
              <label className="text-gray-300 text-sm">
                I agree to the <span className="text-amber-400 cursor-pointer hover:underline">Terms & Conditions</span> and <span className="text-amber-400 cursor-pointer hover:underline">Privacy Policy</span>
              </label>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              disabled={!agreeTerms}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-gray-600 disabled:to-gray-500 text-black font-bold py-3 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
            >
              Create Account
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Games Section Component
export const GamesSection = () => {
  const gameCategories = [
    { name: '7 Real', icon: Crown, count: 45, color: 'from-red-600 to-red-500' },
    { name: 'Classic', icon: Diamond, count: 120, color: 'from-blue-600 to-blue-500' },
    { name: 'Global Game', icon: Globe, count: 200, color: 'from-green-600 to-green-500' },
    { name: 'Playminator', icon: Star, count: 150, color: 'from-purple-600 to-purple-500' },
    { name: 'Superbonus', icon: Shield, count: 85, color: 'from-amber-600 to-amber-500' }
  ];

  const featuredGames = [
    { name: 'Golden Fortune', category: '7 Real', jackpot: '€125,430' },
    { name: 'Diamond Strike', category: 'Classic', jackpot: '€87,210' },
    { name: 'Lucky Stars', category: 'Superbonus', jackpot: '€156,890' },
    { name: 'Royal Gems', category: 'Global Game', jackpot: '€98,450' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative z-10 px-6 py-20 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text mb-4"
        >
          Premium Casino Games
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Experience over 800 carefully curated games from the world's leading providers
        </motion.p>
      </div>

      {/* Game Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {gameCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gray-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 text-center hover:border-amber-400/50 transition-all duration-300 cursor-pointer group"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <category.icon size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">{category.name}</h3>
            <p className="text-gray-400">{category.count} games</p>
          </motion.div>
        ))}
      </div>

      {/* Featured Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredGames.map((game, index) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 hover:border-amber-400/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl h-32 mb-4 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all duration-300">
              <Diamond size={48} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
            <p className="text-amber-400 text-sm mb-2">{game.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Jackpot:</span>
              <span className="text-green-400 font-bold">{game.jackpot}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Features Section Component
export const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Licensed & Secure',
      description: 'Licensed by Antillephone N.V. under License No. 1662/JAZ',
      color: 'from-green-600 to-green-500'
    },
    {
      icon: Crown,
      title: '800+ Premium Games',
      description: 'Curated collection from top providers like Gaminator, EGT, Apollo',
      color: 'from-purple-600 to-purple-500'
    },
    {
      icon: Diamond,
      title: 'Instant Payouts',
      description: '20+ payment methods including crypto with minimal fees',
      color: 'from-blue-600 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Available in Ukrainian, English, and Polish',
      color: 'from-amber-600 to-amber-500'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="relative z-10 px-6 py-20 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text mb-4"
        >
          Why Choose Superomatic Gold?
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gray-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300 group"
          >
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 3 }}
      className="relative z-10 border-t border-amber-500/20 bg-black/40 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text mb-4">
              SUPEROMATIC gold
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Premium online casino platform offering over 800 carefully curated games from world-class providers. Licensed and regulated for your security.
            </p>
            <div className="flex space-x-4">
              <div className="bg-amber-600/20 border border-amber-500/30 rounded-lg px-4 py-2">
                <span className="text-amber-400 text-sm font-medium">
                  support@superomatic.gold
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Games</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Promotions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">VIP Club</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Banking</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-500/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>© 2025 Superomatic Gold. All rights reserved.</p>
            <p className="mt-1">Operated by Dama N.V. | Licensed by Antillephone N.V.</p>
          </div>
          
          <div className="bg-black/60 border border-amber-500/30 rounded-lg px-4 py-2">
            <span className="text-amber-400 font-medium text-sm">
              License No. 1662/JAZ
            </span>
          </div>
        </div>

        {/* Responsible Gaming Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs max-w-4xl mx-auto">
            The website superomatic.gold is owned and operated by Dama N.V., a company registered under the laws of Curaçao with number 152377 and registered address at Zuiderpark, Curaçao. Dama N.V. is licensed and regulated by Antillephone N.V. under the Gaming License No. 1662/JAZ. Please gamble responsibly.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};