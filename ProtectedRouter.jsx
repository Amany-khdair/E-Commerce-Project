import React from 'react'
import useAuthStore from './src/store/authStore'
import { Box, Button, Paper, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
  const token = useAuthStore(state=>state.token);
  const navigate = useNavigate();
  
  if (!token) {
    return (
      <Box sx={{
          py: 14,
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper elevation={6} sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            width: { xs: "100%", sm: "400px" },
          }}
        >
          <Box sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 3,              
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: 40, color: "#fff" }} />
          </Box>

          <Typography variant="h5" fontWeight={700} mb={1}>
            Access Restricted
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            You need to be logged in to view this page.  
            Please login to continue.
          </Typography>

          <Button variant="contained"
            fullWidth sx={{ py: 1.3, borderRadius: 3, fontWeight: 600 }}
            onClick={() => navigate("/auth/login")}
          >
            Login Now
          </Button>
        </Paper>
      </Box>
    );
  }

  return children;
}
