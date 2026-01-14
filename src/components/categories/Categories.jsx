import { Box, Card, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Categories() {
  const refScroll = useRef(null);  
  const {isLoading, isError, data} = useCategories();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  if(isLoading)return(
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", py: 5}}>
        <CircularProgress sx={{color: "primary.main"}}/>
    </Box>
  )
  if(isError)return <Typography sx={{color: "red", textAlign: "center", py: 6 }}>{t("Something went wrong")}</Typography>
  
  const xScroll = (arrow) =>{
    if (!refScroll.current) return;
    else{
        refScroll.current.scrollBy({
            left: arrow === "left"? -300 : 300,
            behavior: "smooth",
        });
    }
  };

 return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 2 }}>    
      <Box sx={{display: "flex", justifyContent: {xs: "space-around", sm:"space-between"}, alignItems: "center", mb: 4}}>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
          <Box sx={{display: "flex", gap: 2, alignItems: "center", alignContent:"center"}}>
            <Box sx={{width:"15px", height: "35px", borderRadius: "4px", backgroundColor: "primary.main", alignItems: "center"}}></Box>
            <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600}}>
              {t("Categories")}
            </Typography>
          </Box>
          
          <Typography sx={{ fontWeight: 600, fontSize: {xs: "1.3rem", sm: "2.125rem"}  }}>
            {t("BrowseByCategory")}
          </Typography>
        </Box>        

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => xScroll(i18n.language === "ar" ? "right" : "left")}>
            <ArrowBackIosNewIcon 
              fontSize="small" 
              sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} 
            />
          </IconButton>

          <IconButton onClick={() => xScroll(i18n.language === "ar" ? "left" : "right")}>
            <ArrowForwardIosIcon 
              fontSize="small" 
              sx={{ transform: i18n.language === "ar" ? "rotate(180deg)" : "none" }} 
            />
          </IconButton>
        </Box>
      </Box>
      
      <Box ref={refScroll} sx={{display: "flex", gap: 2, overflowX: "auto", scrollBehavior: "smooth", "&::-webkit-scrollbar": {display: "none"},}}>
        {data.response.map((category) =>        
            <Card key={category.id} elevation={4} onClick={() => navigate(`/products?category=${category.name}`)} sx={{textAlign: "center", display: "flex", justifyContent: "center",alignItems: "center", p: 2, my:3, minWidth: { xs: 150, sm: 140 }, border: "1px solid rgba(0, 0, 0, 0.3)", cursor: "pointer", transition: "0.3s", 
                "&:hover":{boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)", transform: "translateY(-4px)"}}}>
                  <Typography fontWeight={500} color='black'>
                    {category.name}
                  </Typography>
            </Card>
        )}
      </Box>
      
    </Box>
  );
}
