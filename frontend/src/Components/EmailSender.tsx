import React, { useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { motion } from 'framer-motion';

interface emailProps {
  setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
  language: string
}

function EmailSender({setGeneratedEmail, setError, language}: emailProps) {
  const [sendTo, setSendTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tone, setTone] = useState<string>('formal');

  const sendClick = async () => {
    if (!sendTo.trim() || !subject.trim() || !content.trim()) {
      alert('Uzupełnij wszystkie pola!');
      return;
    }

    setGeneratedEmail('wait')

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sendTo, subject, content, tone }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Sprawdzanie, czy błąd to 420
        if (response.status === 420) {
          clearFields()
          setError(true)
          return;
        }
        throw new Error(data.error || 'Błąd wysyłania.');
      }
      setError(false)
      setGeneratedEmail(data.message);
    } catch (error) {
      console.error('Błąd:', error);
      alert('Nie udało się wysłać wiadomości.');
    }
  };

  const clearFields = () => {
    setSendTo('');
    setSubject('');
    setContent('');
    setTone('formal');
    setGeneratedEmail('')
  };

  return (
    <motion.div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(8px)', padding: '1.5rem', boxShadow: '0 0 20px rgba(255,255,255,0.05)', color: 'white', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{language==='EN' ? ('✉️ New message') : ('✉️ Nowa wiadomość')}</p>
        <MinimizeIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        <OpenInFullIcon style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
        <CloseIcon style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
      </div>

      <TextField label={language === 'EN' ? ('To') : ('Do')} variant="standard" fullWidth value={sendTo} onChange={(e) => setSendTo(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#ccc' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInput-underline:before': { borderBottomColor: '#666' }, '& .MuiInput-underline:hover:before': { borderBottomColor: '#999' }, '& .MuiInput-underline:after': { borderBottomColor: 'rgb(255, 62, 207, 1)' }}} />
      <TextField label={language === 'EN' ? ('Topic') : ('Temat')} variant="standard" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#ccc' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInput-underline:before': { borderBottomColor: '#666' }, '& .MuiInput-underline:hover:before': { borderBottomColor: '#999' }, '& .MuiInput-underline:after': { borderBottomColor: 'rgb(56, 165, 255)' }}} />
      <TextField label={language === 'EN' ? ('Message content (you can list it separated by commas or in any format you prefer)') : ('Treść wiadomości (możesz wymienić po przecinku, lub w dowolny sposób)')} variant="standard" multiline minRows={8} fullWidth value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2, '& .MuiInputBase-input': { color: 'white' }, label: { color: '#ccc' }, '& label.Mui-focused': { color: 'white' }, '& .MuiInput-underline:before': { borderBottomColor: '#666' }, '& .MuiInput-underline:hover:before': { borderBottomColor: '#999' }, '& .MuiInput-underline:after': { borderBottomColor: 'rgb(255, 62, 207, 1)' }}} />

      <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
        <InputLabel sx={{ color: '#ccc' }}>{ language === 'EN' ? ('Tone') : ('Ton')}</InputLabel>
        <Select value={tone} onChange={(e) => setTone(e.target.value)} sx={{ color: 'white' }}>
          <MenuItem value="veryFormal">{language === 'EN' ? 'Very formal' : 'Bardzo formalny'}</MenuItem>
          <MenuItem value="formal">{language === 'EN' ? 'Formal' : 'Formalny'}</MenuItem>
          <MenuItem value="neutral">{language === 'EN' ? 'Neutral' : 'Neutralny'}</MenuItem>
          <MenuItem value="friendly">{language === 'EN' ? 'Informal' : 'Nieformalny'}</MenuItem>
          <MenuItem value="funny">{language === 'EN' ? 'Humorous' : 'Żartobliwy'}</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button onClick={clearFields} style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.4rem 1rem', borderRadius: '10px', cursor: 'pointer' }}>
          Wyczyść
        </button>
        <button onClick={sendClick} style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)', border: 'none', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          Wyślij
        </button>
      </div>
    </motion.div>
  );
}

export default EmailSender;
