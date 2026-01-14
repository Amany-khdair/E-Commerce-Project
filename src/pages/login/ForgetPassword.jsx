import { Box, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab';
import { useForget } from '../../hooks/useForget';
import Snowfall from 'react-snowfall';
import { useTranslation } from 'react-i18next';
import GradientText from '../../functions/GradientText';

export default function ForgetPassword() {
  const {register, handleSubmit, formState: {isSubmitting}} = useForm();
  const { t, i18n } = useTranslation();
  const forgetMutation = useForget(); 
  const sendCode = async (data) =>{
    return forgetMutation.mutateAsync(data);
  };

   return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 450}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
        <Snowfall color='#82C3D9'/>        
         <GradientText>
            {t("ForgetPasswordHead")}
         </GradientText>
         
        <Box component={'form'} onSubmit={handleSubmit(sendCode)} sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField id="standard-basic" label={t("UserEmail")} type="email" fullWidth variant="standard" {...register('email', {required: true})}
            InputLabelProps={{
                  sx: {
                    textAlign: i18n.language === "ar" ? "right" : "left",
                    left: i18n.language === "ar" ? "auto" : undefined, 
                    right: i18n.language === "ar" ? 0 : undefined,
                  }
            }}/>                         
            
            <LoadingButton fullWidth loading={isSubmitting} loadingIndicator={t("Processing")} variant="contained" type="submit" 
                        sx={{backgroundColor: "#DB4444", py: "13px", px: "45px", mx: "5px", fontSize: "16px"}}
            > {t("SendCode")}</LoadingButton>
        </Box>
    </Box>
  )
}
