import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RiImageEditFill } from "react-icons/ri";
import { MdAddCard } from "react-icons/md";

/** Utilities kept local to this layout */
const BANK_OPTIONS = [
  { value: "", label: "Bank code" },
  { value: "004", label: "004 - 台灣銀行" },
  { value: "005", label: "005 - 土地銀行" },
  { value: "700", label: "700 - 中華郵政" },
];

const maskEmail = (email = "") => {
  const at = email.indexOf("@");
  if (at <= 0) return email;
  const head = Math.min(3, at);
  const left = email.slice(0, head);
  return `${left}${"*".repeat(Math.max(at - head, 0))}${email.slice(at)}`;
};

const maskPhone = (phone = "") => {
  if (phone.length <= 3) return phone;
  return `${"*".repeat(Math.max(phone.length - 3, 0))}${phone.slice(-3)}`;
};

/** Layout-only component: local edit/UI state; uses callbacks from parent for side effects */
function Profile({ profile, onUpdateInfo, onUpdateAvatar }) {
  const [isEdited, setIsEdited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // local editable fields
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");
  const [address, setAddress] = useState(profile.address || "");

  // payout modal
  const [isFormShow, setIsFormShow] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const maskedEmail = maskEmail(email);
  const maskedPhone = maskPhone(phone);

  const submitProfile = (e) => {
    e.preventDefault();
    if (!isEdited) {
      setIsEdited(true);
      return;
    }
    onUpdateInfo?.({ email, phone, address });
    setIsEdited(false);
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpdateAvatar?.(file);
  };

  const submitBank = (e) => {
    e.preventDefault();
    setIsFormShow(false);
  };

  return (
  <div className="bg-[var(--secondary-color)] sticky top-1/4 w-full py-15 flex justify-center items-center">
      {/* start title */}
      <div className="absolute w-full h-10 left-0 top-0 z-500">
        <svg width="100%" height="40" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="2.8%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
          <line x1="13.4%" y1="0" x2="100%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
        </svg>
        <div className="absolute px-3 left-5 -top-5 text-4xl text-[#f5f49f] font-bold drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
          Profile
        </div>
      </div>
      {/* end title */}

      <div className="w-4/5 flex justify-center items-center">
        {/* start Left: profile form */}
        <form onSubmit={submitProfile} className="w-full">
          <table className="table-auto w-full">
            <tbody>
              {/* Username */}
              <tr>
                <td className="pb-8">
                  <label>Username</label>
                </td>
                <td className="pb-8">
                  <div>{profile.username}</div>
                </td>
              </tr>

              {/* Email */}
              <tr>
                <td className="pb-8">
                  <label htmlFor="email">Email</label>
                </td>
                <td className="pb-8">
                  <span className="mr-2">
                    {!isEdited ? (
                      maskedEmail
                    ) : (
                      <input
                        id="email"
                        type="email"
                        className="border rounded-md pl-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </span>
                </td>
              </tr>

              {/* Phone */}
              <tr>
                <td className="pb-8">
                  <label htmlFor="phone">Phone Number</label>
                </td>
                <td className="pb-8">
                  <span className="mr-2">
                    {!isEdited ? (
                      maskedPhone
                    ) : (
                      <input
                        id="phone"
                        type="tel"
                        className="border rounded-md pl-1"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    )}
                  </span>
                </td>
              </tr>

              {/* Address */}
              <tr>
                <td className="pb-8">
                  <label htmlFor="address">Address</label>
                </td>
                <td className="pb-8">
                  <span className="mr-2">
                    {!isEdited ? (
                      profile.address
                    ) : (
                      <input
                        id="address"
                        type="text"
                        className="border rounded-md pl-1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    )}
                  </span>
                </td>
              </tr>

              {/* Submit */}
              <tr>
                <td />
                <td>
                  <div>
                    <button type="submit" className="border px-5 py-2 rounded">
                      {isEdited ? "Save" : "Edit"}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {/* end Left: profile form */}

        {/* start Right: avatar & payout */}
        <div className="w-1/3 flex flex-col justify-center items-center border-l-2 border-gray-300 py-10">
          {/* Avatar */}
          <form className="w-full flex justify-center items-center mb-10">
            <div
              className="rounded-full relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {profile.avatarUrl ? (
                <div
                  className="bg-cover-set w-30 border aspect-square rounded-full"
                  style={{ backgroundImage: `url(${profile.avatarUrl})` }}
                />
              ) : (
                <Space size={16}>
                  <Avatar size={120} icon={<UserOutlined />} />
                </Space>
              )}

              <motion.label
                htmlFor="file-input"
                className="absolute-mid w-full bg-[#f1f0c7]/30 aspect-square rounded-full border flex justify-center items-center cursor-pointer z-50"
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                title="Change avatar"
              >
                <RiImageEditFill className="scale-175" />
              </motion.label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarFile}
              />
            </div>
          </form>

          {/* Open payout modal */}
          <button
            onClick={() => setIsFormShow(true)}
            className="border p-3 rounded-full hover:bg-[var(--tertiary-color)] hover:border-white hover:text-[var(--primary-color)] transition-all duration-250"
            aria-haspopup="dialog"
            aria-expanded={isFormShow}
          >
            <MdAddCard className="scale-125" />
          </button>

          {/* Backdrop */}
          {isFormShow && (
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsFormShow(false)}
              aria-hidden="true"
            />
          )}

          {/* Payout modal */}
          <motion.form
            onSubmit={submitBank}
            className="fixed-mid w-120 aspect-[2/1] border bg-[#f1f0c7] text-[var(--primary-color)] p-8 z-50 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isFormShow ? 1 : 0, opacity: isFormShow ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label="Payout Account"
          >
            <div className="mb-5 text-lg">Payout Account</div>

            <select
              name="bankCode"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="w-1/2 border px-3 py-2 rounded-md mb-5"
            >
              {BANK_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-5"
            />

            <input
              type="text"
              placeholder="Account name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-10"
            />

            <div className="w-full flex justify-center gap-rwd">
              <button
                type="submit"
                className="border w-20 text-[var(--secondary-color)] hover:bg-[var(--primary-color)] hover:text-[#f1f0c7] px-4 py-2 rounded-md transition-all duration-200"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsFormShow(false)}
                className="border w-20 text-[var(--secondary-color)] hover:bg-[#BE5B50] hover:text-[#f1f0c7] px-4 py-2 rounded-md transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
        {/* end Right: avatar & payout */}
      </div>
    </div>
  );
}

export default Profile;
