import React, { useContext, useState } from "react";
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
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { useNavigate, Link as RouterLink} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useCounterStore } from "../../store/useCounterStore";
import { Button } from "@mui/material";


// =====================Search box =====================
const SearchWrapper = styled("div")(() => ({
  position: "relative",
  backgroundColor: "#F5F5F5",
  borderRadius: "4px",
  width: "100%",     
  maxWidth: "250px", 
  height: "40px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "10px",
}));

const SearchInput = styled(InputBase)(() => ({
  width: "100%",
  "& input": { fontSize: "14px" },
}));

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

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const {token, logout} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () =>{
    logout();
    navigate("/auth/login");
  }
  const {counter, userName, increase} = useCounterStore();
  return (
    <>
      <AppBar position="static" sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
          borderBottom: "1px solid #E0E0E0",
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
            Exclusive - {counter} -{userName}
          </Typography>
        </Box>

        {/*================Nav Items===================*/}
        <Box sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}>

          <Link component={RouterLink} color="inherit" underline="none" to='/home'>
            <NavItem>Home</NavItem>
          </Link>          
          <Link component={RouterLink} color="inherit" underline="none" to='/contact'>
            <NavItem>Contact</NavItem>
          </Link>
          <Link component={RouterLink} color="inherit" underline="none" to='/about'>
            <NavItem>About</NavItem>
          </Link>    
          <Button onClick={()=>increase(5)}>Increase</Button>              
          
        </Box>

        {/* =============Right Side================ */}
        <Box sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
          }}>
          <SearchWrapper>
            <SearchInput placeholder="What are you looking for?" />
            <SearchIcon sx={{ cursor: "pointer" }} />
          </SearchWrapper>

          {token != null ? (
            <>
              <IconButton onClick={() => navigate("/wishlist")}>
                <FavoriteBorderIcon sx={{ color: "black" }} />
              </IconButton>
              
              <IconButton>
                <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
              </IconButton>

              <IconButton onClick={handleOpenMenu}>
                <PersonOutlineIcon sx={{ color: "black" }} />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem>Manage My Account</MenuItem>
                <MenuItem>My Orders</MenuItem>
                <MenuItem>My Cancellations</MenuItem>                
                <MenuItem>My Reviews</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link component={RouterLink} color="inherit" underline="none" to="/auth/login">Login</Link>
              <Link component={RouterLink} color="inherit" underline="none" to="/auth/register">Sign Up</Link>
            </>
          )}

        </Box>

        {/*=====================Mobile View==================*/}
        <Box sx={{ display: { xs: "flex", md: "none" }}}>
          <SearchWrapper>
            <SearchInput placeholder="What are you looking for?" />
            <SearchIcon sx={{ cursor: "pointer"}} />
          </SearchWrapper>

          {token != null ?
          <>
            <IconButton component={RouterLink} to='/wishlist'>
              <FavoriteBorderIcon sx={{ color: "black" }} />
            </IconButton>

            <IconButton component={RouterLink} to='/cart'> 
              <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
            </IconButton>

            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
          </>
          :
          <>
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
          </>
          }
          
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
              { text: "Home", path: "/home" },
              { text: "Contact", path: "/contact" },
              { text: "About", path: "/about" },
              ...(!token ? [{ text: "Sign Up", path: "/auth/register" },
                            {text: "Log In", path: "/auth/login" }] : []),              
              
               ...(token ? [
              { type: "divider", key: "divider-1" },
              { text: "Manage My Account", path: "/profile" },
              { text: "My Orders", path: "/orders" },
              { text: "My Cancellations", path: "/cancellations" },
              { text: "My Reviews", path: "/reviews" },
              { text: "Logout", onClick: handleLogout } ]: []),
             
            ].map((item) => {
              if (item.type === "divider") return <Divider key={item.key} sx={{ my: 1 }} />;
              return(
                <ListItem
                button
                key={item.text}
                component={item.path ? RouterLink : "button"}
                to={item.path}
                onClick={() => {
                  item.onClick?.();
                  setOpenDrawer(false)}}>

                <ListItemText
                  primary={item.text}    
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "14px",
                      color: "black",
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
                        backgroundColor: "black",
                      },
                    },
                  }}/>
                </ListItem>
              )
              
            })}
          </List>

        </Box>
      </Drawer>
    </>
  );
}
