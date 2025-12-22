import { Box, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { typing, shine, lift } from "../../animation/LogoAnimation";
import { LoadingButton } from '@mui/lab';
import { useForget } from '../../hooks/useForget';
import Snowfall from 'react-snowfall';

export default function ForgetPassword() {
  const {register, handleSubmit, formState: {isSubmitting}} = useForm();
  const forgetMutation = useForget(); 
  const sendCode = async (data) =>{
    forgetMutation.mutate(data);
  };

   return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 400}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
        <Snowfall color='#82C3D9'/>
        <Typography variant="h3" sx={{fontWeight: 700, textAlign: "center", mb: 3, whiteSpace: "nowrap", overflow: "hidden", width: "fit-content",
                        animation: ` ${typing} 1.6s steps(12) forwards, ${lift} 3s ease-in-out infinite 1.6s`, background: "linear-gradient(90deg, #000, #DB4444, #000)", WebkitBackgroundClip: "text",
                        color: "transparent", backgroundSize: "200%", animationDelay: "0s, 1.6s", "&:after": { content: '""', animation: `${shine} 2s linear infinite`, position: "absolute", width: "100%", height: "100%", left: 0, top: 0}}}>
         Forget Password</Typography>
         
        <Box component={'form'} onSubmit={handleSubmit(sendCode)} sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField id="standard-basic" label="User Email" type="email" fullWidth variant="standard" {...register('email', {required: true})}/>                         
            
            <LoadingButton fullWidth loading={isSubmitting} loadingIndicator="Processing..." variant="contained" type="submit" 
                        sx={{backgroundColor: "#DB4444", py: "13px", px: "45px", mx: "5px", fontSize: "16px"}}
            > Send Code </LoadingButton>
        </Box>
    </Box>
  )
}
