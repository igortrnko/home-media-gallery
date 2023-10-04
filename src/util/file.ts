export async function convertFileToString(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(`Cant convert file: ${file.name}`);
    };
    reader.readAsDataURL(file);
  });
}

export async function convertMultipleFilesToStringArray(files: File[]) {
  const convertFnArray = files.map((file) => convertFileToString(file));
  return await Promise.all(convertFnArray);
}
