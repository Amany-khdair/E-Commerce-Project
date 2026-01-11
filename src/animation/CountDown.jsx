import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CountDown({ customRenderer }) {
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {    
    const saved = localStorage.getItem("countdownEnd");
    if (saved) {
      setEndDate(Number(saved));
    } else {
      const newEnd = Date.now() + 1000 * 60 * 60 * 24 * 30;
      setEndDate(newEnd);
      localStorage.setItem("countdownEnd", newEnd);
    }
  }, []);
  const { t } = useTranslation();

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>{t("Offer Ended")}</span>;
    }

    const itemStyle = {
      width: 60,
      height: 60,           
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    };

    const labelStyle = {
      fontSize: "12px",
      marginTop: "2px",
      opacity: 0.9,
    };

    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box sx={itemStyle}>
           <span style={labelStyle}>{t("Days")}</span> 
          <Typography variant="h5" sx={{fontWeight: 700}}>{days}</Typography>         
        </Box>
        
        <Typography variant="h5" sx={{color: "primary.main"}}>:</Typography> 

        <Box sx={itemStyle}>
          <span style={labelStyle}>{t("Hours")}</span>  
          <Typography variant="h5" sx={{fontWeight: 700}}>{hours}</Typography>          
        </Box>

        <Typography variant="h5" sx={{color: "primary.main"}}>:</Typography> 

        <Box sx={itemStyle}>
          <span style={labelStyle}>{t("Mins")}</span>  
          <Typography variant="h5" sx={{fontWeight: 700}}>{minutes}</Typography>         
        </Box>
        
        <Box>
          <Typography variant="h5" sx={{color: "primary.main"}}>:</Typography>
        </Box>         

        <Box sx={itemStyle}>
          <span style={labelStyle}>{t("Secs")}</span>  
          <Typography variant="h5" sx={{fontWeight: 700}}>{seconds}</Typography>         
        </Box>
      </Box>
    );
  };

  if (!endDate) return null;
  return <Countdown date={endDate} renderer={customRenderer || renderer} />;
}
