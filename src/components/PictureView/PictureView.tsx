"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ImageLoadingSkeleton from "../ImageLoadingSkeleton";
import useImagesStore from "@/zustandStore/imagesStore";
import { useShallow } from "zustand/react/shallow";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import Collection, {
  CollectionCellRendererParams,
} from "react-virtualized/dist/commonjs/Collection";
import ObserverContainer from "./ObserverContainer";
import GridImage from "./GridImage";
import DateItem from "./DateItem";
import usePositionAndSizeGetter from "./usePositionAndSizeGetter";

const PictureView = () => {
  const [page, setPage] = useState(1);
  const {
    getImages,
    loadingImages,
    isFetching,
    picturesViewFormattedImages,
    hasMoreImages,
  } = useImagesStore(
    useShallow((state) => ({
      getImages: state.getImages,
      hasMoreImages: state.hasMoreImages,
      loadingImages: state.loadingImages,
      isFetching: state.isFetching,
      picturesViewFormattedImages: state.picturesViewFormattedImages,
    }))
  );

  useEffect(() => {
    getImages(page);
  }, [getImages, page]);

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

  if (picturesViewFormattedImages.length === 0) {
    return null;
  }

  return (
    <ObserverContainer
      onEndReached={() => setPage((currentPage) => currentPage + 1)}
      shouldExecute={!!hasMoreImages}
    >
      <WindowScroller>
        {({ height, isScrolling, registerChild, scrollTop }) => (
          <Box className="px-1" ref={registerChild}>
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
                  />
                );
              }}
            </AutoSizer>
          </Box>
        )}
      </WindowScroller>
    </ObserverContainer>
  );
};

export default PictureView;
