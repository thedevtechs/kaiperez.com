import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CasinoIcon from '@mui/icons-material/Casino';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const PreLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1a1a1a',
        backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%, #222 100%)',
        backgroundSize: '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <CasinoIcon
        sx={{
          fontSize: '4rem',
          color: '#ffd700',
          animation: `${spin} 2s linear infinite`,
          mb: 2,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: '#ffd700',
          fontFamily: '"Press Start 2P", cursive',
          textAlign: 'center',
          animation: `${shimmer} 1.5s ease-in-out infinite`,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        Loading Slots...
      </Typography>
    </Box>
  );
};

export default PreLoader; 