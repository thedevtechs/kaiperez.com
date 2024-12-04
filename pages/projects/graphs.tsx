import React from 'react';
import { Container, Grid, Typography, useTheme, useMediaQuery, Button, Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BitcoinPriceChart from '../../components/Graphs/BitcoinPriceChart';
import DogBreedChart from '../../components/Graphs/DogBreedChart';
import HousingMarketChart from '../../components/Graphs/HousingMarketChart';
import IncomeVsLifeExpectancyChart from '../../components/Graphs/IncomeVsLifeExpectancyChart'; // ← Import new component
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import styles from './projectsSingle.module.css';
import Link from 'next/link';

export default function DataDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Projects | Data Visualizations</title>
        <meta name="description" content="Interactive Data Visualizations" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Menu theme={'dark'} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
        <Link href="/projects">
          <span className={styles.backButton}>
            Back to Projects
          </span>
        </Link>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              Interactive Data Visualizations
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <BitcoinPriceChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <DogBreedChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <HousingMarketChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <IncomeVsLifeExpectancyChart />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
