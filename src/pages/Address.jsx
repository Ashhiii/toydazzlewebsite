import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";

const AddressPage = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("users");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      fetchAddresses(parsed.uid);
    }
  }, []);

  const fetchAddresses = async (uid) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch addresses");
      console.error(error.message);
    } else {
      setAddresses(data);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this address?");
    if (!confirm) return;

    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete address");
    } else {
      toast.success("Address deleted");
      setAddresses(addresses.filter((address) => address.id !== id));
    }
  };
  const handleEdit = (address) => {
    navigate("/profile", { state: { editAddress: address } });
  };
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Saved Addresses</h2>

      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border p-4 rounded shadow-sm bg-white relative"
            >
              <p><strong>Address:</strong> {address.name}</p>
              <p><strong>Recipient:</strong> {address.recipient}</p>
              <p><strong>Phone:</strong> {address.phone}</p>
              <p><strong>Street:</strong> {address.street}</p>
              <p><strong>Barangay:</strong> {address.barangay}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Province:</strong> {address.province}</p>
              <p><strong>Postal Code:</strong> {address.postal_code}</p>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleEdit(address.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
