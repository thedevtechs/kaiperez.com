import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, VolumeOff as VolumeOffIcon, VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import CasinoIcon from '@mui/icons-material/Casino';
import { SOUNDS } from './sounds';
import { SYMBOLS, WIN_PATTERNS, REEL_COUNT, ROW_COUNT, DEFAULT_BET, MAX_BET, MIN_BET, BET_INCREMENT } from './constants';
import PayTable from '../../components/PayTable';
import { StyledBackground } from '../../components/slots/StyledComponents';
import { ReelsGrid } from '../../components/slots/ReelsGrid';
import NearWinDisplay from '../../components/slots/NearWinDisplay';
import WinDisplay from '../../components/WinDisplay';

const SlotMachine: React.FC = () => {
  const generateRandomSymbol = () => {
    const weights = [1, 8, 12, 12, 10, 3, 5]; // Adjust these as needed
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return i;
      }
    }
    return weights.length - 1;
  };
  
  const generateReelGrid = () => {
    return Array(ROW_COUNT).fill(null).map(() =>
      Array(REEL_COUNT).fill(null).map(() => generateRandomSymbol())
    );
  };
  const [isClient, setIsClient] = useState(false);
  const [isFirstSpin, setIsFirstSpin] = useState(true);
  const [nearWin, setNearWin] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [reels, setReels] = useState<number[][]>(() => generateReelGrid());
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(DEFAULT_BET);
  const [lastWin, setLastWin] = useState<any | null>(null);
  const [reelStates, setReelStates] = useState<Array<'spinning' | 'stopping' | 'stopped'>>(Array(REEL_COUNT).fill('stopped'));
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [showPaytable, setShowPaytable] = useState(false);

  const [reelResults, setReelResults] = useState<number[][]>(
    Array(ROW_COUNT).fill(Array(REEL_COUNT).fill(0))
  );
  useEffect(() => {
    setIsClient(true);
    const savedMuted = localStorage.getItem('slotMachineMuted');
    setIsMuted(savedMuted ? JSON.parse(savedMuted) : false);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    Object.entries(SOUNDS).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      if (key === 'BG_MUSIC') {
        audio.loop = true;
        bgMusicRef.current = audio;
        if (!isMuted) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              console.log('Autoplay prevented. User interaction required.');
            });
          }
        }
      } else {
        audioRefs.current[key] = audio;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, [isClient, isMuted]);

  const checkWinPatterns = (grid: number[][]) => {
    let totalWin = { winAmount: 0, matches: [] as number[][], patterns: [] };

    WIN_PATTERNS.forEach((pattern) => {
      const symbolsInPattern = pattern.pattern.map(
        ([row, col]) => grid[row][col]
      );
      const firstSymbol = symbolsInPattern[0];
      const allSame = symbolsInPattern.every(symbol => symbol === firstSymbol);

      if (allSame) {
        const symbol = SYMBOLS[firstSymbol];
        const winAmount = Math.floor(symbol.value * pattern.multiplier * (bet / DEFAULT_BET));

        totalWin.winAmount += winAmount;
        totalWin.matches = [...totalWin.matches, ...pattern.pattern];
        totalWin.patterns.push({
          pattern: pattern.pattern,
          name: pattern.name,
          amount: winAmount
        });
      }
    });

    return totalWin;
  };

  const checkNearWin = (grid: number[][]) => {
    for (const pattern of WIN_PATTERNS) {
      const symbols = pattern.pattern.map(([row, col]) => grid[row][col]);
      const firstSymbol = symbols[0];
      const matchCount = symbols.filter(s => s === firstSymbol).length;
      
      if (matchCount === symbols.length - 1) {
        return `Almost hit ${pattern.name}!`;
      }
    }
    return null;
  };

  const handleWinResult = async (winResult: any, finalGrid: number[][]) => {
    if (winResult.winAmount > 0) {
      if (!isMuted) {
        if (winResult.winAmount >= bet * 20) {
          playSound('JACKPOT');
        } else if (winResult.winAmount >= bet * 5) {
          playSound('WIN');
        }
      }

      setCredits(prev => {
        const newCredits = prev + winResult.winAmount;
        localStorage.setItem('slotMachineCredits', newCredits.toString());
        return newCredits;
      });

      setLastWin(winResult);
    } else {
      const nearWinMessage = checkNearWin(finalGrid);
      if (nearWinMessage) {
        setNearWin(nearWinMessage);
        setTimeout(() => setNearWin(null), 2000);
      }
    }
  };

  const playSound = (soundKey: keyof typeof SOUNDS) => {
    const audio = audioRefs.current[soundKey];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const spin = async () => {
    if (spinning || credits < bet) return;

    setSpinning(true);
    setLastWin(null);
    playSound('SPIN');
    
    setCredits((prev) => {
      const newCredits = prev - bet;
      localStorage.setItem('slotMachineCredits', newCredits.toString());
      return newCredits;
    });

    const finalGrid = generateReelGrid();
    setReelResults(finalGrid);

    setReelStates(Array(REEL_COUNT).fill('spinning'));

    const baseSpinDuration = 1500;
    const stopDelay = 200;

    for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
      const reelStopTime = baseSpinDuration + (reelIndex * stopDelay);
      
      const spinInterval = setInterval(() => {
        setReels(prev => {
          return prev.map((row, rowIndex) => {
            const newRow = [...row];
            // Always show a random symbol for the current reel while spinning:
            newRow[reelIndex] = generateRandomSymbol();
            return newRow;
          });
        });
      }, 100);
      

      await new Promise(resolve => setTimeout(resolve, reelStopTime));
clearInterval(spinInterval);

// Now set final symbol:
setReels(prev => {
  return prev.map((row, rowIndex) => {
    const newRow = [...row];
    newRow[reelIndex] = finalGrid[rowIndex][reelIndex];
    return newRow;
  });
});

// Update reel state to stopping, then stopped:
setReelStates(prev => {
  const newStates = [...prev];
  newStates[reelIndex] = 'stopping';
  return newStates;
});

await new Promise(resolve => setTimeout(resolve, 500));

setReelStates(prev => {
  const newStates = [...prev];
  newStates[reelIndex] = 'stopped';
  return newStates;
});
    }

    setSpinning(false);

    const winResult = checkWinPatterns(finalGrid);
    handleWinResult(winResult, finalGrid);
  };

  const adjustBet = (amount: number) => {
    const newBet = Math.min(Math.max(bet + amount, MIN_BET), MAX_BET);
    setBet(newBet);
    playSound('BUTTON');
  };

  const VolumeButton = () => (
    <IconButton
      onClick={() => setIsMuted(!isMuted)}
      sx={{ 
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#ffd700'
      }}
    >
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Card 
        sx={{ 
          width: '100%',
          maxWidth: { xs: '100%', sm: '600px', md: '900px' },
          mx: 'auto',
          my: { xs: 1, sm: 4 },
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, #222 25%, #222 50%, #1a1a1a 50%, #1a1a1a 75%, #222 75%, #222 100%)',
          backgroundSize: '20px 20px',
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
          border: '1px solid #333',
          position: 'relative'
        }}
      >
        <VolumeButton />
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#ffd700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: '"Press Start 2P", cursive',
                mb: 2
              }}
            >
              <CasinoIcon sx={{ mr: 2, fontSize: 40 }} />
              Vegas Slots
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#00ff00',
                textShadow: '0 0 10px rgba(0,255,0,0.5)',
                fontFamily: 'monospace'
              }}
            >
              Credits: ${credits}
            </Typography>
          </Box>

          <ReelsGrid reels={reels} reelStates={reelStates} lastWin={lastWin} />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mb: 3,
            backgroundColor: '#222',
            p: 2,
            borderRadius: 2
          }}>
            <IconButton
              onClick={() => adjustBet(-BET_INCREMENT)}
              disabled={bet <= MIN_BET}
              sx={{ 
                backgroundColor: '#333',
                '&:hover': { backgroundColor: '#444' }
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                minWidth: 120, 
                textAlign: 'center',
                color: '#ffd700',
                lineHeight: '40px'
              }}
            >
              Bet: ${bet}
            </Typography>
            <IconButton
              onClick={() => adjustBet(BET_INCREMENT)}
              disabled={bet >= MAX_BET}
              sx={{ 
                backgroundColor: '#333',
                '&:hover': { backgroundColor: '#444' }
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={spin}
              disabled={spinning || credits < bet}
              sx={{ 
                minWidth: 200,
                height: 60,
                fontSize: '1.2rem',
                background: 'linear-gradient(45deg, #ff4081 30%, #ff9100 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4081 60%, #ff9100 90%)',
                }
              }}
            >
              {spinning ? 'Spinning...' : 'SPIN!'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowPaytable(true)}
              sx={{ 
                borderColor: '#ffd700',
                color: '#ffd700',
                '&:hover': {
                  borderColor: '#ffb700',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)'
                }
              }}
            >
              Paytable
            </Button>
          </Box>

          {lastWin && <WinDisplay win={lastWin} />}
          <PayTable
            open={showPaytable}
            onClose={() => setShowPaytable(false)}
            symbols={SYMBOLS}
            patterns={WIN_PATTERNS}
          />
          {nearWin && <NearWinDisplay message={nearWin} />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SlotMachine;