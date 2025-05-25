import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Aside from "../../components/Aside";
import { supabase } from "../../supabaseClient";
import html2pdf from "html2pdf.js";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const summaryRef = useRef();

  useEffect(() => {
    const userData = localStorage.getItem("users");
    setUserData(userData ? JSON.parse(userData) : null);
  }, []);

  const userName =
    userData && userData.first_name && userData.last_name
      ? `${userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1)} ${userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1)}`
      : "Admin";

  const handleViewSummary = async () => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select(`
          id,
          quantity,
          orders (
            id,
            user_id,
            total_price,
            created_at
          )
        `);

      if (error) {
        console.error("Error fetching joined data:", error);
      } else {
        setPurchases(data || []);
        setShowReceipt(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Order ID", "User ID", "Quantity", "Total Price", "Date"],
      ...purchases.map(p => [
        p.orders?.id,
        p.orders?.user_id,
        p.quantity,
        p.orders?.total_price,
        new Date(p.orders?.created_at).toLocaleDateString()
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," +
      csvRows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "purchase_summary.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadPDF = () => {
    const element = summaryRef.current;
    html2pdf().from(element).save("Purchase_Summary.pdf");
  };

  const groupByTimePeriod = (purchases, period) => {
    const summaries = {};

    purchases.forEach((p) => {
      const date = new Date(p.orders?.created_at);

      let key;
      switch (period) {
        case "day":
          key = date.toISOString().split("T")[0]; // YYYY-MM-DD
          break;
        case "week":
          const startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - date.getDay());
          key = startOfWeek.toISOString().split("T")[0];
          break;
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          break;
        case "year":
          key = `${date.getFullYear()}`;
          break;
        default:
          key = "unknown";
      }

      if (!summaries[key]) {
        summaries[key] = {
          totalRevenue: 0,
          totalOrders: new Set(),
          totalBuyers: new Set(),
        };
      }

      summaries[key].totalRevenue += p.orders?.total_price || 0;
      summaries[key].totalOrders.add(p.orders?.id);
      summaries[key].totalBuyers.add(p.orders?.user_id);
    });

    return Object.entries(summaries).map(([key, value]) => ({
      period: key,
      revenue: value.totalRevenue,
      orders: value.totalOrders.size,
      buyers: value.totalBuyers.size,
    }));
  };

  const totalBuyers = new Set(purchases.map((p) => p.orders?.user_id)).size;
  const totalOrders = new Set(purchases.map((p) => p.orders?.id)).size;
  const totalRevenue = purchases.reduce((sum, p) => sum + (p.orders?.total_price || 0), 0);

  return (
    <div className="flex min-h-screen bg-[#FFF7F0] font-sans">
      <Aside />
      <main className="flex-1 ml-72 p-10">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-[#FF7F50]">
            Welcome, {userName}!
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <NavLink to="/admin/categories" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-[#FFA500] hover:bg-[#FFF1E0] cursor-pointer block">
              <h3 className="text-2xl font-bold text-[#FFA500] mb-4">Categories</h3>
              <p className="text-gray-700">Organize and manage categories.</p>
              <span className="block mt-6 text-[#FF7F50] font-semibold hover:underline">Go to Categories</span>
            </NavLink>

            <NavLink to="/admin/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-[#FFB347] hover:bg-[#FFF1E0] cursor-pointer block">
              <h3 className="text-2xl font-bold text-[#FFB347] mb-4">Products</h3>
              <p className="text-gray-700">View, add, and update your product listings.</p>
              <span className="block mt-6 text-[#FF7F50] font-semibold hover:underline">Go to Products</span>
            </NavLink>

            <NavLink to="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-[#FF9966] hover:bg-[#FFF1E0] cursor-pointer block">
              <h3 className="text-2xl font-bold text-[#FF9966] mb-4">Users</h3>
              <p className="text-gray-700">Manage your user base and roles.</p>
              <span className="block mt-6 text-[#FF7F50] font-semibold hover:underline">Go to Users</span>
            </NavLink>

            <NavLink to="/admin/purchased" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border-l-4 border-[#FF6347] hover:bg-[#FFF1E0] cursor-pointer block">
              <h3 className="text-2xl font-bold text-[#FF6347] mb-4">Purchased</h3>
              <p className="text-gray-700">View users who have made purchases.</p>
              <span className="block mt-6 text-[#FF7F50] font-semibold hover:underline">View Purchases</span>
            </NavLink>
          </div>

          <button
            onClick={handleViewSummary}
            className="mt-6 px-6 py-3 bg-[#FF7F50] text-white rounded-md shadow hover:bg-[#e5673d] transition w-max"
          >
            View Summary
          </button>

          {showReceipt && (
            <div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDownloadCSV}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Download CSV
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Download PDF
                </button>
              </div>

              <div
                ref={summaryRef}
                className="mt-6 bg-white shadow-lg border border-gray-200 rounded-lg p-6 w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#FF7F50]">Purchase Summary</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-[#FFF1E0] p-4 rounded-lg border border-[#FFA07A] shadow">
                    <p className="text-lg font-semibold text-gray-600">Total Buyers</p>
                    <p className="text-2xl font-bold text-[#FF7F50]">{totalBuyers}</p>
                  </div>
                  <div className="bg-[#FFF1E0] p-4 rounded-lg border border-[#FFA07A] shadow">
                    <p className="text-lg font-semibold text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-[#FF7F50]">{totalOrders}</p>
                  </div>
                  <div className="bg-[#FFF1E0] p-4 rounded-lg border border-[#FFA07A] shadow">
                    <p className="text-lg font-semibold text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#FF7F50]">₱{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr className="bg-[#FFF1E0] text-[#FF7F50]">
                        <th className="px-4 py-2 border">Order ID</th>
                        <th className="px-4 py-2 border">User ID</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Total Price</th>
                        <th className="px-4 py-2 border">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{purchase.orders?.id}</td>
                          <td className="px-4 py-2 border">{purchase.orders?.user_id}</td>
                          <td className="px-4 py-2 border">{purchase.quantity}</td>
                          <td className="px-4 py-2 border">₱{purchase.orders?.total_price?.toLocaleString()}</td>
                          <td className="px-4 py-2 border">
                            {new Date(purchase.orders?.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Time-based summaries */}
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-[#FF7F50] mb-4">Time-based Summaries</h2>

                  {["day", "week", "month", "year"].map((period) => {
                    const summaries = groupByTimePeriod(purchases, period);

                    return (
                      <div key={period} className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 capitalize">{period} Summary</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full table-auto text-left border border-collapse border-gray-200">
                            <thead>
                              <tr className="bg-[#FFF1E0] text-[#FF7F50]">
                                <th className="px-4 py-2 border">Period</th>
                                <th className="px-4 py-2 border">Total Revenue</th>
                                <th className="px-4 py-2 border">Total Orders</th>
                                <th className="px-4 py-2 border">Unique Buyers</th>
                              </tr>
                            </thead>
                            <tbody>
                              {summaries.map((summary, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 border">{summary.period}</td>
                                  <td className="px-4 py-2 border">₱{summary.revenue.toLocaleString()}</td>
                                  <td className="px-4 py-2 border">{summary.orders}</td>
                                  <td className="px-4 py-2 border">{summary.buyers}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
