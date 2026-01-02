import React, { useEffect, useState } from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Categories from '../../components/categories/Categories'
import Snowfall from 'react-snowfall'
import Products from '../../components/products/Products'
import { slides } from '../../functions/slides'
import AllProducts from './../products/AllProducts';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import useAuthStore from '../../store/authStore'
import FlashSales from '../../components/products/FlashSales'
export default function Home() {
  const [currentImg, setCurrentImg] = useState(0);
  const token = useAuthStore(state=>state.token);
  const user = useAuthStore(state=>state.user);
  console.log(user);

  const prevSlide = ()=>{
    return setCurrentImg(currentImg === 0? slides.length - 1 : currentImg - 1);
  }
  const nextSlide = ()=>{
    return setCurrentImg(currentImg === slides.length - 1? 0 : currentImg + 1);
  }

  useEffect(() =>{
    const timerHandle = setInterval(()=>{
      nextSlide();
    }, 5000);
    return () => clearInterval(timerHandle);
  }, [currentImg]);

  return (
    <>
      <Snowfall color='#82C3D9' style={{position: 'fixed', zIndex: 10, pointerEvents: 'none'}}/>        

      {token && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: 50, sm: 65, md: 70 },
            left: "50%",
            transform: "translateX(-50%)",
            backdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            color: "#fff",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1.2, sm: 1.5, md: 2 },
            borderRadius: 5,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
            fontWeight: 700,
            textAlign: "center",
            animation: "slideIn 1s ease forwards, pulse 2.5s infinite",
            zIndex: 10,
            whiteSpace: { xs: "normal", sm: "nowrap" }
          }}
        >
          ⚜️ Welcome {user?.name} ⚜️

          <Box
            component="div"
            sx={{
              mt: 1.5,
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              letterSpacing: 1,
              overflow: "hidden",
              borderRight: "2px solid #DB4444",
              width: "0ch",
              animation: "typing 3s steps(37) forwards 1.2s, blink .7s step-end infinite alternate"
            }}
          >
            Ready to explore our latest products?
          </Box>

          <style>
            {`
            @keyframes slideIn {
              from { opacity: 0; transform: translate(-50%, -20px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }

            @keyframes pulse {
              0%   { box-shadow: 0 0 8px rgba(219,68,68,0.4); }
              50%  { box-shadow: 0 0 28px rgba(219,68,68,1); }
              100% { box-shadow: 0 0 8px rgba(219,68,68,0.4); }
            }

            @keyframes typing {
              from { width: 0 }
              to   { width: 37ch }
            }

            @keyframes blink {
              from { border-color: transparent }
              to   { border-color: #DB4444 }
            }
            `}
          </style>
        </Box>
      )}

      <Box sx={{position: "relative", py: 8, width: "100%", overflow: "hidden"}}>
        {slides.map((slide, i) => (
          <Box key={slide.id} sx={{display: i === currentImg? "flex" : "none", alignItems: "center", backgroundColor: "#000", justifyContent: "space-between", color: "#fff", borderRadius: 2, p: 3}}>
            <Box sx={{mx: "auto", px: 3, pt: {xs: 5, sm: 6}}}>
              <Typography variant="h6" sx={{fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }}}>{slide.title}</Typography>
              <Typography variant="h4" sx={{my: 1, fontWeight: "bold", fontSize: { xs: '18px', sm: '20px', md: '28px', lg: '32px' }}}>{slide.subtitle}</Typography>
              <Typography component={Link} to="/AllProducts" sx={{display: "inline-block", mt: 2, color: "#fff", textDecoration: "underline", fontSize: { xs: '10px', sm: '14px', md: '16px', lg: '18px' }}}>Shop Now &rarr;</Typography>
            </Box>
            <Box component="img" src={slide.img} alt={slide.title} sx={{height: {xs: 150, sm: 250, md: 350, lg: 500}}}></Box>
          </Box>
        ))}

        <IconButton onClick={prevSlide} sx={{position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", color: "#fff"}}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={nextSlide} sx={{position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)", color: "#fff"}}>
          <ArrowForwardIos />
        </IconButton>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
          {slides.map((_, index) => (
            <Box key={index} onClick={() => setCurrentImg(index)}
              sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: index === currentImg ? "primary.main" : "#888", cursor: "pointer"}}
            />
          ))}
        </Box>
      </Box>
      
      <Categories />

      <FlashSales />
      <Products/>
    </>
  )
}
