import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Rating, Button, CardActionArea, Stack } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAddToCart from '../../hooks/useAddToCart';
import useWishlist from '../../hooks/useWishlist';
import useAuthStore from '../../store/authStore';
import NotSignedModal from '../modal/NotSignedModal';

export default function ProductsCard({ product }) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {mutate: addToCart, isPending} = useAddToCart();

    const token = useAuthStore(state=>state.token);
    const [openNotSignedModal, setOpenNotSignedModal] = useState(false);

    const toggleWishlist = useWishlist((state) => state.toggleWishlist);
    const wishlist = useWishlist((state) => state.wishlist);
    const isCurrentlyLiked = wishlist.some(item => item.id === product.id);

  return (
    <>
        <Card sx={{
            width: 280,
            borderRadius: 3,
            position: "relative",
            transition: "0.3s",
            border: '1px solid #f0f0f0',
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transform: 'translateY(-4px)' },
            '&:hover .action-buttons': { opacity: 1 },
            '&:hover .add-to-cart': { opacity: 1, bottom: 0 }
        }}>
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

            <Box component="img" src={product.image} alt={product.name} sx={{ width: '70%', height: 180, objectFit: 'contain', transition: "0.5s", "&:hover": {transform: "scale(1.2)" }}} />

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

            <CardActionArea sx={{ p: 2 }} onClick={() => navigate(`/details/${product.id}`)}>
            <Typography fontWeight={700} noWrap sx={{ mb: 1 }}>{product.name}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <Typography color="primary.main" fontWeight={700}>${product.price}</Typography>
                <Rating value={product.rate} size="small" readOnly precision={0.5} />
            </Stack>
            </CardActionArea>
        </Card>
        <NotSignedModal open={openNotSignedModal} onClose={()=> setOpenNotSignedModal(false)}/>
    </>
  );
}