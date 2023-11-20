import { PictureDT } from "@/server/models/Picture";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, FC, memo } from "react";

interface GridImageProps {
  style: CSSProperties;
  picture: PictureDT;
}

const GridImage: FC<GridImageProps> = ({ style, picture }) => {
  return (
    <Link href={`/picture/${picture._id}`} style={style}>
      <Image
        src={picture.source}
        alt={picture.name}
        fill
        sizes="33vw"
        className="object-cover rounded-md w-[97%] h-[97%]"
        placeholder={picture.blurDataURL ? "blur" : "empty"}
        blurDataURL={picture.blurDataURL}
      />
    </Link>
  );
};

export default memo(GridImage);
