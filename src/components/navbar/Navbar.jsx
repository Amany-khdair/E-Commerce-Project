import { useState } from "react";
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
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { useNavigate, Link as RouterLink} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import useAuthStore from "../../store/authStore";
import CartDrawerContent from "../../pages/cart/CartDrawerContent";


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
  transition: "0.5s",

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
  const token = useAuthStore(state=>state.token);
  const logout = useAuthStore(state=>state.logout);

  const handleLogout = () =>{
    logout();
    navigate("/auth/login");
  };
  
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openCart, setOpenCart] = useState(false);
  const toggleCart = ()=>{
    setOpenCart(!openCart);
  };

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="fixed" sx={{
          top: 0,         
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
            Exclusive
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
          <Link component={RouterLink} color="inherit" underline="none" to='/allproducts'>
            <NavItem>Shop</NavItem>
          </Link>           
          <Link component={RouterLink} color="inherit" underline="none" to='/contact'>
            <NavItem>Contact</NavItem>
          </Link>
          <Link component={RouterLink} color="inherit" underline="none" to='/about'>
            <NavItem>About</NavItem>
          </Link>                          
          
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
              
              <IconButton onClick={toggleCart}>
                <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
              </IconButton>

              <Drawer anchor="right" open={openCart} onClose={toggleCart} slotProps={{
                paper:{sx:{width: { xs: "85%", sm: "400px" }, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}
              }}>
                
                {/* Cart Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Shopping Cart</Typography>                 
                  <IconButton onClick={toggleCart}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <CartDrawerContent toggleCart={toggleCart}/>
              </Drawer>

              <IconButton onClick={handleOpenMenu}  sx={{
                  borderRadius: "50%", backgroundColor: open ? "#DB4444" : "transparent", transition: "0.5s",                  
                }}>
                <PersonOutlineIcon sx={{ color: open ? "white" : "black" }} />
              </IconButton>


              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}
                slotProps={{
                  paper:{
                    elevation: 3, 
                    sx: {
                      mt: 1.5,
                      borderRadius: "14px",
                      padding: "10px 15px",
                      width: "220px",
                      background: "linear-gradient(135deg, #e5e5e599, #4b4b4b)",
                      backdropFilter: "blur(7px)",
                      color: "white",

                      "& .MuiMenuItem-root": {
                        gap: "10px",
                        padding: "10px 8px",
                        borderRadius: "8px",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",

                        "& svg": {
                          fontSize: "22px",
                          color: "white",
                          opacity: 0.9,
                        },

                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                        },
                      },

                      "& .MuiDivider-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        my: 1,
                      },
                    },
                  }
                }}
              >
                <MenuItem>
                  <PersonOutlineIcon />
                  Manage My Account
                </MenuItem>

                <MenuItem>
                  <ShoppingCartOutlinedIcon />
                  My Orders
                </MenuItem>

                <MenuItem>
                  <CancelOutlinedIcon />
                  My Cancellations
                </MenuItem>

                <MenuItem>
                  <StarOutlineIcon />
                  My Reviews
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>

            </>
          ) : (
            <>
              <Link component={RouterLink} color="inherit" underline="none" to="/auth/login">Login</Link>
              <Link component={RouterLink} color="inherit" whiteSpace="nowrap" underline="none" to="/auth/register">Sign Up</Link>
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
        <Box sx= {{
                width: { sm: "300px" },
                position: "relative",                
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #ffffffcc, #f0f0f0cc)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px 0 0 12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}>
          <IconButton
            onClick={() => setOpenDrawer(false)}
            sx={{ position: "absolute", top: 10, right: 10, zIndex: 10,}}>
            <CloseIcon />
          </IconButton>
          
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#DB4444" }}>
              Menu
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Explore your options
            </Typography>
          </Box>

          <List sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>            
            {[
              { text: "Home", path: "/home" },
              { text: "Shop", path: "/allproducts" },
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
              { type: "divider", key: "divider-logout" },
              { text: "Logout", onClick: handleLogout, listItemSx: { border: "1px solid #DB4444", backgroundColor: "rgba(219,68,68,0.1)", borderRadius: "12px", "&:hover": { backgroundColor: "#DB4444", "& .MuiTypography-root": { color: "white" }, transition: "0.3s"}},  textSx: {color: "#DB4444", fontWeight: 700} } ]: []),
             
            ].map((item) => {
              if (item.type === "divider") return <Divider key={item.key} sx={{ my: 1 }} />;
              return(
                <ListItem button key={item.text} component={item.path ? RouterLink : "button"} to={item.path}
                sx={{
                  borderRadius: 2,
                  paddingY: 1.5,
                  paddingX: 2,
                  transition: "0.3s",
                  "&:hover": { 
                    backgroundColor: "#DB4444",
                    color: "#fff",
                    "& .MuiTypography-root": { color: "#fff" }
                  },...(item.listItemSx || {})
                }} 
                onClick={() => {
                  item.onClick?.();
                  setOpenDrawer(false)}}>

                <ListItemText
                  primary={item.text}    
                  sx={{
                    ".MuiTypography-root": {
                      fontSize: "14px",
                      color: "black",
                      fontWeight: 600,
                      width: "fit-content",
                      cursor: "pointer",
                      position: "relative",
                      paddingBottom: "3px",
                      ...(item.textSx || {}),
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
