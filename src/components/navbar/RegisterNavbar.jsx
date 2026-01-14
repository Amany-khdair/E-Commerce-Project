import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { Link as RouterLink} from "react-router-dom";
import { useTranslation } from "react-i18next";

// ===================== Nav link =====================
const NavItem = styled("span")(() => ({
  fontSize: "16px",
  cursor: "pointer",
  position: "relative",
  paddingBottom: "4px",
  transition: "0.2s",

  "&:hover::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "black",
  },
}));

export default function RegisterNavbar() {
  const [openDrawer, setOpenDrawer] = useState(false);  
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#1A1A1A" : "white",
          color: theme.palette.mode === "dark" ? "white" : "black",
          boxShadow: "none",
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid #333"
              : "1px solid #E0E0E0",              
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, md: 4 },
          }}>

          {/*================Left Side===================*/}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Exclusive
            </Typography>
          </Box>

          {/*================Nav Items===================*/}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}>
            <Link component={RouterLink} color="inherit" underline="none" to='/home'>
              <NavItem>{t("Home")}</NavItem>
            </Link>
            <Link component={RouterLink} color="inherit" underline="none" to='/contact'>
              <NavItem>{t("Contact")}</NavItem>
            </Link>
            <Link component={RouterLink} color="inherit" underline="none" to='/about'>
              <NavItem>{t("About")}</NavItem>
            </Link>
            <Link component={RouterLink} color="inherit" underline="none" to='/auth/register'>
              <NavItem>{t("SignUP")}</NavItem>
            </Link>
          </Box>

          {/*=====================Mobile View==================*/}
          <Box sx={{ display: { xs: "flex", sm: "none" }, gap: "10px" }}>          
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>

        </Toolbar>

      </AppBar>

      {/*==================Drawer View===========================*/}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250, padding: 2, position: "relative" }}>
          <IconButton
            onClick={() => setOpenDrawer(false)}
            sx={{ position: "absolute", top: 10, right: 10, zIndex: 10,}}>
            <CloseIcon />
          </IconButton>
            <List>
                {[
                    { text: t("Home"), path: "/home" },
                    { text: t("Contact"), path: "/contact" },
                    { text: t("About"), path: "/about" },
                    { text: t("SignUP"), path: "/auth/register" },
                ].map((item) => (
                    <ListItem
                    button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setOpenDrawer(false)} 
                    >
                    <ListItemText
                        primary={item.text}  
                        sx={{
                            ".MuiTypography-root": {
                            fontSize: "14px",
                            color: theme.palette.text.primary,
                            fontWeight: 500,
                            width: "fit-content",
                            cursor: "pointer",
                            position: "relative",
                            paddingBottom: "3px",
                            "&:hover::after": {
                                content: "''",
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                width: "100%",
                                height: "2px",
                                backgroundColor: theme.palette.text.primary,
                            },
                            },
                        }}                    
                    />
                    </ListItem>
                ))}
            </List>


        </Box>
      </Drawer>
    </>
  );
}
