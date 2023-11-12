// import { PictureDT } from "@/server/models/Picture";

// export default function formatImageArray(
//   images: PictureDT[],
//   concatWithImages: [string, PictureDT[][]][]
// ) {
//   const finalData = new Map<string, PictureDT[][]>(concatWithImages);

//   images.forEach((imageData) => {
//     const createdAt = new Date(imageData.createdAt).toLocaleDateString(
//       "sr-RS",
//       { month: "short", day: "2-digit", year: "numeric" }
//     );

//     const data =
//       finalData.get(createdAt) ?? finalData.set(createdAt, []).get(createdAt)!;

//     const lastArray = data.at(-1);

//     if (lastArray && lastArray.length < 3) {
//       lastArray.push(imageData);
//     } else {
//       data.push([imageData]);
//     }
//   });

//   return Array.from(finalData);
// }

import { PictureDT } from "@/server/models/Picture";

export function formatDate(date: string | Date | number) {
  return new Date(date).toLocaleDateString("sr-RS", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatImagesOnGet(
  images: PictureDT[],
  currentFormattedData: (PictureDT | string)[]
) {
  const finalData = currentFormattedData;

  let lastDate: string | null = null;

  images.forEach((img) => {
    const date = formatDate(img.createdAt);

    if (lastDate === null) {
      const lastDateIndex = finalData.lastIndexOf(date, -1);
      const hasSameDate = lastDateIndex >= 0;

      if (!hasSameDate) {
        finalData.push(date);
      }

      lastDate = hasSameDate ? (finalData[lastDateIndex] as string) : date;
    }

    if (lastDate !== date) {
      finalData.push(date);
      lastDate = date;
    }

    finalData.push(img);
  });

  return finalData;
}

export function formatImagesOnAdd(
  newImages: PictureDT[],
  currentImages: (string | PictureDT)[]
) {
  const finalData = currentImages;

  // on upload images we know time will be today always
  const today = formatDate(Date.now());

  const shouldAddDate = finalData[0] !== today;

  if (shouldAddDate) {
    finalData.unshift(today, ...newImages);
  } else {
    finalData.splice(1, 0, ...newImages);
  }

  return finalData;
}
