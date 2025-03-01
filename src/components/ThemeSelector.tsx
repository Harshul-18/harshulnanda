
import { useState } from 'react';
import { useTheme, ThemeOption } from '@/utils/themeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  Cloud, 
  Leaf, 
  ChevronUp 
} from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const themeOptions: { id: ThemeOption; name: string; icon: React.ReactNode }[] = [
    { id: 'neon', name: 'Neon Nights', icon: <Sparkles size={18} /> },
    { id: 'ember', name: 'Ember', icon: <Flame size={18} /> },
    { id: 'azure', name: 'Azure', icon: <Cloud size={18} /> },
    { id: 'verdant', name: 'Verdant', icon: <Leaf size={18} /> },
  ];

  const currentTheme = themeOptions.find(t => t.id === theme);

  return (
    <div className="theme-selector">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass absolute bottom-16 right-0 p-2 rounded-lg w-40"
          >
            <div className="flex flex-col space-y-1">
              {themeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setTheme(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    theme === option.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-secondary'
                  }`}
                >
                  {option.icon}
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleOpen}
        className="glass-card flex items-center justify-center p-3 h-12 w-12 rounded-full hover:scale-105 transition-transform"
      >
        {currentTheme?.icon || <ChevronUp className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`} />}
      </button>
    </div>
  );
}

export default ThemeSelector;
