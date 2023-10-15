import { Box } from "@mui/material";
import UploadButton from "@/components/UploadButton";
import PictureView from "@/components/PictureView";
import { getImages } from "@/services/imagesService";

export const dynamic = "force-dynamic";

export default async function PicturesPage() {
  const initImages = await getImages(1);

  return (
    <main className="pb-14">
      <Box className="p-4">
        <UploadButton />
      </Box>

      <PictureView serverSideInitialImages={initImages} />
    </main>
  );
}
