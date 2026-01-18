import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductByCategory } from '../../hooks/useProductByCategory';
import { Box, Grid, Typography, CircularProgress, Container, Breadcrumbs, Link } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ProductsCard from '../../components/products/ProductsCard';
import GradientText from '../../functions/GradientText';
import { useCategories } from '../../hooks/useCategories';
import Snowfall from 'react-snowfall';

export default function ProductsByCat() {
    const { id } = useParams();
    const { data: categories } = useCategories();
    const category = categories?.response?.find((c) => c.id == id);

    const { data, isLoading, isError } = useProductByCategory(id);
    const { t, i18n } = useTranslation();

    if(isLoading)
        return(
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 10 }}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        )

    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")}</Typography>        

    const products = data?.response  || [];

  return (
    <Container sx={{ py: 5 }}>     
      <Snowfall color='#82C3D9' style={{position: 'fixed', zIndex: 10, pointerEvents: 'none'}}/>                
      <Breadcrumbs aria-label="breadcrumb" sx={{my: 4}}>
          <Link underline="hover" color="inherit" href="/">
              {t("Home")}
          </Link>        
          <Link underline="hover" color="text.primary" href="" aria-current="page">
              { category?.name }
          </Link>
      </Breadcrumbs>
      
      <GradientText sx={{ textAlign: i18n.language === "ar"? "right": "left", mt: 4, mb: 6}}>
        {t("ProductsInCategory", { name: category?.name })}
      </GradientText>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>             
             <ProductsCard product={product} /> 
          </Grid>
        ))}
        {products.length === 0 && (
          <Typography sx={{ textAlign: "center", width: "100%", py: 5 }}>
            {t("NoProductsFoundInThisCategory")}
          </Typography>
        )}
      </Grid>
    </Container>
  );
}