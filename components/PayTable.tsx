import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Symbol, WinPattern } from '../types';

interface PayTableProps {
  open: boolean;
  onClose: () => void;
  symbols: Symbol[];
  patterns: WinPattern[];
}

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const StyledPatternBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '4px',
  padding: '8px',
  backgroundColor: '#2a2a2a',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  '& .pattern-cell': {
    width: '30px',
    height: '30px',
    border: '1px solid #444',
    borderRadius: '4px',
  },
  '& .pattern-cell.highlighted': {
    backgroundColor: '#ffd700',
    backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    backgroundSize: '1000px 100%',
    animation: `${shimmer} 2s infinite linear`,
  }
}));

const PayTable: React.FC<PayTableProps> = ({ open, onClose, symbols, patterns }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%, #222 100%)',
          backgroundSize: '20px 20px',
        }
      }}
    >
      <DialogTitle sx={{ 
        color: '#ffd700', 
        textAlign: 'center',
        borderBottom: '2px solid #333',
        textShadow: '0 0 10px rgba(255,215,0,0.3)'
      }}>
        PayTable
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
              Symbols & Values
            </Typography>
            <Grid container spacing={2}>
              {symbols.map((symbol) => (
                <Grid item xs={6} key={symbol.id}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Typography variant="h4">{symbol.icon}</Typography>
                    <Box>
                      <Typography sx={{ color: '#fff' }}>
                        Base Value: <span style={{ color: '#00ff00' }}>${symbol.value}</span>
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
              Winning Patterns
            </Typography>
            <Grid container spacing={2}>
              {patterns.map((pattern) => (
                <Grid item xs={12} md={6} key={pattern.name}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444'
                  }}>
                    <Typography sx={{ color: '#fff', mb: 1 }}>
                      {pattern.name}
                    </Typography>
                    <StyledPatternBox>
                      {Array(15).fill(null).map((_, idx) => {
                        const row = Math.floor(idx / 5);
                        const col = idx % 5;
                        const isHighlighted = pattern.pattern.some(
                          ([r, c]) => r === row && c === col
                        );
                        return (
                          <div
                            key={idx}
                            className={`pattern-cell ${isHighlighted ? 'highlighted' : ''}`}
                          />
                        );
                      })}
                    </StyledPatternBox>
                    <Typography sx={{ 
                      color: '#00ff00', 
                      mt: 1,
                      textAlign: 'right'
                    }}>
                      {pattern.multiplier}x Multiplier
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PayTable; 