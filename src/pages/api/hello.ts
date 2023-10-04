import path from "path";
import fs from "fs";
import { Stream } from "stream";
import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import busboy from "busboy";
import { randomFillSync } from "crypto";
import { inspect } from "util";

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString("hex");
})();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function r(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    const bb = busboy({ headers: req.headers });

    bb.on("file", (name, file, info) => {
      const { filename, encoding, mimeType } = info;

      console.log(
        "File [" +
          name +
          "]: filename: " +
          filename +
          ", encoding: " +
          encoding +
          ", mimetype: " +
          mimeType
      );

      const saveTo = path.join(
        process.cwd(),
        "/assets/",
        `busboy-upload-${random()}.${mimeType.replace("image/", "")}`
      );
      file.pipe(fs.createWriteStream(saveTo));

      file.on("data", function (data) {
        res.write(JSON.stringify({ process: 1 }));
        console.log("File [" + name + "] got " + data.length + " bytes");
      });
      file.on("end", function () {
        // res.write('end')
        console.log("File [" + name + "] Finished");
      });
    });

    bb.on("field", function (fieldname, val) {
      console.log("Field [" + fieldname + "]: value: " + inspect(val));
    });
    bb.on("finish", function () {
      console.log("Done parsing form!");

      resolve(1);
    });

    req.pipe(bb);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await r(req, res);

  res.status(200).end(JSON.stringify({ ok: true }));

  // const filePath = path.join(process.cwd(), "/assets/running_heading.jpg");
}
