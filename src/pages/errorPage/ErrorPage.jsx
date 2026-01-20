import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Snowfall from "react-snowfall";

export default function ErrorPage() {
    const { t } = useTranslation();

    return (
        <>
            <Snowfall color='#82C3D9' style={{ position: 'fixed' }} />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    px: 2
                }}
            >
                <Typography variant="h2" fontWeight={700} color="error" mb={2}>
                    404
                </Typography>

                <Typography variant="h2" fontWeight={700} mb={2}>
                    {t("ErrorTitle")}
                </Typography>

                <Typography variant="body1" mb={4}>
                    {t("ErrorMessage")}
                </Typography>

                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    sx={{
                        bgcolor: "#DB4444",
                        "&:hover": { bgcolor: "#b83737" }
                    }}
                >
                    {t("BackToHome")}
                </Button>
            </Box>
        </>
        
    );
}
