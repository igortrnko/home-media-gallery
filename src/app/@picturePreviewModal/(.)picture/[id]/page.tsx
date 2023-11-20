"use client";

import useImagesStore from "@/zustandStore/imagesStore";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PictureModalPreviewProps {
  params: {
    id: string;
  };
}

export default function PictureModalPreview({
  params,
}: PictureModalPreviewProps) {
  const router = useRouter();
  const images = useImagesStore((state) => state.images);

  const currentImage = images.find((img) => img._id === params.id);

  return (
    <Dialog open onClose={() => router.back()}>
      <DialogContent>
        <div>
          {currentImage ? (
            <Image
              src={currentImage.source}
              alt={currentImage.name}
              width={250}
              height={250}
              blurDataURL={currentImage.blurDataURL}
              placeholder="blur"
              className="object-cover"
            />
          ) : (
            <div>Error, Image not found!</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
