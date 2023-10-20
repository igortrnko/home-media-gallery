"use client";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { type FC, type ChangeEvent, useState } from "react";
import UploadProgressDialog from "./UploadProgressDialog";
import useImagesStore from "@/zustandStore/imagesStore";

const UploadButton: FC = () => {
  const [progress, setProgress] = useState<null | number>(null);
  const uploadImages = useImagesStore((state) => state.uploadImages);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const images = event.target.files;

    if (!images || images.length === 0) return;

    const formData = new FormData();
    Array.from(images).forEach((img) => {
      formData.append(img.name, img);
    });

    uploadImages(formData, (progress) =>
      setProgress(progress.progress || null)
    );
  };

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        className="rounded-full w-full"
        startIcon={<AddIcon />}
      >
        Dodaj sliku
        <input
          hidden
          type="file"
          accept="image/*,capture=camera"
          multiple
          onChange={handleFileUpload}
        />
      </Button>
      <UploadProgressDialog progress={progress} />
    </>
  );
};

export default UploadButton;

// async function handleUpload(fileList: FileList, images: File[]) {
//   console.log(images);
//   try {
//     if (images.length === 0) return;

//     console.log(data);

//     // const promises = images.map((image) => {
//     //   return async function () {
//     //     const formData = new FormData();
//     //     formData.append(image.name, image);

//     //     const config: AxiosRequestConfig = {
//     //       onUploadProgress: function (progressEvent) {
//     //         if (typeof progressEvent.progress === "number") {
//     //           const percentComplete = Math.round(
//     //             progressEvent.progress * 100
//     //           );
//     //         }
//     //       },
//     //     };

//     //     const { data } = await axios.post(
//     //       "/api/upload-images",
//     //       formData,
//     //       config
//     //     );
//     //     console.log(image.name, data);
//     //   };
//     // });

//     // await Promise.all([promises.forEach((fn) => fn())]);

//     // const results = await convertMultipleFilesToStringArray(images);
//     // const finalObj = images.map((img, i) => ({ img, imgSrc: results[i] }));
//     // setImgs(finalObj);
//   } catch {
//     console.log("Error");
//   }
// }
