import { Grid, Typography, Container, Button, Box, Paper, Divider } from '@mui/material';
import Snowfall from 'react-snowfall';
import useWishlist from '../../hooks/useWishlist';
import ProductsCard from '../../components/products/ProductsCard';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Wishlist() {
  const { t, i18n } = useTranslation();
  const wishlist = useWishlist((state) => state.wishlist);
  const clearWishlist = useWishlist((state) => state.clearWishlist);

  return (
    <Container sx={{ py: 6, my: 2}}>
      <Snowfall color='#82C3D9' style={{ position: 'fixed', zIndex: 0 }} />

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 5,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary', position: 'relative' }}>
              {t("MyWishlist")}
            <Typography component="span" sx={{ marginLeft: i18n.language === "ar" ? 0 : "1rem", marginRight: i18n.language === "ar" ? "1rem" : 0, fontSize: '1.2rem', color: 'primary.main', fontWeight: 600 }}>
              ({wishlist.length} {wishlist.length === 1 ? t("Item") : t("Items")})
            </Typography>
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', borderRadius: 2, mt: 1 }} />
        </Box>

        {wishlist.length > 0 && (
          <Button
            variant='outlined'
            color='text.primary'            
            onClick={clearWishlist}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none', 
              fontWeight: 600,
              '&:hover': { bgcolor: 'primary.main', color: 'white' }
            }}
          >
            {t("ClearAllItems")}
          </Button>
        )}
      </Box>

      {wishlist.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            textAlign: 'center', 
            py: 12, 
            bgcolor: 'background.default', 
            border: '2px dashed', 
            borderColor: 'divider',
            borderRadius: 4
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
            {t("YourWishlistIsEmpty")}
          </Typography>
          <Typography color="text.disabled" mb={4}>
            {t("LooksLikeYouHaventAddedAnythingYet")}
          </Typography>
          <Button 
            component={Link} 
            to="/allproducts" 
            variant="contained" 
            sx={{ px: 4, py: 1.2, borderRadius: '30px', textTransform: 'none', fontWeight: 600 }}
          >
            {t("ReturnToShop")}
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={4}>
            {wishlist.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Box sx={{ 
                  transition: 'transform 0.3s ease', 
                  '&:hover': { transform: 'translateY(-10px)' } 
                }}>
                  <ProductsCard product={product} />
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 8,
            mb: 4 
          }}>
            <Button
              component={Link}
              to="/allproducts"
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                textTransform: 'none',
                borderColor: 'text.primary',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {t("ContinueShopping")}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}