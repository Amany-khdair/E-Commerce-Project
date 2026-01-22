import React, { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Box, Button, Card, CardActionArea, CardMedia, CircularProgress, Grid, IconButton, Rating, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import { useTranslation } from 'react-i18next';
import NotSignedModal from '../modal/NotSignedModal';
import ProductsCard from './ProductsCard';

export default function Products() {
  const [page, setPage] = useState(0);
  const { t, i18n } = useTranslation();
  const { isLoading, isError, data } = useProducts();

  const products = data?.response?.data?.slice(0, 16) ?? []; 
  
  const productsPerPage = 4;
  const maxPage = Math.ceil(products.length / productsPerPage) - 1;
  const displayedProducts = products.slice(
    page * productsPerPage,
    (page + 1) * productsPerPage
  );

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
    if (page < maxPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };
  

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ width: 12, height: 32, borderRadius: 0.5, bgcolor: "primary.main" }} />
            <Typography color="primary.main" fontWeight={700} variant="subtitle1">
              {t("OurProducts")}
            </Typography>
          </Stack>
          <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: '1.5rem', md: '2.1rem' } }}>
            {t("EOP")}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={handlePrev} 
            disabled={page === 0}
            sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}
          >
            <ArrowBackIosNewIcon fontSize="small" sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} />
          </IconButton>
          <IconButton 
            onClick={handleNext} 
            disabled={(page + 1) * 4 >= products.length}
            sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}
          >
            <ArrowForwardIosIcon fontSize="small" sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ overflow: 'hidden', mx: -1 }}>
        <Grid container spacing={2}>
          {displayedProducts.map((product) => (            
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductsCard product={product}/>
              </Grid>          
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button
          component={Link}
          to="/allProducts"
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.5, borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
        >
          {t("VAP")}
        </Button>
      </Box>
    </Box>
  );
}
