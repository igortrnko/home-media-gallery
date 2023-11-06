"use client";

import { PictureDT } from "@/server/models/Picture";
import {
  GetImagesResponseType,
  getImages,
  // useImages,
} from "@/services/imagesService";
import { ImageList, ImageListItem, Box } from "@mui/material";
import Image from "next/image";
import { FC, useMemo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import ImageLoadingSkeleton from "./ImageLoadingSkeleton";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeGrid as Grid } from "react-window";
import useImagesStore from "@/zustandStore/imagesStore";
import { useShallow } from "zustand/react/shallow";

const PictureView = () => {
  const [page, setPage] = useState(1);
  const { getImages, loadingImages, images, isFetching } = useImagesStore(
    useShallow(({ getImages, loadingImages, images, isFetching }) => ({
      getImages,
      loadingImages,
      images,
      isFetching,
    }))
  );

  useEffect(() => {
    getImages(page);
  }, [getImages, page]);

  const formattedData = useMemo(() => {
    const finalData: Record<string, PictureDT[]> = {};

    images.forEach((imageData) => {
      const createdAt = new Date(imageData.createdAt).toLocaleDateString(
        "sr-RS",
        { month: "short", day: "2-digit", year: "numeric" }
      );

      finalData[createdAt] = finalData[createdAt] ?? [];
      finalData[createdAt].push(imageData);
    });

    return Object.entries(finalData);
  }, [images]);

  //   height={150}
  //   itemCount={1000}
  //   itemSize={50}

  /***
   * on load we will calculate:
   * - height of container (can we do this dynamic?)
   * - item count (if we have 3 images in 1 row then item count will be Math.ceil(imageCount / 3))
   * - item size (if screen size is larger then item size will be also larger)
   *
   *
   * */

  return (
    <Box className="px-1 h-full">
      {/* {isFetching && <ImageLoadingSkeleton />} */}

      {/* <InfiniteScroll
        dataLength={formattedData.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<CircularProgress className="flex mx-auto my-4" />}
      > */}
      {/* {formattedData.map(([date, images]) => (
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
                  src={`/api/image${image.source}`}
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
      ))} */}

      {/* <button onClick={() => setPage((curr) => curr + 1)}>LoadMore</button> */}
      {/* </InfiniteScroll> */}
    </Box>
  );
};

export default PictureView;
