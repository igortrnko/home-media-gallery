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

export default function PicturesPage() {
  const [imgs, setImgs] = useState<null | { img: File; imgSrc: string }[]>(
    null
  );
  const [drawerData, setDrawerData] = useState<null | {
    img: File;
    imgSrc: string;
  }>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleUpload(images: File[]) {
    try {
      const results = await convertMultipleFilesToStringArray(images);
      const finalObj = images.map((img, i) => ({ img, imgSrc: results[i] }));
      setImgs(finalObj);
    } catch {
      console.log("Error");
    }
  }

  function handleImgClick(data: { img: File; imgSrc: string }) {
    setDrawerData(data);
    setDrawerOpen(true);
  }

  return (
    <main>
      <Box className="p-4">
        <UploadButton onUploadImages={handleUpload} />

        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
      </Box>

      {imgs && (
        <ImageList cols={2} rowHeight={164} gap={8} className="max-w-lg">
          {imgs.map((file, i) => (
            <ImageListItem
              key={i}
              onClick={() => handleImgClick(file)}
              onTouchEnd={(e) => console.log(e)}
              onTouchStart={(e) => console.log(e)}
            >
              <Image src={file.imgSrc} alt="" fill className="object-cover" />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      <SwipeableDrawer
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
      </SwipeableDrawer>
    </main>
  );
}
