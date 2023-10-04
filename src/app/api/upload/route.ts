import { createWriteStream } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";

async function upload(request: NextRequest) {
  const formData = await request.formData();

  return new Promise(function (resolve, reject) {
    // @ts-ignore
    const image: File | null = formData.get("file");

    if (!image) {
      resolve(false);
    }

    const timestamp = Date.now();
    const filename = path.join(process.cwd(), `assets/${timestamp}.jpg`);

    const fileStream = createWriteStream(filename);

    const fileReadableStream = new Readable(); // Create a new Readable stream
    fileReadableStream._read = () => {}; // Implement the _read function to satisfy stream requirements

    image?.arrayBuffer().then((buffer) => {
      fileReadableStream.push(Buffer.from(buffer)); // Push the video data to the readable stream
      fileReadableStream.push(null); // Signal the end of the data

      fileReadableStream
        .pipe(fileStream)
        .on("drain", () => {
          console.log("first");
        })
        .on("error", (error) => {
          console.error("Error while saving the file:", error);
          resolve(false);
        })
        .on("finish", () => {
          console.log("File saved successfully");
          resolve(true);
        });
    });
  });
}

export const POST = async function (request: NextRequest) {
  const status = await upload(request);

  return NextResponse.json({
    status,
  });
};
