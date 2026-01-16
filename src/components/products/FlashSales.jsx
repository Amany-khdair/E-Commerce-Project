import React, { useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Rating,
  Typography
} from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useNavigate } from 'react-router-dom';
import CountDown from '../../animation/CountDown';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

export default function FlashSales() {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const { isLoading, isError, data } = useProducts();

  const products = data?.response?.data?.slice(0, 8) ?? [];  const scrollRef = useRef();
  const {mutate: addToCart, isPending} = useAddToCart();   
  const { t, i18n } = useTranslation();

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

  const handleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id) // un-like
        : [...prev, id] // like
    );
  };

  return (
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

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          overflowX: "auto",
          mt: 3,
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" }
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              flex: "0 0 260px",
              borderRadius: "10px",             
              height: 330,
              p: 2,                                  
              textAlign: "center",
              position: "relative",
              transition: "0.5s",
              "&:hover .hover-icons": { opacity: 1 },            
              "&:hover img": { transform: "scale(1.2)" },                   
              "&:hover .hover-btn": { opacity: 1 },
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >

            {/* Badge */}
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

            {/* Hover Icons */}
            <Box
              className="hover-icons"
              sx={{
                opacity: 0,
                transition: "all 0.5s",
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 4
              }}
            >
              {/* Like */}
              <IconButton
                size="small"
                onClick={() => handleLike(product.id)}
                sx={{
                      width: 34,
                      height: 34,
                      bgcolor: likedProducts.includes(product.id)
                        ? "primary.main"
                        : "#fff",
                      transition: "0.5s",  
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "#fff",
                      },
                      "&:hover svg": {
                          color: "#fff"
                      },
                    }}
              >
                <FavoriteBorderOutlinedIcon
                  sx={{ color: likedProducts.includes(product.id) ? "#fff" : "black" }}
                />
              </IconButton>

              {/* View */}
              <IconButton
                size="small"
                onClick={() => navigate(`/details/${product.id}`)}
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "#fff",
                  transition: "0.5s",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#fff",
                  },
                  "&:hover svg": {
                      color: "#fff"
                  }
                }}
              >
                <VisibilityOutlinedIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>

            {/* Image */}
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                height: 180,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1
              }}
            >
              <img
                src={product.image} alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "0.5s"
                }}
              />
            </Box>

            {/* Title */}
            <Typography fontWeight={600} fontSize="0.9rem">
              {product.name}
            </Typography>

            {/* Price */}
            <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "space-evenly" }}>
              <Typography fontWeight={700} color="#DB4444">
                ${product.price}
              </Typography>

              <Typography sx={{ color: "gray", textDecoration: "line-through" }}>
                ${(product.price + product.price * (product.discount / 100)).toFixed(0)}
              </Typography>
            </Box>

            {/* Rating */}
            <Rating
              value={product.rate}
              precision={0.5}
              readOnly
              size="small"
              sx={{ mt: 1 }}
            />

            <Button className="hover-btn" fullWidth onClick={()=>addToCart({ProductId:product.id, Count: 1})} disabled={isPending}
              sx={{
                opacity: 0,
                transition: "0.5s",
                bgcolor: "black",
                position: "absolute",
                bottom: 10,
                left: "50%",    
                transform: "translateX(-50%)",                              
                color: "#fff",
                textTransform: "none",
                py: "6px",
                borderRadius: 1,
                "&:hover": { bgcolor: "#222" }
              }}
            >
              {t("ATC")}
            </Button>
          </Card>
        ))}
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
  );
}
