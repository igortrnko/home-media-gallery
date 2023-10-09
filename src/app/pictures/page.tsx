"use client";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import UploadButton from "@/components/UploadButton";
import { convertMultipleFilesToStringArray } from "@/util/file";
import axios, { AxiosRequestConfig } from "axios";
import myImageLoader from "@/util/imageLoader";

export default function PicturesPage() {
  const [imgs, setImgs] = useState<null | { img: File; imgSrc: string }[]>(
    null
  );
  // const [drawerData, setDrawerData] = useState<null | {
  //   img: File;
  //   imgSrc: string;
  // }>(null);
  // const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleUpload(fileList: FileList, images: File[]) {
    console.log(images);
    try {
      // const formData = new FormData();
      // images.forEach((img) => {
      //   formData.append(img.name, img);
      // });

      // const { data } = await axios.post("/api/upload-images", formData);
      // console.log(data);

      const promises = images.map((image) => {
        return async function () {
          const formData = new FormData();
          formData.append(image.name, image);

          const config: AxiosRequestConfig = {
            onUploadProgress: function (progressEvent) {
              if (typeof progressEvent.progress === "number") {
                const percentComplete = Math.round(
                  progressEvent.progress * 100
                );
              }
            },
          };

          const { data } = await axios.post(
            "/api/upload-images",
            formData,
            config
          );
          console.log(image.name, data);
        };
      });

      await Promise.all([promises.forEach((fn) => fn())]);

      // const results = await convertMultipleFilesToStringArray(images);
      // const finalObj = images.map((img, i) => ({ img, imgSrc: results[i] }));
      // setImgs(finalObj);
    } catch {
      console.log("Error");
    }
  }

  // function handleImgClick(data: { img: File; imgSrc: string }) {
  //   setDrawerData(data);
  //   setDrawerOpen(true);
  // }

  return (
    <main>
      <Box className="p-4">
        <UploadButton onUploadImages={handleUpload} />

        {/* <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button> */}
      </Box>

      {imgs && (
        <ImageList cols={2} rowHeight={164} gap={8} className="max-w-lg">
          {imgs.map((file, i) => (
            <ImageListItem
              key={i}
              // onClick={() => handleImgClick(file)}
              onTouchEnd={(e) => console.log(e)}
              onTouchStart={(e) => console.log(e)}
            >
              <Image src={file.imgSrc} alt="" fill className="object-cover" />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* <Image
        src={
          "/f0e1b6fbdb024d78cfb3426287881959_DV773006-Edit.jpg"
          // "/f0e1b6fbdb024d78cfb3426287881959_DV773006-Edit.jpg"
        }
        width={200}
        height={200}
        alt=""
        loader={myImageLoader}
      /> */}

      {/* <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        allowSwipeInChildren={false}
        disableDiscovery
        disableSwipeToOpen
        // swipeAreaWidth={50}
        // disableSwipeToOpen={false}
        // ModalProps={{
        //   keepMounted: true,
        // }}
      >
        {drawerData && (
          <div>
            <Image
              src={drawerData.imgSrc}
              alt={drawerData.img.name}
              width={200}
              height={200}
            />
            <p>{drawerData.img.name}</p>
            <p>{drawerData.img.size}</p>
            <p>{drawerData.img.lastModified}</p>
          </div>
        )}
      </SwipeableDrawer> */}
    </main>
  );
}
