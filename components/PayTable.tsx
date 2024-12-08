import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Symbol, WinPattern } from '../types';

interface PayTableProps {
  symbols: readonly Symbol[];
  patterns: readonly WinPattern[];
  open: boolean;
  onClose: () => void;
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
  },
}));

const SymbolsDisplay: React.FC<{ symbols: Symbol[] }> = ({ symbols }) => (
  <Grid container spacing={2}>
    {symbols.map((symbol) => (
      <Grid item xs={6} key={symbol.id}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
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
);

const PatternsDisplay: React.FC<{ patterns: WinPattern[] }> = ({ patterns }) => (
  <Grid container spacing={2}>
    {patterns.map((pattern) => (
      <Grid item xs={12} md={6} key={pattern.name}>
        <Paper
          sx={{
            p: 2,
            backgroundColor: '#2a2a2a',
            border: '1px solid #444',
          }}
        >
          <Tooltip title={`Win with this pattern!`} placement="top" arrow>
            <Typography sx={{ color: '#fff', mb: 1 }}>{pattern.name}</Typography>
          </Tooltip>
          <StyledPatternBox>
            {Array(15)
              .fill(null)
              .map((_, idx) => {
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
          <Typography
            sx={{
              color: '#00ff00',
              mt: 1,
              textAlign: 'right',
            }}
          >
            {pattern.multiplier}x Multiplier
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
);

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
          backgroundImage:
            'linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%, #222 100%)',
          backgroundSize: '20px 20px',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: '#ffd700',
          textAlign: 'center',
          borderBottom: '2px solid #333',
          textShadow: '0 0 10px rgba(255,215,0,0.3)',
        }}
      >
        PayTable
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Symbols Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
              Symbols & Values
            </Typography>
            <SymbolsDisplay symbols={[...symbols]} />
            </Grid>

          {/* Patterns Section */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
              Winning Patterns
            </Typography>
            <PatternsDisplay patterns={[...patterns]} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PayTable;
