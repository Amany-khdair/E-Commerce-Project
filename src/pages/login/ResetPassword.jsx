import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { typing, shine, lift } from "../../animation/LogoAnimation";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { useReset } from '../../hooks/useReset';

export default function ResetPassword() {
    const email = localStorage.getItem("resetEmail");
    const code = localStorage.getItem("resetCode");
    const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onBlur",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
    event.preventDefault();
    };

    const resetMutation = useReset();

    const onSubmit = async (data) =>{
        const sendData ={
            email, code, newPassword: data.newPassword,
        };
        console.log(sendData);
        resetMutation.mutate(sendData);
    }
    
  return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 400}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
        <Typography variant="h3" sx={{fontWeight: 700, textAlign: "center", mb: 3, whiteSpace: "nowrap", overflow: "hidden", width: "fit-content",
                        animation: ` ${typing} 1.6s steps(12) forwards, ${lift} 3s ease-in-out infinite 1.6s`, background: "linear-gradient(90deg, #000, #DB4444, #000)", WebkitBackgroundClip: "text",
                        color: "transparent", backgroundSize: "200%", animationDelay: "0s, 1.6s", "&:after": { content: '""', animation: `${shine} 2s linear infinite`, position: "absolute", width: "100%", height: "100%", left: 0, top: 0}}}>
         Reset Password </Typography>

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
            <LoadingButton fullWidth loading={isSubmitting} loadingIndicator="Processing..." variant="contained" type="submit" 
            sx={{backgroundColor: "#DB4444", py: "13px", px: "45px", mx: "5px", fontSize: "16px"}}
            > Submit Password </LoadingButton>
        </Box>
    </Box>
  )
}
