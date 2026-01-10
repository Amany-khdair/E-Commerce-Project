import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { lift, shine, typing } from '../../animation/LogoAnimation';
import SendIcon from '@mui/icons-material/Send';

export default function Footer() {
  const footerSections = [
    {
      title: 'Support',
      links: [
        {name: '111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.', path: ''}, 
        {name: 'exclusive@gmail.com', path: ''},
        {name: '+88015-88888-9999', path: ''}],
    },
    {
      title: 'Account',
      links: [
        {name: 'My Account', path: '/account'}, 
        {name: 'Cart', path: '/cart'},
        {name: 'Wishlist', path: '/wishlist'}, 
        {name: 'Shop', path: '/allProducts'}],
    },
    {
      title: 'Quick Link',
      links: [{name: 'Privacy Policy', path: ''}, 
      {name: 'Terms Of Use', path: ''}, 
      {name: 'FAQ', path: ''}, 
      {name: 'Contact', path: '/contact'}],
    },
  ];

  return (
    <>
    <Box sx={{ mt: 6, backgroundColor: 'black', color: 'white', pt: 10, pb: 5, position: 'relative', overflow: 'hidden',        
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 500,
          height: 400,
          background: 'radial-gradient(circle, rgba(189, 53, 53, 0.2) 0%, rgba(0,0,0,0) 70%)',          
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} sx={{display: "flex",  justifyContent: {xs: "center", md: "space-evenly"}}}>      
          <Grid item xs={12} sm={5} sx={{textAlign: {xs: "center"}}}>           
            
            <Typography variant="h3" sx={{fontWeight: 700, mb: 4, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", width: "fit-content",
                                animation: ` ${typing} 1.6s steps(12) forwards, ${lift} 3s ease-in-out infinite 1.6s`, background: "linear-gradient(90deg, #fff, #DB4444, #fff)", WebkitBackgroundClip: "text",
                                color: "transparent", backgroundSize: "200%", animationDelay: "0s, 1.6s", "&:after": { content: '""', animation: `${shine} 2s linear infinite`, position: "absolute", width: "100%", height: "100%", left: 0, top: 0}}}>
                Exclusive 
            </Typography>

            <Box sx={{textAlign: {xs: "center", md: "left"}}}>
              <Typography variant="h4" fontWeight={600} sx={{ my: 2, paddingLeft: {xs: 1, md: 5} }}>
                Subscribe
              </Typography>

              <Typography variant="body2" sx={{ my: 2, paddingLeft: {xs: 1, md: 5}  }}>
                Get 10% off your first order
              </Typography>

              <TextField variant="outlined" placeholder="Enter Your Email" fullWidth
                sx={{ maxWidth: "400px", color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', px: 4, py: 1.5, borderRadius: '8px', fontSize: '16px', 
                  '& .MuiOutlinedInput-root': {
                    color: 'white',                 
                    borderRadius: '4px',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      transition: "0.5s"
                    },
                    '&:hover fieldset': {
                      boxShadow: '0px 0px 30px #db444453',
                      borderColor: 'white'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                      boxShadow: '0px 0px 30px #db444453'
                    },
                  },                              
                  
                }} InputProps={{ endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ color: 'white' }} edge="end">
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
              />
            </Box>            
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{
                backgroundColor: '#0A0A0B',
                p: { xs: 4, md: 6 },
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <Grid container spacing={4}>
                {footerSections.map((footer) => (
                  <Grid item xs={6} sm={4} key={footer.title}>
                    <Typography sx={{ fontWeight: 700, mb: 3, fontSize: '16px' }}>
                      {footer.title}
                    </Typography>
                    <Stack spacing={2}>
                      {footer.links.map((link) => (
                        <Link key={link.name} component={RouterLink} to={link.path} underline="none" 
                        sx={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '14px',
                            transition: '0.3s',
                            '&:hover': { color: 'white' }
                          }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                  Follow us on:
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton sx={{ color: 'white', '&:hover': { color: '#1DA1F2' } }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white', '&:hover': { color: '#4267B2' } }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white', '&:hover': { color: '#E1306C' } }}>
                    <InstagramIcon />
                  </IconButton>
                </Stack>
              </Box>

            </Box>
          </Grid>

        </Grid>

        <Box sx={{mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <Typography textAlign= "center" sx={{color: 'rgba(255,255,255,0.6)'}}>
            Copyright @Amany 2026. All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box> 
    </>
  );
}