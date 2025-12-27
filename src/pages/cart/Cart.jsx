import { Box, Button, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Snowfall from 'react-snowfall'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
    
const [cartItems, setCartItems] = useState([
  { id: 1, name: 'LCD Monitor', price: 650, quantity: 1, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'H1 Gamepad', price: 550, quantity: 2, image: 'https://via.placeholder.com/50' },
]);

  const handleIncrease = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
  };

  const handleDecrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  return (
    <>
      <Snowfall color='#82C3D9'/>
      <Container maxWidth="lg" sx={{my:5}}>
        <TableContainer component={Paper} sx={{mb: 3}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartItems.map((item) =>(
                <TableRow key={item.id}>
                  <TableCell>
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                      <IconButton size="small" color="primary.main">
                          <CloseIcon fontSize="small" />
                      </IconButton>
                      <img src={item.image} alt={item.name} width="50"/>
                      {item.name}
                    </Box>                    
                  </TableCell>

                  <TableCell>${item.price}</TableCell>

                  <TableCell>
                    <Box display="flex" width={120} alignItems="center" border="1px solid #ccc" borderRadius={1}>
                      <IconButton onClick={() => handleDecrease(item.id)}>
                        <RemoveIcon />
                      </IconButton>

                      <Typography sx={{px: 2, width: 10, textAlign: "center"}}>
                        {item.quantity}
                      </Typography>

                      <IconButton onClick={() => handleIncrease(item.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
     
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 10 }}>
          <Button variant="outlined" color="inherit" sx={{ px: 4, py: 1.5 }}>
            Return To Shop
          </Button>
          <Button variant="outlined" color="inherit" sx={{ px: 4, py: 1.5 }}>
            Update Cart
          </Button>
        </Box>

        <Grid container spacing={4}>       
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Coupon Code"
                size="small"
                sx={{ width: '250px' }}
              />
              <Button 
                variant="contained" 
                sx={{ bgcolor: '#DB4444', '&:hover': { bgcolor: '#c33a3a' }, px: 4 }}
              >
                Apply Coupon
              </Button>
            </Box>
          </Grid>
  
          <Grid item xs={12} md={5} sx={{ ml: 'auto' }}>
            <Box sx={{ border: '1.5px solid black', borderRadius: 1, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Cart Total
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>$1750</Typography>
              </Box>
              <hr />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              <hr />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 3 }}>
                <Typography>Total:</Typography>
                <Typography>$1750</Typography>
              </Box>
  
              <Box sx={{ textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  sx={{ bgcolor: '#DB4444', '&:hover': { bgcolor: '#c33a3a' }, px: 5, py: 1.5 }}
                >
                  Proceed to checkout
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </>  
  )
}
