import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDetails } from '../../hooks/useDetails';
import { Box, Typography, CircularProgress, Grid, Rating, Stack, IconButton, Button, Paper, Tab } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import Snowfall from 'react-snowfall';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Details() {
    const {id} = useParams();
    const {isLoading, isError, data} = useDetails(id);
    const [quantity, setQuantity] = useState(1);
    const [likedProducts, setLikedProducts] = useState([]);
    const handleLike = (id) => {
        setLikedProducts(prev =>
            prev.includes(id)
            ? prev.filter(pid => pid !== id) // un-like
            : [...prev, id] // like
        );
    };

    const size = ["XS", "S", "M", "L", "XL"];
    const [sizes, setSizes] = useState(null);

    const handleIncrease = () =>setQuantity(prev => prev+1);
    const handleDecrease = () =>setQuantity(prev =>(prev > 1 ? prev - 1 : 1))

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    if(isLoading)
        return(
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", py: 5}}>
                <CircularProgress sx={{color: "primary.main"}}/>
            </Box>
        )
  
    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>Something went wrong while loading products!</Typography>        
    
  return (
    <>
    <Snowfall color='#82C3D9'/>
    <Box sx={{width: "100%", p: {xs: 2, sm: 4},display: "flex", justifyContent: "center"}}>
        <Grid container spacing={4}>
            {/* Left side */}
            <Grid item xs={12} md={6}>
                <Box sx={{p: 4, borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f2f2f2"}}>
                    <Box component="img" src={data.images[0]} alt={data.title} sx={{width: "100%", maxWidth: 380, height: "auto", objectFit: "contain", transition: "0.5s", "&:hover": {transform: "scale(1.1)" }}}/>
                </Box>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                               
                <Typography variant="h4" fontWeight="600">{data.title}</Typography>                
                <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={data.rating} precision={0.1} readOnly/>
                    <Typography variant="body2" color="text.secondary">{data.rating}</Typography>                    
                </Stack>                                
                <Typography variant="h6" fontWeight="700" mt={1} color="primary">${data.price}</Typography>
                <Typography variant="body" sx={{ maxWidth: 450, lineHeight: 1.6 }}>{data.description}</Typography>
                
                <Box sx={{ borderBottom: "1px solid #ddd", my: 2 }}></Box>

                <Stack my={1} direction="row" spacing={1}>
                    <Typography component= "span" variant="body1" display="flex" fontWeight="600" alignItems="center">Size:</Typography>{size.map(item =>(
                        <Box key={item} onClick={()=>setSizes(item)} sx={{border: "1px solid #ccc", cursor: "pointer", px: 2, py:1, fontSize: "12px", borderRadius: "5px",
                            bgcolor: sizes === item? "primary.main": "transparent", color: sizes === item? "#fff": "black", fontWeight: 600, transition: "0.5s", "&:hover":{borderColor: "primary.main"}}}
                        > {item}</Box>
                    ))}
                </Stack>

                <Stack direction="row" spacing={2} mt={2} justifyContent="center" alignItems="center">
                    <Box display="flex" alignItems="center" border="1px solid #ccc" borderRadius={1}>
                        <IconButton onClick={handleDecrease}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ px: 2 }}>{quantity}</Typography>
                        <IconButton onClick={handleIncrease}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Button variant="contained" color="primary" sx={{textTransform: "none", px: 4, py: 1}}>
                        Buy Now
                    </Button>

                    <IconButton onClick={() => handleLike(data.id)} sx={{border: "1px solid #ccc", borderRadius: "8px", backgroundColor: likedProducts.includes(data.id) ? "primary.main" : "transparent", color: likedProducts.includes(data.id) ? "#fff" : "primary.main", "&:hover":{color: "primary.main", border:  "1px solid #DB4444"}}}>
                        <FavoriteBorderIcon />
                    </IconButton>
                </Stack>

                <Stack spacing={2} my={2}>
                    <Paper elevation={5} sx={{display: "flex", p: 2, alignItems: "center", borderRadius: 3}}>
                        <LocalShippingIcon sx={{ mr: 2, fontSize: 40, color: "primary.main" }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Free Delivery</Typography>
                            <Typography variant="body2"color="text.secondary">Get your order delivered for free within 5-7 business days.</Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={5} sx={{display: "flex", p:2, alignItems: "center", borderRadius: 3}}>
                    <AssignmentReturnIcon sx={{ mr: 2, fontSize: 40, color: "primary.main" }} />
                    <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Return Delivery</Typography>
                            <Typography variant="body2" color="text.secondary">You can return the product within 30 days for a full refund.</Typography>
                        </Box> 
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
        
    </Box>

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box container sx={{ borderBottom: "1px solid #ddd", my: 2 }}></Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered aria-label="lab API tabs example">
            <Tab label="Details" sx={{fontSize: "20px", fontWeight: 600}} value="1" />
            <Tab label="Rating & Reviews" sx={{fontSize: "20px", fontWeight: 600}} value="2" />
            <Tab label="FAQs" sx={{fontSize: "20px", fontWeight: 600}} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
    </>    
  )
}
