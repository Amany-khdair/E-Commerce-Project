import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { useReset } from '../../hooks/useReset';
import Snowfall from 'react-snowfall';
import { useTranslation } from 'react-i18next';
import GradientText from '../../functions/GradientText';

export default function ResetPassword() {
    const { t, i18n } = useTranslation();
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
      
        resetMutation.mutate(sendData);
    }
    
  return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 400}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
        <Snowfall color='#82C3D9'/>        
         <GradientText>
            {t("ResetPasswordHead")}
         </GradientText>
              
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField variant ="standard" fullWidth label ={t("UserEmail")} value ={email} type= "email" sx={{my: 2}} disabled 
            InputLabelProps={{
                  sx: {
                    textAlign: i18n.language === "ar" ? "right" : "left",
                    left: i18n.language === "ar" ? "auto" : undefined, 
                    right: i18n.language === "ar" ? 0 : undefined,
                  }
            }}></TextField>
            
            <TextField variant ="standard" fullWidth label ={t("code")} value={code} type= "number" sx={{mb: 2}} disabled
            InputLabelProps={{
                  sx: {
                    textAlign: i18n.language === "ar" ? "right" : "left",
                    left: i18n.language === "ar" ? "auto" : undefined, 
                    right: i18n.language === "ar" ? 0 : undefined,
                  }
            }}></TextField>
            
            <TextField variant="standard" fullWidth label={t("NewPassword")} type={showPassword ? "text" : "password"}
            sx={{ mb: 2 }} {...register("newPassword")} error={!!errors.newPassword} helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                textAlign: i18n.language === "ar" ? "right" : "left",
                direction: i18n.language === "ar" ? "rtl" : "ltr"
              }
            }}
            InputLabelProps={{
              sx: {
                textAlign: i18n.language === "ar" ? "right" : "left",
                right: i18n.language === "ar" ? 0 : undefined,
              }
            }}
          />


            <LoadingButton fullWidth loading={isSubmitting} loadingIndicator={t("Processing")} variant="contained" type="submit" 
            sx={{backgroundColor: "#DB4444", py: "13px", px: "45px", mx: "5px", fontSize: "16px"}}
            > {t("SubmitPassword")} </LoadingButton>
        </Box>
    </Box>
  )
}
