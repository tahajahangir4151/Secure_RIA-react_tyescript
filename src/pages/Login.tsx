import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LogoImg from "../images/Logo.jpeg";
import { useNavigate } from "react-router-dom";
import validator from "validator";

interface loginProps{
  onLoginSuccess:()=>void
}

const Login: React.FC<loginProps> = ({onLoginSuccess}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  //Form validation and handle submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isvalid = true;

    //Email validation
    if (email === "") {
      setEmailError("Email must be required");
      isvalid = false;
      return;
    } else if (!validator.isEmail(email)) {
      setEmailError("Please Enter a valid Email");
      isvalid = false;
      return;
    } else {
      setEmailError("");
    }

    //Password validation
    if (password === "") {
      setPasswordError("Password must be required");
      isvalid = false;
      return;
    } else if (password.length < 6) {
      setPasswordError("Password at least 6 characters long");
      isvalid = false;
      return;
    } else {
      setPasswordError("");
    }

    //If Form is valid then store in the local storage and navigate
    if (isvalid) {
      localStorage.setItem("userInfo", JSON.stringify({ email, password }));
      console.log("userInfo", JSON.stringify({ email, password }));

      // Trigger authentication state change in App component
      onLoginSuccess();
      
      // Navigate to dashboard
      navigate("/");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {/* Logo in the top left corner */}
      <Box
        component={"img"}
        src={LogoImg}
        alt="Logo"
        sx={{ position: "absolute", top: "50px", left: "50px", height: "60px" }}
      />

      {/* Login Form */}
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "170px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: "30px",
            boxShadow: 3,
            borderRadius: "10px",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#0473E9",
              fontWeight: "bold",
              fontSize: "30px",
              fontFamily: "Nunito Sans",
              textWrap: "nowrap",
            }}
          >
            Login into your account
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#000000",
              marginTop: "8px",
            }}
          >
            Gain access to your personalized profile and secure your digital
            identity with a single click.
          </Typography>

          {/* Login Form Fields */}
          <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
              }}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="8px"
            >
              <Box></Box>
              <Link
                href="#"
                underline="hover"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bolder",
                  color: "#0473E9",
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#0473E9",
                borderRadius: "50px",
                fontSize: "16px",
                padding: "10px",
                width: "85%",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#035bb5",
                },
              }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
