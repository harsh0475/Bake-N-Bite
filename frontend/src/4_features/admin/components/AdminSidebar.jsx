import {
  LayoutDashboard,
  Package,
  Shapes,
  ShoppingBag,
  Users,
  Star,
  BarChart3,
  X,
  ChefHat,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: Shapes,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];

const AdminSidebar = ({
  isOpen,
  onClose,
}) => {
  return (
    <aside
      className={`
        fixed
        inset-y-0
        left-0
        z-50

        flex
        w-72
        flex-col

        border-r
        border-orange-100

        bg-white

        shadow-2xl

        transition-transform
        duration-300
        ease-out

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
      `}
    >
      {/* ================= Header ================= */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-orange-100

          px-6
          py-5
        "
      >
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-orange-500
              to-amber-400

              text-white
              shadow-lg
            "
          >
            <ChefHat size={24} />
          </div>

          <div>

            <h2 className="text-lg font-black text-gray-900">
              Bake N Bite
            </h2>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            rounded-xl
            p-2

            transition

            hover:bg-orange-100

            lg:hidden
          "
        >
          <X size={20} />
        </button>

      </div>

      {/* ================= Navigation ================= */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-4
          py-6
        "
      >
        <div className="space-y-2">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                end={menu.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    group

                    flex
                    items-center

                    gap-4

                    rounded-2xl

                    px-4
                    py-3.5

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center

                        rounded-xl

                        transition-all

                        ${
                          isActive
                            ? "bg-white/20"
                            : "bg-orange-100 text-orange-500 group-hover:bg-orange-200"
                        }
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="flex-1 font-semibold">
                      {menu.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

        </div>
      </nav>

      {/* ================= Footer ================= */}

      <div
        className="
          border-t
          border-orange-100

          p-5
        "
      >
        <div
          className="
            rounded-3xl

            bg-gradient-to-r
            from-orange-500
            to-amber-400

            p-5

            text-white
          "
        >
          <p className="text-xs uppercase tracking-wider text-orange-100">
            Business
          </p>

          <h3 className="mt-2 text-xl font-bold">
            Homemade Food
          </h3>

          <p className="mt-3 text-sm leading-6 text-orange-100">
            Manage products, categories, orders and customers from one place.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;