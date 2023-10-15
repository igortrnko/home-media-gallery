import {
  getImagesServer,
  uploadImagesServer,
} from "@/server/controllers/imageController";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    return await uploadImagesServer(req, res);
  }

  if (method === "GET") {
    return await getImagesServer(req, res);
  }

  return res.status(405).json({ error: `Method ${method} is not allowed` });
}
