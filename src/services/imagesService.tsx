import axiosClient from "@/lib/axiosClient";
import { PictureDT } from "@/server/models/Picture";
import { AxiosProgressEvent } from "axios";

export interface GetImagesResponseType {
  images: PictureDT[];
  imagesCount: number;
  nextCursor?: string | null;
}

const defaultResponse = {
  images: [],
  imagesCount: 0,
  nextCursor: null,
};

export async function getImages({
  cursor = "",
}): Promise<GetImagesResponseType> {
  try {
    const res = await axiosClient.get(`/api/picture?cursor=${cursor}`);
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
