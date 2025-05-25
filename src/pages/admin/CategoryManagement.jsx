import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { supabase } from "../../supabaseClient";  // Make sure to import the Supabase client
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Aside from "../../components/Aside";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [showSingleDeleteModal, setShowSingleDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    setActionInProgress(true);
    try {
      const { error } = await supabase
        .from("categories")
        .insert([{ name: newCategory.trim(), created_at: new Date() }]);

      if (error) {
        throw error;
      }

      setNewCategory("");
      toast.success("Category added successfully.");
      fetchCategories();
      navigate("/");
    } catch (error) {
      toast.error("Failed to add category.");
    }
    setActionInProgress(false);
  };

  // Delete category
  const handleDelete = async (id) => {
    setActionInProgress(true);
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Category deleted.");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category.");
    }
    setActionInProgress(false);
  };

  // Start editing category
  const startEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  // Save edited category
  const handleEditSave = async () => {
    if (!editValue.trim()) {
      toast.error("Category name cannot be empty.");
      return;
    }

    setActionInProgress(true);
    try {
      const { error } = await supabase
        .from("categories")
        .update({ name: editValue })
        .eq("id", editId);

      if (error) {
        throw error;
      }

      setEditId(null);
      setEditValue("");
      toast.success("Category updated.");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category.");
    }
    setActionInProgress(false);
  };

  // Delete all categories
  const handleDeleteAll = async () => {
    setActionInProgress(true);
    try {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        throw error;
      }

      if (data.length === 0) {
        toast.info("There are no categories to delete.");
        setActionInProgress(false);
        setShowConfirmModal(false);
        return;
      }

      const deletePromises = data.map((category) =>
        supabase.from("categories").delete().eq("id", category.id)
      );

      await Promise.all(deletePromises);
      toast.success("All categories deleted.");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete all categories.");
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
              Delete All Categories
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete all categories? This action cannot
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

      {showSingleDeleteModal && categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Delete Category
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the category{" "}
              <strong>{categoryToDelete.name}</strong>? This action cannot be
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
                  await handleDelete(categoryToDelete.id);
                  setShowSingleDeleteModal(false);
                  setCategoryToDelete(null);
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
          Category Management
        </h2>

        <div className="flex gap-2 mb-6 justify-between">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCategory}
              disabled={actionInProgress}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddCategory();
                }
              }}
              placeholder="New category name"
              className="border border-gray-300 px-3 py-2 rounded-md w-full max-w-sm"
            />
            <button
              onClick={handleAddCategory}
              className="bg-[#F59E0B] text-white px-4 py-2 rounded-md hover:bg-[#d97706]"
            >
              Add
            </button>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Delete All
          </button>
        </div>

        {loading ? (
          <div className="mt-16">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#F59E0B] text-white">
                <tr>
                  <th className="text-left px-4 py-3">Category Name</th>
                  <th className="text-left px-4 py-3">Date Created</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b">
                    <td className="px-4 py-3">
                      {editId === cat.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditSave();
                            }
                          }}
                          disabled={actionInProgress}
                          className="border border-gray-300 px-2 py-1 rounded-md w-full"
                        />
                      ) : (
                        <span>{cat.name}</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {cat.createdAt?.toDate
                        ? cat.createdAt.toDate().toLocaleString()
                        : "—"}
                    </td>

                    <td className="px-4 py-3 space-x-2 flex items-center">
                      {editId === cat.id ? (
                        <button
                          onClick={handleEditSave}
                          className="text-green-600 border p-2 border-green-300 rounded-md hover:bg-green-100 transition-all ease-in-out hover:text-green-800"
                          title="Save"
                          disabled={actionInProgress}
                        >
                          <MdCheck size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(cat.id, cat.name)}
                          className="text-blue-600 border p-2 border-blue-300 rounded-md hover:bg-blue-100 transition-all ease-in-out hover:text-blue-800"
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setCategoryToDelete(cat);
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
                ))}
                {categories.length === 0 && !loading && (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">
                      No categories found.
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

export default CategoryManagement;
