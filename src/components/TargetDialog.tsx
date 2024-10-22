import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TargetData {
  id: number;
  name: string;
  email: string;
  title: string;
}

interface TargetDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (target: TargetData) => void;
  initialData?: TargetData | null; // To support editing
}

const TargetDialog: React.FC<TargetDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    title: false,
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open && initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setTitle(initialData.title);
    } else {
      setName("");
      setEmail("");
      setTitle("");
    }
  }, [open, initialData]);

  // Form validation and submit
  const handleSubmit = () => {
    setErrors({ name: false, email: false, title: false });

    let hasError = false;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasError = true;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      alert("Invalid email format!");
      hasError = true;
    }
    if (!title) {
      setErrors((prev) => ({ ...prev, title: true }));
      hasError = true;
    }

    if (!hasError) {
      const newTarget = {
        id: initialData?.id || 0,
        name,
        email,
        title,
      };

      onSubmit(newTarget);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ textAlign: "center", color: "#0473E9", fontSize: "40px" }}
      >
        {initialData ? "Update Target" : "Add Target"}{" "}
        <IconButton
          //   edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "#BE0505" }} // Positioning the close button
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Typography
        variant="body1"
        color="#000000"
        textAlign={"center"}
        fontSize={"14px"}
        padding={"15px"}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Typography>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ marginBottom: "5px", fontWeight: "bold", color: "#000000" }}
        >
          Name:
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          helperText={errors.name && "Name is required"}
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
        />{" "}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#000000", mt: "10px" }}
        >
          Email:{" "}
        </Typography>
        <TextField
          //   label="Email"
          fullWidth
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          helperText={errors.email && "Email is required"}
          margin="normal"
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
              //   mt: "5px",
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
        />{" "}
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#000000", mt: "10px" }}
        >
          Title:{" "}
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          helperText={errors.title && "Title is required"}
          margin="normal"
          InputLabelProps={{
            // shrink: true,
            sx: {
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
            },
          }}
          InputProps={{
            sx: {
              //   mt: "5px",
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: "15px" }}>
        {" "}
        {/* Centering the buttons */}
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000000",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#0473E9",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#005BB5",
            },
          }}
        >
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TargetDialog;
