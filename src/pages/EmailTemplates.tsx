import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import EmailTemplateCard from "../components/EmailTemplateCard";
import { emailTemplateData } from "../data/emailTemplateData";

const EmailTemplates: React.FC = () => {
  const numberOfCards = 12;

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component={"h4"}
              variant="h4"
              sx={{
                color: "#0473E9",
                fontWeight: "bold",
                fontSize: { xs: "24px", md: "30px" },
                fontFamily: "Nunito Sans",
              }}
            >
              Email Templates
            </Typography>
            <Typography
              color="#000000"
              mt={"10px"}
              fontSize={{ xs: "12px", md: "14px" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            sx={{
              backgroundColor: "#0473E9",
              color: "#FFFFFF",
              fontSize: "16px",
              padding: "5px 20px",
              borderRadius: "5px",
              height: "55px",
              "&:hover": {
                backgroundColor: "#005BB5",
              },
            }}
          >
            Create Template
          </Button>
        </Grid>
      </Grid>

      {/* Email Card Section  */}
      <Box
        sx={{
          maxHeight: "75vh",
          overflowY: "auto",
          marginTop: 2,
          border: "0.5px solid #C1C1C1",
          padding:"10px",
          borderRadius:"10px"
        }}
      >
        <Grid container spacing={2}>
          {Array(numberOfCards)
            .fill(emailTemplateData)
            .map((email, index) => (
              <Grid item xs={12} sm={6} md={3} lg={4} key={index}>
                <EmailTemplateCard email={email} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default EmailTemplates;
