import { IoArrowBack } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa"; 
import { NavLink, useNavigate } from "react-router-dom";

const Aside = () => {
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md font-semibold transition-all duration-200 ${
      isActive
        ? "bg-[#FFB347] text-white"
        : "text-white hover:bg-[#FFB347] hover:text-white"
    }`;

  return (
    <aside className="w-72 bg-gradient-to-b from-[#F59E0B] to-[#D97706] text-white p-6 flex flex-col fixed top-0 left-0 bottom-0 shadow-lg">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white hover:text-white font-semibold mb-4 transition-all duration-200 rounded-md hover:bg-[#FFB347] px-3 py-2"
      >
        <IoArrowBack size={20} />
        <span className="text-lg">Back to Home</span>
      </button>

      <div>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-semibold transition-all duration-200 mb-2 ${
              isActive
                ? "bg-[#FFB347] text-white"
                : "text-white hover:bg-[#FFB347] hover:text-white"
            }`
          }
        >
          <MdDashboard size={20} />
          Admin Panel
        </NavLink>

        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/categories" className={navLinkClasses}>
            <MdCategory size={20} />
            Manage Categories
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClasses}>
            <FiPackage size={20} />
            Manage Products
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClasses}>
            <FaUsers size={20} />
            Manage Users
          </NavLink>
          <NavLink to="/admin/purchased" className={navLinkClasses}>
            <GiShoppingCart size={20} />
            Manage Purchased History
          </NavLink>
          <NavLink to="/admin/addresses" className={navLinkClasses}>
            <FaMapMarkerAlt size={20} />
            Manage Addresses
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Aside;
