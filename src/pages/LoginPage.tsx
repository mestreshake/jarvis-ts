import { useEffect } from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import * as motion from 'motion/react-client';
import starkLogo from '../assets/stark_logo.png';
import avengersTowerBg from '../assets/hero.jpg';
import i18nTexts from '../i18nTexts';
import LoginForm from '../components/LoginForm';

const cardVariants = {
  offscreen: { y: 200, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { bounce: 0.4, duration: 0.8 },
  },
};

export default function LoginPage() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        width: '100vw',
        backgroundImage: {
          xs: 'none',
          md: `url(${avengersTowerBg})`,
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: { xs: 'center', md: 'stretch' },
        justifyContent: { xs: 'center', md: 'flex-end' },
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.8 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.div
          variants={cardVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              m: 0,
              bgcolor: 'transparent',
            }}
          >
            <Paper
              elevation={8}
              sx={{
                width: { xs: '100%', md: 420 },
                height: { xs: 'auto', md: '100dvh' },
                borderRadius: { xs: 0, md: '24px 0 0 24px' },
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(255,255,255,0.85)',
                p: { xs: 3, sm: 4, md: 6 },
              }}
            >
              <Stack spacing={3} alignItems="center">
                <Box sx={{ width: 300, mb: 1 }}>
                  <img
                    src={starkLogo}
                    alt="Stark Tower Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      imageRendering: 'auto',
                    }}
                    loading="eager"
                  />
                </Box>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  style={{ width: '100%' }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 1, textAlign: 'center' }}
                  >
                    {i18nTexts.login.subtitle}
                  </Typography>
                </motion.div>
                <LoginForm />
              </Stack>
            </Paper>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}
