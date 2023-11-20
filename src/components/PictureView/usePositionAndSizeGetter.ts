import { PictureDT } from "@/server/models/Picture";
import { CollectionCellSizeAndPosition } from "react-virtualized/dist/commonjs/Collection";

const STRING_ITEM_HEIGHT = 50;
const IMAGE_ITEM_HEIGHT = 100;

const SUM_HEIGHT = STRING_ITEM_HEIGHT + IMAGE_ITEM_HEIGHT;

const cache = {
  column: 0,
  currentY: 0,
  currentX: 0,
};

const usePositionAndSizeGetter = () => {
  function updateCacheStringItem() {
    const yAddition = cache.column === 0 ? STRING_ITEM_HEIGHT : SUM_HEIGHT;
    cache.currentX = 0;
    cache.currentY = cache.currentY + yAddition;
    cache.column = 0;
  }

  function updateCacheImageItem(imgWidth: number) {
    const isLastColumn = cache.column === 2;
    cache.currentX = isLastColumn ? 0 : cache.currentX + imgWidth;
    cache.currentY = isLastColumn ? cache.currentY + 100 : cache.currentY;
    cache.column = isLastColumn ? 0 : cache.column + 1;
  }

  function getParamsForStringItem(maxWidth: number) {
    const { currentY, column: currentColumn } = cache;
    return {
      x: 0,
      width: maxWidth,
      y: currentColumn === 0 ? currentY : currentY + 100,
      height: 50,
    };
  }

  function getParamsForImageItem(imgWidth: number) {
    const { currentX, currentY } = cache;
    return { x: currentX, width: imgWidth, y: currentY, height: 100 };
  }

  function getParameters(item: string | PictureDT, maxWidth: number) {
    let params: Partial<CollectionCellSizeAndPosition> = {};

    if (typeof item === "string") {
      params = getParamsForStringItem(maxWidth);
      updateCacheStringItem();
    } else {
      const imageWidth = maxWidth / 3;
      params = getParamsForImageItem(imageWidth);
      updateCacheImageItem(imageWidth);
    }

    return params as CollectionCellSizeAndPosition;
  }

  function resetCache() {
    cache.column = 0;
    cache.currentX = 0;
    cache.currentY = 0;
  }

  return { getParameters, resetPositionsCache: resetCache };
};

export default usePositionAndSizeGetter;
