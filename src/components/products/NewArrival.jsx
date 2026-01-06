import { Box, Button, Typography, Container } from '@mui/material';
import React from 'react';
import playstation from '../../assets/images/arrivals/playstation.webp';
import womanHat from '../../assets/images/arrivals/womanWearingHat.webp';
import speakers from '../../assets/images/arrivals/speakers.webp';
import perfume from '../../assets/images/arrivals/perfume.webp';
import { Link } from 'react-router-dom';

export default function NewArrival() {
  return (
    <>    
        <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
            {/* Header */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box sx={{ width: 15, height: 35, backgroundColor: "primary.main", borderRadius: 1 }} />
                    <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
                        Featured
                    </Typography>
                </Box>
        
                <Box sx={{display: "flex", gap: {xs: 1, sm: 3}, alignItems: {sm: "flex-start", md: "center"},  flexDirection:{xs: "column", sm: "column", md: "row"}}}>
                    <Typography variant="h4" fontWeight={600}>
                        New Arrival
                    </Typography>                    
                </Box>                       
            </Box>
        </Box>

        {/* Grid Layout */}
        <Box sx={{ display: "grid", gap: 2, height: { xs: "auto", md: "600px" }, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
            gridTemplateRows: { xs: "repeat(4, 350px)", md: "1fr 1fr" },
            gridTemplateAreas: {
                xs: `
                "main"
                "women"
                "speakers"
                "perfume"
                `,
                md: `
                "main women"
                "main cards"
                `,
            },
            }}
        >
        {/* PlayStation */}
            <Box sx={{ gridArea: "main", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", backgroundColor: "black", borderRadius: 1 }}>
                <Box component="img" src={playstation} alt="playstation" sx={{ width: "100%", height: "100%", position: "absolute", objectFit: "contain", bottom: 0}}/>
                <ContentOverlay title="PlayStation 5" description="Black and White version of the PS5 coming out on sale." />
            </Box>

            {/* Women */}
            <Box
                sx={{ gridArea: "women", position: "relative", overflow: "hidden", backgroundColor: "#0D0D0D", borderRadius: 1}}>
                <Box component="img" src={womanHat} alt="Womens Collections" sx={{ width: "auto", height: "100%", position: "absolute", objectFit: "cover", right: 0}}/>
                <ContentOverlay title="Women's Collections" description="Featured woman collections that give you another vibe." />
            </Box>

            {/* Speakers and Perfume */}
            <Box sx={{ gridArea: { xs: "speakers", md: "cards" }, height: {xs: 600, sm: "auto"}, display: "grid", gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr"}, gap: 3, objectFit: "cover" }}>
                {/* Speakers */}
                <Box sx={{ position: "relative", backgroundColor: "black", borderRadius: 1, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component="img" src={speakers} sx={{ width: "80%", opacity: 0.8 }} />
                    <ContentOverlay title="Speakers" description="Amazon wireless speakers" small />
                </Box>

                {/* Perfume */}
                <Box sx={{ position: "relative", backgroundColor: "black", borderRadius: 1, overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component="img" src={perfume} sx={{ width: "80%", opacity: 0.8 }} />
                    <ContentOverlay title="Perfume" description="GUCCI INTENSE OUD EDP" small />
                </Box>
            </Box>
        </Box>
    </>
  );
}
const ContentOverlay = ({ title, description, small = false }) => (
    <Box sx={{ position: "absolute", bottom: small ? 15 : 25, left: small ? 15 : 25, color: "#fff", zIndex: 2, maxWidth: "250px" }}>
        <Typography variant={small ? "h6" : "h5"} fontWeight="bold" sx={{ mb: 1 }}>
            {title}
        </Typography> 
        <Typography variant="body2" sx={{ mb: 1.5, opacity: 0.9 }}>
            {description}
        </Typography>
        <Typography component={Link} variant="body1" to="/allProducts" sx={{color: "#fff", fontWeight: 500, textDecoration: "underline", cursor: "pointer", "&:hover": { color: "#ccc" } }}>
            Shop Now
        </Typography>
    </Box>
);