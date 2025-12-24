import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import "@fontsource/inter";
import { CssBaseline, ThemeProvider } from '@mui/material';
import MainTheme from './theme/MainTheme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ThemeProvider theme={MainTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>

    </>
    
)
