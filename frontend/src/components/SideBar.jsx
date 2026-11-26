import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  User,
  UserStar,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "My Store",
    icon: Store,
    path: "/store",
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    path: "/orders",
  },
  {
    title: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },

  // {
  //   title: "Admin Panel",
  //   icon: UserStar,
  //   path: "/admin",
  // },
];

const Sidebar = ({ onNavigate }) => {
  const { domainName, logout, user } = useContext(AuthContext);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl  bg-teal-500 text-white">
          <Store size={18} />
        </span>

        <p className="font-semibold">{domainName}</p>
      </div>

      {/* <nav className="mt-8 flex-1 space-y-2">
        {NAV_ITEMS.map((item, i) => (
          <Fragment key={i}>
            <NavLink
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ease-out duration-300
                ${isActive
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-teal-400 hover:text-white"
                }`
              }
            >
              <item.icon size={18} />
              {item.title}
            </NavLink>
          </Fragment>
        ))}
      </nav> */}

      <nav className="mt-8 flex-1 space-y-2">

  {/* Normal Navigation */}
  {NAV_ITEMS.map((item, i) => (
    <Fragment key={i}>
      <NavLink
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ease-out duration-300 
          ${
            isActive
              ? "bg-teal-500 text-white"
              : "text-gray-600 hover:bg-teal-400 hover:text-white"
          }`
        }
      >
        <item.icon size={18} />
        {item.title}
      </NavLink>
    </Fragment>
  ))}

  {/* Admin Navigation - Only visible to admins */}
  {user?.role === "admin" && (
    <NavLink
      to="/admin"
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ease-out duration-300
        ${
          isActive
            ? "bg-teal-500 text-white"
            : "text-gray-600 hover:bg-teal-400 hover:text-white"
        }`
      }
    >
      <UserStar size={18} />
      Admin Panel
    </NavLink>
  )}

</nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
