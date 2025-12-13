import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import sideImage from "../../assets/images/Side Image.webp";
import { Button, CircularProgress, IconButton, InputAdornment, TextField, Typography, useMediaQuery} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import styles from "./register.module.css";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validations/registerSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import { typing, shine, lift } from "../../animation/LogoAnimation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  const registerForm = async (values) => {
    console.log(values);
    setFieldErrors({
      userName: "",
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    });

    try {
      const response = await axios.post("https://knowledgeshop.runasp.net/api/Auth/Account/Register", values);
      console.log(response);
    }catch (error) {
      const serverErrors = error.response?.data?.errors || [];

      const newErrors = {
        userName: "",
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
      };

      serverErrors.forEach((err) => {
        if (err.toLowerCase().includes("email")) {
          newErrors.email = err;
        } else if (err.toLowerCase().includes("password")) {
          newErrors.password = err;
        } else if (err.toLowerCase().includes("name")) {
          newErrors.userName = err;
        } else {
          newErrors.general = err;
        }
      });

      setFieldErrors(newErrors);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const isSmallScreen = useMediaQuery("(max-width:900px)");

  return (
    <Grid container spacing={3} sx={{ my: "60px" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          height: "111vh",
        }}
      >
        <Box
          component="img"
          src={sideImage}
          alt="Side"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          className={styles.image}
        />
      </Grid>

      <Fade in={animate} timeout={500}>
        <Slide direction="left" in={animate} timeout={700}>
          <Box
            className={`${styles.slideEnterRight} ${
              animate ? styles.active : ""
            }`}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                p: 4,
              }}
            >
              {isSmallScreen && (
                <Typography
                  variant="h3"
                  sx={{
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
                  Exclusive
                </Typography>
              )}

              <Box sx={{ width: "100%", maxWidth: 400 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 400, marginBottom: 3 }}
                >
                  Create an account
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 300 }}>
                  Enter your details below
                </Typography>
                {/* {errorMsg.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    {errorMsg.map((err, index) => (
                      <Typography key={index} sx={{ color: "red", fontWeight: 600 }}>
                        {err}
                      </Typography>
                    ))}
                  </Box>
                )} */}
                <Box
                  onSubmit={handleSubmit(registerForm)}
                  component={"form"}
                  sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <TextField
                    id="standard-basic"
                    label="User Name"
                    {...register("userName")}
                    variant="standard"
                    onChange={(e) => {
                      setValue("userName", e.target.value);
                    }}
                    error={errors.userName}
                    helperText={errors.userName?.message}
                  />
                  {fieldErrors.userName && (
                    <Typography sx={{ color: "red", fontSize: "14px" }}>
                      {fieldErrors.userName}
                    </Typography>
                  )}

                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    {...register("fullName")}
                    variant="standard"
                    onChange={(e) => {
                      setValue("fullName", e.target.value);
                    }}
                    error={errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                  {fieldErrors.fullName && (
                    <Typography sx={{ color: "red", fontSize: "14px" }}>
                      {fieldErrors.fullName}
                    </Typography>
                  )}

                  <TextField
                    id="standard-basic"
                    label="User Email"
                    {...register("email")}
                    type="email"
                    variant="standard"
                    onChange={(e) => {
                      setValue("email", e.target.value);
                    }}
                    error={errors.email}
                    helperText={errors.email?.message}
                  />
                  {fieldErrors.email && (
                    <Typography sx={{ color: "red", fontSize: "14px" }}>
                      {fieldErrors.email}
                    </Typography>
                  )}

                  <TextField
                    id="standard-basic"
                    label="Password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    variant="standard"
                    onChange={(e) => {
                      setValue("password", e.target.value);
                    }}
                    error={errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {fieldErrors.password && (
                    <Typography sx={{ color: "red", fontSize: "14px" }}>
                      {fieldErrors.password}
                    </Typography>
                  )}

                  <TextField
                    id="standard-basic"
                    label="Phone Number"
                    {...register("phoneNumber")}
                    variant="standard"
                    onChange={(e) => {
                      setValue("phoneNumber", e.target.value);
                    }}
                    error={errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                  {fieldErrors.phoneNumber && (
                    <Typography sx={{ color: "red", fontSize: "14px" }}>
                      {fieldErrors.phoneNumber}
                    </Typography>
                  )}

                  <LoadingButton
                    loading={isSubmitting}
                    loadingIndicator="Processing..."
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#DB4444",
                      py: "13px",
                      px: "45px",
                      mx: "5px",
                    }}
                    endIcon={<SendIcon />}
                  >
                    Create Account
                  </LoadingButton>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#fff",
                      color: "black",
                      fontWeight: 400,
                      py: "16px",
                      border: "2px solid #ccc",
                    }}
                    endIcon={<GoogleIcon />}
                  >
                    Sign up with Google
                  </Button>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 2 }}
                  >
                    Already have account?{" "}
                    <Box
                      component={RouterLink}
                      to={"/auth/Login"}
                      color="textSecondary"
                      variant="span"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#4c4b4bff",
                      }}
                    >
                      Log in
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Slide>
      </Fade>
    </Grid>
  );
}
