
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Building, ChevronRight } from 'lucide-react';

export function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);
  
  const experiences = [
    {
      title: "Battery Data Engineer",
      company: "MEAtec",
      location: "Turkey (Remote)",
      period: "Jun 2024 - Present",
      description: [
        "Analysed a variety of battery datasets, applying state-of-the-art methodologies to generate synthetic data and estimate metrics for real-time battery performance analysis.",
        "Developed a web-based Battery Data Management Dashboard prototype with functionalities to view battery voltage, temperature, current, and state of health (SOH) based on dummy data.",
        "Contributed to a Battery Management System (BMS) project, building novel SOH, State of Charge (SOC), and Remaining Useful Life (RUL) estimation models with below 1% error."
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "Havells Pvt. Ltd.",
      location: "Noida, India (On-site)",
      period: "Jun 2023 - Aug 2023",
      description: [
        "Applied time series forecasting using over ten statistical models (AutoRegressive Integrated Moving Average) and neural networks (LSTM) to predict future sales across diverse product lines.",
        "Contributed to the improvement of model performance compared to traditional predictive models."
      ]
    },
    {
      title: "Software Engineer",
      company: "Paras Labs",
      location: "India (Remote)",
      period: "Jan 2023 - May 2023",
      description: [
        "Helped in secured digital banking iOS application development using UIKit and SwiftUI.",
        "Built user-friendly interfaces with intricate designs and logic."
      ]
    },
    {
      title: "Machine Learning Intern",
      company: "BeyondExams",
      location: "India (Remote)",
      period: "Jun 2022 - Nov 2022",
      description: [
        "Scraped more than ten thousand videos from YouTube for a channel-specific and video-specific intensive datasets.",
        "Built an innovative model architecture for categorical classification of YouTube videos (educational vs. non-educational)."
      ]
    },
    {
      title: "Computer Science Technical Writer",
      company: "OpenGenus",
      location: "Tokyo (Remote)",
      period: "Apr 2022 - Jun 2022",
      description: [
        "Published articles explaining algorithms and data structures with practical implementation, showcasing diverse methods, and mathematical skills."
      ]
    }
  ];

  return (
    <section id="experience" className="relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My professional journey across different roles and organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-20 md:self-start h-fit"
          >
            <div className="glass-card w-full md:min-w-[240px]">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Briefcase size={18} className="mr-2 text-primary" />
                Companies
              </h3>
              
              <ul className="space-y-1">
                {experiences.map((exp, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveExperience(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                        activeExperience === index 
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <span>{exp.company}</span>
                      {activeExperience === index && (
                        <ChevronRight size={16} className="text-primary" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <div className="md:col-span-2 relative">
            <div className="w-full" style={{ minHeight: '450px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card h-full w-full"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-1">
                      {experiences[activeExperience].title}
                    </h3>
                    <div className="flex flex-wrap items-center text-sm text-foreground/70 gap-x-4 gap-y-2">
                      <div className="flex items-center">
                        <Building size={14} className="mr-1" />
                        <span>{experiences[activeExperience].company}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{experiences[activeExperience].period}</span>
                      </div>
                      <div>
                        <span className="glass px-2 py-0.5 text-xs rounded-md">
                          {experiences[activeExperience].location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {experiences[activeExperience].description.map((item, index) => (
                      <li key={index} className="flex">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-theme-accent/5 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}

export default ExperienceSection;
