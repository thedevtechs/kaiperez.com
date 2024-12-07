import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <Container>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h1">
          Page Not Found
        </Typography>
        <Typography variant="body1">
          Redirecting you to the homepage...
        </Typography>
        <CircularProgress />
      </Box>
    </Container>
  );
} 