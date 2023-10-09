import path from "path";
import fs from "fs";
import busboy from "busboy";
import { randomFillSync } from "crypto";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString("hex");
})();

function uploadImageStream(req: NextApiRequest): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });

    const responseObject = {};

    bb.on("file", (_, file, info) => {
      console.log(info);

      const fileName = `${random()}_` + info.filename;
      const filePath = path.join(process.cwd(), `/assets/${fileName}`);

      const stream = fs.createWriteStream(filePath);

      // file.on("data", (chunk: Buffer) => {});

      file.on("close", () => {
        // console.log(`File [${info.filename}] done`);
      });

      file.pipe(stream);
    });

    bb.on("close", () => {
      resolve(true);
    });

    bb.on("error", (err) => {
      console.log(err);
      reject(false);
    });

    req.pipe(bb);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    try {
      await uploadImageStream(req);

      res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(400).json({ message: "Something gone wrong!" });
    }
  }

  return res.status(405).json({ error: `Method ${method} is not allowed` });
}
