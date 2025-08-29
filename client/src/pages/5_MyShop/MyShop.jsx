import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../components/Context/authContext";

// API Services
import { uploadProduct, getMyShop } from "../../services/productService";

// UI
import ShopItem from "./component/ShopItem";
import { FaPlus } from "react-icons/fa";
import ShopEdit from "./component/ShopEdit";

// labels
const TO_DO_LIST_LABELS = [
  "To-Process Shipment",
  "Processed Shipment",
  "Return/Refund/Cancel",
  "Banned / Deboosted Products",
];
const STATUS_COLUMNS = ["Price", "Sale", "Stock", "Hashtag"];

function MyShop() {
  // auth data for form selects
  const { categories, subcategories } = useAuth();

  // data state
  const [items, setItems] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // fetch items
  const refreshItems = useCallback(async () => {
    try {
      setLoading(true);
      setErrMsg("");
      const myShop = await getMyShop();
      setItems(Array.isArray(myShop) ? myShop : []);
    } catch (err) {
      console.error("資料匯入失敗", err);
      setErrMsg(err?.response?.data?.message || err?.message || "資料匯入失敗");
      toast.error("資料匯入失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  const openCreate = () => setIsAddProductOpen(true);
  const closeCreate = () => setIsAddProductOpen(false);
  const handleCreateSuccess = () => {
    closeCreate();
    refreshItems();
  };

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <main className="pt-30 bg-[#9EBC8A] text-[#f8f7cf]" aria-labelledby="page-title">
      {/* modal: add product */}
      {isAddProductOpen && (
        <ShopEdit
          isEdit={false}
          onClose={closeCreate}
          onSubmit={uploadProduct}
          onSubmitSuccess={handleCreateSuccess}
          categories={categories}
          subcategories={subcategories}
        />
      )}

      {/* page header */}
      <header className="border-b p-4 flex justify-self-center">
        <h1 id="page-title" className="text-5xl font-bold indie-flower-regular">
          My Shop
        </h1>
      </header>

      {/* to-do list */}
      <section
        className="container-mid mt-20"
        aria-labelledby="todo-heading"
      >
        <div className="w-full border p-5 bg-[#73946B]">
          <h2 id="todo-heading" className="text-xl font-bold mb-1">
            To Do List
          </h2>

          <ul
            className="w-full h-20 grid grid-cols-4 gap-5"
            role="list"
            aria-label="Seller tasks overview"
          >
            {TO_DO_LIST_LABELS.map((label) => (
              <li key={label} role="listitem">
                <button
                  type="button"
                  className="w-full h-full rounded-2xl hover:bg-[#9EBC8A] transition-colors duration-250 text-left p-3"
                  aria-label={`${label}, 0 items`}
                >
                  <p className="font-bold text-xl text-white mb-1" aria-live="polite">0</p>
                  <p className="text-xs">{label}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* products section */}
      <section
        id="products"
        aria-labelledby="products-heading"
        className="container-mid flex justify-center items-center pb-15 flex-col max-md:text-sm"
      >
        <div className="sr-only" id="products-desc">
          Manage your product list, including price, sale status, stock and hashtags.
        </div>

        {/* column header row (acts like a table header) */}
        <div
          role="row"
          aria-describedby="products-desc"
          className="border w-full pl-10 py-4 mt-4 grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr]"
        >
          <h2 id="products-heading" className="text-start" role="columnheader">
            Status
          </h2>

          {STATUS_COLUMNS.map((label) => (
            <span key={label} className="text-center" role="columnheader">
              {label}
            </span>
          ))}

          <div className="flex justify-center items-center justify-self-center w-1/3">
            <button
              type="button"
              onClick={openCreate}
              className="flex justify-center items-center hover:text-[#537D5D]"
              aria-label="Add product"
              title="Add product"
            >
              <FaPlus aria-hidden="true" />
              <span className="sr-only">Add product</span>
            </button>
          </div>
        </div>

        {/* list body */}
        <div
          role="list"
          aria-busy={loading ? "true" : "false"}
          aria-live="polite"
          className="w-full"
        >
          {loading ? (
            <div className="w-full h-60 flex justify-center items-center">
              <l-dot-stream size="60" speed="2.4" color="black"></l-dot-stream>
              <span className="sr-only">Loading products…</span>
            </div>
          ) : errMsg ? (
            <div className="w-full h-60 flex flex-col items-center justify-center" role="alert">
              <p className="text-red-100 mb-3">Failed to load: {errMsg}</p>
              <button
                type="button"
                onClick={refreshItems}
                className="border px-4 py-2 rounded hover:bg-[#73946B] hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          ) : hasItems ? (
            items.map((item) => (
              <article key={item.id} role="listitem" aria-label={item.name}>
                <ShopItem
                  productId={item.id}
                  itemName={item.name}
                  itemPrice={item.price}
                  itemStock={item.stock}
                  itemHashTags={item.hashTags}
                  itemImageUrls={item.imageUrls}
                  itemCategoryId={item.categoryId}
                  sale={item.sale}
                  available={item.isAvailable}
                  setItems={setItems}
                  categories={categories}
                  subcategories={subcategories}
                />
              </article>
            ))
          ) : (
            <div className="w-full h-60 flex items-center justify-center text-2xl">
              No products yet. Click&nbsp;
              <FaPlus className="inline-block mx-1" aria-hidden="true" />
              to add one.
            </div>
          )}
        </div>

        {/* footer/helper row (kept for layout symmetry) */}
        <footer
          className="border w-full pl-10 pr-3 py-1 mt-5 flex justify-between"
          aria-hidden="true"
        >
          <div className="flex items-center py-3">
            <h3 className="text-start">Status</h3>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default MyShop;
