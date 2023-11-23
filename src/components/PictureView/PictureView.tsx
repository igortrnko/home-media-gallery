"use client";

import Box from "@mui/material/Box";
import { useCallback, useEffect, useRef } from "react";
import useImagesStore from "@/zustandStore/imagesStore";
import ObserverContainer from "./ObserverContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { PictureDT } from "@/server/models/Picture";
import DateRow from "./DateRow";
import ImageRow from "./ImageRow";

const DATE_ROW_HEIGHT = 50;
const IMAGE_ROW_HEIGHT = 150;

const PictureView = () => {
  // const windowSizes = useScreenSize();
  const {
    getImages,
    loadingImages,
    isFetching,
    datesAndImagesArray,
    hasMoreImages,
  } = useImagesStore((state) => ({
    getImages: state.getImages,
    hasMoreImages: state.hasMoreImages,
    loadingImages: state.loadingImages,
    isFetching: state.isFetching,
    datesAndImagesArray: state.picturesViewFormattedImages,
  }));

  // const isUpdatingScreenWidth = useIsUpdatingValue(windowSizes.width, 300);

  useEffect(() => {
    getImages({ firstFetch: true });
  }, [getImages]);

  const isDateItem = useCallback(
    (index: number) => typeof datesAndImagesArray[index] === "string",
    [datesAndImagesArray]
  );

  const estimateSize = useCallback(
    (index: number) => {
      return isDateItem(index) ? DATE_ROW_HEIGHT : IMAGE_ROW_HEIGHT;
    },
    [isDateItem]
  );

  const getItemKey = useCallback(
    (index: number) =>
      isDateItem(index)
        ? (datesAndImagesArray[index] as string)
        : (datesAndImagesArray[index][0] as PictureDT)._id,
    [isDateItem, datesAndImagesArray]
  );

  const listRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: datesAndImagesArray.length,
    estimateSize,
    overscan: 20,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    getItemKey,
  });

  if (datesAndImagesArray.length === 0 && isFetching) {
    return (
      <div className="w-full flex justify-center mt-4">
        <CircularProgress />
      </div>
    );
  }

  if (datesAndImagesArray.length === 0 && !isFetching) {
    return <div>No images</div>;
  }

  return (
    <ObserverContainer onEndReached={getImages} shouldExecute={!!hasMoreImages}>
      <Box className="px-2 w-full" ref={listRef}>
        <Box className="relative" height={virtualizer.getTotalSize()}>
          {virtualizer
            .getVirtualItems()
            .map((item) =>
              typeof datesAndImagesArray[item.index] === "string" ? (
                <DateRow
                  key={item.index}
                  date={datesAndImagesArray[item.index] as string}
                  height={item.size}
                  translateY={item.start - virtualizer.options.scrollMargin}
                />
              ) : (
                <ImageRow
                  key={item.index}
                  images={datesAndImagesArray[item.index] as PictureDT[]}
                  height={item.size}
                  translateY={item.start - virtualizer.options.scrollMargin}
                />
              )
            )}
        </Box>
      </Box>
      {hasMoreImages && (
        <div className="w-full flex justify-center my-4">
          <CircularProgress />
        </div>
      )}
    </ObserverContainer>
  );
};

export default PictureView;
