import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

interface NavbarProps {
    setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>
    setError: React.Dispatch<React.SetStateAction<boolean>>
}



function Navbar({setGeneratedEmail, setError} : NavbarProps) {
    const navigate = useNavigate();
  
  return (  
    <motion.header 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 5, type: 'spring' }}
      style={{ display: 'flex',  position: 'absolute', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', zIndex: 5, borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100vw' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, cursor: 'pointer', color: 'white' }} onClick={() => {setGeneratedEmail(''); setError(false); navigate('/')}}>📨 MailCraft AI</h2>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <a onClick={() => navigate('/')} style={{ color: 'white', textDecoration: 'none', opacity: 0.8, cursor: 'pointer' }}>Home</a>
          <div onClick={() => navigate('/about')}><a   style={{ color: 'white', textDecoration: 'none', opacity: 0.8, marginRight: '100px', cursor: 'pointer' }}>About</a></div>
          
        </nav>
      </motion.header>
  );
}

export default Navbar;
