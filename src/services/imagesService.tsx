import { PictureDT } from "@/server/models/Picture";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { Axios, AxiosProgressEvent } from "axios";

export interface GetImagesResponseType {
  images: PictureDT[];
  imagesCount: number;
}
export async function getImages(page = 1): Promise<GetImagesResponseType> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/image?page=${page}`
  );
  return res.data.data;
}

export function useImages(page: number, initData?: GetImagesResponseType) {
  return useQuery({
    queryKey: ["images", page],
    queryFn: () => getImages(page),
    initialData: initData,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

// Mutation
async function addImages(
  formData: FormData,
  onProgress?: (progress: AxiosProgressEvent) => void
): Promise<PictureDT[]> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/image`,
    formData,
    { onUploadProgress: onProgress }
  );
  return data.data;
}

export function useImagesMutation(
  onProgress?: (progress: AxiosProgressEvent) => void
) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (formData: FormData) => addImages(formData, onProgress),
    {
      onSettled: (data) => {
        if (data) {
          queryClient.setQueryData(["images"], (oldData?: PictureDT[]) => {
            if (oldData) {
              return [...data, ...oldData];
            }
            return data;
          });
        }
      },
    }
  );
  return mutation;
}
