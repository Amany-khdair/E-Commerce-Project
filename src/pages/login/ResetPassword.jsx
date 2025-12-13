import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { typing, shine, lift } from "../../animation/LogoAnimation";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ResetPassword() {
    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("resetCode");
    const {register, handleSubmit, formState: { errors}} = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onBlur",
    });
   const navigate = useNavigate();
//console.log("Errors:", errors);
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
    event.preventDefault();
    };

    const onSubmit = async (data) =>{
        const sendData ={
            email, code, newPassword: data.newPassword,
        };
        console.log(sendData);
        try{
            const response = await axios.patch("https://knowledgeshop.runasp.net/api/Auth/Account/ResetPassword", sendData);
            if (response.status === 200){
                console.log(response);
                await Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.data.message,
                                confirmButtonColor: "#DB4444",
                            });
                navigate("/auth/login");
            }
            
        }catch(err){
            console.log(err.response?.data || err.message);
            Swal.fire({
                    icon: "error",
                    title: "Oops 😕",
                    text:
                      err.response?.data?.message ||
                      "Something went wrong, please try again",
                    confirmButtonColor: "#DB4444",
                    });
        }    
    }
    
  return (
    <Box sx={{maxWidth: 400, mx: 'auto', mt: 10, textAlign: 'center'}}>
        <Typography variant="h3" 
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "fit-content",
                  animation: `
                                  ${typing} 1.6s steps(12) forwards,
                                  ${lift} 3s ease-in-out infinite 1.6s
                                `,
                  background: "linear-gradient(90deg, #000, #DB4444, #000)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "200%",
                  animationDelay: "0s, 1.6s",
                  "&:after": {
                    content: '""',
                    animation: `${shine} 2s linear infinite`,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                  },
                }}> Reset Password </Typography>
        <Typography variant='body'>Enter Your New Password</Typography>        
        
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField variant ="standard" fullWidth label ="email" value ={email} type= "email" sx={{my: 2}} disabled ></TextField>
            <TextField variant ="standard" fullWidth label ="code" value={code} type= "number" sx={{mb: 2}} disabled></TextField>
            <TextField variant ="standard" fullWidth label ="New Password" type={showPassword ? "text" : "password"} sx={{mb: 2}}
            {...register("newPassword")} error={errors.newPassword} helperText={errors.newPassword?.message} 
            InputProps={{endAdornment: (<InputAdornment position="end">
                                  <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                  >{showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}></TextField>
            <Button fullWidth variant ="contained" type ="submit" sx={{backgroundColor: "#DB4444", fontSize: "16px", textDecoration: "none"}}>Submit Password</Button>
        </Box>
    </Box>
  )
}
