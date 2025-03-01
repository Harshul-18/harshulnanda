
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TypingEffect from './TypingEffect';

export function HeroSection() {
  const typingMessages = [
    "Welcome to my personal portfolio website.",
    "I am a highly motivated and dedicated programmer with 4+ years of experience.",
    "My passion for technology has led me to utilize diverse frameworks.",
    "I specialize in Python, Machine Learning, and Data Science.",
    "I view challenges as opportunities to expand my knowledge.",
    "Explore my projects and research to learn more about my journey."
  ];

  return (
    <section id="home" className="relative flex flex-col justify-center items-center text-center">
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block text-xl md:text-2xl font-light mb-2">
            Hola!
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            I'm <span className="text-gradient">Harshul Nanda</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-8">
            AI & ML Enthusiast
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card min-h-[100px] max-w-2xl mx-auto flex items-center justify-center p-6 mb-12 text-sm md:text-base"
        >
          <TypingEffect messages={typingMessages} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#about"
            className="glass inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
          >
            <span>About Me</span>
            <ChevronDown size={16} />
          </a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-24 right-12 w-24 h-24 rounded-full bg-primary/20 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-24 left-12 w-16 h-16 rounded-full bg-accent/20 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}

export default HeroSection;
