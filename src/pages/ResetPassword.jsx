import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    const checkTokens = async () => {
      let params = new URLSearchParams(window.location.search);
      if (!params.has("access_token")) {
        params = new URLSearchParams(window.location.hash.substring(1));
      }

      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type = params.get("type");

      if (accessToken && refreshToken && type === "recovery") {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          toast.error("Session expired or invalid.");
          setTokenValid(false);
        } else {
          setTokenValid(true);
          window.history.replaceState({}, document.title, "/reset-password");
        }
      } else {
        setTokenValid(false);
      }
    };

    checkTokens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully.");
      setTimeout(() => (window.location.href = "/login"), 2000);
    }
  };

  if (tokenValid === null) return <p className="text-center mt-10">Validating...</p>;
  if (tokenValid === false)
    return <div className="text-center mt-20">Invalid or expired reset link.</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Reset Your Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded-md"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">
        Update Password
      </button>
    </form>
  );
};

export default ResetPassword;
