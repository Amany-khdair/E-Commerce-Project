import React, { useRef, useState } from "react";
import { typing, shine, lift } from "../../animation/LogoAnimation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const input = useRef([]);
  const navigate = useNavigate();
  const {formState: {isSubmitting}} = useForm();
  const handleChange = (value, index) => {
    //check if the entered values are numbers
    if (!/^\d?$/.test(value)) return;
    //display numbers on the screen
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    //to jump on the next index if theres a value entered
    if (value && index < 3) {
      input.current[index + 1].focus();
    }
  };
  //to enable backspace when delete a value
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
      text: "You can know set your new password!",
      confirmButtonColor: "#DB4444",
    });

    navigate("/auth/resetPassword");
  };

  return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 400}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
      <Typography variant="h3" sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 3,
          whiteSpace:{xs: "normal", sm: "nowrap"},
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
        }}>Verify Code </Typography>
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

      <LoadingButton onClick={handleSubmit} fullWidth loading={isSubmitting} loadingIndicator="Processing..." variant="contained" type="submit" 
            sx={{backgroundColor: "#DB4444", py: "14px", px: "45px", my: "15px", fontSize: "16px"}}
            > Verify </LoadingButton>
    </Box>
  );
}
