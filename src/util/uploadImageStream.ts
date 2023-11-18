import { PictureType } from "@/server/models/Picture";
import random from "./randomId";
import path from "path";
import fs from "fs";
import getBlurBase64 from "./blurImage";

function uploadImageStream(file: File): Promise<PictureType> {
  return new Promise((resolve, reject) => {
    const fileName = `${random()}_` + file.name;
    const saveToPath = path.join(process.cwd(), `/assets/${fileName}`);

    const readableStream = file.stream();
    const fsWriteStream = fs.createWriteStream(saveToPath);

    let buffer: Buffer = Buffer.alloc(0);

    const writeStream = new WritableStream({
      write: (chunk) => {
        fsWriteStream.write(chunk);
        buffer = Buffer.concat([buffer, chunk]);
      },
      close: async () => {
        const blurBase64 = await getBlurBase64(buffer);
        resolve({
          name: file.name,
          source: `/api/image/${fileName}`,
          blurDataURL: blurBase64,
        });
      },
      abort: (err) => {
        reject(err);
      },
    });

    readableStream.pipeTo(writeStream);
  });
}

export default uploadImageStream;
