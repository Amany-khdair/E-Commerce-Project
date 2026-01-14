import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Container, Grid, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Snowfall from 'react-snowfall';
import useCheckout from '../../hooks/useCheckout';
import Swal from "sweetalert2";
import GradientText from '../../functions/GradientText';

export default function CheckOut() {
  const { data, isLoading, isError } = useCart();
  const { t, i18n } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("");  
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const {mutate: checkout, isPending: isCheckoutPending} = useCheckout(); 

  const handleCheckout = () => {
    if (saveInfo) {
      localStorage.setItem(
        "checkoutInfo", JSON.stringify({firstName, company, address, apartment, city, phone, email})
      );
    } else {
      localStorage.removeItem("checkoutInfo");
    }

    if (!firstName || !address || !city || !phone || !email) {
      return Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields marked with *",
        icon: "error",
        confirmButtonColor: "#DB4444",
      });
    }

    if (!paymentMethod)
      return Swal.fire({
        title: "Wait a second!",
        text: "Please choose a payment method first.",
        icon: "warning",
        confirmButtonColor: "#DB4444",
      });

    checkout({ paymentMethod });
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutInfo"));
    if (saved) {
      setFirstName(saved.firstName || "");
      setCompany(saved.company || "");
      setAddress(saved.address || "");
      setApartment(saved.apartment || "");
      setCity(saved.city || "");
      setPhone(saved.phone || "");
      setEmail(saved.email || "");
      setSaveInfo(true);
    }else {
      setSaveInfo(false);
    }
  }, []);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 10 }}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography sx={{ textAlign: "center", py: 6, color: "red" }}>
        {t("LoadingErrorCart")}
      </Typography>
    );

  return (
    <>
      <Snowfall color="#82C3D9" />
      <Box dir={i18n.language === "ar" ? "rtl" : "ltr"} sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
        <Container sx={{ my: 5 }}>
          <Grid container spacing={6}>

            {/* Billing Details */}
            <Grid item xs={12} md={6}>                          
              <GradientText>
                  {t("BillingDetails")}
              </GradientText>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2,
                    "& .MuiInputLabel-root": { left: i18n.language === "ar"  ? "inherit" : 0, right: i18n.language === "ar"  ? 28 : "inherit", transformOrigin: i18n.language === "ar"  ? "right" : "left" },
                    "& legend": { textAlign: i18n.language === "ar"  ? "right" : "left" }
                  }}>

                <TextField label={t("FirstName")} fullWidth required size="small" 
                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                
                <TextField label={t("CompanyName")} fullWidth size="small" 
                value={company} onChange={(e) => setCompany(e.target.value)}/>
                
                <TextField label={t("StreetAddress")} fullWidth required size="small"
                value={address} onChange={(e) => setAddress(e.target.value)}/>
                
                <TextField label={t("ApartmentFloorOptional")} fullWidth size="small"
                value={apartment} onChange={(e) => setApartment(e.target.value)}/>
                
                <TextField label={t("TownCity")} fullWidth required size="small"
                value={city} onChange={(e) => setCity(e.target.value)}/>
                
                <TextField label={t("PhoneNumber")} fullWidth required size="small"
                value={phone} onChange={(e) => setPhone(e.target.value)}/>
                
                <TextField label={t("EmailAddress")} fullWidth required size="small"
                value={email} onChange={(e) => setEmail(e.target.value)}/>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <input type="checkbox" checked={saveInfo} onChange={() => {
                    if (saveInfo) {
                      localStorage.removeItem("checkoutInfo");                     
                    }
                    setSaveInfo(!saveInfo);
                  }} />
                  <Typography sx={{ ml: 1, fontSize: 14 }}>
                    {t("SaveInfoForNextTime")}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Order summary */}
            <Grid item xs={12} md={5} sx={{ my: 2, [i18n.language === "ar"  ? "mr" : "ml"]: "auto"}}>
              <Box sx={{ mb: 3 }}>

                {data.items.map((item) => (
                  <Box key={item.productId} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography>{item.productName}</Typography>
                    <Typography>${item.totalPrice}</Typography>
                  </Box>
                ))}

                <hr />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Typography>{t("Subtotal")}</Typography>
                  <Typography>${data.cartTotal}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography>{t("Shipping")}</Typography>
                  <Typography>{t("Free")}</Typography>
                </Box>

                <hr />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Typography sx={{ fontWeight: 700 }}>{t("Total")}</Typography>
                  <Typography sx={{ fontWeight: 700 }}>${data.cartTotal}</Typography>
                </Box>
              </Box>

              {/* Payment Method */}
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="visa" control={<Radio />} label={t("Visa")} />
                <FormControlLabel value="cash" control={<Radio />} label={t("CashOnDelivery")} />
              </RadioGroup>

              <Box sx={{ display: "flex", gap: 2, my: 3 }}>
                <TextField placeholder={t("CouponCode")} size="small" fullWidth />
                <Button sx={{ bgcolor: "#DB4444", color: "white", px: 4, whiteSpace: "nowrap" }}>
                  {t("ApplyCoupon")}
                </Button>
              </Box>

              <Button variant="contained"
                onClick={handleCheckout}                
                disabled={!data.items || data.items.length === 0 || isCheckoutPending}
                sx={{
                  bgcolor: "#DB4444",
                  color: "white",
                  width: "100%",
                  py: 1.4,
                  "&:hover": { bgcolor: "#c33a3a" }
                }}
              >
                {isCheckoutPending ? t("Processing") : t("PayNow")}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </>
  );
}
