import { ThemeProvider, createTheme } from "@mui/material/styles";

const MainTheme = createTheme({
  palette: {

    primary: {
      main: "#DB4444"  
    },
    
  },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });


  export default MainTheme