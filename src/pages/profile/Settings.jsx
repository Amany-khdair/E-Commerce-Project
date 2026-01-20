import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Paper, Select, Stack, Switch, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useThemeStore from '../../store/useThemeStore';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import useUpdateEmail from '../../hooks/useUpdateEmail';
import useUpdatePassword from '../../hooks/useUpdatePassword';
import useProfile from '../../hooks/useProfile';

export default function Settings() {
    const { t, i18n } = useTranslation();    
    const mode = useThemeStore((state) => state.mode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const toggleLanguage = () => {
        const newLng = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLng);
    }
    const theme = useTheme();
    const { data } = useProfile();        
    const [fullName, setFullName] = useState(data?.fullName || "");
    const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");
    const [city, setCity] = useState(data?.city || "");

    const { mutate: updateProfile, isPending: updateProfilePending } = useUpdateProfile();
    const { mutate: updateEmail, isPending: updateEmailPending } = useUpdateEmail();
    const { mutate: updatePassword, isPending: updatePassPending } = useUpdatePassword();

    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePass, setOpenChangePass] = useState(false);

    const [newEmail, setNewEmail] = useState("");
        
    const [passwords, setPasswords] = useState({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmNewPassword: ""
    });

    const handleUpdateProfile = () => {
        updateProfile({ fullName, phoneNumber, city }, {
            onSuccess: () => setOpenEditProfile(false)
        });
    };

    const handleChangeEmail = () => {
        updateEmail({ NewEmail: newEmail }, {
            onSuccess: () => {
                setOpenChangeEmail(false);
                setNewEmail("");
            }
        });
    };

    const handleChangePassword = () => {
        updatePassword(passwords, {
            onSuccess: () => {
                setOpenChangePass(false);
                setPasswords({ CurrentPassword: "", NewPassword: "", ConfirmNewPassword: "" });
            }
        });
    };
    return (
       
    <Box xs={12} md={5}>
        <Paper elevation={0} sx={{p: 3, borderRadius: '16px', height: '100%', border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper}}>
            <Typography variant="h5" fontWeight="700" mb={2}>{t("Settings")}</Typography>           
            <Stack spacing={3}>                
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{p: 3, borderRadius: '16px', border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[50] }}>
                        <Typography variant="subtitle1" fontWeight="bold" mb={2}>{t("SecurityAndActions")}</Typography>
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                            <Button variant="outlined" sx={{borderRadius: '10px', textTransform: 'none', px: 3}} onClick={() => setOpenEditProfile(true)}>
                                {t("UpdateProfile")}
                            </Button>
                            
                            <Button variant="outlined" color="warning" sx={{borderRadius: '10px', textTransform: 'none', px: 3}} onClick={() => setOpenChangeEmail(true)}>
                                {t("ChangeEmail")}
                            </Button>

                            <Button variant="outlined" color="error" sx={{borderRadius: '10px', textTransform: 'none', px: 3}} onClick={() => setOpenChangePass(true)}>
                                {t("ChangePassword")}
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        {/* <LanguageIcon fontSize="small" color="primary" /> */}
                        <Typography>{t("Language")}</Typography>
                    </Stack>

                    <Select 
                        size="small" 
                        value={i18n.language} 
                        onChange={(e) => toggleLanguage(e.target.value)}
                        sx={{ borderRadius: '8px', minWidth: 100 }}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="ar">العربية</MenuItem>
                    </Select>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        {mode === "dark" ? t("LightMode") : t("DarkMode")}
                    </Stack>

                    <Switch checked={mode === "dark"} onClick={toggleTheme} color="primary"
                        sx={{
                            borderRadius: "35%",
                            transition: "all 0.4s ease",
                            bgcolor: mode === "dark" ? "#fff" : "#DB4444",
                            color: mode === "dark" ? "#515151ff" : "#fff",

                            "&:hover": {
                                transform: "scale(1.12)",
                                boxShadow:
                                    mode === "dark"
                                        ? "0 0 18px rgba(255,255,255,0.8)"
                                        : "0 0 18px rgba(219,68,68,0.8)",
                            },

                            "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                                boxShadow:
                                    mode === "dark"
                                        ? "0 0 6px rgba(255,255,255,0.7)"
                                        : "0 0 6px rgba(219,68,68,0.7)",
                            },
                        }}
                    />

                </Box>
            </Stack>
        </Paper>
        
        {/* Profile Modals */}
        
        <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)} fullWidth maxWidth="xs">
            <DialogTitle>{t("UpdateProfile")}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField fullWidth label={t("FullName")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <TextField fullWidth label={t("PhoneNumber")} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <TextField fullWidth label={t("City")} value={city} onChange={(e) => setCity(e.target.value)} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenEditProfile(false)}>{t("Cancel")}</Button>
                <Button variant="contained" onClick={handleUpdateProfile} disabled={updateProfilePending}>{t("SaveChanges")}</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openChangeEmail} onClose={() => setOpenChangeEmail(false)} fullWidth maxWidth="xs">
            <DialogTitle>{t("ChangeEmail")}</DialogTitle>
            <DialogContent>
                <TextField fullWidth sx={{ mt: 1 }} label={t("NewEmail")} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenChangeEmail(false)}>{t("Cancel")}</Button>
                <Button variant="contained" onClick={handleChangeEmail} disabled={updateEmailPending}>{t("Submit")}</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openChangePass} onClose={() => setOpenChangePass(false)} fullWidth maxWidth="xs">
            <DialogTitle>{t("ChangePassword")}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField fullWidth type="password" label={t("CurrentPassword")} 
                        onChange={(e) => setPasswords({...passwords, CurrentPassword: e.target.value})} />
                    <TextField fullWidth type="password" label={t("NewPassword")} 
                        onChange={(e) => setPasswords({...passwords, NewPassword: e.target.value})} />
                    <TextField fullWidth type="password" label={t("ConfirmNewPassword")} 
                        onChange={(e) => setPasswords({...passwords, ConfirmNewPassword: e.target.value})} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenChangePass(false)}>{t("Cancel")}</Button>
                <Button variant="contained" color="error" onClick={handleChangePassword} disabled={updatePassPending}>{t("Update")}</Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}
