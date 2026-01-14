import { useEffect, useMemo, useState } from 'react'
import { useProducts } from '../../hooks/useProducts';
import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, CircularProgress, FormControl, Grid, IconButton, InputLabel, Link, MenuItem, Pagination, Rating, Select, Slider, Typography, useTheme } from '@mui/material';
import Snowfall from 'react-snowfall';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';

export default function AllProducts() {
    const navigate = useNavigate();
    const {isLoading, isError, data} = useProducts();
    const { t } = useTranslation();

    const products = data?.response.data || [];
    const [likedProducts, setLikedProducts] = useState([]);
    const handleLike = (id) => {
        setLikedProducts(prev =>
            prev.includes(id)
            ? prev.filter(pid => pid !== id) // un-like
            : [...prev, id] // like
        );
    };

    const [sortOption, setSortOption] = useState("titleAscending");
    const {mutate: addToCart, isPending} = useAddToCart(); 
    const theme = useTheme();
    const prices = data?.response?.data?.map(productPrice => productPrice.price)||[];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);    
    
    const [page, setPage] = useState(1);
    const productsPerPage = 18;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get("category"); 
    //filtered by category if exist
    const filterByCategory = selectedCategory? products.filter(prod => prod.category === selectedCategory): products;
    //filtered by price
    const productFiltered = filterByCategory.filter(
            (productPrice) => productPrice.price >= priceRange[0] && productPrice.price <= priceRange[1]
    );

    const sort = useMemo(() => {
        const sortedProducts = [...productFiltered];//store a copy from the array productFiltered, so that we dont change the main data
        switch (sortOption){
            case "titleAscending":
                sortedProducts.sort((a, b) =>a.name.localeCompare(b.name));
                break;
            case "titleDescendin":
                sortedProducts.sort((a, b) =>b.name.localeCompare(a.name));
                break;
            case "priceAscending":
                sortedProducts.sort((a, b) =>a.price - b.price);
                break;
            case "priceDescending":
                sortedProducts.sort((a, b) =>b.price - a.price);
                break;  
            default:
                break;
        }
        return sortedProducts;
    }, [productFiltered, sortOption]);

    const pageCount = Math.ceil(sort.length / productsPerPage);
    const currentProducts = sort.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    );
   
    useEffect(() => {
    if (prices.length) {
        setPriceRange([minPrice, maxPrice]);
    }
    }, [minPrice, maxPrice]);

    if(isLoading)
        return(
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 10 }}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        )
  
    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")}</Typography>        
    
    
  return (
    <>
    <Snowfall color='#82C3D9'/>
       <Box sx={{ px:{xs:2, sm:4, md:6}, py: 4 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 4}}>
                <Link underline="hover" color="inherit" href="/">
                    {t("Home")}
                </Link>        
                <Link underline="hover" color="text.primary" href="" aria-current="page">
                    {t("Products")}
                </Link>
            </Breadcrumbs>

            <Typography component="h1" sx={{fontSize: {xs: "24px", sm: "32px", md: "42px"}}} mb={1}>{t("Explore")}</Typography>
            <Box sx={{ width: 150, height: 4, bgcolor: "primary.main", mb: 3 }} />
            <Typography variant="body" color="text.secondary">{t("Discover")}</Typography>
            {/* Filtered area */}
            <Box sx={{display: "flex", flexDirection:{xs: "column", sm: "row"}, justifyContent: "space-between", alignItems: "center", gap: 2, my: 3}}>                
                <FormControl sx={{minWidth: 200}}>
                    <InputLabel sx={{fontSize: "14px", fontWeight: 500}}>{t("SortBy")}</InputLabel>
                    <Select value={sortOption} label="Sort By" onChange={(e) => setSortOption(e.target.value)}>
                        <MenuItem value="titleAscending">Title (A-Z)</MenuItem>
                        <MenuItem value="titleDescendin">Title (Z-A)</MenuItem>
                        <MenuItem value="priceAscending">Price (Low → High)</MenuItem>
                        <MenuItem value="priceDescending">Price (High → Low)</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{width: {xs: "70%", sm:200}}}>
                    <Typography sx={{fontSize: "14px", fontWeight: 500}}>{t("PriceRange")}</Typography>
                    <Slider value={priceRange} onChange={(event, newValue) => setPriceRange(newValue)} valueLabelDisplay="auto" min={minPrice} max={maxPrice} step={1}/>
                </Box>
            </Box>   

            {/* Products */}
            <Grid container spacing={2} justifyContent={"center"}>
                {currentProducts.map((product)=>(
                    <Grid item key={product.id} xs={6} md={4} lg={3}>
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
                    </Grid>
                ))}
            </Grid>

            {/* pagination */}
            {pageCount > 1 && (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 5}}>
                    <Pagination count={pageCount} page={page} onChange={(e, value) => setPage(value)} color="primary"/>
                </Box>
            )}
       </Box>
            
    </>
  )
}
