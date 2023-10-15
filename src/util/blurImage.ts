import { decode, encode } from "blurhash";
import sharp from "sharp";

async function getBlurBase64(fileData: Buffer) {
  try {
    const { data, info } = await sharp(fileData)
      .resize({ width: 10, height: 10 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const encoded = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      4,
      4
    );

    const decoded = decode(encoded, info.width, info.height);

    const image = await sharp(Buffer.from(decoded), {
      raw: {
        channels: 4,
        width: info.width,
        height: info.height,
      },
    })
      .webp({
        quality: 30,
      })
      .toBuffer();

    return "data:image/webp;base64," + image.toString("base64");
  } catch (e) {
    return;
  }
}

export default getBlurBase64;
