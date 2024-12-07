import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, VolumeOff as VolumeOffIcon, VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import CasinoIcon from '@mui/icons-material/Casino';
import { SOUNDS } from './sounds';
import { SYMBOLS, WIN_PATTERNS, REEL_COUNT, ROW_COUNT, DEFAULT_BET, MAX_BET, MIN_BET, BET_INCREMENT } from './constants';
import PayTable from '../../components/PayTable';
import { ReelsGrid } from '../../components/slots/ReelsGrid';
import NearWinDisplay from '../../components/slots/NearWinDisplay';
import WinDisplay from '../../components/WinDisplay';
import NearWinsOverlay from '../../components/slots/NearWinsOverlay';

interface WinResult {
  winAmount: number;
  matches: [number, number][];
  patterns: {
    pattern: [number, number][];
    name: string;
    amount: number;
  }[];
}

const generateRandomSymbol = () => {
  const weights = [1, 8, 12, 12, 10, 3, 5];
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

const checkWinPatterns = (grid: number[][]) => {
  let totalWin = { winAmount: 0, matches: [] as number[][], patterns: [] as any[] };

  WIN_PATTERNS.sort((a, b) => b.multiplier - a.multiplier);

  WIN_PATTERNS.forEach((pattern) => {
    const symbolsInPattern = pattern.pattern.map(([row, col]) => grid[row][col]);
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

const checkAllNearWins = (grid: number[][], patterns: WinPattern[]) => {
  const nearWins = [];
  for (const pattern of patterns) {
    const symbols = pattern.pattern.map(([r, c]) => grid[r][c]);
    const firstSymbol = symbols[0];
    const matchCount = symbols.filter(s => s === firstSymbol).length;
    
    // Only consider near wins for patterns that would have paid well
    const potentialValue = SYMBOLS[firstSymbol].value * pattern.multiplier;
    if (matchCount === pattern.pattern.length - 1 && potentialValue >= 30) {
      nearWins.push({
        name: pattern.name,
        pattern: pattern.pattern,
        missedValue: potentialValue
      });
    }
  }
  return nearWins;
};

const SOUND_VOLUMES = {
  SPIN: 0.2,
  WIN: 0.7,
  JACKPOT: 1.0,
  COIN: 0.6,
  BUTTON: 1.0,
  BG_MUSIC: 0.5,
  MEGA_JACKPOT: 1.0,
  MAJOR_JACKPOT: 1.0,
  NEAR_WIN: 0.3,
} as const;

const SpinSoundManager = {
  currentIndex: 0,
  sounds: [] as HTMLAudioElement[],
  initialize: (src: string) => {
    SpinSoundManager.sounds = Array(2).fill(null).map(() => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = SOUND_VOLUMES.SPIN;
      return audio;
    });
  },
  play: () => {
    const currentSound = SpinSoundManager.sounds[SpinSoundManager.currentIndex];
    const nextSound = SpinSoundManager.sounds[(SpinSoundManager.currentIndex + 1) % 2];
    
    if (currentSound) {
      currentSound.volume = SOUND_VOLUMES.SPIN;
      currentSound.play();
      setTimeout(() => {
        if (nextSound) {
          nextSound.currentTime = 0;
          nextSound.volume = SOUND_VOLUMES.SPIN;
          nextSound.play();
          SpinSoundManager.currentIndex = (SpinSoundManager.currentIndex + 1) % 2;
        }
      }, (currentSound.duration * 1000) - 50);
    }
  },
  stop: () => {
    SpinSoundManager.sounds.forEach(sound => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  }
};

const SlotMachine: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [nearWin, setNearWin] = useState<string | null>(null);
  const [nearWins, setNearWins] = useState<{
    name: string;
    pattern: [number, number][];
    missedValue: number;
  }[]>([]);
  const [showNearWins, setShowNearWins] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
    const savedMuted = localStorage.getItem('slotMachineMuted');
    setIsMuted(savedMuted ? JSON.parse(savedMuted) : true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    Object.entries(SOUNDS).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      
      const volume = SOUND_VOLUMES[key as keyof typeof SOUNDS] || 1.0;
      audio.volume = volume;
      
      if (key === 'BG_MUSIC') {
        audio.loop = true;
        bgMusicRef.current = audio;
        if (!isMuted) {
          audio.play().catch(error => {
            console.warn('Background music autoplay prevented:', error);
          });
        }
      } else if (key === 'SPIN') {
        SpinSoundManager.initialize(src);
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
      SpinSoundManager.stop();
    };
  }, [isClient, isMuted]);

  // Add effect to handle background music when mute state changes
  useEffect(() => {
    if (bgMusicRef.current) {
      if (isMuted) {
        bgMusicRef.current.pause();
      } else {
        bgMusicRef.current.play().catch(error => {
          console.warn('Background music play prevented:', error);
        });
      }
    }
  }, [isMuted]);

  const playSound = (soundKey: keyof typeof SOUNDS) => {
    if (isMuted) return;
    
    if (soundKey === 'SPIN') {
      SpinSoundManager.play();
    } else {
      const audio = audioRefs.current[soundKey];
      if (audio) {
        audio.currentTime = 0;
        const volume = SOUND_VOLUMES[soundKey] || 1.0;
        audio.volume = volume;
        audio.play().catch(error => {
          console.warn(`Error playing sound ${soundKey}:`, error);
        });
      }
    }
  };

  const stopSpinSound = () => {
    SpinSoundManager.stop();
  };

  const handleWinResult = async (winResult: WinResult, finalGrid: number[][]) => {
    stopSpinSound();
    
    if (winResult.winAmount > 0) {
      const winMultiple = winResult.winAmount / bet;
      
      if (winMultiple >= 20) {
        playSound('JACKPOT');
      } else if (winMultiple >= 5) {
        playSound('WIN');
      } else {
        playSound('COIN');
      }

      setCredits(prev => {
        const newCredits = prev + winResult.winAmount;
        localStorage.setItem('slotMachineCredits', newCredits.toString());
        return newCredits;
      });

      setLastWin(winResult);
    } else {
      const nw = checkAllNearWins(finalGrid, WIN_PATTERNS);
      console.log('Near wins detected:', nw);
      if (nw.length > 0) {
        console.log('Setting near wins state');
        setNearWins(nw);
        setShowNearWins(true);
        playSound('NEAR_WIN');
      }
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
    setReelStates(Array(REEL_COUNT).fill('spinning'));

    // Start all reels spinning simultaneously
    const spinIntervals = Array(REEL_COUNT).fill(null).map((_, reelIndex) => {
      return setInterval(() => {
        setReels(prev => {
          return prev.map((row) => {
            const newRow = [...row];
            newRow[reelIndex] = generateRandomSymbol();
            return newRow;
          });
        });
      }, 50);
    });

    // Base timing configuration
    const baseSpinDuration = 500;
    const stopDelay = 100;

    // Stop reels one by one
    for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
      await new Promise(resolve => setTimeout(resolve, baseSpinDuration + (reelIndex * stopDelay)));
      
      // Clear the spinning interval for this reel
      clearInterval(spinIntervals[reelIndex]);

      setReelStates(prev => {
        const newStates = [...prev];
        newStates[reelIndex] = 'stopping';
        return newStates;
      });

      setReels(prev => {
        return prev.map((row, rowIndex) => {
          const newRow = [...row];
          newRow[reelIndex] = finalGrid[rowIndex][reelIndex];
          return newRow;
        });
      });

      await new Promise(resolve => setTimeout(resolve, 200));
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
      onClick={() => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        localStorage.setItem('slotMachineMuted', JSON.stringify(newMuted));
      }}
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
          <NearWinsOverlay nearWins={nearWins} open={showNearWins} onClose={() => setShowNearWins(false)} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SlotMachine;
