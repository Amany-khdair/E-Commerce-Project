import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Container, Typography, TextField, Button, 
  Grid, Paper, Divider, Stack, 
  useTheme
} from '@mui/material';
import Snowfall from 'react-snowfall';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const theme = useTheme();
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    Swal.fire({
      title: t("MessageSent"),
      text: t("WeWillContactYouSoon"),
      icon: "success",
      confirmButtonText: t("Okay"),
    });

    reset();
  };

  return (
    <Box sx={{ py: 10, display: 'flex', alignItems: 'center' }}>
      <Snowfall color='#82C3D9' style={{ position: 'fixed', zIndex: -1 }} />
      
      <Container maxWidth="md">
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 8 }, 
            border: `1px solid ${theme.palette.divider}`, 
            borderRadius: '24px', 
            boxShadow: theme.palette.mode === "dark"
              ? "0 10px 40px rgba(255,255,255,0.05)"
              : "0 10px 40px rgba(0,0,0,0.05)",
            bgcolor: theme.palette.background.paper
          }}
        >

          <Stack spacing={1} mb={6}>
            <Typography variant="h3" fontWeight="800" letterSpacing="-1px">
              {t("ContactUs")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
              {t("FillForm")}
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} direction= "column">
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: "block", color: "text.secondary" }}>
                  {t("FirstName")}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={t("FirstNamePlaceholder")}
                  {...register("firstName", { required: t("Required") })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px",  bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#fbfbfb" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: "block", color: "text.secondary" }}>
                  {t("LastName")}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={t("LastNamePlaceholder")}
                  {...register("lastName", { required: t("Required") })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px", bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#fbfbfb" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: "block", color: "text.secondary" }}>
                  {t("EmailAddress")}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={t("EmailPlaceholder")}
                  {...register("email", { 
                    required: t("Required"),
                    pattern: { value: /^\S+@\S+$/i, message: t("InvalidEmail") }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px", bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#fbfbfb" } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, display: "block", color: "text.secondary" }}>
                  {t("YourMessage")}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={t("MessagePlaceholder")}
                  {...register("message", { required: t("Required") })}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: "12px",  bgcolor: theme.palette.mode === "dark" ? "#1f1f1f" : "#fbfbfb" } }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <Button 
                  type="submit" 
                  fullWidth
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    py: 2,                     
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    '&:hover': { bgcolor: 'primary.main', color: '#fff', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t("SendMessage")}
                </Button>
              </Grid>

            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}