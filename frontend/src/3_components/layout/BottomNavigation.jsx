import { NavLink } from "react-router-dom";
import {
  House,
  UtensilsCrossed,
  ShoppingCart,
  Package,
  User,
} from "lucide-react";

import { useSelector } from "react-redux";

const BottomNavigation = () => {

  const cart =
    useSelector(
      (state) => state.cart.cart
    );

  const cartCount =
    cart?.total_items ?? 0;

  const navItems = [

    {
      label: "Home",
      to: "/",
      icon: House,
    },

    {
      label: "Menu",
      to: "/products",
      icon: UtensilsCrossed,
    },

    {
      label: "Cart",
      to: "/cart",
      icon: ShoppingCart,
    },

    {
      label: "Orders",
      to: "/orders",
      icon: Package,
    },

    {
      label: "Profile",
      to: "/profile",
      icon: User,
    },

  ];

  return (

    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-orange-100
        bg-white/95
        backdrop-blur-xl
        shadow-[0_-8px_30px_rgba(0,0,0,0.08)]
        lg:hidden
      "
    >

      <div className="grid grid-cols-5">

        {navItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>

                `relative flex flex-col items-center justify-center gap-1 py-3 transition

                ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-500"
                }`

              }
            >

              <div className="relative">

                <Icon size={22} />

                {item.label === "Cart" &&
                  cartCount > 0 && (

                    <span
                      className="
                        absolute
                        -right-2
                        -top-2
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-orange-500
                        text-[10px]
                        font-bold
                        text-white
                      "
                    >

                      {cartCount}

                    </span>

                  )}

              </div>

              <span className="text-xs font-medium">

                {item.label}

              </span>

            </NavLink>

          );

        })}

      </div>

    </nav>

  );

};

export default BottomNavigation;