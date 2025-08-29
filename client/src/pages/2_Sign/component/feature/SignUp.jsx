import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import { signUp } from "../../../../services/authService";
import FloatingField from "../UI/FloatingField";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from "react-icons/md";
import { toast } from "react-toastify";

const INITIAL_FORM = {
  username: "",
  phone: "",
  email: "",
  password: "",
  confirm: "",
};

function SignUp({ isShowed = true, toggleSignChange }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const onChange = useCallback(
    (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value })),
    []
  );

  const getErrMsg = (err) =>
    err?.response?.data?.message || err?.message || "Sign up failed";

  // keep leading +, strip other non-digits/spaces/brackets
  const normalizePhone = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    const hasPlus = trimmed.startsWith("+");
    const digits = trimmed.replace(/[^\d]/g, "");
    return hasPlus ? `+${digits}` : digits;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const payload = {
      username: form.username.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      confirm: form.confirm,
    };

    if (!payload.username || !payload.phone || !payload.email || !payload.password || !payload.confirm) {
      toast.error("All fields are required");
      return;
    }
    if (payload.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (payload.password !== payload.confirm) {
      toast.warn("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signUp(payload.username, payload.phone, payload.email, payload.password);
      toast.success("Sign up successfully");
      setForm(INITIAL_FORM);
      toggleSignChange?.(); // switch to Sign In panel
    } catch (err) {
      console.error("🚨 註冊失敗", err);
      toast.error(getErrMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: isShowed ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
      aria-label="Sign up form"
      aria-hidden={isShowed ? "false" : "true"}
      noValidate
    >
      <h2 className="sr-only">Create your account</h2>

      <div className="border h-2/3 w-3/7 p-3 rounded-3xl flex items-center justify-center bg-white">
        <fieldset
          className="flex w-full h-full rounded-2xl flex-col items-center pt-6 gap-5"
          disabled={disabled}
          aria-busy={disabled ? "true" : "false"}
        >
          {/* Username */}
          <FloatingField
            icon={MdOutlineDriveFileRenameOutline}
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
            required
          />

          {/* Phone */}
          <FloatingField
            icon={MdOutlinePhone}
            label="Phone number"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            autoComplete="tel"
            inputMode="tel"
            pattern="^[+]?[\d\s()-]{8,20}$"
            title="Please enter a valid phone number"
            aria-describedby="phone-help"
            required
          />
          <p id="phone-help" className="sr-only">
            Phone number may include leading plus sign and digits.
          </p>

          {/* Email */}
          <FloatingField
            icon={IoPersonOutline}
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
            required
          />

          {/* Password */}
          <FloatingField
            icon={TbLockPassword}
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
            minLength={6}
            aria-describedby="pwd-help"
            required
          />

          {/* Confirm */}
          <FloatingField
            icon={RiLockPasswordFill}
            label="Confirm password"
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            autoComplete="new-password"
            minLength={6}
            aria-describedby="pwd-help"
            required
          />
          <p id="pwd-help" className="sr-only">
            Use at least 6 characters. Confirmation must match password.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={disabled}
            className="rounded-lg mt-1 mb-3 bg-black/60 py-3 w-3/4 text-[#ccc] hover:text-white hover:bg黑/40 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {disabled ? "Signing up..." : "Sign Up"}
          </button>
        </fieldset>
      </div>
    </motion.form>
  );
}

export default SignUp;
