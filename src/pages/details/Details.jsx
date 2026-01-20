import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDetails } from '../../hooks/useDetails';
import { Box, Typography, CircularProgress, Grid, Rating, Stack, IconButton, Button, Paper, Tab, Container, Select, MenuItem, Card, Modal, Backdrop, Fade, TextField, AccordionSummary, Accordion, AccordionDetails, Breadcrumbs, Link, Badge, useTheme } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import Snowfall from 'react-snowfall';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReplayIcon from '@mui/icons-material/Replay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DiscountIcon from '@mui/icons-material/Discount';
import CropFreeIcon from '@mui/icons-material/CropFree';
import {Link as RouterLink} from 'react-router-dom'
import { bounce, fadeInUp } from '../../animation/Animation';
import useAddToCart from '../../hooks/useAddToCart';
import { useTranslation } from 'react-i18next';
import FaqsComponent from '../../components/faqsComponent/FaqsComponent';
import useReviews from '../../hooks/useReviews';
export default function Details() {
    const {id} = useParams();
    const {isLoading, isError, data} = useDetails(id);
    const [selectedImage, setSelectedImage] = useState(null);
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    
    const size = ["XS", "S", "M", "L", "XL"];
    const [sizes, setSizes] = useState(null);
    const product = data?.response || null;
    const {mutate: addToCart, isPending} = useAddToCart();   
    const [quantity, setQuantity] = useState(1);
    const [likedProducts, setLikedProducts] = useState([]);
    const handleLike = (id) => {
        setLikedProducts(prev =>
            prev.includes(id)
            ? prev.filter(pid => pid !== id) // un-like
            : [...prev, id] // like
        );
    };

    const handleIncrease = () =>setQuantity(prev => prev+1);
    const handleDecrease = () =>setQuantity(prev =>(prev > 1 ? prev - 1 : 1))

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const [sortReviews, setSortReviews] = useState(t("Latest"));
    const sortedReviews = useMemo(() =>{
        if (!data?.response?.reviews) return [];
        const copiedReviews = [...data.response.reviews];

        if (sortReviews === t("Latest")){
            return copiedReviews.sort((a, b) => new Date(b?.createdAt || "") - new Date(a?.createdAt || ""));
        }
        return copiedReviews.sort((a, b) => new Date(a?.createdAt || "") - new Date(b?.createdAt || ""));   
    }, [sortReviews, data?.response?.reviews]);

    const [openReviewModal, setOpenReviewModal] = useState(false);
    const {mutate: addReview, isPending: reviewPending} = useReviews(
        {onSuccessCallback: () => {
            setOpenReviewModal(false);          
            setRating(0);
            setComment("");
        }, 
        onErrorCallback: () => {
            setOpenReviewModal(false);
        }}
    );
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const images = product ? [data.response.image, ...(data.response.subImages || [])] : [];
console.log(data);
    useEffect(() => {
        if (product) {
            const images = [data.response.image, ...(data.response.subImages || [])];
            setSelectedImage(images[0]);
        }
    }, [data]);

    if (!isLoading && (!product || Object.keys(data.response).length === 0)) {
        return (
            <Box sx={{textAlign: "center", py: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: "text.secondary"}}>
                <Box sx={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: theme.palette.background.default, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", animation: `${bounce} 0.8s ease`}}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        !
                    </Typography>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 600, animation: `${fadeInUp} 0.6s ease 0.3s forwards`, opacity: 0, }}>
                    {t("ProductNotFound")}
                </Typography>

                <Typography sx={{ maxWidth: 300, fontSize: 15, animation: `${fadeInUp} 0.6s ease 0.5s forwards`, opacity: 0 }}>
                    {t("productNotAvailable")}
                </Typography>
                <Typography sx={{ animation: `${fadeInUp} 0.6s ease 0.7s forwards`, opacity: 0 }}>
                    {t("CheckOurLatestProducts")}{" "}
                    <Typography component={RouterLink} to="/allproducts" sx={{
                        color: "#DB4444", fontWeight: 600, textDecoration: "none", display: "inline-block", transition: "transform 0.5s ease",
                        "&:hover": {
                        transform: "scale(1.2)",                        
                        },
                    }}
                    >
                    {t("Here")}
                    </Typography>
                </Typography>
            </Box>
            
        );
    }

    if(isLoading)
        return(
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 10}}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        ) 
    if(isError)return <Typography sx={{color: "error", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")}</Typography>        
    if (!data) return null;

  return (
    <>
    <Snowfall color='#82C3D9' style={{position: 'fixed', zIndex: 10, pointerEvents: 'none'}}/>
    <Box sx={{py: 5}}>
        <Breadcrumbs aria-label="breadcrumb"  sx={{mt: 4}}>
            <Link underline="hover" color="inherit" href="/">
                {t("Home")}
            </Link>
            <Link
            underline="hover"
            color="inherit"
            href="/allproducts"
            >
                {t("Products")}
            </Link>
            <Link
            underline="hover"
            color="text.primary"
            href=""
            aria-current="page"
            >
                {product?.name}
            </Link>
        </Breadcrumbs>

        <Box sx={{width: "100%",  p: {xs: 2, sm: 4},display: "flex", justifyContent: "center"}}>
            <Box sx={{maxWidth: "1200px", width: "100%", border: "1px solid #e0e0e0", borderRadius: "16px", p: {xs: 1, sm: 3}, mx: "auto"}}>
                <Grid container spacing={2} sx={{display: "flex", flexDirection: {sm: "column", md: "row"} , alignItems: {sm: "center", md: "flex-start"}, gap: 6 }}>
                    {/* Left side */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{display: "flex", gap: {xs: 1, sm: 2}}}>
                            <Stack spacing={2} sx={{width:{xs: "80px", sm: "90px"} }}>
                                {images.map((img, i) =>(
                                    <Box key={i} component="img" src={img} onClick={() => setSelectedImage(img)} sx={{
                                        width: {xs: 50, sm: "100%" }, height: {xs: 60, sm: 90} , objectFit: "cover", borderRadius: "8px", cursor: "pointer", border: selectedImage === img? "2px solid #DB4444" : "1px solid #eee", transition: "0.5s", "&:hover": {border: "2px solid #DB4444"}
                                    }}/>                            
                                ))}
                            </Stack>
                            
                            <Badge badgeContent={`${t("Available")}: ${product.quantity}`}
                            sx={{ "& .MuiBadge-badge": {
                                backgroundColor: "#DB4444",
                                color: theme.palette.text.primary,             
                                fontWeight: 600,
                                pt:2,
                                fontSize: "0.8rem",
                                borderRadius: "8px",
                                padding: "0 8px",
                                minWidth: "fit-content",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.2)", 
                                top: 10,
                                right: {xs: 60, sm: 50},
                                },
                            }}
                            >

                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flex: 1, p: {xs: 3, sm: 4}, maxHeight: 400, backgroundColor: "#fff", borderRadius: "12px"}}>
                                <Box component="img" src={selectedImage} alt={product.name} sx={{width: "100%", maxWidth: {xs: 300, sm: 400}, height: {xs: 250, sm: 350}, objectFit: "contain", transition: "0.5s", "&:hover": {transform: "scale(1.1)" }}}/>                       
                            </Box>
                            </Badge>
                        </Box>
                    </Grid>

                    {/* Right side */}
                    <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>                                                             
                        <Typography sx={{fontSize: "24px", fontWeight: 600}} >
                            {product.name}
                        </Typography>                             
                                     
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Rating value={product.rate} precision={0.1} readOnly/>
                            <Typography variant="body2" color="text.secondary">
                                {product.rate}
                            </Typography>                    
                        </Stack> 

                        <Typography variant="h6" fontWeight="700" mt={1} color="primary">
                            ${product.price}
                        </Typography>

                        <Typography variant="body" sx={{ maxWidth: 450, lineHeight: 1.6, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                            {product.description}
                        </Typography>
                        
                        <Box sx={{ borderBottom: "1px solid #ddd", my: 2 }}/>

                        <Stack my={1} direction="row" spacing={1} sx={{display: "flex", justifyContent: "center" }}>
                            <Typography component= "span" variant="body1" display="flex" fontWeight="600" alignItems="center">{t("Size")}</Typography>{size.map(item =>(
                                <Box key={item} onClick={()=>setSizes(item)} sx={{border: "1px solid #ccc", cursor: "pointer", px: 2, py:1, fontSize: "12px", borderRadius: "5px",
                                    backgroundColor: sizes === item? theme.palette.primary.main: "transparent", color: sizes === item? theme.palette.primary.contrastText : theme.palette.text.primary, fontWeight: 600, transition: "0.5s", "&:hover":{borderColor: "primary.main"}}}
                                > {item}</Box>
                            ))}
                        </Stack>

                        <Stack direction={i18n.language === "ar" ? "row-reverse" : "row"} spacing={2} mt={2} justifyContent="center" alignItems="center" >
                            <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1} sx={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }}>
                                <IconButton onClick={handleDecrease}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography sx={{ px: 2 }}>{quantity}</Typography>
                                <IconButton onClick={handleIncrease}>
                                    <AddIcon />
                                </IconButton>
                            </Box>

                            <Button variant="contained" color="primary"  onClick={()=>addToCart({ProductId:product.id, Count: 1})} disabled={isPending} sx={{textTransform: "none", px: {xs: 2, sm: 3}, py: {xs: 1, sm: 1}, textAlign: i18n.language === "ar" ? "right" : "left" }}>
                                {t("BuyNow")}
                            </Button>

                            <IconButton onClick={() => handleLike(data.response.id)} sx={{border: "1px solid #ccc", borderRadius: "8px", backgroundColor: likedProducts.includes(data.response.id) ? "primary.main" : "transparent", color: likedProducts.includes(data.response.id) ? "#fff" : "primary.main", "&:hover":{color: "primary.main", border:  "1px solid #DB4444"}}}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Stack>

                        <Stack spacing={2} my={2}>
                            <Paper elevation={5} sx={{display: "flex", p: 2, alignItems: "center", borderRadius: 3}}>
                                <LocalShippingIcon sx={{ mr: 2, fontSize: 40, color: "primary.main" }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">{t("FreeDelivery")}</Typography>
                                    <Typography variant="body2"color="text.secondary">{t("orderDelivered")}</Typography>
                                </Box>
                            </Paper>

                            <Paper elevation={5} sx={{display: "flex", p:2, alignItems: "center", borderRadius: 3}}>
                            <AssignmentReturnIcon sx={{ mr: 2, fontSize: 40, color: "primary.main" }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">{t("ReturnDelivery")}</Typography>
                                <Typography variant="body2" color="text.secondary">{t("returnProducts")}</Typography>
                            </Box> 
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>      
        </Box>

        {/* Reviews Section */}
        <Box sx={{ width: '100%', typography: 'body1' }}>      
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                    <Tab label={t("Description")} sx={{fontSize: {xs: "14px", sm:"18px"}, textTransform: "none", fontWeight: 600}} value="0" />
                    <Tab label={t("Rating&Reviews")} sx={{fontSize: {xs: "14px", sm:"18px"}, textTransform: "none", fontWeight: 600}} value="1" />
                    <Tab label={t("FAQs")} sx={{fontSize: {xs: "14px", sm:"18px"}, textTransform: "none", fontWeight: 600}} value="2" />
                </TabList>
                </Box>

                <Container>
                    {/* First Tab */}
                    <TabPanel value="0">
                        <Box sx={{ maxWidth: 900, mx: "auto", py: 3 }}>
                            <Typography sx={{ lineHeight: 1.7 }}>
                                {product.description}
                            </Typography>
                        </Box>
                    </TabPanel>

                    {/* Second Tab */}
                    <TabPanel value="1">
                        {/* Header */}
                        <Stack direction={{xs: "column", sm: "row"}} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, gap: 1}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>                    
                                <Typography sx={{fontSize: "20px", fontWeight: 600, color: "text.secondary"}}>
                                    {t("AllReviews")} ({product?.reviews?.length || 0})
                                </Typography>
                            </Box>

                            <Box display="flex" gap={2} sx={{fontSize: "16px"}}>
                                <Select value={sortReviews} onChange={(e) => setSortReviews(e.target.value)} sx={{width: 150, borderRadius: "12px",backgroundColor: theme.palette.background.default,
                                    "& .MuiOutlinedInput-notchedOutline": {borderColor: "#ccc"}, "&:hover .MuiOutlinedInput-notchedOutline": {borderColor: "primary.main"}, "& .MuiSelect-select": {py: 1, fontSize: "15px", fontWeight: 600} }}>
                                    <MenuItem value={t("Latest")} sx={{fontSize: "15px"}}>{t("Latest")}</MenuItem>
                                    <MenuItem value={t("Oldest")} sx={{fontSize: "15px"}}>{t("Oldest")}</MenuItem>
                                </Select>

                                <Button variant="contained" onClick={() => setOpenReviewModal(true)} sx={{backgroundColor: "primary.main", borderRadius: "30px", py: {xs :0, sm: 1}, px: {xs: 1, sm: 3}, fontSize: {xs: "14px", sm: "16px"}, textTransform: "none"}}>
                                    {t("WriteReview")}
                                </Button>
                            </Box>                
                        </Stack>

                        {/* Content */}
                        <Grid container spacing={3}>
                            {sortedReviews.map((review, i) =>(
                                <Grid item xs={12} sm={6} md={6} key={i} sx={{mx: {sm: "auto"}}}>
                                    <Card elevation={2} sx={{width: {xs: "100%", sm: 500}, borderRadius: "14px", border: "1px solid #ddd", p: 3}}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography sx={{mt: 1, fontWeight: 600}}>
                                                {review?.userName && review.userName[0].toUpperCase() + review.userName.slice(1)}
                                            </Typography>
                                            <Rating value={review.rating} precision={0.5} sx={{ color: "orange" }} readOnly/>                                            
                                        </Box>                                        
                                        <Typography sx={{mt: 1, fontWeight: 500, color: theme.palette.text.primary}}>{review.comment}</Typography>
                                        <Typography color="text.secondary" fontSize="12px">Posted on {new Date(review.createdAt).toLocaleDateString()}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Review Modal */}
                        <Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)} 
                        closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 300 }}>
                            <Fade in={openReviewModal}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%) scale(1)',
                                    width: { xs: "90%", sm: 450 },
                                    bgcolor: 'background.paper',
                                    borderRadius: "16px",
                                    boxShadow: 24,
                                    p: 4,
                                    outline: "none",
                                }}>
                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                                        {t("WriteReview")}
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <TextField fullWidth label={t("YourName")} variant="outlined"/>
                                        <Box>
                                            <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}>
                                                {t("Rating")}
                                            </Typography>
                                            <Rating value={rating} onChange={(e, newValue)=>setRating(newValue)} size="large" />
                                        </Box>
                                        <TextField fullWidth label={t("YourReview")} multiline rows={4} value={comment} onChange={(e)=>setComment(e.target.value)} variant="outlined" />
                                        
                                        <Button variant="contained" fullWidth disabled={reviewPending || rating === 0} 
                                        onClick={() => {
                                            addReview({
                                                productId: product.id,                                               
                                                rating: rating,
                                                comment: comment 
                                            });
                                        }}

                                        sx={{ py: 1.2, fontSize: "16px", borderRadius: "10px" }}>
                                            {t("SubmitReview")}
                                        </Button>
                                    </Box>
                                </Box>
                            </Fade>
                        </Modal>

                    </TabPanel>
                    
                    {/* Third Tap */}
                    <TabPanel value="2">
                        <FaqsComponent/>
                    </TabPanel>
                </Container>
                
            </TabContext>
        </Box>
    </Box>
    </>    
  )
}
