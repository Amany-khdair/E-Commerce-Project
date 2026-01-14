import { ThemeProvider, createTheme } from "@mui/material/styles";

const MainTheme = (mode)=>{
  return createTheme({
    palette: {
        mode: mode,
        primary: {
            main: "#DB4444"  
        },  
        secondary: {
          main: "#fff"
        },
    },
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  });
}

  export default MainTheme;