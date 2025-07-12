import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import SelectTree from "./SelectTree";
import { toast } from "react-toastify";

function ProductForm({
  isEdit,
  initialValues = {},
  onClose,
  onSubmitSuccess,
  categories,
  subcategories,
  onSubmit,
}) {
  const [name, setName] = useState(initialValues.name || "");
  const [price, setPrice] = useState(initialValues.price || 0);
  const [stock, setStock] = useState(initialValues.stock || 0);
  const [hashTags, setHashTags] = useState(initialValues.hashTags || "");
  const [imageUrls, setImageUrls] = useState([]);
  const [categoryId, setCategoryId] = useState(initialValues.categoryId || null);

  useEffect(() => {
    console.log("📦 imageUrls:", imageUrls);
  }, [imageUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (isEdit) formData.append("productId", initialValues.id);

      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("hashTags", hashTags);
      formData.append("category", categoryId);

      imageUrls.forEach(file => {
        formData.append("imageUrls", file);
      });

      await onSubmit(formData); // 🔁 可重用的提交函式
      toast.success(isEdit ? "商品更新成功" : "商品上傳成功");
      onSubmitSuccess?.();
      onClose();

    } catch (err) {
      console.error("❌ 提交失敗", err);
      toast.error("提交失敗，請稍後再試");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageUrls(files);
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
    setStock(0);
    setHashTags("");
    setImageUrls([]);
    setCategoryId(null);
  };

  return (
    <motion.div
      className="fixed-mid p-4 w-120 aspect-square border z-200 bg-[#537D5D] rounded-2xl drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)]"
      animate={{
        scale: [0, 1.1, 0.9, 1],
        opacity: [0, 1],
      }}
      transition={{
        scale: { duration: 0.8, times: [0, 0.7, 0.85, 1], ease: "easeInOut" },
        opacity: { duration: 0.6 },
      }}
    >
      <form onSubmit={handleSubmit} className="w-full h-full p-3 flex flex-col justify-center items-center rounded-xl">
        <MdClose onClick={onClose} className="absolute right-3 top-3 scale-150 hover:text-red-500 cursor-pointer" />

        {/* 圖片區塊 */}
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="product-image"
            className="p-6 border rounded-full cursor-pointer hover:bg-[#9EBC8A] transition-all">
            <LuImagePlus className="scale-150" />
          </label>
          {imageUrls.length > 0 && (
            <ul className="mt-2 px-2 h-10 space-x-1 text-[#f8f7cf] overflow-y-auto border-b drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)] ">
              {imageUrls.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
          <input
            id="product-image"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            multiple
            required={!isEdit}
          />
        </div>

        {/* 資料輸入 */}
        <table className="table-auto w-full border-separate border-spacing-2 my-3">
            <tbody className="w-full">
                <tr className="align-center space--4">
                    <th className="pr-4 text-right py-2">
                        <label htmlFor="name">Name:</label>
                    </th>
                    <td className="w-full">
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[#537D5D] focus:outline-0"
                        required
                        />
                    </td>
                </tr>

                <tr className="align-center">
                    <th className="pr-4 text-right py-2">
                        <label htmlFor="price">Price:</label>
                    </th>
                    <td>
                        <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[#537D5D] focus:outline-0"
                        required
                        />
                    </td>
                </tr>

                <tr className="align-center">
                    <th className="pr-4 text-right py-2">
                        <label htmlFor="stock">Stock:</label>
                    </th>
                    <td>
                        <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[#537D5D] focus:outline-0"
                        required
                        />
                    </td>
                </tr>

                <tr className="align-center">
                    <th className="pr-4 text-right py-2">
                        <label htmlFor="hashTags">Hashtag:</label>
                    </th>
                    <td>
                        <input
                        type="text"
                        id="hashTags"
                        value={hashTags}
                        onChange={(e) => setHashTags(e.target.value)}
                        className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[#537D5D] focus:outline-0"
                        />
                    </td>
                </tr>

                <tr className="align-center">
                    <th className="pr-4 text-right py-2">
                        <label htmlFor="category">Category:</label>
                    </th>
                    <td>
                        <SelectTree
                        categories={categories}
                        subcategories={subcategories}
                        value={categoryId}
                        onChange={setCategoryId}
                        />
                    </td>
                </tr>
            </tbody>
        </table>


        {/* 送出 */}
        <button type="submit" className="border py-2 px-6 rounded-2xl
          hover:bg-[#f8f7cf] hover:text-[#537D5D] hover:border-[#9bda8b] transition-all duration-200">
          {isEdit ? "Update" : "Add to shop"}
        </button>
      </form>
    </motion.div>
  );
}

export default ProductForm;
