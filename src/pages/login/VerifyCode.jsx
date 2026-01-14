import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import Snowfall from "react-snowfall";
import { useTranslation } from "react-i18next";
import GradientText from "../../functions/GradientText";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const input = useRef([]);
  const { t } = useTranslation();

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
        title: t("IncompleteCode"),
        text: t("IncompleteCodeText"),
        confirmButtonColor: "#DB4444",
      });
      return;
    }
    localStorage.setItem("resetCode", submitCode);

    await Swal.fire({
      icon: "success",
      title: t("CodeReceived"),
      text: t("CodeReceivedText"),
      confirmButtonColor: "#DB4444",
    });

    navigate("/auth/resetPassword");
  };

  return (
    <Box sx={{ maxWidth: {xs: "90%", sm: 400}, mx: "auto", mt:{xs: 6,sm: 10} , px:{xs: 2, sm:0}, textAlign: "center" }}>
      <Snowfall color='#82C3D9'/>
      <GradientText>
          {t("VerifyCodeHead")}   
      </GradientText>

      <Typography>{t("EnterCodeDesc")}</Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4,gap: 2}}>
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

      <LoadingButton onClick={handleSubmit} fullWidth loading={isSubmitting} loadingIndicator={t("Processing")} variant="contained" type="submit" 
            sx={{backgroundColor: "#DB4444", py: "14px", px: "45px", my: "15px", fontSize: "16px"}}
            > {t("Verify")} </LoadingButton>
    </Box>
  );
}
