import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useThemeStore from '../../store/useThemeStore';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function TopBar() {
  const { t, i18n } = useTranslation();
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const toggleLanguage = () => {
    const newLng = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLng);
  }

  return (
    <Box 
      sx={{
        width: '100%',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 6 },
        py: 1.2,
        fontFamily: 'Poppins, sans-serif', 
        fontWeight: 500,
        position: 'relative',
        top: 0,
        zIndex: 10,
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600, 
          fontSize: {xs: "9px", sm: "12px"},
          letterSpacing: 0.5,
          textTransform: 'uppercase'
        }}
      >
        {t("Summer Sale")}{" "} 
      <Typography component={Link} to="/AllProducts" sx={{display: "inline-block", mt: 2, color: mode === 'dark' ? "#fff" : "#DB4444", textDecoration: "underline", fontSize: { xs: '10px', sm: '14px', md: '16px', lg: '18px' }}}>
             {t("SN")}
      </Typography>
      </Typography>

        <Box sx={{display: "flex", gap: 2}}>
          <Button
            onClick={toggleLanguage}
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none',
              background: 'linear-gradient(90deg, #DB4444, #7A0010)',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              py: 0.7,
              "&:hover": { 
                background: 'linear-gradient(90deg, #7A0010, #DB4444)',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease'
              },
              boxShadow: '0 4px 12px rgba(255,122,24,0.4)'
            }}
          >
            {i18n.language === 'ar' ? 'AR' : 'EN'}
          </Button>

          <IconButton
            onClick={toggleTheme}
            sx={{
              borderRadius: "50%",
              p: 1,
              bgcolor: mode === 'dark' ? "#fff" : "#DB4444",
              color: mode === 'dark' ? "#515151ff" : "#fff",
              transition: "all 0.4s ease",
              "&:hover": {
                transform: "rotate(20deg) scale(1.1)",
                boxShadow: mode === 'dark' 
                  ? "0 4px 15px rgba(255,255,255,0.6)" 
                  : "0 4px 15px rgba(219,68,68,0.6)",
              }
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      
    </Box>
  );
}
