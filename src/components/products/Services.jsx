import { Box, Grid, Typography } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export default function Services() {
  return (
    <Grid container spacing={7} justifyContent="center" sx={{ py: 8 }}>
      {/* first item */}
      <Grid item xs={12} sm={6} md={4}>
        <Box textAlign="center" sx={{p: 3, borderRadius: 2, "&:hover":{boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)", transform: "translateY(-4px)"}}}>
          <Box sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto" }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LocalShippingOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
              FREE AND FAST DELIVERY
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Free delivery for all orders over $140
          </Typography>
        </Box>
      </Grid>

      {/* second item */}
      <Grid item xs={12} sm={6} md={4}>
        <Box textAlign="center" sx={{p: 3, borderRadius: 2, "&:hover":{boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)", transform: "translateY(-4px)"}}}>
          <Box sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto"}}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HeadsetMicOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
              24/7 CUSTOMER SERVICE
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
              Friendly 24/7 customer support
          </Typography>
        </Box>
      </Grid>

      {/* third item */}
      <Grid item xs={12} sm={6} md={4}>
        <Box textAlign="center" sx={{p: 3, borderRadius: 2, "&:hover":{boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)", transform: "translateY(-4px)"}}}>
          <Box sx={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto" }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <VerifiedUserOutlinedIcon sx={{ color: "#fff", fontSize: 26 }} />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
            MONEY BACK GUARANTEE
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
            We return money within 30 days
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
