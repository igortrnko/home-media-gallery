import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../dbConnect";
import Picture, { PictureType } from "../models/Picture";
import busboy from "busboy";
import random from "@/util/randomId";
import path from "path";
import fs from "fs";
import getBlurBase64 from "@/util/blurImage";

export const GET_IMAGE_LIMIT = 30;

export async function getImagesServer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : 1;

    const skip = (page - 1) * GET_IMAGE_LIMIT;

    await dbConnect();

    const images = await Picture.find()
      .sort("-createdAt")
      .skip(skip)
      .limit(GET_IMAGE_LIMIT);

    const imagesCount = await Picture.count();

    return res.status(200).json({
      success: true,
      data: { images: images as PictureType[], imagesCount },
    });
  } catch (error) {
    return res.status(400).json({ message: "Something gone wrong!" });
  }
}

export async function uploadImagesServer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const savedPicturesResponse = await uploadImageStream(req);

    const dbResponse = await Picture.create(savedPicturesResponse);

    const imagesCount = await Picture.count();

    res.status(200).json({
      success: true,
      data: { images: dbResponse.reverse() as PictureType[], imagesCount },
    });
  } catch (error) {
    return res.status(400).json({ message: "Something gone wrong!" });
  }
}

type TempResObjType = (Omit<PictureType, "createdAt" | "updatedAt"> & {
  fileData: Buffer | null;
})[];

function uploadImageStream(
  req: NextApiRequest
): Promise<Omit<PictureType, "createdAt" | "updatedAt">[]> {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    const tempResponseObject: TempResObjType = [];

    bb.on("file", (_, file, info) => {
      const fileName = `${random()}_` + info.filename;
      const filePath = path.join(process.cwd(), `/assets/${fileName}`);

      const stream = fs.createWriteStream(filePath);

      let fileData: Buffer | null = null;

      file.on("close", () => {
        tempResponseObject.push({
          name: info.filename,
          source: `/${fileName}`,
          fileData,
        });
      });

      file.on("data", (bufferChunk: Buffer) => {
        fileData = fileData
          ? Buffer.concat([fileData, bufferChunk])
          : bufferChunk;
      });

      file.pipe(stream);
    });

    bb.on("close", async () => {
      const resObjectPromise = tempResponseObject.map(async (item) => {
        if (item.fileData) {
          const base64 = await getBlurBase64(item.fileData);
          return {
            name: item.name,
            source: item.source,
            blurDataURL: base64,
          };
        }
        return item;
      });

      const responseObject = await Promise.all(resObjectPromise);

      resolve(responseObject);
    });

    bb.on("error", (err) => {
      console.log(err);
      reject([]);
    });

    req.pipe(bb);
  });
}
