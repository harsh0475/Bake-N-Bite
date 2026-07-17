import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-orange-50/40">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main */}

      <div className="flex min-h-screen flex-col lg:ml-72">

        <AdminNavbar
          toggleSidebar={toggleSidebar}
        />

        <main className="flex-1">

          <div
            className="
              mx-auto
              w-full
              max-w-7xl

              px-3
              py-4

              sm:px-5
              sm:py-5

              md:px-6

              lg:px-8
              lg:py-8

              pb-32
            "
          >

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;