import { PictureDT } from "@/server/models/Picture";
import { addImages, getImages } from "@/services/imagesService";
import { formatImagesOnAdd, formatImagesOnGet } from "@/util/formatImageArray";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export interface ImageStore {
  images: PictureDT[];
  picturesViewFormattedImages: (string | PictureDT)[];
  hasMoreImages: boolean | null;
  loadingImages: boolean;
  isFetching: boolean;
  uploadingImages: boolean;
  nextCursor: string;
  getImages: () => void;
  uploadImages: (
    formData: FormData,
    onUploadProgress?: (progress: AxiosProgressEvent) => void,
    onUploadDone?: () => void
  ) => void;
}

const useImagesStore = create<ImageStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      images: [],
      picturesViewFormattedImages: [],
      hasMoreImages: null,
      loadingImages: false,
      isFetching: true,
      uploadingImages: false,
      nextCursor: "",
      getImages: async () => {
        if (get().loadingImages) return;

        set({ loadingImages: true });
        const response = await getImages({ cursor: get().nextCursor });

        const { images, picturesViewFormattedImages } = get();

        const newImagesArray = [...images, ...response.images];
        const newPicturesViewFormattedImages = formatImagesOnGet(
          response.images,
          picturesViewFormattedImages
        );
        const hasMoreImages = response.imagesCount !== newImagesArray.length;

        set({
          images: newImagesArray,
          picturesViewFormattedImages: newPicturesViewFormattedImages,
          hasMoreImages,
          loadingImages: false,
          isFetching: false,
          nextCursor: response.nextCursor || "",
        });
      },
      uploadImages: async (formData, onUploadProgress, onUploadDone) => {
        set({ uploadingImages: true });
        const response = await addImages(formData, onUploadProgress);

        const { images, picturesViewFormattedImages } = get();
        const newImagesArray = [...response.images, ...images];
        const newPicturesViewFormattedImages = formatImagesOnAdd(
          response.images,
          picturesViewFormattedImages
        );
        const hasMoreImages = response.imagesCount !== newImagesArray.length;

        set({
          images: newImagesArray,
          picturesViewFormattedImages: newPicturesViewFormattedImages,
          hasMoreImages,
          uploadingImages: false,
        });

        onUploadDone?.();
      },
    })),
    { name: "ImageStore" }
  )
);

export default useImagesStore;
