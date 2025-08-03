const { cloudinary } = require('../config/cloudinary');

// 取得 publicId，例如：products/product123456.jpg → products/product123456
function getPublicIdFromUrl(url) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const [publicId] = filename.split('.');
  const folder = parts[parts.length - 2];
  return `${folder}/${publicId}`;
}

async function deleteCloudinaryImage(imageUrl) {
  const publicId = getPublicIdFromUrl(imageUrl);

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`刪除圖片成功:`, result);
    return result;
  } catch (error) {
    console.error("Cloudinary 刪除圖片失敗:", error);
    throw error;
  }
}

module.exports = deleteCloudinaryImage;
