import { Modal, Box, Typography, Button, useTheme, Backdrop, Fade, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotSignedModal({ open, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = () => {
    onClose();
    navigate("/auth/login");
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }
        },
      }}
    >
        <Fade in={open}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                width: { xs: "90%", sm: "420px" },
                p: { xs: 4, sm: 5 },
                borderRadius: "24px",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                outline: 'none'
            }}>
                
                <Box sx={{
                width: 70,
                height: 70,
                bgcolor: 'primary.light',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3               
                }}>
                    <Typography variant="h4" fontWeight="bold">!</Typography>
                </Box>

                <Typography variant="h5" fontWeight={800} mb={1.5} sx={{ letterSpacing: '-0.5px' }}>
                    {t("LoginRequired")}
                </Typography>

                <Typography color="text.secondary" mb={4} sx={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    {t("PleaseLoginToContinue")}
                </Typography>

                <Stack spacing={2}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={handleLogin}
                        sx={{ 
                        textTransform: "none", 
                        py: 1.6, 
                        borderRadius: "12px", 
                        fontSize: "1rem",
                        fontWeight: 600,
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[8],
                        },
                        transition: 'all 0.3s ease'
                        }} 
                    >
                        {t("GoToLogin")}
                    </Button>

                    <Button 
                        variant="text" 
                        fullWidth 
                        onClick={onClose}
                        sx={{ 
                        textTransform: "none", 
                        color: 'text.disabled',
                        fontWeight: 500,
                        '&:hover': { color: 'text.primary' }
                        }} 
                    >
                        {t("MaybeLater")}
                    </Button>
                </Stack>
            </Box>
        </Fade>
    </Modal>
  );
}
