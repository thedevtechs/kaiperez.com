import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const flashAnimation = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 0.4; }
  100% { opacity: 0.8; }
`;

const NearWinContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  textAlign: 'center',
  animation: `${flashAnimation} 1.5s infinite`,
  backgroundColor: 'rgba(0,0,0,0.8)',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

interface NearWinDisplayProps {
  message: string;
}

const NearWinDisplay: React.FC<NearWinDisplayProps> = ({ message }) => (
  <NearWinContainer>
    <Typography
      variant="h4"
      sx={{
        color: '#ffd700',
        textShadow: '0 0 10px rgba(255,215,0,0.5)',
      }}
    >
      {message}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: '#ff9100',
        mt: 1,
      }}
    >
      So close! Try again?
    </Typography>
  </NearWinContainer>
);

export default NearWinDisplay; 