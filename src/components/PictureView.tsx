"use client";

import { PictureDT } from "@/server/models/Picture";
import {
  GetImagesResponseType,
  getImages,
  // useImages,
} from "@/services/imagesService";
import { ImageList, ImageListItem, Box } from "@mui/material";
import Image from "next/image";
import { FC, useMemo, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeGrid as Grid } from "react-window";
import useImagesStore from "@/zustandStore/imagesStore";

interface PictureViewProps {
  serverSideInitialImages?: GetImagesResponseType;
}

const PictureView: FC<PictureViewProps> = ({ serverSideInitialImages }) => {
  const { getImages, loadingImages } = useImagesStore();

  useEffect(() => {
    getImages(1);
  }, [getImages]);

  // const { data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
  //   useImages(serverSideInitialImages);

  // const formattedData = useMemo(() => {
  //   const finalData: Record<string, PictureDT[]> = {};

  //   if (data) {
  //     const allImages = data.pages.flatMap((page) => page.images) ?? [];

  //     allImages.forEach((imageData) => {
  //       const createdAt = new Date(imageData.createdAt).toLocaleDateString(
  //         "sr-RS",
  //         { month: "short", day: "2-digit", year: "numeric" }
  //       );

  //       finalData[createdAt] = finalData[createdAt] ?? [];
  //       finalData[createdAt].push(imageData);
  //     });

  //     return Object.entries(finalData);
  //   } else {
  //     return [];
  //   }
  // }, [data]);

  return (
    <Box className="px-1">
      {/* {isFetching && <ImageLoadingSkeleton />} */}

      {/* <InfiniteScroll
        dataLength={formattedData.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<CircularProgress className="flex mx-auto my-4" />}
      >
        {formattedData.map(([date, images]) => (
          <div key={date}>
            <p className="px-2">{date}</p>
            <ImageList
              cols={3}
              rowHeight={100}
              gap={4}
              className="max-w-lg mx-auto"
            >
              {images.map((image) => (
                <ImageListItem key={image._id} className="relative">
                  <Image
                    src={`/api/assets${image.source}`}
                    alt={image.name}
                    fill
                    sizes="33vw"
                    className="object-cover rounded-sm"
                    blurDataURL={image.blurDataURL}
                    placeholder={image.blurDataURL ? "blur" : "empty"}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        ))}
      </InfiniteScroll> */}
    </Box>
  );
};

export default PictureView;
