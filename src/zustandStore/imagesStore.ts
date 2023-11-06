import { PictureDT } from "@/server/models/Picture";
import { addImages, getImages } from "@/services/imagesService";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ImageStore {
  images: PictureDT[];
  imagesCount: number;
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
      imagesCount: 0,
      loadingImages: false,
      isFetching: false,
      uploadingImages: false,
      getImages: async (page) => {
        if (get().loadingImages) return;

        set({ loadingImages: true, isFetching: isFirstLoad });
        const response = await getImages({ pageParam: page });
        set((state) => ({
          images: [...state.images, ...response.images],
          imagesCount: response.imagesCount,
          loadingImages: false,
          isFetching: false,
        }));
        isFirstLoad = false;
      },
      uploadImages: async (formData, onUploadProgress) => {
        set({ uploadingImages: true });
        const response = await addImages(formData, onUploadProgress);
        set((state) => ({
          images: [...response.images, ...state.images],
          imagesCount: response.imagesCount,
          uploadingImages: false,
        }));
      },
    }),
    { name: "ImageStore" }
  )
);

export default useImagesStore;
