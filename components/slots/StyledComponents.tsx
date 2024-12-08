import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { SYMBOLS } from '../../constants';

const blinkingBorder = keyframes`
  0% { box-shadow: 0 0 15px #ffd700; }
  50% { box-shadow: 0 0 25px #ff9100; }
  100% { box-shadow: 0 0 15px #ffd700; }
`;

export const StyledSlotSymbol = styled(Box)<{ state: 'spinning' | 'stopping' | 'stopped' }>(
  ({ theme, state }) => ({
    width: '20vw',
    height: '20vw',
    maxWidth: 90,
    maxHeight: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: theme.spacing(1),
    border: '2px solid #444',
    position: 'relative',
    overflow: 'hidden',

    '& .symbol-content': {
      width: '100%',
      height: '100%',
      position: 'relative',
      transition: 'transform 0.2s ease-out'
    },

    ...(state === 'spinning' && {
      '& .symbol-content': {
        animation: 'spin 0.2s linear infinite',
      }
    }),

    ...(state === 'stopping' && {
      '& .symbol-content': {
        animation: 'slowStop 0.2s ease-out',
      }
    }),

    '@keyframes spin': {
      '0%': {
        transform: 'translateY(-100%)'
      },
      '100%': {
        transform: 'translateY(100%)'
      }
    },

    '@keyframes slowStop': {
      '0%': {
        transform: 'translateY(-20%)'
      },
      '100%': {
        transform: 'translateY(0)'
      }
    },

    '&.winning': {
      backgroundColor: '#3a2700',
      border: '2px solid #ffd700',
      animation: `${blinkingBorder} 1.5s infinite`,
    },

    '&.near-winning': {
      backgroundColor: '#2a2a2a',
      border: '2px solid #ff9100',
      animation: `${blinkingBorder} 1.5s infinite`,
    },

    [theme.breakpoints.up('md')]: {
      width: '15vw',
      height: '15vw',
      maxWidth: 120,
      maxHeight: 120,
    }
  })
);
