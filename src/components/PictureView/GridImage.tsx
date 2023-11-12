import { PictureDT } from "@/server/models/Picture";
import Image from "next/image";
import { CSSProperties, FC } from "react";

interface GridImageProps {
  style: CSSProperties;
  picture: PictureDT;
}

const GridImage: FC<GridImageProps> = ({ style, picture }) => {
  return (
    <div style={style}>
      <Image
        src={"/api/image" + picture.source}
        alt={picture.name}
        fill
        sizes="33vw"
        className="object-cover rounded-md p-0.5"
        placeholder={picture.blurDataURL ? "blur" : "empty"}
        blurDataURL={picture.blurDataURL}
      />
    </div>
  );
};

export default GridImage;
