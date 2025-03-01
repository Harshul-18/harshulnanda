
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ExternalLink } from 'lucide-react';

export function ResearchSection() {
  const researchProjects = [
    {
      title: "A Predictive Health Management System for Patient Readmission Risk",
      period: "Nov 2024 - Dec 2024",
      skills: ["Web Development", "Dynamic Dashboard Designing"],
      description: [
        "Developed integrated patient and admin dashboards for real-time readmission risk tracking.",
        "Implemented predictive models (Random Forests, Gaussian Process Classification) with an easy re-training platform for adaptive risk estimation."
      ],
      publication: "Article accepted for Proceedings of International Conference on Intelligent Systems and Health Data Science ICISHDS 2024",
      link: null
    },
    {
      title: "Mobile Robots Trajectory Manipulation",
      period: "Sep 2024 - Jan 2025",
      skills: ["ROS", "Hardware Assembly", "Arduino", "Raspberry Pi"],
      description: [
        "Compared four Proportional-Integral-Derivative (PID) control models: standard, fractional, adaptive fractional, and non-linear fractional, to regulate robot's movement along a predefined trajectory.",
        "Proposed a general PID control mechanism with experiments both virtually and on a physical TurtleBot-3 robot.",
        "Implemented and improved four pathfinding algorithms (Particle Swarm Optimised A-star, Dijkstra, Breadth-First Search, Uniform Cost Search), integrating them with PID for static obstacle avoidance."
      ],
      publication: null,
      link: null
    },
    {
      title: "Video Analysis for Unethical Activity",
      period: "Nov 2023 - Dec 2023",
      skills: ["Video Classification", "Machine Learning"],
      description: [
        "Curated a dataset of CCTV footage and videos containing unethical activity and analysed four video classification model architectures.",
        "Achieved over 94% accuracy in classifying criminal vs. safe content."
      ],
      publication: "Article accepted for forthcoming Proceedings of International Conference on Generative AI, Cryptography and Predictive Analytics Springer publication",
      link: null
    },
    {
      title: "Crime Prediction in Conversations",
      period: "Feb 2023 - Apr 2023",
      skills: ["Natural Language Processing", "Data Science"],
      description: [
        "Developed a dataset comprising over one thousand daily life conversations, each consisting of 7 to 10 dialogues and annotated with six categories ranging from unethical to neutral.",
        "Studied and compared over fifty crime-predicting text classification model architectures.",
        "Proposed a state-of-the-art architecture using a fine-tuned BERT model in public safety and NLP research, achieving 98% accuracy on the created dataset."
      ],
      publication: "Article submitted and under review for publication in a Springer journal",
      link: null
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
    <section id="research" className="relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Research <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My academic research and publications in various technology domains.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8"
        >
          {researchProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card group hover:border-primary/50 transition-colors relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.skills.map((skill, i) => (
                    <span key={i} className="glass px-2 py-0.5 text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                
                <div className="flex items-center text-foreground/70 text-sm mb-4">
                  <Calendar size={14} className="mr-1" />
                  <span>{project.period}</span>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {project.description.map((point, i) => (
                    <li key={i} className="flex">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-foreground/80 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                
                {project.publication && (
                  <div className="flex items-start mt-4 p-3 glass rounded-lg">
                    <BookOpen size={18} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/90 italic">{project.publication}</p>
                  </div>
                )}
                
                {project.link && (
                  <div className="mt-4">
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary"
                    >
                      <span className="mr-1">Read Publication</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl"
        animate={{ 
          y: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </section>
  );
}

export default ResearchSection;
