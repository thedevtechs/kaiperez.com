import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';

interface NearWinsOverlayProps {
  nearWins: {
    name: string;
    pattern: [number, number][];
    missedValue: number;
  }[];
  open: boolean;
  onClose: () => void;
}

const fadeInOutAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-20px); }
`;

const NearWinsOverlay: React.FC<NearWinsOverlayProps> = ({ nearWins, open, onClose }) => {
  useEffect(() => {
    if (open && nearWins.length > 0) {
      // Play sound when overlay opens
      const audio = new Audio('/sounds/near_win.mp3');
      audio.volume = 0.3;
      audio.play().catch(error => console.warn('Error playing near win sound:', error));
      
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => {
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [open, onClose, nearWins]);

  if (!open || nearWins.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        padding: '12px 24px',
        borderRadius: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        animation: `${fadeInOutAnimation} 3s forwards`,
        pointerEvents: 'none'
      }}
    >
      <Typography 
        sx={{ 
          color: '#ffd700',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '1.2rem',
          mb: 1,
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
        }}
      >
        Almost There!
      </Typography>
      {nearWins.map((nw, i) => (
        <Typography 
          key={i} 
          sx={{ 
            color: '#fff',
            textAlign: 'center',
            fontSize: '0.9rem',
            opacity: 0.9,
            '& strong': {
              color: '#ff9100',
              fontWeight: 'bold'
            }
          }}
        >
          Almost hit the <strong>{nw.name}</strong>!
        </Typography>
      ))}
    </Box>
  );
};

export default NearWinsOverlay;
