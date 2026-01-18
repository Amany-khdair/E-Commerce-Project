import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ReplayIcon from '@mui/icons-material/Replay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DiscountIcon from '@mui/icons-material/Discount';
import CropFreeIcon from '@mui/icons-material/CropFree';

export default function FaqsComponent() {
    const [expanded, setExpanded] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 6 }}>
                                
        <Accordion expanded={expanded === 0} defaultExpanded onChange={() => setExpanded(expanded === 0 ? false : 0)}
        sx={{ mb: 2, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.5)", transition: "0.3s" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                px: 3,
                py: 1,
                bgcolor: expanded === 0 
                    ? `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#37474f' : '#e0f7fa'}, ${theme.palette.mode === 'dark' ? '#263238' : '#b2ebf2'})` 
                    : theme.palette.background.paper
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <LocalShippingIcon sx={{ color: expanded === 0 ? (theme.palette.mode === 'dark' ? '#80cbc4' : '#00796b') : (theme.palette.mode === 'dark' ? '#cfd8dc' : '#4caf50'), transition: "0.3s" }} />
                <Typography fontWeight="bold">{t("productsDelivered")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: theme.palette.background.default, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                <Typography color="text.secondary">
                {t("productsDeliveredWithin")}
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 1} onChange={() => setExpanded(expanded === 1 ? false : 1)}
        sx={{ mb: 2, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.5)", transition: "0.3s" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                px: 3,
                py: 1,
                bgcolor: expanded === 1 
                    ? `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#bf360c' : '#fff3e0'}, ${theme.palette.mode === 'dark' ? '#e65100' : '#ffe0b2'})` 
                    : theme.palette.background.paper
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ReplayIcon sx={{ color: expanded === 1 ? (theme.palette.mode === 'dark' ? '#ffb74d' : '#ef6c00') : (theme.palette.mode === 'dark' ? '#ffcc80' : '#ff9800'), transition: "0.3s" }} />
                <Typography fontWeight="bold">{t("returnProduct")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: theme.palette.background.default, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                <Typography color="text.secondary">
                {t("Absolutely")}
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 2} onChange={() => setExpanded(expanded === 2 ? false : 2)}
        sx={{ mb: 2, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.5)", transition: "0.3s" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                px: 3,
                py: 1,
                bgcolor: expanded === 2 
                    ? `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#0d47a1' : '#e3f2fd'}, ${theme.palette.mode === 'dark' ? '#1565c0' : '#bbdefb'})` 
                    : theme.palette.background.paper
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <VerifiedUserIcon sx={{ color: expanded === 2 ? (theme.palette.mode === 'dark' ? '#82b1ff' : '#1565c0') : (theme.palette.mode === 'dark' ? '#90caf9' : '#2196f3'), transition: "0.3s" }} />
                <Typography fontWeight="bold">{t("productsAuthentic")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: theme.palette.background.default, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                <Typography color="text.secondary">
                {t("productsGuaranteed")}
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 3} onChange={() => setExpanded(expanded === 3 ? false : 3)}
        sx={{ mb: 2, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.5)", transition: "0.3s" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                px: 3,
                py: 1,
                bgcolor: expanded === 3 
                    ? `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#880e4f' : '#fce4ec'}, ${theme.palette.mode === 'dark' ? '#c2185b' : '#f8bbd0'})` 
                    : theme.palette.background.paper
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <DiscountIcon sx={{ color: expanded === 3 ? (theme.palette.mode === 'dark' ? '#f48fb1' : '#c2185b') : (theme.palette.mode === 'dark' ? '#f06292' : '#f50057'), transition: "0.3s" }} />
                <Typography fontWeight="bold">{t("discounts")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: theme.palette.background.default, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                <Typography color="text.secondary">
                {t("SubscribeToNewsletter")}
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 4} onChange={() => setExpanded(expanded === 4 ? false : 4)}
        sx={{ mb: 2, borderRadius: 3, boxShadow: "0 6px 20px rgba(0,0,0,0.5)", transition: "0.3s" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                px: 3,
                py: 1,
                bgcolor: expanded === 4 
                    ? `linear-gradient(90deg, ${theme.palette.mode === 'dark' ? '#4a148c' : '#f3e5f5'}, ${theme.palette.mode === 'dark' ? '#6a1b9a' : '#e1bee7'})` 
                    : theme.palette.background.paper
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CropFreeIcon sx={{ color: expanded === 4 ? (theme.palette.mode === 'dark' ? '#b39ddb' : '#6a1b9a') : (theme.palette.mode === 'dark' ? '#ce93d8' : '#9c27b0'), transition: "0.3s" }} />
                <Typography fontWeight="bold">{t("rightSize")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 4, py: 2, bgcolor: theme.palette.background.default, boxShadow: "inset 0 2px 8px rgba(0,0,0,0.05)", borderRadius: 2 }}>
                <Typography color="text.secondary">
                {t("detailedSize")}
                </Typography>
            </AccordionDetails>
        </Accordion>

    </Box>
  )
}
