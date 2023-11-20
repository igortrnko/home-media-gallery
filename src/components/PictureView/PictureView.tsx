"use client";

import Box from "@mui/material/Box";
import { useEffect } from "react";
import useImagesStore from "@/zustandStore/imagesStore";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import Collection, {
  CollectionCellRendererParams,
} from "react-virtualized/dist/commonjs/Collection";
import ObserverContainer from "./ObserverContainer";
import GridImage from "./GridImage";
import DateItem from "./DateItem";
import usePositionAndSizeGetter from "./usePositionAndSizeGetter";
import "react-virtualized/styles.css";
import useScreenSize from "@/hooks/useScreenSize";
import useIsUpdatingValue from "@/hooks/useIsUpdatingValue";
import CircularProgress from "@mui/material/CircularProgress";

const PictureView = () => {
  const windowSizes = useScreenSize();
  const {
    getImages,
    loadingImages,
    isFetching,
    picturesViewFormattedImages,
    hasMoreImages,
  } = useImagesStore((state) => ({
    getImages: state.getImages,
    hasMoreImages: state.hasMoreImages,
    loadingImages: state.loadingImages,
    isFetching: state.isFetching,
    picturesViewFormattedImages: state.picturesViewFormattedImages,
  }));

  const isUpdatingScreenWidth = useIsUpdatingValue(windowSizes.width, 300);

  useEffect(() => {
    getImages({ firstFetch: true });
  }, [getImages]);

  function collectionCellRenderer(props: CollectionCellRendererParams) {
    const item = picturesViewFormattedImages[props.index];
    return typeof item === "string" ? (
      <DateItem key={props.key} style={props.style} date={item} />
    ) : (
      <GridImage key={props.key} style={props.style} picture={item} />
    );
  }

  const { getParameters, resetPositionsCache } = usePositionAndSizeGetter();

  function cellSizeAndPositionGetter(width: number) {
    return function getter({ index }: { index: number }) {
      const item = picturesViewFormattedImages[index];
      return getParameters(item, width);
    };
  }

  if (
    (picturesViewFormattedImages.length === 0 && isFetching) ||
    isUpdatingScreenWidth
  ) {
    return (
      <div className="w-full flex justify-center mt-4">
        <CircularProgress />
      </div>
    );
  }

  if (picturesViewFormattedImages.length === 0 && !isFetching) {
    return <div>No images</div>;
  }

  return (
    <ObserverContainer onEndReached={getImages} shouldExecute={!!hasMoreImages}>
      <Box className="px-2">
        <WindowScroller>
          {({ height, scrollTop, isScrolling, onChildScroll }) => (
            <AutoSizer disableHeight>
              {({ width }) => {
                if (!width) return null;

                return (
                  <Collection
                    cellCount={picturesViewFormattedImages.length}
                    cellRenderer={collectionCellRenderer}
                    cellSizeAndPositionGetter={cellSizeAndPositionGetter(width)}
                    onSectionRendered={resetPositionsCache}
                    height={height}
                    width={width}
                    autoHeight
                    scrollTop={scrollTop}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    verticalOverscanSize={Number(windowSizes.height) * 1.5}
                  />
                );
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      </Box>
      {loadingImages && (
        <div className="w-full flex justify-center my-4">
          <CircularProgress />
        </div>
      )}
    </ObserverContainer>
  );
};

export default PictureView;
