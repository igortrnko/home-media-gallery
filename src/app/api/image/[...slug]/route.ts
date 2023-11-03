import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type RequestParams = { params: { slug: string[] } };

export async function GET(_: Request, { params }: RequestParams) {
  try {
    const { slug } = params;

    const filePath = path.join(process.cwd(), "/assets/", slug.join("/"));

    const file = await fs.readFile(filePath);

    return new Response(file, {
      headers: {
        "Cache-Control": "max-age=15552000, public",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
}
