import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SelectChangeEvent } from "@mui/material";

//Define the shape of the form data
interface FormData {
  emailName: string;
  targetEmail: string;
  phishingEmail: string;
  landingPage: string;
  followUpEmail: {
    option1: boolean;
    option2: boolean;
  };
  launchDate: Date | null;
  timeZone: string;
}

// Define the shape of the error messages
interface Errors {
  emailName: boolean;
  targetEmail: boolean;
  phishingEmail: boolean;
  landingPage: boolean;
  launchDate: boolean;
}

const NewEmailCompaign: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    emailName: "",
    targetEmail: "",
    phishingEmail: "",
    landingPage: "",
    followUpEmail: { option1: false, option2: false },
    launchDate: null,
    timeZone: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({
    emailName: false,
    targetEmail: false,
    phishingEmail: false,
    landingPage: false,
    launchDate: false,
  });

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch("https://worldtimeapi.org/api/timezone");
        if (!response.ok) {
          throw new Error("API request failed with status " + response.status);
        }
        const data = await response.json();
        setTimeZones(data);
      } catch (error) {
        console.error("Error fetching time zones:", error);
      }
    };

    fetchTimeZones();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>,
    field: keyof FormData
  ) => {
    setFormData({ ...formData, [field]: e.target.value as string });
    setErrors({ ...errors, [field]: false });
  };

  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      followUpEmail: {
        ...formData.followUpEmail,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleLaunchDateChange = (date: Date | null) => {
    setFormData({ ...formData, launchDate: date });
    setErrors({ ...errors, launchDate: false });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {
      emailName: formData.emailName === "",
      targetEmail: formData.targetEmail === "",
      phishingEmail: formData.phishingEmail === "",
      landingPage: formData.landingPage === "",
      launchDate: showDatePicker && formData.launchDate === null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
      // Reset the form data
      setFormData({
        emailName: "",
        targetEmail: "",
        phishingEmail: "",
        landingPage: "",
        followUpEmail: { option1: false, option2: false },
        launchDate: null,
        timeZone: "",
      });
      setShowDatePicker(false);
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleNowButtonClick = () => {
    setFormData((prev) => ({
      ...prev,
      launchDate: new Date(), // Set current date and time
    }));
    handleSubmit();
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Limit height to 200px
      },
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
              New Email Campaign{" "}
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

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Email Name:
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter Email Name"
            name="emailName"
            value={formData.emailName}
            onChange={handleChange}
            error={errors.emailName}
            helperText={errors.emailName && "Email is required"}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: "#000",
                fontWeight: "bold",
                fontSize: "16px",
              },
            }}
            InputProps={{
              sx: {
                mt: "5px",
                border: "1px solid #053065",
                height: "45px",
                borderRadius: "5px",
                "&::placeholder": {
                  color: "#8E8E8E",
                  opacity: 1,
                  fontWeight: "500",
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Target Email:{" "}
          </Typography>
          <FormControl fullWidth error={errors.targetEmail}>
            <Select
              labelId="target-email-label"
              value={formData.targetEmail}
              onChange={(e) => handleSelectChange(e, "targetEmail")}
              displayEmpty
              inputProps={{
                placeholder: "Add Target Email",
              }}
              sx={{
                mt: "5px",
                border: "1px solid #053065",
                height: "45px",
                borderRadius: "5px",
              }}
            >
              <MenuItem value="Target 1">Target 1</MenuItem>
              <MenuItem value="Target 2">Target 2</MenuItem>
            </Select>{" "}
            {errors.targetEmail && (
              <FormHelperText>Target Email is required</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Phishing Email:{" "}
          </Typography>
          <FormControl fullWidth error={errors.phishingEmail}>
            <Select
              value={formData.phishingEmail}
              onChange={(e) => handleSelectChange(e, "phishingEmail")}
              displayEmpty
              inputProps={{
                placeholder: "Select email template",
              }}
              sx={{
                mt: "5px",
                border: "1px solid #053065",
                height: "45px",
                borderRadius: "5px",
              }}
            >
              <MenuItem value="Target 1">Template 1</MenuItem>
              <MenuItem value="Target 2">Template 2</MenuItem>
            </Select>{" "}
            {errors.phishingEmail && (
              <FormHelperText>Phishing Email is required</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Landing Page:{" "}
          </Typography>
          <FormControl fullWidth error={errors.landingPage}>
            <Select
              value={formData.landingPage}
              onChange={(e) => handleSelectChange(e, "landingPage")}
              displayEmpty
              inputProps={{
                placeholder: "Select landing page template",
              }}
              sx={{
                mt: "5px",
                border: "1px solid #053065",
                height: "45px",
                borderRadius: "5px",
              }}
            >
              <MenuItem value="Target 1">Template 1</MenuItem>
              <MenuItem value="Target 2">Template 2</MenuItem>
            </Select>
            {errors.landingPage && (
              <FormHelperText>Landing Page is required</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Date and Time of Launch:{" "}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            mt={"15px"}
          >
            <Button
              sx={{
                backgroundColor: "#0473E9",
                color: "#FFFFFF",
                fontSize: "17px",
                width: { xs: "100%", md: "48%" },
                textTransform: "none",
                mb: { xs: "10px", md: "0" },
              }}
              onClick={handleNowButtonClick}
            >
              Now
            </Button>
            <Button
              sx={{
                border: "1px solid #0473E9",
                color: "#0473E9",
                fontSize: "17px",
                width: { xs: "100%", md: "48%" }, // Full width on small screens
                textTransform: "none",
                ml: { xs: "0px", lg: "15px" },
              }}
              onClick={() => setShowDatePicker(true)}
            >
              Schedule Date & Time{" "}
            </Button>
          </Box>{" "}
          {showDatePicker && (
            <>
              {/* <Typography
                variant="body1"
                sx={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#0473E9",
                  mt: "15px",
                }}
              >
                Select scheduled date and time{" "}
              </Typography>
              <DatePicker
                selected={formData.launchDate}
                onChange={handleLaunchDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="custom-datepicker"
                placeholderText="select date & time"
              />
              {errors.launchDate && (
                <p style={{ color: "red" }}>Launch Date is required</p>
              )} */}

              <Typography
                variant="body1"
                sx={{
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#0473E9",
                  mt: "15px",
                }}
              >
                Select Time Zone:
              </Typography>
              <Grid item xs={12} md={6} mt={"10px"}>
                <FormControl fullWidth>
                  <Select
                    value={formData.timeZone}
                    onChange={(e) => handleSelectChange(e, "timeZone")}
                    displayEmpty
                    MenuProps={menuProps}
                    sx={{
                      mt: "5px",
                      border: "1px solid #053065",
                      height: "45px",
                      borderRadius: "5px",
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Time Zone</em>
                    </MenuItem>
                    {timeZones.map((zone, index) => (
                      <MenuItem key={index} value={zone}>
                        {zone}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} mt={"10px"} display={"flex"}>
                <Box display={"flex"}>
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#0473E9",
                      mt: "15px",
                    }}
                  >
                    Start Date:{" "}
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    placeholder="Sart Date"
                    name="startDate"
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
                      },
                    }}
                    InputProps={{
                      sx: {
                        mt: "5px",
                        border: "1px solid #053065",
                        height: "45px",
                        borderRadius: "5px",
                        "&::placeholder": {
                          color: "#8E8E8E",
                          opacity: 1,
                          fontWeight: "500",
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#0473E9",
                      mt: "15px",
                    }}
                  >
                    Start Time:
                  </Typography>
                  <TextField
                    fullWidth
                    type="time"
                    placeholder="Sart Time"
                    name="startTime"
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "16px",
                      },
                    }}
                    InputProps={{
                      sx: {
                        mt: "5px",
                        border: "1px solid #053065",
                        height: "45px",
                        borderRadius: "5px",
                        "&::placeholder": {
                          color: "#8E8E8E",
                          opacity: 1,
                          fontWeight: "500",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6} mt={"10px"}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "5px", fontWeight: "bold", color: "#0473E9" }}
          >
            Select Follow-Up Email
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="option1"
                  checked={formData.followUpEmail.option1}
                  onChange={handleFollowUpChange}
                />
              }
              label={
                <>
                  <Typography variant="body1" sx={{ color: "#0473E9" }}>
                    Option 1:
                  </Typography>
                  <Typography variant="body2">
                    Clicked link, Open Attachment or Replied to Email
                  </Typography>
                </>
              }
            />
            <FormControlLabel
              sx={{ mt: "10px" }}
              control={
                <Checkbox
                  name="option2"
                  checked={formData.followUpEmail.option2}
                  onChange={handleFollowUpChange}
                />
              }
              label={
                <>
                  <Typography variant="body1" sx={{ color: "#0473E9" }}>
                    Option 2:
                  </Typography>
                  <Typography variant="body2">
                    Email or Contact them myself{" "}
                  </Typography>
                </>
              }
            />
            {/* Buttons aligned under the checkboxes */}
            <Box display={"flex"} justifyContent={"flex-start"} mt={"40px"}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{
                      border: "1px solid #0473E9",
                      color: "#0473E9",
                      fontSize: "17px",
                      textTransform: "none",
                      width: "100%",
                    }}
                  >
                    Preview Simulation Email
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{
                      border: "1px solid #0473E9",
                      color: "#0473E9",
                      fontSize: "17px",
                      textTransform: "none",
                      width: "100%",
                    }}
                  >
                    Send Test Email{" "}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    sx={{
                      backgroundColor: "#0473E9",
                      color: "#FFFFFF",
                      fontSize: "17px",
                      textTransform: "none",
                      width: "100%",
                    }}
                    onClick={handleSubmit}
                  >
                    Start Simulation Email{" "}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default NewEmailCompaign;
