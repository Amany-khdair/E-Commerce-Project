import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Snowfall from 'react-snowfall';
import aboutImg from '../../assets/images/about.webp';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaidIcon from '@mui/icons-material/Paid';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import tomImg from '../../assets/images/team/tom.webp';
import emmaImg from '../../assets/images/team/emma.webp';
import willImg from '../../assets/images/team/will.webp';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Services from '../../components/products/Services';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const theme = useTheme();

  const stats = [
    { icon: <StorefrontIcon />, value: '10.5k', label: t("SellersActiveOurSite") },
    { icon: <PaidIcon />, value: '33k', label: t("MonthlyProductSale") },
    { icon: <LocalMallIcon />, value: '45.5k', label: t("CustomerActiveOurSite") },
    { icon: <MonetizationOnIcon />, value: '25k', label: t("AnnualGrossSaleOurSite") },
  ];

  const team = [
    { name: t("Tom"), role: t("FounderChairman"), img: tomImg },
    { name: t("Emma"), role: t("ManagingDirector"), img: emmaImg },
    { name: t("Will"), role: t("ProductDesigner"), img: willImg },
  ];

  return (
    <Box sx={{my: 5, py: 2}}>
      <Snowfall color='#82C3D9'/>
      
      <Breadcrumbs aria-label="breadcrumb"  sx={{mb: 4}}>
        <Link underline="hover" color="inherit" href="/">
          {t("Home")}
        </Link>        
        <Link underline="hover" color="text.primary" href="/about" aria-current="page">
          {t("About")}
        </Link>
      </Breadcrumbs>

      <Box>
        <Grid container spacing={2} sx={{ flexDirection: {xs: "column", md: "row"}, justifyContent: "space-evenly", alignItems: "center"}}>
          <Grid item xs={12} md={6} sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="h3" fontWeight={700} mb={4}>{t("OurStory")}</Typography>
            <Typography variant="body1">
              {t("StoryParagraph")}
            </Typography>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography component="img" src={aboutImg} alt='About Us' sx={{ width: "100%", maxWidth: 500, objectFit: "cover", borderRadius: 3 }}/>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ py: 8, justifyContent: "center"}}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',                
                color: theme.palette.text.primary, 
                backgroundColor: theme.palette.background.default,               
                transition: 'all 0.5s ease',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)',
                '&:hover': {
                   backgroundColor: 'primary.main', 
                   color: theme.palette.text.primary, 
                   boxShadow: '0px 12px 30px rgba(219, 68, 68, 0.45)',
                   transform: 'translateY(-8px)'
                  },
                '&:hover .icon':{background: 'linear-gradient(135deg, theme.palette.text.primary, rgba(255,255,255,0.4))',}

              }}>
                <Box className="icon" sx={{ 
                  width: 80, height: 80, background: 'linear-gradient(135deg, #e1e1e1, #c4c4c4)', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  margin: '0 auto 20px', border: '5px solid rgba(0,0,0,0.5)'
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}> {t("OurTeam")} </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ py: 2, mx: "auto" }}>
          {t("TeamIntro")}
        </Typography>
        
        <Grid container spacing={4} sx={{ py: 8, justifyContent: "center" }}>               
          {team.map((member, index)=>(
            <Grid item xs={12} md={6} key={index}>
              
              <Card sx={{borderRadius: 5, mx:"auto", textAlign: "center", overflow: "hidden", boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.08)", transition: "all 0.3s ease", 
                "&:hover":{transform: "translateY(-6px)", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)"}
              }}>
                
                <CardMedia component={'img'} image={member.img} alt={member.name} sx={{ width: "100%", height: 350, objectFit: 'contain', backgroundColor: '#F5F5F5', p: 4, pb:0, borderRadius: 1, textAlign: 'center',
                  transition: "0.5s", "&:hover": {transform: "scale(1.1)" }
                }}/>
                
                <CardContent sx={{pb: 4}}>
                  <Typography variant="h5" fontWeight={600} sx={{ mt: 1 }}>{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: "center", gap: 0.1 }}>
                    <Button><TwitterIcon fontSize="small" /></Button>
                    <Button><InstagramIcon fontSize="small" /></Button>
                    <Button><FacebookIcon fontSize="small" /></Button>
                  </Stack>
                </CardContent>
                
              </Card>
            </Grid>
          ))}
        </Grid>
                
        <Typography variant="h4" fontWeight={700} mt={4}>
          {t("OurServices")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ py: 2, mx: "auto" }}>
          {t("ServicesIntro")}
        </Typography>
        <Services/>
      </Box>
    </Box>
  )
}
