"use client";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import type { FC, ChangeEvent } from "react";

interface UploadButtonProps {
  onUploadImages: (images: File[]) => void;
}

const UploadButton: FC<UploadButtonProps> = ({ onUploadImages }) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;
    if (!images) return;
    onUploadImages(Array.from(images));
  };

  return (
    <Button component="label" variant="contained" startIcon={<AddIcon />}>
      Dodaj sliku
      <input
        hidden
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
      />
    </Button>
  );
};

export default UploadButton;
