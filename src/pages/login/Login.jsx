import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import sideImage from '../../assets/images/Side Image.webp';
import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import styles from './login.module.css'
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const {register, handleSubmit, setValue} = useForm({});  
  const [fieldErrors, setFieldErrors] = useState({
  email: "", password: ""});
   
  const clearFieldAfterErr = (field) => {
    setFieldErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };


  const registerForm = async(values)=>{
    console.log(values);    
    setFieldErrors({
      email: "", password: ""});
    try{
      const response = await axios.post('https://knowledgeshop.runasp.net/api/Auth/Account/Login', values);
      
      if (response.status === 200){
        console.log(response);
        localStorage.setItem("token", response.data.accessToken);
      }
      console.log(response);
    }catch(error) {
      const apiErrors = error.response?.data?.errors || [];

      const newErrors = {    
        email: "",
        password: "",
      };

      apiErrors.forEach(err => {

        if (err.toLowerCase().includes("email")) {
          newErrors.email = err;
        }

        else if (err.toLowerCase().includes("password")) {
          newErrors.password = err;
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
            <Typography variant="h4" sx={{fontWeight: 400, marginBottom: 3}}>Log in to Exclusive</Typography>
            <Typography variant="h6" sx={{fontWeight: 300}}>Enter your details below</Typography>          

            <Box onSubmit={handleSubmit(registerForm)} component={"form"} sx={{mt: 5, display: "flex", flexDirection: "column", gap: 3}}>              
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
              <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant="contained" type="submit" sx={{backgroundColor: "#DB4444", py: "16px"}} endIcon={<SendIcon />}>Log in</Button>
                <Typography component={RouterLink} to={"/contact"} variant="span" sx={{color: "#DB4444", fontWeight: 300, fontSize: "16px", textDecoration: "none"}}>Forget Password?</Typography>
              </Box>
              
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Dont have account? <Box component={RouterLink} to={"/auth/register"} color="textSecondary" variant="span" sx={{ textDecoration: "underline", cursor: "pointer", color: "#4c4b4bff" }}>Sign Up</Box>
              </Typography>
            </Box>            
          </Box>
      </Grid>      
      </Grid>

  )
}
