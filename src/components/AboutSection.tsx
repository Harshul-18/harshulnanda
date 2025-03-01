
import { motion } from 'framer-motion';
import { FolderGit2, Code, Users, Download } from 'lucide-react';

export function AboutSection() {
  const skills = [
    {
      category: "Programming & Data Science",
      items: [
        "Python - DS & Algorithms, Multithreading",
        "Data Analysis - NumPy, Pandas, Matplotlib",
        "Machine Learning - TensorFlow, Keras, PyTorch",
        "Web Development - React, HTML, CSS, JavaScript",
      ]
    },
    {
      category: "Tools & Technologies",
      items: [
        "Version Control - Git, GitHub",
        "UI/UX Design - Figma, Framer",
        "Data Visualization - Streamlit, MATLAB",
        "Robotics - ROS, Arduino, Raspberry Pi",
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="overflow-hidden relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-card h-full">
              <h3 className="text-xl font-semibold mb-4">Who am I?</h3>
              <div className="space-y-4 text-foreground/90">
                <p>An innovative technologist with a strong foundation in machine learning, robotics, and data analysis. I am passionate about solving complex challenges at the intersection of technology and security.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Name</p>
                    <p className="font-medium">Harshul Nanda</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Email</p>
                    <p className="font-medium">harshulnanda0@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Pursuing</p>
                    <p className="font-medium">B.Tech in IT & Mathematical Innovation</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Languages</p>
                    <p className="font-medium">Hindi, English</p>
                  </div>
                </div>

                <div className="mt-6">
                  <a 
                    href="../../Harshul Nanda.pdf" 
                    download="Harshul_Nanda_CV"
                    className="inline-flex items-center space-x-2 glass px-5 py-2.5 rounded-lg font-medium hover:scale-105 transition-transform"
                  >
                    <Download size={18} />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="self-stretch"
          >
            <div className="glass-card space-y-6 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-4">Experience Overview</h3>
              
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="glass p-4 text-center rounded-lg flex flex-col items-center justify-center">
                  <FolderGit2 className="mb-2 text-primary" size={24} />
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm text-foreground/80">Projects Completed</p>
                </div>
                
                <div className="glass p-4 text-center rounded-lg flex flex-col items-center justify-center">
                  <Code className="mb-2 text-primary" size={24} />
                  <p className="text-2xl font-bold text-primary">4+</p>
                  <p className="text-sm text-foreground/80">Years of Coding</p>
                </div>
                
                <div className="glass p-4 text-center col-span-2 rounded-lg flex flex-col items-center justify-center">
                  <Users className="mb-2 text-primary" size={24} />
                  <p className="text-2xl font-bold text-primary">3+</p>
                  <p className="text-sm text-foreground/80">Work Experiences</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-semibold mb-6 text-center"
          >
            My Skills
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="glass-card"
              >
                <h4 className="text-lg font-medium mb-4 text-primary">{skill.category}</h4>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        animate={{ 
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}

export default AboutSection;
