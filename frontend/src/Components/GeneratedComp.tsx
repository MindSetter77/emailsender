import React, { useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface genProps {
    generatedEmail: string
}

function GeneratedComp({generatedEmail}: genProps) {
  return (
    <div style={{

        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        padding: '1rem',
        maxWidth: '600px',
        color: 'white',
        whiteSpace: 'pre-line',
        boxShadow: '0 0 15px rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
        wordBreak: 'break-word',
        overflowX: 'hidden',
        marginBottom: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '40px',

        }}>
          <h3 style={{
            margin: 0,
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem',
            width: '100%'
          }}>
            📬 Wygenerowany e-mail:
          </h3>
        </div>
        <p>{generatedEmail}</p>
      </div>
      
  );
}

export default GeneratedComp;
