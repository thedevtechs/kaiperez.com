import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const winPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const coinFall = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
`;

const WinContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  textAlign: 'center',
  animation: `${winPulse} 1s infinite`,
}));

const CoinEffect = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
}));

interface WinDisplayProps {
  win: {
    winAmount: number;
    pattern?: {
      name: string;
    };
  };
}

const WinDisplay: React.FC<WinDisplayProps> = ({ win }) => {
  const [mounted, setMounted] = useState(false);
  const [coins, setCoins] = useState<Array<{ id: number; left: number }>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCoins(prev => [...prev, { 
        id: Date.now(), 
        left: Math.random() * 100 
      }]);
    }, 100);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <WinContainer>
        <Typography
          variant="h2"
          sx={{
            color: '#ffd700',
            textShadow: '0 0 10px rgba(255,215,0,0.5)',
            fontWeight: 'bold',
          }}
        >
          WIN! ${win.winAmount}
        </Typography>
        {win.pattern && (
          <Typography
            variant="h4"
            sx={{
              color: '#ff9100',
              textShadow: '0 0 10px rgba(255,145,0,0.5)',
              mt: 2,
            }}
          >
            {win.pattern.name}
          </Typography>
        )}
      </WinContainer>
      <CoinEffect>
        {coins.map(coin => (
          <Box
            key={coin.id}
            sx={{
              position: 'absolute',
              left: `${coin.left}%`,
              animation: `${coinFall} 1s linear forwards`,
              fontSize: '2rem',
            }}
          >
            💰
          </Box>
        ))}
      </CoinEffect>
    </>
  );
};

export default WinDisplay; 