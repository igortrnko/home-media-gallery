import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { fileTypeFromBuffer } from "file-type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;

  if (typeof slug === "undefined" || typeof slug === "string") {
    return res.status(404).json({ error: "Not found" });
  }

  const filePath = path.join(process.cwd(), "/assets/", slug.join("/"));

  try {
    const file = await fs.readFile(filePath);

    const mimeType = await fileTypeFromBuffer(file);

    res.writeHead(200, "ok", {
      "Content-Type": mimeType?.mime,
    });
    res.send(file);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
}
