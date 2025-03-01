
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, Instagram, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  const socialLinks = [
    {
      name: "Email",
      url: "mailto:harshulnanda0@gmail.com",
      icon: <Mail size={20} />,
      handle: "harshulnanda0@gmail.com"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/harshulnanda",
      icon: <Linkedin size={20} />,
      handle: "harshulnanda"
    },
    {
      name: "Twitter",
      url: "https://x.com/daylightCrawler",
      icon: <Twitter size={20} />,
      handle: "@daylightCrawler"
    },
    {
      name: "GitHub",
      url: "https://github.com/Harshul-18",
      icon: <Github size={20} />,
      handle: "Harshul-18"
    },
    {
      name: "Instagram",
      url: "#",
      icon: <Instagram size={20} />,
      handle: "harshul.nanda"
    }
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} className="text-primary" />,
      label: "Phone",
      value: "+91-9582455996"
    },
    {
      icon: <MapPin size={18} className="text-primary" />,
      label: "Location",
      value: "New Delhi - 110059, India"
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Contact <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Let's connect! Reach out for opportunities, collaborations, or just to say hello.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card h-full">
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="glass flex items-center justify-center w-10 h-10 rounded-full mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">{info.label}</p>
                      <p className="text-foreground/90">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4 className="font-medium mb-4">Social Profiles</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center justify-center w-11 h-11 rounded-full hover:bg-primary/10 hover:scale-110 transition-all"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card h-full">
              <h3 className="text-xl font-semibold mb-6">Stay Connected</h3>
              
              <div className="space-y-6">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="glass flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-primary/10 transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">{link.name}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {link.handle}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer section */}
      <div className="mt-16 pt-8 border-t border-border/30">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Harshul Nanda. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
}

export default ContactSection;
