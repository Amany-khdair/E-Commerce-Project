import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Rating, Button, useTheme } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductsCard({ product }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {mutate: addToCart, isPending} = useAddToCart();
    const [likedProducts, setLikedProducts] = useState([]);

    const handleLike = (id) => {
        setLikedProducts(prev =>
            prev.includes(id)
            ? prev.filter(pid => pid !== id) // un-like
            : [...prev, id] // like
        );
    };

  return (
    <Card sx={{display: "flex", flexDirection: "column", width: 250,  height: 300, transition: "0.3s", border: "1px solid #eee", backgroundColor: theme.palette.background.paper, 
        "&:hover": {backgroundColor: theme.palette.action.hover, transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)"}, "&:hover .hover-icons": {opacity: 1}, "&:hover .hover-button": {opacity: 1}, 
        "&:hover img":{transform: "scale(1.2)"}, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"}}>
        <Box sx={{ overflow: "hidden", position: "relative" }}>                                
            {/* Icons on hover */}
            <Box className="hover-icons" sx={{display: "flex", flexDirection: "column", gap: 1, opacity: 0, position: "absolute", top: 10, right: 10, transition: "0.5s", zIndex: 3}}>
                <IconButton size='small' onClick={() => handleLike(product.id)} sx={{width: 34, height: 34, backgroundColor: likedProducts.includes(product.id) ? "primary.main" : "#fff", transition: "0.5s", "&:hover":{backgroundColor: "primary.main", color: "#fff", transform: "scale(1.1)", transition: "0.7s"}, "&:hover svg":{color: "#fff"} }}>
                    <FavoriteBorderOutlinedIcon sx={{color: likedProducts.includes(product.id) ? "#fff" : "black"}}/>
                </IconButton>

                <IconButton size='small' sx={{width: 34, height: 34, backgroundColor: "#ffff", transition: "0.5s", "&:hover":{backgroundColor: "primary.main", color: "#fff", transform: "scale(1.1)", transition: "0.7s"}, "&:hover svg":{color: "#fff"}}}>
                    <VisibilityOutlinedIcon onClick={()=>navigate(`/details/${product.id}`)}  sx={{color: "black"}}/>
                </IconButton>
            </Box>

            <img src={product.image} alt={product.name} style={{backgroundColor: "white", width: "100%", height: 180, borderRadius: 2, objectFit: "contain", padding: "10px", transition: "0.5s", "&:hover": {transform: "scale(1.1)" }}}
            />                                               
        </Box>

        <CardContent sx={{flexGrow: 1, color: theme.palette.text.primary}}>
            <Typography variant="h6">{product.name}</Typography>
            
            <Box sx={{my: 2,display: "flex", justifyContent: "space-between"}}>
                <Typography variant="body1" color="primary.main">${product.price}</Typography>
                <Rating value={product.rate} precision={0.5} readOnly size="small" sx={{color: "orange"}}/>                                 
            </Box>

            <Box className="hover-button" sx={{opacity: 0, position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", transition: "0.5s", zIndex: 3}}>
                <Button variant="contained" onClick={()=>addToCart({ProductId:product.id, Count: 1})} disabled={isPending} sx={{mt: 2, width: "100%", backgroundColor: "#333", textTransform: "none" }}>
                    {t("ATC")}
                </Button>
            </Box>                                
        </CardContent>
    </Card>
  );
}