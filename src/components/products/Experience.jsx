import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import CountDown from '../../animation/CountDown';
import speakerImg from '../../assets/images/speaker.webp';
import { useTranslation } from 'react-i18next';
export default function MusicBanner() {
    const { t } = useTranslation();
    const bannerRenderer = ({ days, hours, minutes, seconds, completed }) => { 
    if (completed) return <Typography color="white">{t("Offer Ended")}</Typography>;
  
    const circleStyle = {
        width: { xs: 35, sm: 42, md: 55, lg: 62 },
        height: { xs: 35, sm: 42, md: 55, lg: 62 },
        borderRadius: "50%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    };

    return (
        <Box sx={{ display: "flex", gap: { xs: 1, sm: 2, md: 3 } }}>
            {[
            { val: days, lab: t("Days") },
            { val: hours, lab: t("Hours") },
            { val: minutes, lab: t("Min") },
            { val: seconds, lab: t("Sec") }
            ].map((item, index) => (
            <Box key={index} sx={circleStyle}>
                <Typography sx={{ fontWeight: 700, fontSize: {xs: "14px", sm: "16px"}, lineHeight: 1 }}>
                    {String(item.val).padStart(2, '0')}
                </Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: 500 }}>
                    {item.lab}
                </Typography>
            </Box>
            ))}
        </Box>
    );
  };

  return (    
    <Box sx={{ backgroundColor: "black", borderRadius: 2, p: { xs: 2,  sm: 4, md: 6 }, position: "relative", overflow: "hidden", background: {
            xs: "radial-gradient(circle at center, #2e2e2e 0%, black 100%)",
            md: "radial-gradient(circle at 75% 50%, #2e2e2e 0%, black 70%)"}}}>
        <Grid spacing={4} alignItems="center" sx={{display: "flex", justifyContent:{xs: "center", md: "space-evenly"}}}>
            <Grid item xs={12} sm={6} sx={{ zIndex: 2, flexDirection: "column", justifyContent:{xs: "center", md: "space-evenly"} }}>
                <Typography sx={{ color: "primary.main", fontWeight: 600, fontSize: { xs: "12px", md: "18px", lg: "20px" }, mb: 2, textShadow: "0 2px 6px rgba(255,255,255,0.35), 0 4px 12px rgba(255,255,255,0.25)"}}>
                    {t("Categories")}
                </Typography>
                
                <Typography variant="h2" sx={{ color: "white", fontWeight: 600,  mb: 4, fontSize: { xs: "1rem", sm: "1.4rem", md: "2rem", lg: "3rem" }, lineHeight: 1.2, whiteSpace: "normal", wordWrap: "break-word",  textAlign: "left", overflowWrap: "break-word", maxWidth: { xs: "100%", sm: "90%", md: "80%" } }}>
                    {t("EYME")}
                </Typography>

                <Box sx={{ mb: 5 }}>
                    <CountDown customRenderer={bannerRenderer} />
                </Box>

                <Button variant="contained" sx={{ backgroundColor: "primary.main", color: "white", px: { xs: 2, md: 4 }, py: { xs: 1, md: 2 }, fontSize: { xs: "10px", md: "14px", lg: "16px" }, textTransform: "none", fontWeight: 600, boxShadow: "0px 0px 15px #db444427", animation: "pulse 2.5s infinite", '&:hover': { bgcolor: "#db44449d" } }}>
                    {t("BN")}
                </Button>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: "center", zIndex: 1, position: "relative" }}>
                <Box sx={{ position: 'absolute', width: { xs: "150px", md: "380px", lg: "400px" }, height: { xs: "150px", md: "380px", lg: "400px" }, background: 'rgba(255, 255, 255, 0.05)', filter: 'blur(50px)', borderRadius: '50%', zIndex: -1 }} />
                <Box component="img" src={speakerImg} alt="Speaker"
                sx={{
                    width: "100%",
                    maxWidth: {xs: "180px", sm: "220px", md: "430px", lg: "550px"},
                    height: "auto",  
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "fadeInUp 1s ease-out",
                    filter: "drop-shadow(0px 0px 30px rgba(255,255,255,0.1))"
                }}/>
            </Grid>
        </Grid>
    </Box>

  );
}