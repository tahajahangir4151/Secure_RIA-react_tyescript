// TemplateEditor.tsx
import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TemplateEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleSaveTemplate = () => {
    // Logic to save template data
    console.log("Template saved:", { subject, content: editorState });
    navigate("/email-templates");
  };

  const handleCancel = () => {
    navigate("/email-templates");
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "auto" }}>
      <Typography
        variant="h5"
        color="primary"
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        New Email Templates
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </Typography>

      <Typography variant="body1" color="textPrimary" sx={{ mb: 1 }}>
        Subject:
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          minHeight: "300px",
          mb: 3,
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          placeholder="Type..."
          wrapperStyle={{ minHeight: "300px" }}
          editorStyle={{ padding: "10px", minHeight: "200px" }}
          toolbarStyle={{
            borderBottom: "1px solid #ddd",
            padding: "5px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCancel}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveTemplate}
          sx={{ textTransform: "none" }}
        >
          Create Template
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateEditor;
