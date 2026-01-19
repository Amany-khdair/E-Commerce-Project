import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts';
import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, CircularProgress, FormControl, Grid, IconButton, InputLabel, Link, List, ListItemButton, ListItemText, MenuItem, Pagination, Rating, Select, Slider, TextField, Typography, useTheme } from '@mui/material';
import Snowfall from 'react-snowfall';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTranslation } from 'react-i18next';
import SearchIcon from "@mui/icons-material/Search";
import {SearchWrapper,  SearchInput } from '../../functions/SearchWrapper';
import { useForm } from 'react-hook-form';
import { useCategories } from '../../hooks/useCategories';
import ProductsCard from '../../components/products/ProductsCard';

export default function AllProducts() {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        categoryId: null,
        minPrice: null,
        maxPrice: null,
        sortBy: null,
        ascending: true
    });

    const {register, handleSubmit, setValue, watch } = useForm();

    const {isLoading, isError, data} = useProducts({
        search, page, ...filters
    });
    const products = data?.response?.data || [];
    const totalCount = data?.response?.totalCount || 0; 
    const pagesCount = Math.ceil(totalCount / 10);

    const applyingFilters = (values)=>{
        setFilters({
            categoryId: values.categoryId || null,
            minPrice: values.minPrice || null,
            maxPrice: values.maxPrice || null,
            sortBy: values.sortBy || null,
            ascending: values.ascending === "true"
        });
        setPage(1);
    }
    const { data: catData, isLoading: isCatLoading } = useCategories();    
    const categories = catData?.response || [];

    const selectedCategory = watch("categoryId");
            
    if(isLoading)
        return(
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 10 }}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        )
  
    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")}</Typography>        
        
  return (
    <>
       <Box sx={{ px:{xs:2, sm:4, md:6}, py: 4, direction: i18n.language === "ar" ? 'rtl' : 'ltr' }}>
        <Snowfall color='#82C3D9' style={{position: 'fixed', zIndex: 10, pointerEvents: 'none'}}/>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 4}}>
                <Link underline="hover" color="inherit" href="/">
                    {t("Home")}
                </Link>        
                <Link underline="hover" color="text.primary" href="" aria-current="page">
                    {t("Products")}
                </Link>
            </Breadcrumbs>

            <Grid container spacing={4}>
                <Grid item xs={12} md={3} sx={{width: "350px", display: "grid", gap: 2}}>
                    <Box component="form" onSubmit={handleSubmit(applyingFilters)} 
                        sx={{ p: 3, border: "1px solid #eee", borderRadius: 2, bgcolor: theme.palette.background.paper, position: 'sticky', top: 20 }}>
                        
                        <Typography variant="h6" mb={2} fontWeight={700}>{t("Filters")}</Typography>                                        
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <TextField {...register("minPrice")} label={t("MinPrice")} size="small" type="number" />
                            <TextField {...register("maxPrice")} label={t("MaxPrice")} size="small" type="number" />
                        </Box>

                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel>{t("SortBy")}</InputLabel>
                            <Select {...register("sortBy")} label={t("SortBy")} defaultValue="" sx={{flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left", justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start"}}>
                                <MenuItem value="name">{t("Name")}</MenuItem>
                                <MenuItem value="price">{t("Price")}</MenuItem>
                                <MenuItem value="rate">{t("Rate")}</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                            <InputLabel>{t("Order")}</InputLabel>
                            <Select {...register("ascending")} label={t("Order")} defaultValue="true">
                                <MenuItem value="true">{t("Ascending")}</MenuItem>
                                <MenuItem value="false">{t("Descending")}</MenuItem>
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#DB4444", "&:hover": { bgcolor: "#b33838" } }}>
                            {t("ApplyFilter")}
                        </Button>
                    </Box>
                    
                    <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2, bgcolor: "background.paper", position: 'sticky', top: 20 }}>
                        <Typography variant="h6" mb={2} fontWeight={700} sx={{ borderBottom: "2px solid #DB4444", width: "fit-content", pb: 0.5 }}>
                            {t("Categories")}
                        </Typography>
                        
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} component="nav">                          
                            <ListItemButton selected={!selectedCategory || selectedCategory === ""} disabled={isCatLoading}
                                onClick={() => {
                                    setValue("categoryId", "");
                                    handleSubmit(applyingFilters)();
                                }}
                                sx={{ borderRadius: 1, mb: 0.5, "&.Mui-selected": { color: "#DB4444", bgcolor: "#fdf2f2" } }}
                            >
                                <ListItemText primary={t("AllCategories")} primaryTypographyProps={{ fontSize: '14px', fontWeight: 500, flexDirection: i18n.language === "ar" ? "row-reverse" : "row", textAlign: i18n.language === "ar" ? "right" : "left", justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start" }} />
                            </ListItemButton>

                            {categories.map((cat) => (
                                <ListItemButton key={cat.id} selected={selectedCategory === cat.id.toString() || selectedCategory === cat.id} disabled={isCatLoading}
                                    onClick={() => {
                                        setValue("categoryId", cat.id);
                                        handleSubmit(applyingFilters)();
                                    }}
                                    sx={{ 
                                        flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
                                        textAlign: i18n.language === "ar" ? "right" : "left",
                                        justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start",

                                        borderRadius: 1, 
                                        mb: 0.5, 
                                        transition: "0.2s",
                                        "&:hover": { bgcolor: "#f5f5f5", color: "#000", transform: i18n.language === "ar" ? "translateX(-6px)" : "translateX(6px)" },
                                        "&.Mui-selected": { 
                                            color: "#DB4444", 
                                            bgcolor: "#fdf2f2",
                                            borderRight: i18n.language === "ar" ? "4px solid #DB4444" : "none",
                                            borderLeft: i18n.language !== "ar" ? "4px solid #DB4444" : "none",
                                            fontWeight: "bold"
                                        } 
                                    }}
                                >
                                    <ListItemText primary={cat.name} primaryTypographyProps={{ fontSize: i18n.language === "ar"? '16px': '14px' }} />
                                </ListItemButton>
                            ))}                            
                        </List>
                    </Box>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Typography component="h1" sx={{fontSize: {xs: "24px", sm: "32px", md: "42px"}}} mb={1}>{t("Explore")}</Typography>
                    <Box sx={{ width: 150, height: 4, bgcolor: "primary.main", mb: 3 }} />
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pb: 5}}>
                        <Typography variant="body" color="text.secondary" sx={{width: {xs: "75%", sm: "60%"}}}>{t("Discover")}</Typography>            
                        <Box sx={{py: 3}}>
                            <SearchWrapper sx={{backgroundColor: theme.palette.background.paper, border: "2px solid #eee", p: 2}}>
                                <SearchInput placeholder= {t("WALF")} value={search} 
                                onChange={(e) =>{setSearch(e.target.value); setPage(1);}}/>
                                <SearchIcon sx={{ cursor: "pointer" }} />
                            </SearchWrapper>
                        </Box>  
                    </Box>
                            
                    {/* Products */}
                    <Grid container spacing={2} justifyContent={"center"}>
                        {products.map((product)=>(
                            <Grid item key={product.id} xs={6} md={4} lg={3}>
                                <ProductsCard product={product} />
                            </Grid>
                        ))}
                        {products.length === 0 && (
                            <Typography sx={{ fontSize: "24px", textAlign: "center", width: "100%", py: 5 }}>
                            {t("NoProductsFoundInThisCategory")}
                            </Typography>
                        )}
                    </Grid>

                    {pagesCount > 1 && (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                            <Pagination 
                                count={pagesCount} 
                                page={page} 
                                onChange={(e, value) => setPage(value)} 
                                color="primary" 
                                size="large"
                                style={{direction: i18n.language === "ar"? "ltr": "ltr" }}
                            />
                        </Box>
                    )}
                </Grid>
            </Grid>                    
       </Box>            
    </>
  )
}
