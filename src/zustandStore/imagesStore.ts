import { PictureDT } from "@/server/models/Picture";
import { addImages, getImages } from "@/services/imagesService";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ImageStore {
  images: PictureDT[];
  imagesCount: number;
  loadingImages: boolean;
  getImages: (page: number) => void;
  uploadImages: (
    formData: FormData,
    onUploadProgress?: (progress: AxiosProgressEvent) => void
  ) => void;
}

const useImagesStore = create<ImageStore, [["zustand/devtools", never]]>(
  devtools(
    (set, get) => ({
      images: [],
      imagesCount: 0,
      loadingImages: false,
      getImages: async (page) => {
        if (get().loadingImages) return;

        set({ loadingImages: true });
        const response = await getImages({ pageParam: page });
        set((state) => ({
          images: [...state.images, ...response.images],
          imagesCount: response.imagesCount,
          loadingImages: false,
        }));
      },
      uploadImages: async (formData, onUploadProgress) => {
        const response = await addImages(formData, onUploadProgress);
        set((state) => ({
          images: [...response.images, ...state.images],
          imagesCount: response.imagesCount,
        }));
      },
    }),
    { name: "ImageStore" }
  )
);

export default useImagesStore;
