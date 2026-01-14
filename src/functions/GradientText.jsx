import { Typography, useTheme } from "@mui/material";
import { lift, shine, typing } from "../animation/LogoAnimation";


export default function GradientText({ children, sx = {} }) {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: 700,
        textAlign: "center",
        mb: 3,
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "fit-content",
        animation: ` ${typing} 1.6s steps(12) forwards, ${lift} 3s ease-in-out infinite 1.6s`,
        background: theme.palette.mode === "dark"
          ? "linear-gradient(90deg, #fff, #DB4444, #fff)" 
          : "linear-gradient(90deg, #000, #DB4444, #000)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        backgroundSize: "200%",
        animationDelay: "0s, 1.6s",
        position: "relative",
        "&:after": {
          content: '""',
          animation: `${shine} 2s linear infinite`,
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0
        },
        ...sx
      }}
    >
      {children}
    </Typography>
  );
}
