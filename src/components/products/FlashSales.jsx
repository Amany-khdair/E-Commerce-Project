import React, { useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Box, Button, Card, CardActionArea, CircularProgress, IconButton, Rating, Typography, Stack, Grid } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useNavigate } from 'react-router-dom';
import CountDown from '../../animation/CountDown';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';
import useWishlist from '../../hooks/useWishlist';
import useAuthStore from '../../store/authStore';
import NotSignedModal from '../modal/NotSignedModal';

export default function FlashSales() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useProducts();
  const { t, i18n } = useTranslation();
  
  const toggleWishlist = useWishlist((state) => state.toggleWishlist);
  const wishlist = useWishlist((state) => state.wishlist);
  
  const {mutate: addToCart, isPending} = useAddToCart();   
 
  const token = useAuthStore(state=>state.token);
  const [openNotSignedModal, setOpenNotSignedModal] = useState(false);

  const products = data?.response?.data?.slice(0, 8) ?? [];  
  const scrollRef = useRef();
  
  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    );

  if (isError)
    return (
      <Typography sx={{ color: "red", textAlign: "center", py: 6 }}>
        {t("Something went wrong")}
      </Typography>
    );

  const xScroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box sx={{ width: 15, height: 35, bgcolor: "primary.main", borderRadius: 1 }} />
            <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
              {t("Today's")}
            </Typography>
          </Box>

          <Box sx={{display: "flex", gap: {xs: 1, sm: 3}, alignItems: {sm: "flex-start", md: "center"},  flexDirection:{xs: "column", sm: "column", md: "row"}}}>
            <Typography variant="h4" fontWeight={600}>
              {t("FlashSales")}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <CountDown />
            </Box>
          </Box>                       
        </Box>             
        
        {/* Arrows */}    
        <Box sx={{display: "flex", justifyContent: "flex-end", gap: 1, mt: 1  }}>
          <IconButton onClick={() => xScroll(i18n.language === "ar" ? "right" : "left")}>
            <ArrowBackIosNewIcon 
              fontSize="small" 
              sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} 
            />
          </IconButton>

          <IconButton onClick={() => xScroll(i18n.language === "ar" ? "left" : "right")}>
            <ArrowForwardIosIcon 
              fontSize="small" 
              sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} 
            />
          </IconButton>
        </Box>

        {/* Products */}
        <Box container spacing={2}
          ref={scrollRef}
          sx={{
            display: "flex",            
            gap: {xs: 4.5, md: 2},
            overflowX: "auto",
            mt: 3,
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" }
          }}
        >
          {products.map((product) => {
            const isCurrentlyLiked = wishlist.some(item => item.id === product.id);

            return (
              <Box key={product.id} sx={{flex: "0 0 auto", width: {xs: 250, sm: 260, md: 280}}}>
                <Card xs={12} sm={6} md={3}
                  key={product.id}
                  sx={{
                    width: 280,
                    borderRadius: "10px",                                                                                 
                    textAlign: "center",
                    position: "relative",
                    border: '1px solid #f0f0f0',
                    transition: "0.3s",
                    '&:hover': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transform: 'translateY(-4px)' },
                    '&:hover .action-buttons': { opacity: 1 },
                    '&:hover .add-to-cart': { opacity: 1, bottom: 0 },
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Discount Badge */}
                  <Box sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "#DB4444",
                    color: "#fff",
                    px: 1,
                    py: "2px",
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    zIndex: 3
                  }}>
                    -{Math.round(product.discount)}%
                  </Box>

                  {/* Image + Hover Buttons */}
                  <Box sx={{ bgcolor: '#F5F5F5', position: 'relative', height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <Stack className="action-buttons" spacing={1} sx={{ position: 'absolute', top: 12, right: 12, opacity: 0, transition: '0.3s', zIndex: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => toggleWishlist(product)}
                        sx={{ bgcolor: isCurrentlyLiked ? 'primary.main' : 'white', color: isCurrentlyLiked ? 'white' : 'black', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                      >
                        <FavoriteBorderOutlinedIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => navigate(`/details/${product.id}`)}
                        sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>

                    </Stack>

                    <Box component="img" src={product.image} alt={product.name} sx={{ width: '70%', height: 180, objectFit: 'contain', transition: "0.5s", "&:hover": {transform: "scale(1.2)" } }} />

                    <Button
                      className="add-to-cart"
                      fullWidth
                      onClick={() => !token ? setOpenNotSignedModal(true) : addToCart({ ProductId: product.id, Count: 1 })}
                      disabled={isPending}
                      sx={{
                        position: 'absolute', bottom: -50, left: 0, opacity: 0, transition: '0.3s',
                        bgcolor: 'black', color: 'white', borderRadius: 0, py: 1.5,
                        '&:hover': { bgcolor: '#333' }
                      }}
                    >
                      {t("ATC")}
                    </Button>
                  </Box>

                  {/* Card Content */}
                  <CardActionArea sx={{ p: 2 }} onClick={() => navigate(`/details/${product.id}`)}>
                    <Typography fontWeight={700} noWrap sx={{ mb: 1 }}>{product.name}</Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "space-evenly" }}>
                        <Typography fontWeight={700} color="#DB4444">${product.price}</Typography>
                        <Typography sx={{ color: "gray", textDecoration: "line-through" }}>
                          ${(product.price + product.price * (product.discount / 100)).toFixed(0)}
                        </Typography>
                      </Box>
                      <Rating value={product.rate} size="small" readOnly precision={0.5} />
                    </Stack>
                  </CardActionArea>        
                </Card>
              </Box>            
            )
          })}
        </Box>

        {/* View All */}
        <Box textAlign="center" mt={4}>
          <Button
            component={Link}
            to="/allProducts"
            variant="contained"
            sx={{ px: "30px", py: "10px", textTransform: "none" }}
          >
            {t("VAP")}
          </Button>
        </Box>
      </Box>
      <NotSignedModal open={openNotSignedModal} onClose={()=> setOpenNotSignedModal(false)}/>
    </>
  );
}
