import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const [geofenceActive, setGeofenceActive] = useState(false);

  return (
    <div>
      <Head>
        <title>Silence - Spiritual Focus Dashboard</title>
        <meta name="description" content="Maintain spiritual focus with ML-powered app control" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Spiritual Focus Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {/* Geofence Status */}
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6" component="h2">
                Sacred Space Status
              </Typography>
              <Typography variant="h4" color={geofenceActive ? 'success.main' : 'error.main'}>
                {geofenceActive ? 'Active' : 'Inactive'}
              </Typography>
            </Item>
          </Grid>

          {/* Journal Entry */}
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6" component="h2">
                Daily Journal
              </Typography>
              <Typography variant="body1">
                Record your spiritual journey
              </Typography>
            </Item>
          </Grid>

          {/* Scripture Focus */}
          <Grid item xs={12} md={4}>
            <Item>
              <Typography variant="h6" component="h2">
                Scripture of the Day
              </Typography>
              <Typography variant="body1">
                "Be still, and know that I am God" - Psalm 46:10
              </Typography>
            </Item>
          </Grid>

          {/* App Control Status */}
          <Grid item xs={12}>
            <Item>
              <Typography variant="h6" component="h2">
                App Control Status
              </Typography>
              <Typography variant="body1">
                ML-powered app management active
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}