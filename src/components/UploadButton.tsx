"use client";

import { type FC, type ChangeEvent, useState } from "react";
import UploadProgressDialog from "./UploadProgressDialog";
import useImagesStore from "@/zustandStore/imagesStore";
import { useShallow } from "zustand/react/shallow";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/material";

const UploadButton: FC = () => {
  const [progress, setProgress] = useState<null | number>(null);
  const { uploadImages, uploadingImages } = useImagesStore(
    useShallow((state) => ({
      uploadImages: state.uploadImages,
      uploadingImages: state.uploadingImages,
    }))
  );

  function handleUploadProgress({ progress }: { progress?: number }) {
    setProgress(progress ? progress * 100 : null);
  }

  function handleUploadDone() {
    setProgress(null);
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;

    if (!images || images.length === 0) return;

    const formData = new FormData();
    Array.from(images).forEach((img) => {
      formData.append("files", img);
    });

    uploadImages(formData, handleUploadProgress, handleUploadDone);
  };

  return (
    <Box
      className="p-4"
      // onDragOver={(e) => {
      //   e.preventDefault();
      // }}
      // onDrop={(e) => {
      //   e.preventDefault();
      //   const droppedFiles = Array.from(e.dataTransfer.files);
      //   console.log(droppedFiles);
      // }}
    >
      <label
        className="max-h-[100px] rounded-md flex flex-col items-center justify-center gap-5 cursor-pointer border-2 border-dashed border-l-blueGrey-400 shadow-md p-4"
        htmlFor="files"
      >
        <AddPhotoAlternateIcon className="" />
        <span className="text-sm text-center">Upload image</span>
        <input
          type="file"
          id="files"
          hidden
          accept="image/*,capture=camera"
          multiple
          onChange={handleFileUpload}
        />
      </label>
      <UploadProgressDialog open={uploadingImages} progress={progress} />
    </Box>
  );
};

export default UploadButton;
