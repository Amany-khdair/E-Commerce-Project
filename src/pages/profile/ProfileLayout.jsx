import { Box, Button, CircularProgress, Container, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import useProfile from '../../hooks/useProfile';
import GradientText from '../../functions/GradientText';
import { NavLink, Outlet } from 'react-router-dom';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import Snowfall from 'react-snowfall';

export default function ProfileLayout() {
    const {data, isLoading, isError} = useProfile();
    const { t } = useTranslation();
    const theme = useTheme();

    if(isLoading)
    return(
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 10}}>
          <CircularProgress sx={{color: "primary.main"}}/>
      </Box>
    ) 

    if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("LoadingErrorCart")} </Typography>        

  return (
    <Box sx={{py: 6, backgroundColor: theme.palette.background.default}}>
      <Snowfall color='#82C3D9' style={{ position: 'fixed' }} />
      <Box component={'section'}>        
        <Container maxWidth="lg">
          <GradientText sx={{fontSize: {xs: '20px', sm: '30px', md: '42px'}}}>
           ⚜️ {t("WLC")}  {data?.fullName}⚜️
         </GradientText>
          <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
                <Paper elevation={0} sx={{ p: 1, borderRadius: '16px', border: '1px solid #eee' }}>
                    <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>                                            
                          <Typography variant='body1' sx={{color: 'text.secondary', textAlign: "center"}}>{t("DashBoard")}</Typography>
                          <Button component={NavLink} to='' sx={{                                                         
                              p: 1.5,
                              borderRadius: '12px',                              
                              color: 'text.secondary',
                              transition: '0.3s',
                              '&.active': {
                                  backgroundColor: (theme) => theme.palette.primary.main,
                                  color: (theme) => theme.palette.primary.contrastText,
                                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}33`,
                              },
                              '&:hover:not(.active)': {
                                  backgroundColor: (theme) => theme.palette.action.hover,
                              }

                          }}><PersonOutlineIcon/> {t("MyInfo")}</Button>

                          <Button component={NavLink} to='orders' sx={{                             
                              p: 1.5,
                              borderRadius: '12px',                              
                              color: 'text.secondary',
                              transition: '0.3s',
                              '&.active': {
                                  backgroundColor: (theme) => theme.palette.primary.main,
                                  color: (theme) => theme.palette.primary.contrastText,
                                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}33`,
                              },
                              '&:hover:not(.active)': {
                                  backgroundColor: (theme) => theme.palette.action.hover,
                              }

                          }}><ShoppingCartOutlinedIcon/> {''}{t("MyOrders")}</Button>     

                           <Button component={NavLink} to='settings' sx={{                             
                              p: 1.5,
                              borderRadius: '12px',                              
                              color: 'text.secondary',
                              transition: '0.3s',
                              '&.active': {
                                  backgroundColor: (theme) => theme.palette.primary.main,
                                  color: (theme) => theme.palette.primary.contrastText,
                                  boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}33`,
                              },
                              '&:hover:not(.active)': {
                                  backgroundColor: (theme) => theme.palette.action.hover,
                              }

                          }}><SettingsIcon/> {''}{t("Settings")}</Button>                                 
                    </Stack>
                </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
                <Paper elevation={4} sx={{ p: {xs: 2, md: 4}, borderRadius: '16px', border: '1px solid #eee', width: "100%"}}>
                    <Outlet />
                </Paper>
            </Grid>
          </Grid>
         
        </Container>
        
      </Box>
    </Box>
    
  )
}
