import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


export default function TopBar() {
  const { t, i18n } = useTranslation();

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
        zIndex: 9999,
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
      <Typography component={Link} to="/AllProducts" sx={{display: "inline-block", mt: 2, color: "#fff", textDecoration: "underline", fontSize: { xs: '10px', sm: '14px', md: '16px', lg: '18px' }}}>
             {t("SN")}
      </Typography>
      </Typography>

      <Button
        onClick={toggleLanguage}
        variant="contained"
        size="small"
        sx={{
          textTransform: 'none',
          background: 'linear-gradient(90deg, #FF7A18, #AF002D)',
          color: '#fff',
          fontWeight: 600,
          borderRadius: 2,
          px: 2,
          py: 0.7,
          "&:hover": { 
            background: 'linear-gradient(90deg, #AF002D, #FF7A18)',
            transform: 'scale(1.05)',
            transition: 'all 0.3s ease'
          },
          boxShadow: '0 4px 12px rgba(255,122,24,0.4)'
        }}
      >
        {i18n.language === 'ar' ? 'AR' : 'EN'}
      </Button>
    </Box>
  );
}
