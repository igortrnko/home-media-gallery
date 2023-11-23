import { PictureDT } from "@/server/models/Picture";

export function formatDate(date: string | Date | number) {
  return new Date(date).toLocaleDateString("sr-RS", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

// export function formatImagesOnGet(
//   images: PictureDT[],
//   currentFormattedData: (PictureDT | string)[]
// ) {
//   const finalData = currentFormattedData;

//   let lastDate: string | null = null;

//   images.forEach((img) => {
//     const date = formatDate(img.createdAt);

//     if (lastDate === null) {
//       const lastDateIndex = finalData.lastIndexOf(date, -1);
//       const hasSameDate = lastDateIndex >= 0;

//       if (!hasSameDate) {
//         finalData.push(date);
//       }

//       lastDate = hasSameDate ? (finalData[lastDateIndex] as string) : date;
//     }

//     if (lastDate !== date) {
//       finalData.push(date);
//       lastDate = date;
//     }

//     finalData.push(img);
//   });

//   return finalData;
// }

// export function formatImagesOnAdd(
//   newImages: PictureDT[],
//   currentImages: (string | PictureDT)[]
// ) {
//   const finalData = currentImages;

//   // on upload images we know time will be today always
//   const today = formatDate(Date.now());

//   const shouldAddDate = finalData[0] !== today;

//   if (shouldAddDate) {
//     finalData.unshift(today, ...newImages);
//   } else {
//     finalData.splice(1, 0, ...newImages);
//   }

//   return finalData;
// }

export function formatImagesOnGetLists(
  images: PictureDT[],
  currentFormattedData: (PictureDT[] | string)[]
) {
  const current = Array.from(currentFormattedData);

  let lastDateInCurrent = current.findLast((item) => typeof item === "string");

  images.forEach((img) => {
    const date = formatDate(img.createdAt);

    if (lastDateInCurrent === date) {
      const lastCurrentItem = current.at(-1) as PictureDT[];

      if (lastCurrentItem.length < 2) {
        lastCurrentItem.push(img);
      } else {
        current.push([img]);
      }
    } else {
      current.push(date, [img]);
      lastDateInCurrent = date;
    }
  });

  return current;
}

export function formatImagesOnAddLists(
  images: PictureDT[],
  currentFormattedData: (PictureDT[] | string)[]
) {
  const current = Array.from(currentFormattedData);

  const firstDateInCurrent = current[0];
  const today = formatDate(Date.now());

  if (firstDateInCurrent === today) {
    const indexOfNextSection = current.findIndex(
      (item, i) => i !== 0 && typeof item === "string"
    );
    const currentSameSection = current
      .splice(0, indexOfNextSection > 0 ? indexOfNextSection : current.length)
      .flat()
      .slice(1);

    currentSameSection.unshift(today, ...images);

    const newImagesArray: (PictureDT[] | string)[] = [];

    currentSameSection.forEach((item) => {
      if (typeof item === "string") {
        newImagesArray.push(item);
        return;
      }

      const lastItem = newImagesArray.at(-1) as string | PictureDT[];

      if (typeof lastItem === "string" || lastItem.length === 2) {
        newImagesArray.push([item]);
      } else {
        lastItem.push(item);
      }
    });

    current.unshift(...newImagesArray);

    return current;
  } else {
    const newImagesArray: (PictureDT[] | string)[] = [today];

    images.forEach((img) => {
      const lastItem = newImagesArray.at(-1) as string | PictureDT[];

      if (typeof lastItem === "string" || lastItem.length === 2) {
        newImagesArray.push([img]);
      } else {
        lastItem.push(img);
      }
    });

    current.unshift(...newImagesArray);

    return current;
  }
}

// ['DATE', [image, image, image], [image, image, image], [image, image], 'DATE', [image,image]]
