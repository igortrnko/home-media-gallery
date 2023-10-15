"use client";

import { PictureDT } from "@/server/models/Picture";
import { GetImagesResponseType, useImages } from "@/services/imagesService";
import { ImageList, ImageListItem, Box } from "@mui/material";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";

interface PictureViewProps {
  serverSideInitialImages: GetImagesResponseType;
}

const PictureView: FC<PictureViewProps> = ({ serverSideInitialImages }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useImages(page, serverSideInitialImages);

  const formattedData = useMemo(() => {
    const finalData: Record<string, PictureDT[]> = {};

    if (data) {
      data.images.forEach((imageData) => {
        const createdAt = new Date(imageData.createdAt).toLocaleDateString(
          "sr-RS",
          { month: "short", day: "2-digit", year: "numeric" }
        );

        finalData[createdAt] = finalData[createdAt] ?? [];
        finalData[createdAt].push(imageData);
      });

      return Object.entries(finalData);
    } else {
      return [];
    }
  }, [data]);

  const hasNextPage = data ? data.images.length < data.imagesCount : false;

  return (
    <Box className="px-1">
      <InfiniteScroll
        dataLength={formattedData.length}
        next={() => setPage((current) => current + 1)}
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
      </InfiniteScroll>
    </Box>
  );
};

export default PictureView;
