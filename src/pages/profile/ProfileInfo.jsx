import React from 'react';
import { 
    Box, Typography, Grid, Paper, Divider, Stack, Button, Avatar, 
    TextField, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useProfile from '../../hooks/useProfile';

export default function ProfileInfo() {
    const { data } = useProfile();    
    const { t } = useTranslation();


    return (
        <Box>            
            <Typography variant="h5" fontWeight="700" mb={3}>
                {t("PersonalSettings")}
            </Typography>            
                
            <Grid container xs={12} md={7}>
                <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: '16px', width: {xs: "100%", sm: "350px", md: "500px", lg: "750px"} }}>
                    <Stack spacing={3}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main', fontSize: '24px' }}>
                                {data?.fullName?.charAt(0).toUpperCase()}
                            </Avatar>
                            
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {data?.fullName && data?.fullName[0].toUpperCase() + data?.fullName.slice(1)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{t("MemberSince")} 2026</Typography>
                            </Box>
                        </Box>

                        <Divider />
    
                        <Stack spacing={2}>
                            <DetailItem label={t("EmailAddress")} value={data?.email} />
                            <DetailItem label={t("PhoneNumber")} value={data?.phoneNumber || t("NotSet")} />
                            <DetailItem label={t("City")} value={data?.city || t("NotSet")} />
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>                        
        </Box>
    );
}

const DetailItem = ({ label, value }) => (
    <Box>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography variant="body1" fontWeight="500">{value}</Typography>
    </Box>
);
