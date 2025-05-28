import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete, MdCheck } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { supabase } from "../../supabaseClient"; // Import your supabase client
import Aside from "../../../src/components/Aside.jsx";
import Loader from "../../components/Loader.jsx";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    role: "user",
  });
  

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    setActionInProgress(true);
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      toast.success("User deleted.");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error(error);
    }
    setActionInProgress(false);
  };

  // Handle save edited user
  const handleEditSave = async () => {
    const { first_name, last_name, username, role } = editUser;

    if (!first_name || !last_name || !username || !role) {
      toast.error("All fields are required.");
      return;
    }
    
    setActionInProgress(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({ first_name, last_name, username, role }) // ✅ snake_case
        .eq("id", editId);
    
      if (error) throw error;
    
      toast.success("User updated.");
      setEditId(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user.");
      console.error(error);
    }
    setActionInProgress(false);
  }    

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FFF7F0] font-sans">
      <Aside />
      <main className="flex-1 ml-72 p-10">
        <h2 className="text-3xl font-bold text-[#F59E0B] mb-6">
          User Management
        </h2>

        <input
          type="text"
          placeholder="Search by first or last name..."
          className="border px-4 mb-6 py-2 w-full max-w-sm rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Users Table */}
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#F59E0B] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">First Name</th>
                  <th className="px-4 py-3 text-left">Last Name</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <input
                          type="text"
                          value={editUser.first_name || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              first_name: e.target.value,
                            })
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleEditSave()
                          }
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        user.first_name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <input
                          type="text"
                          value={editUser.last_name || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              lastName: e.target.value,
                            })
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleEditSave()
                          }
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        user.last_name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <input
                          type="text"
                          value={editUser.last_name || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              username: e.target.value,
                            })
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleEditSave()
                          }
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editId === user.id ? (
                        <select
                          value={editUser.role}
                          onChange={(e) =>
                            setEditUser({ ...editUser, role: e.target.value })
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-sm font-semibold ${
                            user.role === "admin"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2 items-center">
                      {editId === user.id ? (
                        <button
                          onClick={handleEditSave}
                          disabled={actionInProgress}
                          className="text-green-600 p-2 border rounded hover:bg-green-100"
                        >
                          <MdCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditId(user.id);
                            setEditUser({
                              first_name: user.first_name,
                              last_name: user.last_name,
                              username: user.username,
                              role: user.role,
                            });                            
                          }}
                          className="text-blue-600 p-2 border rounded hover:bg-blue-100"
                        >
                          <FiEdit />
                        </button>
                      )}
                      {user.role === "admin" ? (
                        <span
                          className="text-gray-400 p-2 border rounded cursor-not-allowed"
                          title="Admin user cannot be deleted"
                        >
                          <MdDelete />
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setDeleteTargetId(user.id);
                            setShowConfirmModal(true);
                          }}
                          className="text-red-600 p-2 border rounded hover:bg-red-100"
                          disabled={actionInProgress}
                        >
                          <MdDelete />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 mb-6">
                {deleteTargetId
                  ? "Are you sure you want to delete this user?"
                  : "Are you sure you want to delete all users?"}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => {
                    setShowConfirmModal(false);
                    setDeleteTargetId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={async () => {
                    setShowConfirmModal(false);
                    if (deleteTargetId) {
                      await handleDelete(deleteTargetId);
                      setDeleteTargetId(null);
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagement;
