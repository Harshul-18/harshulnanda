
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

export function EducationSection() {
  const education = [
    {
      period: "2021 - Present",
      degree: "B.Tech. in Information Technology & Mathematical Innovation",
      institution: "Cluster Innovation Centre, University of Delhi",
      grade: "9.42 CGPA till 6th Semester",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      period: "2020 - 2021",
      degree: "12th Standard: High School",
      institution: "Adarsh Public School",
      grade: "91.2%",
      icon: <GraduationCap size={24} className="text-primary" />
    },
    {
      period: "2018 - 2019",
      degree: "10th Standard: Secondary School",
      institution: "Adarsh Public School",
      grade: "90.2%",
      icon: <GraduationCap size={24} className="text-primary" />
    }
  ];

  const qualifications = [
    {
      year: "2024",
      title: "GATE",
      description: "Qualified in Data Science & Artificial Intelligence Exam with All India Rank 914."
    },
    {
      year: "2021",
      title: "DUET",
      description: "Qualified with All India Rank 22."
    },
    {
      year: "2021",
      title: "JEE Mains",
      description: "Qualified with All India Rank 44691."
    }
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
    <section id="education" className="relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My academic journey and qualifications that have shaped my expertise in technology and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="glass-card relative">
              <h3 className="text-xl font-semibold mb-6">Education Timeline</h3>
              
              <div className="space-y-12">
                {education.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-1">
                    {/* Timeline bar */}
                    {index < education.length - 1 && (
                      <div className="absolute left-[0.9rem] top-8 bottom-[-3rem] w-0.5 bg-border" />
                    )}
                    
                    {/* Timeline icon */}
                    <div className="absolute left-0 top-0 w-7 h-7 flex items-center justify-center rounded-full glass">
                      {item.icon}
                    </div>
                    
                    <div>
                      <div className="inline-block glass px-3 py-1 text-xs rounded-full mb-2">
                        {item.period}
                      </div>
                      <h4 className="text-lg font-medium">{item.degree}</h4>
                      <p className="text-foreground/80 mt-1">{item.institution}</p>
                      <p className="text-primary font-medium mt-1">{item.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="glass-card h-full">
              <div className="flex items-center mb-6">
                <Award size={22} className="text-primary mr-2" />
                <h3 className="text-xl font-semibold">Qualifications</h3>
              </div>
              
              <div className="space-y-6">
                {qualifications.map((qual, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="flex items-center mb-1">
                      <div className="glass px-2 py-0.5 text-xs rounded-md mr-2">
                        {qual.year}
                      </div>
                      <h4 className="font-medium">{qual.title}</h4>
                    </div>
                    <p className="text-sm text-foreground/80 pl-12">{qual.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          x: [0, -5, 0],
          y: [0, 10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
  );
}

export default EducationSection;
