import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { typing, shine, lift } from "../../animation/LogoAnimation";
import axios from 'axios';
import Swal from "sweetalert2";

export default function ForgetPassword() {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const sendCode = async (data) =>{
    try{
        const response = await axios.post("https://knowledgeshop.runasp.net/api/Auth/Account/SendCode", data);
        if (response.status === 200){
            console.log(response);
            localStorage.setItem("resetEmail", data.email);
            await Swal.fire({
                icon: "success",
                title: "Check Your Email!",
                text: response.data.message,
                confirmButtonColor: "#DB4444",
            });
            navigate("/auth/verifyCode");
        }
    }catch(err){
        console.log(err);
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
    <Box sx={{maxWidth: 400, mx: 'auto', mt: 10}}>
        <Typography variant="h3" sx={{
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
                      }}> Forget Password</Typography>
        <Box component={'form'} onSubmit={handleSubmit(sendCode)} sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField id="standard-basic" label="User Email" type="email" fullWidth variant="standard" {...register('email', {required: true})}/>                         
            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: "#DB4444", py: "13px", px: "45px"}}>Send Code</Button>
        </Box>
    </Box>
  )
}
