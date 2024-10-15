import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import LogoImg from "../images/Logo.jpeg";

const Login: React.FC = () => {

    
  return (
    <>
      {/* Logo in the top left corner */}
      <Box
        component={"img"}
        src={LogoImg}
        alt="Logo"
        sx={{ position: "absolute", top: "20px", left: "20px", height: "60px" }}
      />

      {/* Login Form */}
      <Container
        maxWidth="xs"
        sx={{
          marginTop: "150px",
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
          <form style={{ marginTop: "20px" }}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
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
                sx={{ fontSize: "14px",fontWeight:"bolder", color: "#0473E9" }}
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
                width:"85%",
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
