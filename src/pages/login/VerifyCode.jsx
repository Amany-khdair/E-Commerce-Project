import React, { useRef, useState } from "react";
import { typing, shine, lift } from "../../animation/LogoAnimation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const input = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      input.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
        input.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const submitCode = code.join("");

    if (submitCode.length !== 4) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete code",
        text: "Please enter the 4-digit code",
        confirmButtonColor: "#DB4444",
      });
      return;
    }
    localStorage.setItem("resetCode", submitCode);

    await Swal.fire({
      icon: "success",
      title: "Code received ✔",
      text: "You Can Know Set Your New Password!",
      confirmButtonColor: "#DB4444",
    });

    navigate("/auth/resetPassword");
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, textAlign: "center" }}>
      <Typography variant="h3" sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "fit-content",
          animation: `
                          ${typing} 1.6s steps(12) forwards,
                          ${lift} 3s ease-in-out infinite 1.6s
                        `,
          background: "linear-gradient(90deg, #000, #DB4444, #000)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundSize: "200%",
          animationDelay: "0s, 1.6s",
          "&:after": {
            content: '""',
            animation: `${shine} 2s linear infinite`,
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          },
        }}
      >
        {" "}
        Verify Code
      </Typography>
      <Typography>Enter The 4-Digit Sent to Your Email</Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4,gap: 2 }}>
        {code.map((digit, index) => (
            <TextField key={index} inputRef={(el) => (input.current[index] = el)} value={digit} 
            onChange={(e) => handleChange(e.target.value, index)} inputProps={{
              maxLength: 1,
              style: { textAlign: "center", fontSize: 24, fontWeight: "600" },
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            sx={{ width: 60 }}/>
        ))}
      </Box>

      <Button onClick={handleSubmit} variant="contained" fullWidth sx={{ mt: 5, py: "14px", backgroundColor: "#DB4444" }}>
        Verify
      </Button>
    </Box>
  );
}
