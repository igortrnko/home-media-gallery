interface PicturePageProps {
  params: {
    id: string;
  };
}

export default async function PicturePage({ params }: PicturePageProps) {
  console.log(params.id);
  return <main className="pb-16">This is photo {params.id}</main>;
}
