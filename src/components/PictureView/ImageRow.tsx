import { PictureDT } from "@/server/models/Picture";
import React, { FC, SyntheticEvent } from "react";
import VirtualizerRowWrapper from "./VirtualizerRowWrapper";
import Link from "next/link";
import Image from "next/image";

interface ImageRowProps {
  images: PictureDT[];
  height: number;
  translateY: number;
}

const ImageRow: FC<ImageRowProps> = ({ images, height, translateY }) => {
  function onImageLoad(img: SyntheticEvent<HTMLImageElement, Event>) {
    img.currentTarget.classList.add("animate-opacity");
    img.currentTarget.classList.remove("opacity-0");
  }

  return (
    <VirtualizerRowWrapper
      height={height}
      translateY={translateY}
      className="grid grid-cols-2"
    >
      {images.map((img) => (
        <Link
          key={`${img._id}_img`}
          href={`/picture/${img._id}`}
          className="relative m-0.5 bg-grey-A700 rounded-md overflow-hidden"
        >
          <Image
            alt={img.name}
            src={img.source}
            fill
            sizes="33vw"
            className="object-cover opacity-0"
            onLoad={onImageLoad}
            // placeholder={img.blurDataURL ? "blur" : "empty"}
            // blurDataURL={img.blurDataURL}
          />
        </Link>
      ))}
    </VirtualizerRowWrapper>
  );
};

export default ImageRow;
