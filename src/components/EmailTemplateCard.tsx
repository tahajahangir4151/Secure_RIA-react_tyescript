import React from "react";
import { Email } from "../data/emailTemplateData";
import { Box, Button, Grid, Typography, List, ListItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EmailCardProps {
  email: Email;
}

const EmailTemplateCard: React.FC<EmailCardProps> = ({ email }) => {
  // Split the events into an array for rendering as a list
  const eventList = email.eventOccured
    .split("\n")
    .filter((event) => event.trim() !== "");

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: { xs: 2, md: 3 },
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top Section */}
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Content Section */}
        <Grid item xs={10} sx={{ textAlign: "justify" }}>
          <Typography variant="body2" color="textSecondary">
            <strong style={{ color: "#000000" }}>From:</strong> {email.from}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong style={{ color: "#000000" }}>Sent:</strong> {email.date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong style={{ color: "#000000" }}>To:</strong> {email.to}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong style={{ color: "#000000" }}>Subject:</strong>{" "}
            {email.subject}
          </Typography>
        </Grid>

        {/* Edit Button */}
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "12px",
              minWidth: "100px",
              padding: "8px 16px",
            }}
          >
            <EditIcon sx={{ color: "#ffffff", marginRight: 0.5 }} />
            Edit
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <img
          src={email.logoUrl}
          alt="Logo"
          style={{ maxHeight: "40px", width: "auto" }}
        />
      </Box>

      {/* Message Section */}
      <Box sx={{ marginY: 2, textAlign: "justify", padding: "50px" }}>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "14px", md: "16px" } }}
        >
          <strong>Dear Customer,</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "14px", md: "16px" }, mt: "25px" }}
          color="textSecondary"
        >
          {email.message}
        </Typography>
        {/* Possible Events Section */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "14px", md: "16px" },
            marginTop: "16px",
          }}
        >
          Possible events occurred:
        </Typography>
        <List
          sx={{
            textAlign: "left",
            padding: 0,
            maxWidth: "400px",
            mt: "25px",
          }}
        >
          {eventList.map((event, index) => (
            <ListItem key={index} sx={{ padding: "4px 0", color: "#666666" }}>
              {event.trim()}
            </ListItem>
          ))}
        </List>
        <Typography
          variant="body1"
          sx={{ marginTop: "16px", fontSize: { xs: "14px", md: "16px" } }}
          color="textSecondary"
        >
          {email.authenticationMessage}
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0070BA",
              color: "#FFFFFF",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1,
              "&:hover": {
                backgroundColor: "#005BB5",
              },
            }}
          >
            Authenticate now
          </Button>
        </Box>
        <Typography
          variant="body1"
          sx={{ marginTop: "16px", fontSize: { xs: "14px", md: "16px" } }}
          color="textSecondary"
        >
          {email.Regards.split(",").map((line, index) => (
            <span key={index}>
              {line.trim()}
              <br />
            </span>
          ))}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailTemplateCard;
