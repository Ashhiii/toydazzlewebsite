import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user) {
        setUid(user.id);
        setEmail(user.email);

        const { data, error } = await supabase
          .from("users")
          .select("first_name, last_name, username")
          .eq("uid", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to fetch profile.");
        } else {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setUsername(data.username);
        }
      } else if (userError) {
        console.error("Failed to get user:", userError.message);
        toast.error("Failed to get user.");
      }
    };

    fetchProfile();
  }, []);

  // Handle saving profile updates
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: userSession } = await supabase.auth.getUser();
      const userId = userSession?.user?.id;

      if (userId) {
        const { error } = await supabase
          .from("users")
          .update({
            first_name: firstName,
            last_name: lastName,
            username: username,
            updated_at: new Date().toISOString(),
          })
          .eq("uid", uid);

        if (error) throw error;

        const { data: updatedUser, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("uid", uid)
          .single();

        if (fetchError) throw fetchError;

        localStorage.setItem("users", JSON.stringify(updatedUser));
        toast.success("Your profile was successfully updated!");
        setIsProfileVisible(false);
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Error updating profile: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-container p-6 bg-gray-50 min-h-screen space-y-8">
      <div className="profile-header bg-white shadow-lg rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-semibold text-[#FF7F50]">My Profile</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your account settings.</p>
      </div>

      <div className="profile-form bg-white shadow-lg rounded-xl p-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsProfileVisible(!isProfileVisible)}
        >
          <h2 className="text-2xl font-semibold text-[#FF7F50]">Edit Profile</h2>
          {isProfileVisible ? (
            <FaChevronUp className="text-xl" />
          ) : (
            <FaChevronDown className="text-xl" />
          )}
        </div>

        {isProfileVisible && (
          <div className="space-y-4 mt-4">
            <div className="form-group">
              <label className="text-lg text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>
            <div className="form-group">
              <label className="text-lg text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>
            <div className="form-group">
              <label className="text-lg text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`py-2 px-6 text-white rounded-lg mt-8 transition-all duration-300 ${
          isSaving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#FF7F50] hover:bg-[#0066cc]"
        }`}
      >
        {isSaving ? "Updating profile..." : "Save Changes"}
      </button>
    </div>
  );
};

export default MyProfile;
