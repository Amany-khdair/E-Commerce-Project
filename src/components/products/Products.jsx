import React, { useRef } from 'react'
import { useProducts } from '../../hooks/useProducs'
import { Box, Button, Card, CircularProgress, Grid, IconButton, Rating, Typography } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
export default function Products() {
    const refScroll = useRef();
    const {isLoading, isError, data} = useProducts();
    
    if(isLoading)
        return(
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", py: 5}}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        )
  
    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>Something went wrong!</Typography>
    
    const xScroll = (arrow) => {
    if (!refScroll.current) return;
    refScroll.current.scrollBy({
      left: arrow === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };
  
  const products = data.slice(0,8); //to get the first 8 products

  return (
    <>
        <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Box sx={{display: "flex", gap: 2, alignItems: "center", alignContent:"center"}}>
                    <Box sx={{width:"15px", height: "35px", borderRadius: "4px", backgroundColor: "primary.main", alignItems: "center"}}></Box>
                    <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600}}>
                        Our Products
                    </Typography>
                </Box>
                
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Explore Our Products
                </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
                <IconButton onClick={()=>xScroll("left")}>
                <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>

                <IconButton onClick={()=>xScroll("right")}>
                <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Box>
            
            <Grid container spacing={3} ref={refScroll} sx={{
                display: "flex", flexWrap: "nowrap", overflowX: "auto", gap: 2, mt: 3, scrollBehavior: "smooth", "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
                }}>
                {products.map((product) => (
                <Grid size={3} xs={12} sm={6} md={3} key={product.id} sx={{flex: "0 0 auto"}}>
                    <Card sx={{Width: 250, borderRadius: "8px", p: 2, my: 2, mx: "2px", textAlign: "center", position: "relative",
                        transition: "0.5s", "&:hover .hover-icons": { opacity: 1 }, "&:hover .hover-button": {opacity: 1}, "&:hover img":{ transform: "scale(1.2)"}, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
                        }}>

                        <Box sx={{ overflow: "hidden", position: "relative" }}>
                            {/* {product.isNew && (<Box sx={{
                                    position: "absolute", top: 8, left: 8, bgcolor: "green", color: "#fff", px: 1, borderRadius: 1, fontSize: 12, zIndex: 2,
                                }} >
                                NEW
                                </Box>
                            )} */}
                            {/* Icons on hover */}
                            <Box className="hover-icons" sx={{display: "flex", flexDirection: "column", gap: 1, opacity: 0, position: "absolute", top: 10, right: 10, transition: "0.5s", zIndex: 3}}>
                                <IconButton size='small' sx={{width: 34, height: 34, backgroundColor: "#ffff", transition: "0.5s", "&:hover":{ backgroundColor: "primary.main", color: "#fff", transition: "scale(1.1)"}, "&:hover svg":{color: "#fff"} }}>
                                    <FavoriteBorderOutlinedIcon sx={{color: "black"}}/>
                                </IconButton>

                                <IconButton size='small' sx={{width: 34, height: 34, backgroundColor: "#ffff", transition: "0.5s", "&:hover":{ backgroundColor: "primary.main", color: "#fff", transition: "scale(1.1)"}, "&:hover svg":{color: "#fff"}}}>
                                    <VisibilityOutlinedIcon  sx={{color: "black"}}/>
                                </IconButton>
                            </Box>

                            <img src={product.thumbnail} alt={product.title} style={{
                                width: "100%", height: 180, objectFit: "contain", padding: "10px", transition: "0.5s"}}
                            />                                               
                        </Box>

                        <Typography fontWeight={500} mt={1}>
                        {product.title}
                        </Typography>
                        <Typography color="primary.main" fontWeight={600}>
                        ${product.price}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center", gap: "4px"}}>
                            <Rating value={product.rating} precision={0.5} readonly size="small" sx={{color: "orange"}}/>
                            <Typography variant="body2" color="text.secondary">
                                ({product.rating})
                            </Typography>
                        </Box>
                        <Box className="hover-button" fullWidth sx={{opacity: 0, position: "absolute", bottom: 85, right: "30%", transition: "0.5s", zIndex: 3}}>
                            <Button variant="contained"  sx={{mt: 2, width: "100%", backgroundColor: "#333", textTransform: "none" }}>
                                Add To Cart
                            </Button>
                        </Box>
                        
                    </Card>
                </Grid>
                ))}
            </Grid>
            <Box textAlign="center" mt={4}>
                <Button variant="contained" sx={{backgroundColor: "primary.main", p: "10px", px: "25px", textTransform: "none"}}>View All Products</Button>
            </Box>
        </Box>
    </>
  )
}
