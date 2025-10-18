import { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import SelectTree from "./SelectTree";
import { toast } from "react-toastify";

// compress images
import { compressImage } from "../../../utils/compressImage";

function ShopEdit({
  isEdit,
  initialValues = {},
  onClose,
  onSubmitSuccess,
  categories,
  subcategories,
  onSubmit,
}) {
  // useState
  const [name, setName] = useState(initialValues.name || "");
  const [price, setPrice] = useState(initialValues.price || 0);
  const [stock, setStock] = useState(initialValues.stock || 0);
  const [hashTags, setHashTags] = useState(initialValues.hashTags || "");
  const [imageUrls, setImageUrls] = useState([]);
  const [categoryId, setCategoryId] = useState(
    initialValues.categoryId || null
  );

  //  handlers
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = await Promise.all(
      files.map((file) => compressImage(file, 0.6, 800))
    );
    setImageUrls(compressedFiles);
  };

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

      imageUrls.forEach((file) => {
        formData.append("images", file);
      });

      await onSubmit(formData);
      toast.success(isEdit ? "商品更新成功" : "商品上傳成功");
      onSubmitSuccess?.();
      onClose();
    } catch (err) {
      console.error("提交失敗", err);
      toast.error("提交失敗，請稍後再試");
    }
  };

  return (
    <motion.div
  className="fixed-mid p-4 w-120 aspect-square border z-200 bg-[var(--primary-color)] rounded-2xl drop-shadow-[3px_3px_3px_rgba(0,0,0,0.8)]"
      animate={{
        scale: [0, 1.1, 0.9, 1],
        opacity: [0, 1],
      }}
      transition={{
        scale: { duration: 0.8, times: [0, 0.7, 0.85, 1], ease: "easeInOut" },
        opacity: { duration: 0.6 },
      }}
    >
      {/* start form */}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full p-3 flex flex-col justify-center items-center rounded-xl"
      >
        <MdClose
          onClick={onClose}
          className="absolute right-3 top-3 scale-150 hover:text-red-500 cursor-pointer"
        />
        {/* start img input */}
        <div className="flex flex-col justify-center items-center">
          <label
            className="p-6 border rounded-full cursor-pointer hover:bg-[var(--tertiary-color)] transition-all"
            htmlFor="product-image"
          >
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
            className="hidden"
            id="product-image"
            type="file"
            onChange={handleImageChange}
            multiple
            required={!isEdit}
          />
        </div>
        {/* end img input */}

        {/* start info input */}
        <table className="table-auto w-full border-separate border-spacing-2 my-3">
          <tbody className="w-full">
            <tr className="align-center space--4">
              <th className="pr-4 text-right py-2">
                <label htmlFor="name">Name:</label>
              </th>
              <td className="w-full">
                <input
                  className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[var(--primary-color)] focus:outline-0"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[var(--primary-color)] focus:outline-0"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[var(--primary-color)] focus:outline-0"
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
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
                  className="w-full border rounded-sm pl-2 py-1 focus:bg-[#f8f7cf] focus:text-[var(--primary-color)] focus:outline-0"
                  type="text"
                  id="hashTags"
                  value={hashTags}
                  onChange={(e) => setHashTags(e.target.value)}
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
        {/* end info input */}

        {/* start submit btn */}
        <button
          type="submit"
          className="border py-2 px-6 rounded-2xl
  hover:bg-[#f8f7cf] hover:text-[var(--primary-color)] hover:border-[#9bda8b] transition-all duration-200"
        >
          {isEdit ? "Update" : "Add to shop"}
        </button>
        {/* end submit btn */}
      </form>
      {/* end form */}
    </motion.div>
  );
}

export default ShopEdit;
