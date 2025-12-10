import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import sideImage from '../../assets/images/Side Image.webp';
import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import GoogleIcon from '@mui/icons-material/Google';
import styles from './register.module.css'
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const {register, handleSubmit, setValue} = useForm({});
  //const [errorMsg, setErrorMsg]= useState([]);
  const [fieldErrors, setFieldErrors] = useState({
  userName: "", fullName: "", email: "", password: "", phoneNumber: ""});
   
  const clearFieldAfterErr = (field) => {
    setFieldErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };


  const registerForm = async(values)=>{
    console.log(values);
    //setErrorMsg("");
    setFieldErrors({
      userName: "", fullName: "", email: "", password: "", phoneNumber: ""});
    try{
      const response = await axios.post('https://knowledgeshop.runasp.net/api/Auth/Account/Register', values);
      console.log(response);
    // }catch(error){      
    //   //console.log(error.response?.data);
    //   const apiErrors = error.response?.data?.errors;
    //   if (Array.isArray(apiErrors)) {
    //     setErrorMsg(apiErrors); 
    //   } else {
    //     setErrorMsg([error.response?.data?.message || "Something went wrong"]);
    //   }
    // }
    }catch(error) {
      const apiErrors = error.response?.data?.errors || [];

      const newErrors = {
        userName: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: ""
      };

      apiErrors.forEach(err => {

        if (err.toLowerCase().includes("email")) {
          newErrors.email = err;
        }

        else if (err.toLowerCase().includes("password")) {
          newErrors.password = err;
        }

        else if (err.toLowerCase().includes("name")) {
          newErrors.userName = err;
        }

        else {    
          newErrors.general = err;
        }
      });

      setFieldErrors(newErrors);
    }
  }

  const isSmallScreen = useMediaQuery("(max-width:900px)");
  return (     
      <Grid container spacing={3} sx={{my: "60px"}}>
        <Grid item xs={12} md={6} sx={{display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center"}}> 
          <Box component="img" src={sideImage} alt="Side" sx={{ width: "100%", height: "100%", objectFit: "cover"}} className= {styles.image} />
        </Grid>
        
        <Grid item xs={12} md={6} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto" ,p: 4,}}>
          {isSmallScreen && (
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}>
              Exclusive
            </Typography>
          )}
          <Box sx={{ width:  "100%", maxWidth: 400 }}>           
            <Typography variant="h4" sx={{fontWeight: 400, marginBottom: 3}}>Create an account</Typography>
            <Typography variant="h6" sx={{fontWeight: 300}}>Enter your details below</Typography>          
            {/* {errorMsg.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {errorMsg.map((err, index) => (
                  <Typography key={index} sx={{ color: "red", fontWeight: 600 }}>
                    {err}
                  </Typography>
                ))}
              </Box>
            )} */}
            <Box onSubmit={handleSubmit(registerForm)} component={"form"} sx={{mt: 5, display: "flex", flexDirection: "column", gap: 3}}>
              <TextField id="standard-basic" label="User Name" {...register('userName')} variant="standard" 
              onChange={(e) => {
                clearFieldAfterErr("userName"); 
                setValue("userName", e.target.value);
              }} />
              {fieldErrors.userName && (
                <Typography sx={{color:"red", fontSize:"14px"}}>{fieldErrors.userName}</Typography>
              )}

              <TextField id="standard-basic" label="Full Name" {...register('fullName')} variant="standard" 
              onChange={(e) => {
                clearFieldAfterErr("fullName");
                setValue("fullName", e.target.value);
              }}/>
              {fieldErrors.fullName &&(
                <Typography sx={{color: "red", fontSize: "14px"}}>{fieldErrors.fullName}</Typography>
              )}

              <TextField id="standard-basic" label="User Email" {...register('email')} type="email" variant="standard" 
              onChange={(e) => {
                clearFieldAfterErr("email");
                setValue("email", e.target.value);
              }}/>
              {fieldErrors.email &&(
                <Typography sx={{color: "red", fontSize: "14px"}}>{fieldErrors.email}</Typography>
              )}

              <TextField id="standard-basic" label="Password" {...register('password')} type="password" variant="standard" 
              onChange={(e) => {
                clearFieldAfterErr("password");
                setValue("password", e.target.value);
              }}/>
              {fieldErrors.password &&(
                <Typography sx={{color: "red", fontSize:"14px"}}>{fieldErrors.password}</Typography>
              )}

              <TextField id="standard-basic" label="Phone Number" {...register('phoneNumber')} type="number" variant="standard"
              onChange={(e) => {
                clearFieldAfterErr("phoneNumber");
                setValue("phoneNumber", e.target.value);
              }} />
              {fieldErrors.phoneNumber &&(
                <Typography sx={{color: "red", fontSize: "14px"}}>{fieldErrors.phoneNumber}</Typography>
              )}

              <Button variant="contained" type="submit" sx={{backgroundColor: "#DB4444", py: "16px"}} endIcon={<SendIcon />}>Create Account</Button>
              <Button variant="contained" sx={{backgroundColor: "#fff", color: "black", fontWeight: 400, py: "16px", border: "2px solid #ccc"}} endIcon={<GoogleIcon />}>Sign up with Google</Button>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Already have account? <Box component={RouterLink} to={"/auth/Login"} color="textSecondary" variant="span" sx={{ textDecoration: "underline", cursor: "pointer", color: "#4c4b4bff" }}>Log in</Box>
              </Typography>
            </Box>            
          </Box>
      </Grid>      
      </Grid>

  )
}
