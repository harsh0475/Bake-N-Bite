import {
  Bell,
  Home,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminNavbar = ({
  title = "Dashboard",
  toggleSidebar,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  const handleNotifications = () => {
    toast.info("No new notifications.");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-orange-100
        bg-white/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-16
          items-center
          justify-between

          px-3

          sm:h-[72px]
          sm:px-5

          lg:h-20
          lg:px-8
        "
      >
        {/* ================= Left ================= */}

        <div className="flex min-w-0 items-center gap-3">

          <button
            type="button"
            onClick={toggleSidebar}
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-orange-100
              bg-white
              transition
              hover:bg-orange-50
              lg:hidden
            "
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">

            <h1
              className="
                truncate
                text-lg
                font-black
                text-gray-900

                sm:text-2xl

                lg:text-3xl
              "
            >
              {title}
            </h1>

            <p
              className="
                hidden
                text-sm
                text-gray-500

                sm:block
              "
            >
              Welcome back 👋
            </p>

          </div>

        </div>

        {/* ================= Right ================= */}

        <div className="flex shrink-0 items-center gap-2">

          {/* Website */}

          <button
            type="button"
            onClick={() => navigate("/")}
            title="Go to website"
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-orange-100
              px-3
              text-sm
              font-semibold
              transition
              hover:bg-orange-50
              md:px-4
              md:py-2.5
            "
          >
            <Home size={18} />
            <span className="hidden md:block">Website</span>
          </button>

          {/* Notifications */}

          <button
            type="button"
            onClick={handleNotifications}
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-orange-100
              bg-white
              transition
              hover:bg-orange-50
            "
          >
            <Bell size={20} />

            <span
              className="
                absolute
                right-2.5
                top-2.5
                h-2.5
                w-2.5
                rounded-full
                bg-red-500
              "
            />
          </button>

          {/* Profile */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-orange-100
              bg-orange-50
              px-3
              py-2

              lg:flex
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-orange-500
                text-white
              "
            >
              <UserRound size={18} />
            </div>

            <div>

              <p className="text-sm font-semibold text-gray-800">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Bake N Bite
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-500

              px-3

              text-sm
              font-semibold
              text-white

              transition

              hover:bg-red-600
              active:scale-95

              sm:px-4
            "
          >
            <LogOut size={18} />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;