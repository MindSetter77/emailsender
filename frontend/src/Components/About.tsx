import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  language: string
}

function About({language} :AboutProps) {
  // Jawna deklaracja ikon jako ReactNode


  return (
    <div style={{ backgroundColor: '#0d0d0d', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', width: '1000px', height: '800px', backgroundColor: 'rgb(255, 62, 207)', borderRadius: '50%', filter: 'blur(300px)', transform: 'translate(-50%, -50%)', opacity: 0.4, zIndex: 0 }} />
      <motion.div initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: 'spring' }} style={{ zIndex: 1, maxWidth: '800px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(255, 255, 255, 0.6)' }}>O projekcie</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.85 }}><strong>MailPilot AI</strong>{language === 'EN' ? (' is a modern tool designed for email writing automation. With the integration of artificial intelligence technology, you can generate a professional message in just seconds — simply provide the subject and purpose. Its the perfect solution for busy individuals who want to write an email quickly, yet with class.') : (' to nowoczesne narzędzie stworzone z myślą o automatyzacji pisania e-maili. Dzięki integracji z technologią sztucznej inteligencji, możesz w kilka sekund wygenerować profesjonalną wiadomość — wystarczy podać temat oraz cel. To idealne rozwiązanie dla zapracowanych osób, które chcą szybko, a jednocześnie z klasą, napisać maila.')}</p>
        <p style={{ fontSize: '1.2rem', marginTop: '2rem', lineHeight: '1.8', opacity: 0.85 }}>{ language === 'EN' ? ('The project is built using React, Framer Motion, and the OpenAI API. The code is lightweight, responsive, and easy to expand. Feel free to give it a try!') : ('Projekt został zbudowany w oparciu o React, Framer Motion oraz OpenAI API. Kod jest lekki, responsywny i łatwy do rozbudowy. Zapraszamy do testowania!')}</p>
      </motion.div>
      
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: 'spring' }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginTop: '4rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        zIndex: 2,
        position: 'relative',
      }}
    >
      {[ 
        { name: 'React', icon: '/logo192.png', link: 'https://reactjs.org' }, 
        { name: 'Chat GPT', icon: '/open2.png', link: 'https://openai.com' }, 
        { name: 'My SQL', icon: '/mysql-logo.png', link: 'https://www.mysql.com' },
        { name: 'Typescript', icon: '/typescript.png', link: 'https://www.typescriptlang.org' }
      ].map(({ name, icon, link }) => (
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          key={name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(5px)',
            textDecoration: 'none',
          }}
        >
          <img src={icon} alt={name} style={{ width: '20px', height: '20px' }} />
          {name}
        </motion.a>
      ))}
    </motion.div>

    </div>
  );
}

export default About;
