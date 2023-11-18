import UploadButton from "@/components/UploadButton";
import PictureView from "@/components/PictureView";

export default async function PicturesPage() {
  return (
    <main className="pb-16">
      <UploadButton />

      <PictureView />
    </main>
  );
}
