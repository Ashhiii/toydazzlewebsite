import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdCheck } from "react-icons/md";
import { supabase } from "../../supabaseClient";  // Make sure to import the Supabase client
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Aside from "../../components/Aside";

const PurchasedHistory = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [showSingleDeleteModal, setShowSingleDeleteModal] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState(null);

  // Fetch purchase history from Supabase
  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
      .from("orders")
      .select(`
        id, 
        status, 
        mode_of_payment, 
        created_at, 
        total_price, 
        order_items (
          quantity, 
          price, 
          product_id,
          products (
            name,
            image_url
          )
        )
      `)
      .order("created_at", { ascending: false });
    

      if (error) {
        throw error;
      }

      setPurchases(data);
    } catch (error) {
      toast.error("Failed to fetch purchase history.");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Delete purchase (or order)
  const handleDelete = async (id) => {
    setActionInProgress(true);
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Purchase deleted.");
      fetchPurchases();
    } catch (error) {
      toast.error("Failed to delete purchase.");
    }
    setActionInProgress(false);
  };

  useEffect(() => {
    document.body.style.overflow =
      showSingleDeleteModal || showConfirmModal ? "hidden" : "auto";
  }, [showSingleDeleteModal, showConfirmModal]);

  return (
    <div className="flex min-h-screen bg-[#FFF7F0] font-sans">
      {showConfirmModal && (
        <div className="transition-opacity duration-300 ease-in-out fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Delete All Purchases
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete all purchases? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDeleteAll();
                  setShowConfirmModal(false);
                }}
                disabled={actionInProgress}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {showSingleDeleteModal && purchaseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Delete Purchase
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the purchase{" "}
              <strong>{purchaseToDelete.id}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSingleDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleDelete(purchaseToDelete.id);
                  setShowSingleDeleteModal(false);
                  setPurchaseToDelete(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={actionInProgress}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Aside />

      <main className="flex-1 ml-72 p-10">
        <h2 className="text-3xl font-bold text-[#F59E0B] mb-6">
          Purchase History
        </h2>

        {loading ? (
          <div className="mt-16">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#F59E0B] text-white">
                <tr>
                  <th className="text-left px-4 py-3">Order ID</th>
                  <th className="text-left px-4 py-3">Product</th>
                  <th className="text-left px-4 py-3">Quantity</th>
                  <th className="text-left px-4 py-3">Price</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Date Created</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
  {purchases.map((purchase) =>
    purchase.order_items.map((item, index) => (
      <tr key={`${purchase.id}-${index}`} className="border-b">
        <td className="px-4 py-3">{purchase.id}</td>
        <td className="px-4 py-3 flex items-center gap-4">
          <img
            src={item.products.image_url}
            alt={item.products.name}
            className="w-16 h-16 object-cover rounded"
          />
          <span>{item.products.name}</span>
        </td>
        <td className="px-4 py-3">{item.quantity}</td>
        <td className="px-4 py-3">₱{item.price.toFixed(2)}</td>
        <td className="px-4 py-3">₱{(item.price * item.quantity).toFixed(2)}</td>
        <td className="px-4 py-3">
          {new Date(purchase.created_at).toLocaleString()}
        </td>
        <td className="px-4 py-3">
          <select
            value={purchase.status}
            onChange={async (e) => {
              const newStatus = e.target.value;
              const { error } = await supabase
                .from("orders")
                .update({ status: newStatus })
                .eq("id", purchase.id);

              if (error) {
                toast.error("Failed to update status.");
              } else {
                toast.success("Status updated.");
                fetchPurchases();
              }
            }}
            className="border p-2 rounded bg-white"
          >
            <option value="To Pay">To Pay</option>
            <option value="To Ship">To Ship</option>
            <option value="To Ship">To Receive</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => {
              setPurchaseToDelete(purchase);
              setShowSingleDeleteModal(true);
            }}
            className="text-red-600 border p-2 border-red-300 rounded-md hover:bg-red-100 transition-all ease-in-out hover:text-red-800"
            title="Delete"
            disabled={actionInProgress}
          >
            <MdDelete size={20} />
          </button>
        </td>
      </tr>
    ))
  )}
  {purchases.length === 0 && !loading && (
    <tr>
      <td colSpan="8" className="text-center py-6 text-gray-500">
        No purchases found.
      </td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PurchasedHistory;
