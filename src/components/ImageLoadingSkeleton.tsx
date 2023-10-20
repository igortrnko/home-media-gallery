import Skeleton from "@mui/material/Skeleton";
import { ImageList, ImageListItem } from "@mui/material";

const ImageLoadingSkeleton = () => {
  return (
    <div>
      <ImageList cols={3} rowHeight={100} gap={4} className="max-w-lg mx-auto">
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
        <ImageListItem className="relative">
          <Skeleton variant="rectangular" height={100} />
        </ImageListItem>
      </ImageList>
    </div>
  );
};

export default ImageLoadingSkeleton;
