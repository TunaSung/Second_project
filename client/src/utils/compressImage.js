import imageCompression from 'browser-image-compression';

export const compressImage = async (file, size, wh) => {
  const options = {
    maxSizeMB: size,               // 壓縮後最大 1MB
    maxWidthOrHeight: wh,     // 限制圖片尺寸
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("圖片壓縮失敗", error);
    return file; // 壓縮失敗就用原圖
  }
};
