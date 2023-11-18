import dbConnect from "@/server/dbConnect";
import Picture, { PictureDT, PictureType } from "@/server/models/Picture";
import { NextRequest, NextResponse } from "next/server";
import uploadImageStream from "@/util/uploadImageStream";

const GET_IMAGE_LIMIT = 30;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor");

    const query = cursor
      ? {
          _id: { $lt: cursor },
        }
      : {};

    await dbConnect();

    const images = await Picture.find<PictureDT>(query)
      .lean()
      .limit(GET_IMAGE_LIMIT)
      .sort({ _id: -1 });

    const imagesCount = await Picture.count().lean();

    return NextResponse.json({
      data: {
        images: images,
        imagesCount,
        nextCursor: images.at(-1)?._id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something gone wrong!" },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.formData();
    const files = data.getAll("files") as File[];

    const picturesData: PictureType[] = [];

    // use file-type package to check real type of file and then save it if its image or video, filter out

    for (const file of files) {
      const imageData = await uploadImageStream(file);
      picturesData.push(imageData);
    }

    const dbResponse = (await Picture.insertMany(picturesData)).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const imagesCount = await Picture.count();

    return NextResponse.json({
      success: true,
      data: { images: dbResponse, imagesCount },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something gone wrong!" },
      { status: 400 }
    );
  }
}
