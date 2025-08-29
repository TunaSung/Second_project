import { useState, useEffect } from "react";
import { useAuth } from "../../components/Context/authContext";
import { toast } from "react-toastify";
import "aos/dist/aos.css";

// utils
import { compressImage } from "../../utils/compressImage";

// API
import { userInfo, updateInfo, updateAvatar } from "../../services/authService";
import { getHistory } from "../../services/productService";

// layout components
import ProfileSection from "./component/layout/Profile";
import HistorySection from "./component/layout/History";

function Personal() {
  /** ---------- Auth context ---------- */
  const { setAvatarUrl } = useAuth();

  /** ---------- Profile state ---------- */
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  /** ---------- Orders state ---------- */
  const [completedOrder, setCompletedOrder] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  /** ---------- Fetch user profile ---------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await userInfo();
        setProfile(user);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  /** ---------- Fetch order history ---------- */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getHistory();
        setCompletedOrder(order?.completedOrder || []);
        setPendingOrder(order?.pendingOrder || []);
      } catch {
        toast.error("Failed to load order history");
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrder();
  }, []);

  /** ---------- Handlers passed to children ---------- */
  const handleUpdateAvatar = async (file) => {
    if (!file) return;
    try {
      const compressedFile = await compressImage(file, 0.3, 500);
      const formData = new FormData();
      formData.append("avatar", compressedFile);

      const { avatarUrl } = await updateAvatar(formData);
      setProfile((prev) => (prev ? { ...prev, avatarUrl } : prev));
      setAvatarUrl(avatarUrl);
      toast.success("頭像更改成功");
    } catch (err) {
      console.error("頭像更新失敗", err);
      toast.error("頭像更新失敗");
    }
  };

  const handleUpdateInfo = async ({ email, phone, address }) => {
    if (!profile) return;
    try {
      await updateInfo(profile.username, phone, email, address);
      setProfile((prev) => (prev ? { ...prev, email, phone, address } : prev));
      toast.success("使用者資料更新成功");
    } catch (err) {
      console.error("使用者資料更新失敗", err);
      toast.error("使用者資料更新失敗");
    }
  };

  /** ---------- Early loading guard for profile ---------- */
  if (loadingProfile || !profile) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center my-25">
        <l-dot-stream size="60" speed="2.5" color="black"></l-dot-stream>
      </div>
    );
  }

  /** ---------- Render ---------- */
  return (
    <div className="bg-[#9EBC8A] text-[#f1f0c7] pb-30">
      <div className="container-mid">
        <ProfileSection
          profile={profile}
          onUpdateInfo={handleUpdateInfo}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <HistorySection
          completedOrder={completedOrder}
          pendingOrder={pendingOrder}
          loading={loadingOrders}
        />
      </div>
    </div>
  );
}

export default Personal;
