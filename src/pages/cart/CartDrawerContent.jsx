import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { List, ListItem, ListItemText, Typography, Box, Divider, Button } from "@mui/material";

function CartDrawerContent({ toggleCart }) {
  const { data } = useCart();
  const navigate = useNavigate();

  if (!data || !data.items || data.items.length === 0) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
        <Typography variant="body1" sx={{ textAlign: "center", color: "#888" }}>
          Your cart is empty 🛒
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <List sx={{ flex: 1, overflowY: "auto", my: 2 }}>
        {data.items.map((item) => (
          <ListItem
            key={item.productId}
            button
            onClick={() => {
              toggleCart(); 
              navigate(`/details/${item.productId}`);
            }}
            sx={{
              mb: 1,
              borderRadius: 1,
              border: "1px solid #E0E0E0",
              px: 2,
              py: 1,
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f5f5f53c", boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)", transform: "translateY(-2px)" },
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>
                  {item.productName}
                </Typography>
              }
              secondary={
                <Typography variant="body2" sx={{ color: "#555" }}>
                  Quantity: {item.count}
                </Typography>
              }
            />
            <Typography sx={{ fontWeight: 700 }}>${item.totalPrice}</Typography>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, border: "2px solid #ccc" }}>
        <Typography>Total:</Typography>
        <Typography>${data.cartTotal}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            color: "#DB4444",
            borderColor: "#DB4444",
            "&:hover": { backgroundColor: "#DB4444", color: "white" },
          }}
          onClick={() => {
            toggleCart();
            navigate("/cart");
          }}
        >
          Go to Cart
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#DB4444",
            "&:hover": { backgroundColor: "transparent", color: "#DB4444" },
          }}
          onClick={() => {
            toggleCart();
            navigate("/checkout");
          }}
        >
          Check Out
        </Button>
      </Box>
    </Box>
  );
}

export default CartDrawerContent;
