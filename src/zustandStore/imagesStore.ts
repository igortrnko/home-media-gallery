import { PictureDT } from "@/server/models/Picture";
import { addImages, getImages } from "@/services/imagesService";
import { formatImagesOnAdd, formatImagesOnGet } from "@/util/formatImageArray";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ImageStore {
  images: PictureDT[];
  picturesViewFormattedImages: (string | PictureDT)[];
  hasMoreImages: boolean | null;
  loadingImages: boolean;
  isFetching: boolean;
  uploadingImages: boolean;
  getImages: (page: number) => void;
  uploadImages: (
    formData: FormData,
    onUploadProgress?: (progress: AxiosProgressEvent) => void
  ) => void;
}

let isFirstLoad = true;

const useImagesStore = create<ImageStore>()(
  devtools(
    (set, get) => ({
      images: [],
      picturesViewFormattedImages: [],
      hasMoreImages: null,
      loadingImages: false,
      isFetching: false,
      uploadingImages: false,
      getImages: async (page) => {
        if (get().loadingImages) return;

        set({ loadingImages: true, isFetching: isFirstLoad });
        const response = await getImages({ pageParam: page });

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
        });
        isFirstLoad = false;
      },
      uploadImages: async (formData, onUploadProgress) => {
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
      },
    }),
    { name: "ImageStore" }
  )
);

export default useImagesStore;
