import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  MapPin,
  Search,
  Heart,
  ChevronDown,
  ChefHat,
} from "lucide-react";

import { useSelector } from "react-redux";

import useAuth from "../../4_features/auth/hooks/useAuth";

const Navbar = () => {

  const navigate =
    useNavigate();

  const {
    logout,
  } = useAuth();

  const dropdownRef =
    useRef(null);

  const mobileRef =
    useRef(null);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const {
    isAuthenticated,
    user,
  } = useSelector(
    (state) => state.auth
  );

  const cart =
    useSelector(
      (state) =>
        state.cart.cart
    );

  const cartCount =
    cart?.total_items ??
    0;

  const isAdmin =
    user?.role?.toLowerCase() ===
    "admin";

  useEffect(() => {

    const handleClick =
      (event) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {

          setProfileOpen(
            false
          );

        }

        if (
          mobileRef.current &&
          !mobileRef.current.contains(
            event.target
          )
        ) {

          setMobileOpen(
            false
          );

        }

      };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);

  const handleLogout =
    async () => {

      await logout();

      navigate(
        "/login"
      );

      setProfileOpen(
        false
      );

    };

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  const navLinks = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Menu",
      path: "/products",
    },

    {
      name: "Categories",
      path: "/categories",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Contact",
      path: "/contact",
    },

  ];

  return (

    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

        {/* ====================================================== */}
        {/* Logo */}
        {/* ====================================================== */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg transition-transform duration-300 hover:scale-105">

            <ChefHat size={26} strokeWidth={2.2} />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold tracking-tight text-orange-500">

              Bake N Bite

            </h1>

            <p className="-mt-1 text-xs text-gray-500">

              Freshly Homemade

            </p>

          </div>

        </Link>

        {/* ====================================================== */}
        {/* Navigation */}
        {/* ====================================================== */}

        <nav className="hidden items-center gap-8 lg:flex">

          {navLinks.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>

                `relative font-medium transition ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`

              }
            >

              {item.name}

            </NavLink>

          ))}

          {isAdmin && (

            <NavLink
              to="/admin"
              className={({ isActive }) =>

                isActive
                  ? "font-semibold text-orange-500"
                  : "font-medium text-gray-700 hover:text-orange-500"

              }
            >

              Admin

            </NavLink>

          )}

        </nav>

        {/* ====================================================== */}
        {/* Right Side */}
        {/* ====================================================== */}

        <div className="hidden items-center gap-5 lg:flex">

          {/* Search */}

          {/* <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search food..."
              className="w-64 rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />

          </div>

          <button
            onClick={handleSearch}
            className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Search
          </button> */}

          {/* Wishlist */}

          <button className="rounded-full p-3 transition hover:bg-orange-50">

            <Heart
              size={22}
            />

          </button>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative rounded-full p-3 transition hover:bg-orange-50"
          >

            <ShoppingCart
              size={23}
            />

            {cartCount > 0 && (

              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">

                {cartCount}

              </span>

            )}

          </Link>

          {/* Login */}

          {!isAuthenticated ? (

            <Link
              to="/login"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >

              Login

            </Link>

          ) : (

            <div
              className="relative"
              ref={dropdownRef}
            >

              <button
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                className="flex items-center gap-3 rounded-full border px-3 py-2 transition hover:border-orange-500"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">

                  <User
                    size={18}
                  />

                </div>

                <ChevronDown
                  size={18}
                />

              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-4 w-72 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">

                  {/* ============================================ */}
                  {/* User Header */}
                  {/* ============================================ */}

                  <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-white">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-orange-500">

                        <User size={24} />

                      </div>

                      <div>

                        <h3 className="font-bold">

                          {user?.full_name}

                        </h3>

                        <p className="text-sm text-orange-100">

                          {user?.email}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ============================================ */}
                  {/* Menu */}
                  {/* ============================================ */}

                  <div className="py-2">

                    <Link
                      to="/profile"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-orange-50"
                    >

                      <User size={18} />

                      My Profile

                    </Link>

                    <Link
                      to="/orders"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-orange-50"
                    >

                      <Package size={18} />

                      My Orders

                    </Link>

                    <Link
                      to="/addresses"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-orange-50"
                    >

                      <MapPin size={18} />

                      Saved Addresses

                    </Link>

                    <Link
                      to="/cart"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-orange-50"
                    >

                      <ShoppingCart size={18} />

                      My Cart

                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3 transition hover:bg-orange-50"
                    >

                      <Heart size={18} />

                      Wishlist

                    </Link>

                    {isAdmin && (

                      <>

                        <div className="my-2 border-t" />

                        <Link
                          to="/admin"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="flex items-center gap-3 px-5 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
                        >

                          🛠

                          Admin Dashboard

                        </Link>

                      </>

                    )}

                    <div className="my-2 border-t" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-500 transition hover:bg-red-50"
                    >

                      <LogOut size={18} />

                      Logout

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

        {/* ====================================================== */}
        {/* Mobile Menu Button */}
        {/* ====================================================== */}

        <button
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          className="rounded-xl p-2 transition hover:bg-orange-50 lg:hidden"
        >

          {mobileOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>

      </div>

      {/* ====================================================== */}
      {/* Mobile Drawer */}
      {/* ====================================================== */}

      {mobileOpen && (

        <div
          ref={mobileRef}
          className="border-t bg-white shadow-lg lg:hidden"
        >

          <div className="space-y-5 p-5">

            {/* Search */}

            {/* <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setMobileOpen(false);
                  }
                }}
                placeholder="Search food..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-orange-500"
              />

            </div>

            <button
              onClick={() => {
                handleSearch();
                setMobileOpen(false);
              }}
              className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Search
            </button> */}

            {/* Navigation */}

            <nav className="flex flex-col">

              {navLinks.map(
                (item) => (

                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setMobileOpen(
                        false
                      )
                    }
                    className={({ isActive }) =>

                      `rounded-xl px-4 py-3 transition ${
                        isActive
                          ? "bg-orange-500 text-white"
                          : "hover:bg-orange-50"
                      }`

                    }
                  >

                    {item.name}

                  </NavLink>

                )
              )}

              {isAdmin && (

                <NavLink
                  to="/admin"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                  className="rounded-xl px-4 py-3 font-semibold text-orange-600 hover:bg-orange-50"
                >

                  🛠 Admin Dashboard

                </NavLink>

              )}

            </nav>

            <div className="border-t" />

            {/* Cart */}

            <Link
              to="/cart"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
              className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-orange-50"
            >

              <div className="flex items-center gap-3">

                <ShoppingCart
                  size={20}
                />

                My Cart

              </div>

              {cartCount > 0 && (

                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">

                  {cartCount}

                </span>

              )}

            </Link>

            {/* Wishlist */}

            <Link
              to="/wishlist"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
              className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-orange-50"
            >

              <Heart size={20} />

              Wishlist

            </Link>

            <div className="border-t" />

            {/* ====================================================== */}
            {/* Authentication */}
            {/* ====================================================== */}

            {!isAuthenticated ? (

              <Link
                to="/login"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="block rounded-xl bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
              >

                Login

              </Link>

            ) : (

              <>

                {/* User */}

                <div className="rounded-2xl bg-orange-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">

                      <User size={20} />

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {user?.full_name}

                      </h3>

                      <p className="text-sm text-gray-500">

                        {user?.email}

                      </p>

                    </div>

                  </div>

                </div>

                <Link
                  to="/profile"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50"
                >

                  <User size={20} />

                  My Profile

                </Link>

                <Link
                  to="/orders"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50"
                >

                  <Package size={20} />

                  My Orders

                </Link>

                <Link
                  to="/addresses"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-50"
                >

                  <MapPin size={20} />

                  Saved Addresses

                </Link>

                <button
                  onClick={async () => {

                    setMobileOpen(false);

                    await handleLogout();

                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                >

                  <LogOut size={20} />

                  Logout

                </button>

              </>

            )}

          </div>

        </div>

      )}

    </header>

  );

};

export default Navbar;