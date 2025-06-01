import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const MyProfile = () => {
  // Profile state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  // Address state
  const [addressName, setAddressName] = useState(""); // e.g. Home, Office
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // UI toggles
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);

  // Loading states for saving separately
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  useEffect(() => {
    const fetchProfileAndAddress = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user) {
        setUid(user.id);
        setEmail(user.email);

        // Fetch profile info
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("first_name, last_name, username")
          .eq("uid", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to fetch profile.");
        } else if (profileData) {
          setFirstName(profileData.first_name);
          setLastName(profileData.last_name);
          setUsername(profileData.username);
        }

        // Fetch address info
        const { data: addressData, error: addressError } = await supabase
          .from("addresses")
          .select("name, recipient, phone, street, barangay, city, province, postal_code")
          .eq("user_id", user.id)
          .single();

        if (addressError) {
          console.log("No address found or error fetching address:", addressError);
        } else if (addressData) {
          setAddressName(addressData.name || "");
          setRecipientName(addressData.recipient || "");
          setPhoneNumber(addressData.phone || "");
          setStreet(addressData.street || "");
          setBarangay(addressData.barangay || "");
          setCity(addressData.city || "");
          setProvince(addressData.province || "");
          setPostalCode(addressData.postal_code || "");
        }
      } else if (userError) {
        console.error("Failed to get user:", userError.message);
        toast.error("Failed to get user.");
      }
    };

    fetchProfileAndAddress();
  }, []);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
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

      toast.success("Profile updated successfully!");
      setIsProfileVisible(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Error updating profile: " + err.message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveAddress = async () => {
    setIsSavingAddress(true);
    try {
      const { error } = await supabase
        .from("addresses")
        .upsert({
          user_id: uid,
          name: addressName,
          recipient: recipientName,
          phone: phoneNumber,
          street,
          barangay,
          city,
          province,
          postal_code: postalCode,
          created_at: new Date().toISOString(),
        })
        .eq("user_id", uid);

      if (error) throw error;

      toast.success("Address updated successfully!");
      setIsAddressVisible(false);
    } catch (err) {
      console.error("Error saving address:", err);
      toast.error("Error updating address: " + err.message);
    } finally {
      setIsSavingAddress(false);
    }
  };

  return (
    <div className="profile-container p-6 bg-gray-50 min-h-screen space-y-8">
      <div className="profile-header bg-white shadow-lg rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-semibold text-[#FF7F50]">My Profile</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your account settings.</p>
      </div>

      {/* Profile Section */}
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

            <button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className={`py-2 px-6 text-white rounded-lg mt-4 transition-all duration-300 ${
                isSavingProfile
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FF7F50] hover:bg-[#0066cc]"
              }`}
            >
              {isSavingProfile ? "Updating profile..." : "Save Profile"}
            </button>
          </div>
        )}
      </div>

      {/* Address Section */}
      <div className="address-form bg-white shadow-lg rounded-xl p-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsAddressVisible(!isAddressVisible)}
        >
          <h2 className="text-2xl font-semibold text-[#FF7F50]">Edit Address</h2>
          {isAddressVisible ? (
            <FaChevronUp className="text-xl" />
          ) : (
            <FaChevronDown className="text-xl" />
          )}
        </div>

        {isAddressVisible && (
          <div className="space-y-4 mt-4">
            <div className="form-group">
              <label className="text-lg text-gray-700">Address Name (e.g. Home, Office)</label>
              <input
                type="text"
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Barangay</label>
              <input
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Province</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <div className="form-group">
              <label className="text-lg text-gray-700">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007FFF]"
              />
            </div>

            <button
              onClick={handleSaveAddress}
              disabled={isSavingAddress}
              className={`py-2 px-6 text-white rounded-lg mt-4 transition-all duration-300 ${
                isSavingAddress
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FF7F50] hover:bg-[#0066cc]"
              }`}
            >
              {isSavingAddress ? "Updating address..." : "Save Address"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
