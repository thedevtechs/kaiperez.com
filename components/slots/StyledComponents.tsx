import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { SYMBOLS } from '../../pages/projects/constants';

const blinkingBorder = keyframes`
  0% { box-shadow: 0 0 15px #ffd700; }
  50% { box-shadow: 0 0 25px #ff9100; }
  100% { box-shadow: 0 0 15px #ffd700; }
`;

const smoothSpinAnimation = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-${SYMBOLS.length * 90}px); }
`;

const bounceAnimation = keyframes`
  0% { transform: translateY(-10px); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`;

export const StyledSlotSymbol = styled(Box)<{ state: 'spinning' | 'stopping' | 'stopped' }>(
  ({ theme, state }) => ({
    width: 90,
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: theme.spacing(1),
    border: '2px solid #444',
    position: 'relative',
    overflow: 'hidden',
    
    '& .symbol-content': {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: `${SYMBOLS.length * 90 * 2}px`,
      
      '&::before': {
        content: '""',
        display: 'block',
        height: `${SYMBOLS.length * 90}px`,
      },
      
      '&::after': {
        content: '""',
        display: 'block',
        height: `${SYMBOLS.length * 90}px`,
      }
    },
    
    ...(state === 'spinning' && {
      '& .symbol-content': {
        animation: `${smoothSpinAnimation} 0.5s linear infinite`,
        willChange: 'transform',
      }
    }),
    
    ...(state === 'stopping' && {
      '& .symbol-content': {
        animation: 'none',
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: 'translateY(0)',
      }
    }),
    
    ...(state === 'stopped' && {
      '& .symbol-content': {
        animation: 'none',
        transform: 'translateY(0)',
      }
    }),

    '&.winning': {
      backgroundColor: '#3a2700',
      border: '2px solid #ffd700',
      animation: `${blinkingBorder} 1.5s infinite`,
    }
  })
);

export const StyledBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
  backgroundImage: `
    linear-gradient(135deg, rgba(26,26,26,0.97) 0%, rgba(10,10,10,0.97) 100%),
    url('/images/casino-bg.jpg')
  `,
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
})); 