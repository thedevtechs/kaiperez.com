import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { SYMBOLS } from '../../pages/projects/constants';
import { StyledSlotSymbol } from './StyledComponents';

interface ReelsGridProps {
  reels: number[][];
  reelStates: Array<'spinning' | 'stopping' | 'stopped'>;
  lastWin: {
    matches: [number, number][];
    winAmount: number;
    patterns: any[];
  } | null;
}

export const ReelsGrid: React.FC<ReelsGridProps> = ({ reels, reelStates, lastWin }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: '#000',
        borderRadius: 3,
        border: '3px solid #333',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Grid container spacing={1}>
          {reels.map((row, rowIndex) => (
            <Grid item xs={12} key={rowIndex}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                {row.map((symbol, colIndex) => (
                  <StyledSlotSymbol
                    key={colIndex}
                    state={reelStates[colIndex]}
                    className={
                      lastWin?.matches.some(([r, c]) => r === rowIndex && c === colIndex) ? 'winning' : ''
                    }
                  >
                    <Box className="symbol-content">
                      <Box
                        className="symbol-wrapper"
                        sx={{
                          height: '90px',
                          width: '90px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            color: SYMBOLS[symbol].color,
                            userSelect: 'none',
                            fontSize: '3rem'
                          }}
                        >
                          {SYMBOLS[symbol].icon}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledSlotSymbol>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};
