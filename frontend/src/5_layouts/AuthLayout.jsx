// src/5_layouts/AuthLayout.jsx
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-12">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

      <Link
        to="/"
        className="relative z-10 mb-8 flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl text-white shadow-lg">
          🧁
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-orange-500">
            Bake N Bite
          </h1>

          <p className="-mt-1 text-xs text-gray-500">Freshly Homemade</p>
        </div>
      </Link>

      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;