import { Box, Button, CircularProgress, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import Snowfall from 'react-snowfall'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useRemoveFromCart from '../../hooks/useRemoveFromCart';
import Swal from "sweetalert2";
import './cart.modules.css';
import useClearCart from '../../hooks/useClearCart';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import { lift, shine, typing } from '../../animation/LogoAnimation';
import { useTranslation } from 'react-i18next';
export default function Cart() {
  const {data, isLoading, isError} = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const {mutate: removeItem, isPending: removeItemPending} = useRemoveFromCart();
  const {mutate: clearCart, isPending: clearingPending} = useClearCart();
  const {mutate: updateItem, isPending: updateItemPending} = useUpdateCartItem();
  
  const handleClear = () => {
    Swal.fire({
      title: t("AreYouSure"),
      text: t("ClearCartWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("YesEmptyIt"),
      cancelButtonText: t("NoKeepThem"),
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn"
    }
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();

        Swal.fire({
          title: t("ClearedTitle"),
          text: t("CartEmptied"),
          icon: "success"
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: t("Cancelled"),
          text: t("ItemsSafe"),
          icon: "error"
        });
      }
    });
  };

  const handleUpdate = (productId, action) => {
    const item = data.items.find(i => i.productId === productId);
    const newCount = action === '-' ? item.count - 1 : item.count + 1;

    if (newCount <= 0) {   
      removeItem(productId);
    } else {    
      updateItem({ productId, count: newCount });
    }
  };

  if(isLoading)
    return(
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 10}}>
            <CircularProgress sx={{color: "primary.main"}}/>
        </Box>
    ) 
  if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")} </Typography>        
  
  return (
    <>
      <Snowfall color='#82C3D9'/>
      <Container sx={{my:5, py: 5}}>
        <Typography variant="h3"
                      sx={{fontWeight: 700, textAlign: "center", mb: 3, whiteSpace: "nowrap", overflow: "hidden", width: "fit-content",
                        animation: ` ${typing} 1.6s steps(12) forwards, ${lift} 3s ease-in-out infinite 1.6s`, background: "linear-gradient(90deg, #000, #DB4444, #000)", WebkitBackgroundClip: "text",
                        color: "transparent", backgroundSize: "200%", animationDelay: "0s, 1.6s", "&:after": { content: '""', animation: `${shine} 2s linear infinite`, position: "absolute", width: "100%", height: "100%", left: 0, top: 0}}}>
          {t("MyCart")}
        </Typography>
        <TableContainer component={Paper} sx={{mb: 3}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("ProductName")} </TableCell>
                <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("Price")} </TableCell>
                <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("Quantity")} </TableCell>
                <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("Subtotal")} </TableCell>               
              </TableRow>
            </TableHead>

            <TableBody>
              {data.items.map((item) =>(
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                      <IconButton size="small" onClick={()=>removeItem(item.productId)} disabled={removeItemPending} 
                      sx={{
                        width: 30,
                        height: 30,
                        border: "1.5px solid #DB4444",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "0.2s ease",
                        backgroundColor: "#fff",
                        "&:hover": {
                          backgroundColor: "#DB4444",
                          borderColor: "#DB4444",
                          "& svg": { color: "#fff" }
                        },
                        "&:disabled": {
                          opacity: 0.4,
                          cursor: "not-allowed",
                          backgroundColor: "#f8f8f8",
                          borderColor: "#aaa",
                        }}}>
                          <CloseIcon fontSize="small" sx={{color: "#DB4444", transition: "0.3s ease"}}/>
                      </IconButton>
                      {item.productName}
                    </Box>                    
                  </TableCell>

                  <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>${item.price}</TableCell>

                  <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
                    <Box display="flex" width={120} alignItems="center" border="1px solid #ccc" borderRadius={1}>
                      <IconButton onClick={()=>handleUpdate(item.productId,'-')} disabled={updateItemPending}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography sx={{px: 2, width: 10, textAlign: "center"}}>
                        {item.count}
                      </Typography>

                      <IconButton onClick={()=>handleUpdate(item.productId,'+')} disabled={updateItemPending}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>${item.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 10, gap:1 }}>
          <Button variant="outlined" onClick={()=>navigate('/allproducts')}  color="inherit" sx={{ border: "1px solid #DB4444", px: {xs: 1, sm: 4}, py: {xs: 0.5, sm: 1.5}, transition: "0.5s ease", "&:hover": {backgroundColor: "primary.main", color: "#fff"} }}>
            {t("ReturnToShop")}
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleClear} disabled={!data.items || data.items.length === 0 || clearingPending} sx={{ px: 4, py: 1.5, border: "1px solid #DB4444",  transition: "0.5s ease", "&:hover": {backgroundColor: "primary.main", color: "#fff"} }}>
            {t("EmptyCart")}
          </Button>
        </Box>

        <Grid container spacing={4}>       
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder={t("CouponCode")}
                size="small"
                sx={{ width: '250px' }}
              />
              <Button 
                variant="contained" 
                sx={{ bgcolor: '#DB4444', textWrap: "nowrap", "&:hover": { bgcolor: '#c33a3a' }, px: 4 }}
              >
                {t("ApplyCoupon")}
              </Button>
            </Box>
          </Grid>
  
          <Grid item xs={12} md={5} sx={{ ml: 'auto' }}>
            <Box sx={{ border: '1.5px solid black', borderRadius: 1, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                {t("CartTotal")}
              </Typography>
                            
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                <Typography>{t("Shipping")}</Typography>
                <Typography>{t("Free")}</Typography>
              </Box>
              <hr />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
                <Typography>{t("Total")}</Typography>
                <Typography>${data.cartTotal}</Typography>
              </Box>
  
              <Box sx={{ textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: '#DB4444', '&:hover': { bgcolor: '#c33a3a' }, px: 5, py: 1.5 }}
                >
                  {t("ProceedToCheckout")}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </>  
  )
}
