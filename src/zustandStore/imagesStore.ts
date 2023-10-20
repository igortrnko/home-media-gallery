import { PictureDT } from "@/server/models/Picture";
import { addImages, getImages } from "@/services/imagesService";
import { AxiosProgressEvent } from "axios";
import { create } from "zustand";

interface ImageStore {
  images: PictureDT[];
  imagesCount: number;
  getImages: (page: number) => void;
  uploadImages: (
    formData: FormData,
    onUploadProgress?: (progress: AxiosProgressEvent) => void
  ) => void;
}

const useImagesStore = create<ImageStore>((set) => ({
  images: [],
  imagesCount: 0,
  getImages: async (page) => {
    const response = await getImages({ pageParam: page });
    set((state) => ({
      images: [...response.images, ...state.images],
      imagesCount: response.imagesCount,
    }));
  },
  uploadImages: async (formData, onUploadProgress) => {
    const response = await addImages(formData, onUploadProgress);
    set((state) => ({
      images: [...response.images, ...state.images],
      imagesCount: response.imagesCount,
    }));
  },
}));

export default useImagesStore;
