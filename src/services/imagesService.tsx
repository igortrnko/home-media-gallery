import axiosClient from "@/lib/axiosClient";
import { PictureDT } from "@/server/models/Picture";
import { AxiosProgressEvent } from "axios";

export interface GetImagesResponseType {
  images: PictureDT[];
  imagesCount: number;
}

const defaultResponse = {
  images: [],
  imagesCount: 0,
};

export async function getImages({
  pageParam = 1,
}): Promise<GetImagesResponseType> {
  try {
    const res = await axiosClient.get(`/api/picture?page=${pageParam}`);
    return res.data.data;
  } catch {
    return defaultResponse;
  }
}

export async function addImages(
  formData: FormData,
  onProgress?: (progress: AxiosProgressEvent) => void
): Promise<GetImagesResponseType> {
  try {
    const { data } = await axiosClient.post(`/api/picture`, formData, {
      onUploadProgress: onProgress,
    });
    return data.data;
  } catch {
    return defaultResponse;
  }
}
