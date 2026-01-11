import React, { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Box, Button, Card, CircularProgress, Grid, IconButton, Rating, Typography, useMediaQuery } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

export default function Products() {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const { isLoading, isError, data } = useProducts();
  
  const products = data?.response?.data?.slice(0, 16) ?? [];  const isXs = useMediaQuery("(max-width:600px)");
  const {mutate: addToCart, isPending} = useAddToCart();   

  const isSm = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const isMd = useMediaQuery("(min-width:900px) and (max-width:1200px)");

  let cardW = isXs ? 140 : isSm ? 180 : isMd ? 200 : 240;
  let containerW = isXs ? 300 : isSm ? 500 : isMd ? 700 : 1000;

  let columnsPerPage = Math.floor(containerW / cardW);
  let shift = page * columnsPerPage * cardW;

  if (isLoading)
    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 10}}>
            <CircularProgress sx={{color: "primary.main"}}/>
        </Box>
    );

  if (isError)
    return (
      <Typography sx={{ color: "red", textAlign: "center", py: 6 }}>
        {t("Something went wrong")}
      </Typography>
    );

  const handleNext = () => {
    if (page < 1) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id) // un-like
        : [...prev, id] // like
    );
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: {xs: 2, md: 6}, my: {xs: 2, md: 5} }}>
      {/* Header */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{
              width: 15,
              height: 35,
              borderRadius: 1,
              bgcolor: "primary.main",
            }}
          />
          <Typography sx={{ color: "primary.main", fontWeight: 600 }}>
            {t("OurProducts")}
          </Typography>
        </Box>

        <Typography variant="h4" fontWeight={600}>
          {t("EOP")}
        </Typography>
      </Box>

      {/* Arrows */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
        <IconButton disabled={page === 0} onClick={handlePrev}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <IconButton disabled={page === 1} onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Slider Wrapper */}
      <Box sx={{maxWidth: { xs: "100%", sm: 500, md: 700, lg: 1000 }, width: "100%", overflow: "hidden", mt: 3 , mx:"auto", py: 2}}>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(2, 1fr)",
            gridAutoColumns: {xs: "140px", sm: "180px", md: "200px", lg: "240px"},
            gap: 1,
            transform: `translateX(-${shift}px)`,
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {products.map((product) => (
            <Box key={product.id} sx={{ width:{xs: 150, sm:250}  }}>
              <Card
                sx={{
                  width: { xs: 140, sm: 170, md: 200, lg: 240 },
                  height: 330,
                  p: 2,                  
                  borderRadius: 2,
                  textAlign: "center",
                  position: "relative",
                  transition: "0.5s",
                  "&:hover .hover-icons": { opacity: 1 },
                  "&:hover .hover-btn": { opacity: 1 },
                  "&:hover img": { transform: "scale(1.2)" },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <Box sx={{ overflow: "hidden", position: "relative" }}>
                  <Box
                    className="hover-icons"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      opacity: 0,
                      position: "absolute",
                      top: 10,
                      right: 10,
                      transition: "0.5s",
                      zIndex: 3,
                    }}
                  >
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
                        sx={{
                          color: likedProducts.includes(product.id)
                            ? "#fff"
                            : "black",
                        }}
                      />
                    </IconButton>

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
                      <VisibilityOutlinedIcon sx={{color: "black"}}/>
                    </IconButton>
                  </Box>

                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain",
                      padding: 10,
                      transition: "0.5s",
                    }}
                  />
                </Box>

                <Typography fontWeight={500} mt={1}>
                  {product.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection:{xs: "column", sm: "column", md: "row"},
                    mt: 1,
                  }}
                >
                  <Typography color="primary.main" fontWeight={600}>
                    ${product.price}
                  </Typography>
                  <Rating
                    value={product.rate}
                    precision={0.5}
                    readOnly
                    size="small"
                    sx={{ color: "orange" }}
                  />
                </Box>

                <Button className="hover-btn" fullWidth onClick={()=>addToCart({ProductId:product.id, Count: 1})} disabled={isPending}
                  sx={{
                    opacity: 0,
                    transition: "0.3s",
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
            </Box>
          ))}
        </Box>
      </Box>

      {/* View All */}
      <Box textAlign="center" mt={4}>
        <Button
          component={Link}
          to="/allProducts"
          variant="contained"
          sx={{ p: "10px", px: "25px", textTransform: "none" }}
        >
          {t("VAP")}
        </Button>
      </Box>
    </Box>
  );
}
