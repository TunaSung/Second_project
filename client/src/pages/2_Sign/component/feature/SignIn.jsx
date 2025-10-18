import { useState, useCallback } from "react";
import { useAuth } from "../../../../components/Context/authContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { signIn } from "../../../../services/authService";
import FloatingField from "../UI/FloatingField";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { toast } from "react-toastify";

function SignIn({ isShowed = true }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // unified change handler
  const onChange = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );

  // normalize/pretty error
  const getErrMsg = (err) =>
    err?.response?.data?.message || err?.message || "Login failed";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // guard against double submit

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn(email, password);
      if (!res?.token) {
        throw new Error("Missing auth token");
      }
      login(res.token);
      toast.success("Login successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(getErrMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading;

  return (
    <motion.form
      id="signin-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: isShowed ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full h-full flex items-center justify-center"
      aria-label="Sign in form"
      aria-hidden={isShowed ? "false" : "true"}
    >
      {/* sr-only heading for screen readers */}
      <h2 className="sr-only">Sign in to your account</h2>

      <div className="w-3/7 h-2/3 p-3 border rounded-3xl bg-white flex items-center justify-center">
        <fieldset
          className="w-full h-full pt-7 rounded-2xl flex flex-col items-center gap-5"
          disabled={disabled}
          aria-busy={disabled ? "true" : "false"}
        >
          {/* Branding / illustration (placeholder) */}
          <div className="w-3/5 h-20 border mb-10 flex items-center justify-center text-3xl font-bold" aria-hidden="true">Logo</div>

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
            autoComplete="current-password"
            minLength={6}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={disabled}
            className="rounded-lg mb-5 mt-3 bg-black/60 py-3 w-3/4 text-[#ccc] hover:text-white hover:bg-black/40 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {disabled ? "Signing in..." : "Sign In"}
          </button>

          {/* Forgot password */}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-black text-sm hover:underline hover:text-red-800"
          >
            Forgot password?
          </button>
        </fieldset>
      </div>
    </motion.form>
  );
}

export default SignIn;
