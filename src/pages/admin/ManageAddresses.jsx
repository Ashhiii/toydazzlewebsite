import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import Aside from "../../components/Aside";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAllAddresses();
  }, []);

  const fetchAllAddresses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error.message);
    } else {
      setAddresses(data);
    }
    setLoading(false);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="flex min-h-screen bg-[#FFF7F0] font-sans">
      <Aside />

      <main className="flex-1 ml-72 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-1 text-[#D97706]">
          Manage Addresses
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-600">No addresses found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm w-full">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-[#FFB347] text-white select-none">
                <tr>
                  {[
                    "Recipient",
                    "Phone",
                    "Street",
                    "Barangay",
                    "City",
                    "Province",
                    "Postal Code",
                    "Default",
                  ].map((title) => (
                    <th
                      key={title}
                      className={`py-3 px-4 text-base font-semibold uppercase tracking-wide ${
                        title === "Default" ? "text-center" : "text-left"
                      }`}
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {addresses.map((addr) => (
                  <tr
                    key={addr.id}
                    onClick={() => handleSelect(addr.id)}
                    className={`cursor-pointer transition ${
                      selectedId === addr.id
                        ? "bg-yellow-100"
                        : "hover:bg-yellow-50"
                    }`}
                  >
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-800 font-medium text-left">
                      {addr.recipient}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 text-left">
                      {addr.phone}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 truncate max-w-xs text-left">
                      {addr.street}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 truncate max-w-xs text-left">
                      {addr.barangay}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 text-left">
                      {addr.city}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 text-left">
                      {addr.province}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-gray-700 text-left">
                      {addr.postal_code}
                    </td>
                    <td className="py-3 px-4 text-base whitespace-nowrap text-center">
                      {addr.is_default ? (
                        <span className="text-red-600 font-semibold">Yes</span>
                      ) : (
                        "No"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageAddresses;
