import React, { useState } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


function ErrorMessage() {
  

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgb(235, 47, 47)',
        borderRadius: '16px',
        backdropFilter: 'blur(8px)',
        padding: '1.5rem',
        boxShadow: '0 0 20px rgba(228, 0, 0, 0.5)',
        color: 'rgb(235, 47, 47)',
        marginBottom: '10px'
      }}
    >Error: Wait atleast a minute before using again!</div>
  );
}

export default ErrorMessage;
