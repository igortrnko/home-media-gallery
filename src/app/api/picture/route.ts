import dbConnect from "@/server/dbConnect";
import Picture, { PictureType } from "@/server/models/Picture";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GET_IMAGE_LIMIT = 30;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;

    const skip = (page - 1) * GET_IMAGE_LIMIT;

    await dbConnect();

    const images = await Picture.find()
      .sort("-createdAt")
      .skip(skip)
      .limit(GET_IMAGE_LIMIT);

    const imagesCount = await Picture.count();

    return NextResponse.json({
      data: { images: images as PictureType[], imagesCount },
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

    files.forEach((file) => {
      const filePath = path.join(process.cwd(), "/assets/", file.name);
      const readableStream = file.stream();
      const fsWriteStream = fs.createWriteStream(filePath);

      const writeStream = new WritableStream({
        write: (chunk) => {
          fsWriteStream.write(chunk);
        },
      });

      readableStream.pipeTo(writeStream).then((res) => {
        console.log(res);
      });
    });

    // upload image to assets folder

    // const dbResponse = await Picture.create(savedPicturesResponse);

    // const imagesCount = await Picture.count();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something gone wrong!" },
      { status: 400 }
    );
  }
}
