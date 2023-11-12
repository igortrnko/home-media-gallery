import { Box } from "@mui/material";
import UploadButton from "@/components/UploadButton";
import PictureView from "@/components/PictureView";

export default async function PicturesPage() {
  return (
    <main className="pb-16">
      <Box className="p-4">
        <UploadButton />
      </Box>

      <PictureView />
    </main>
  );
}
