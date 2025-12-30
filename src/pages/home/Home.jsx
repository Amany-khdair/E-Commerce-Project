import React, { useEffect, useState } from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Categories from '../../components/categories/Categories'
import Snowfall from 'react-snowfall'
import Products from '../../components/products/Products'
import { slides } from '../../functions/slides'
import AllProducts from './../products/AllProducts';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Home() {
  const [currentImg, setCurrentImg] = useState(0);

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
      
      
        <Box sx={{position: "relative", width: "100%", overflow: "hidden"}}>
          {slides.map((slide, i) => (
            <Box key={slide.id} sx={{display: i === currentImg? "flex" : "none", alignItems: "center", backgroundColor: "#000", justifyContent: "space-between", color: "#fff", borderRadius: 2, p: 3}}>
              <Box sx={{mx: "auto"}}>
                <Typography variant="h6">{slide.title}</Typography>
                <Typography variant="h4" sx={{my: 1, fontWeight: "bold"}}>{slide.subtitle}</Typography>
                <Typography component={Link} to="/AllProducts" sx={{display: "inline-block", mt: 2, color: "#fff", textDecoration: "underline"}}>Shop Now &rarr;</Typography>
              </Box>
              <Box component="img" src={slide.img} alt={slide.title} sx={{height: 500}}></Box>
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
      

      <Categories/>
      <Products/>
    </>
  )
}
