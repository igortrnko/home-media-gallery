import axiosClient from "@/lib/axiosClient";
import { PictureDT } from "@/server/models/Picture";
import { AxiosProgressEvent } from "axios";

export interface GetImagesResponseType {
  images: PictureDT[];
  imagesCount: number;
}

export async function getImages({
  pageParam = 1,
}): Promise<GetImagesResponseType> {
  const res = await axiosClient.get(`/api/picture?page=${pageParam}`);
  return res.data.data;
}

export async function addImages(
  formData: FormData,
  onProgress?: (progress: AxiosProgressEvent) => void
): Promise<GetImagesResponseType> {
  const { data } = await axiosClient.post(`/api/image`, formData, {
    onUploadProgress: onProgress,
  });
  return data.data;
}
