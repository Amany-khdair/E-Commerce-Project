import React, { useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductsCard from './ProductsCard';

export default function Products() {
  const { t, i18n } = useTranslation();
  const scrollRef = useRef(null);
  const { isLoading, isError, data } = useProducts();
  const products = data?.response?.data?.slice(0, 16) ?? [];

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {      
      container.scrollBy({
        left: direction === 'next' ? 300 : -300,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) return <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress /></Box>;
  if (isError) return <Typography color="error" textAlign="center" py={6}>{t("Something went wrong")}</Typography>;

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center" gap={2}>
            <Box sx={{ width: 12, height: 32, borderRadius: 0.5, bgcolor: "primary.main" }} />
            <Typography color="primary.main" fontWeight={700}>{t("OurProducts")}</Typography>
          </Stack>
          <Typography variant="h4" fontWeight={800}>{t("EOP")}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => {i18n.language === 'ar'? handleScroll('next') : handleScroll('prev')}} sx={{ '&:hover': {bgcolor: '#eee'} }}>
            <ArrowBackIosNewIcon fontSize="small" sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} />
          </IconButton>
          <IconButton onClick={() => {i18n.language === 'ar'? handleScroll('prev') : handleScroll('next')}} sx={{ '&:hover': {bgcolor: '#eee'} }}>
            <ArrowForwardIosIcon fontSize="small" sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ overflow: 'hidden' }}>
        <Box
          ref={scrollRef}
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2, 1fr)", 
            gridAutoFlow: "column", 
            gridAutoColumns: { xs: '250px', sm: '280px' }, 
            gap: "20px",
            p: 1,
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" }, 
          }}
        >
          {products.map((product) => (
            <Box key={product.id} sx={{ width: '100%', display: "flex", gap: 1 }}>
              <ProductsCard product={product} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button component={Link} to="/allProducts" variant="contained" size="large" sx={{ textTransform: 'none', px: 6 }}>
          {t("VAP")}
        </Button>
      </Box>
    </Box>
  );
}