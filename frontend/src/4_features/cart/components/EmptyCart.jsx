// src/4_features/cart/components/EmptyCart.jsx
import { ShoppingBag, ArrowRight, Home, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../../3_components/common/Button";

const EmptyCart = () => {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-orange-50 px-4 py-16">
      <div className="w-full max-w-2xl overflow-hidden rounded-[34px] border border-orange-100 bg-white shadow-xl">
        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-8 py-10 text-center text-white">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <ShoppingBag size={56} />
          </div>

          <h1 className="mt-6 text-4xl font-black">Your Cart is Empty</h1>

          <p className="mt-3 text-orange-100">
            Looks like you haven't added any delicious food yet.
          </p>
        </div>

        {/* ====================================== */}
        {/* Body */}
        {/* ====================================== */}

        <div className="space-y-8 px-8 py-10">
          <div className="rounded-2xl bg-orange-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-orange-100 p-3">
                <UtensilsCrossed className="text-orange-500" size={28} />
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Fresh Homemade Food
                </h3>

                <p className="mt-2 leading-7 text-gray-500">
                  Browse our menu filled with freshly prepared cakes, momos,
                  noodles, sandwiches, burgers, beverages and many more
                  homemade delights.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-orange-100 p-5 text-center">
              <div className="text-3xl">🍰</div>
              <h4 className="mt-3 font-semibold">Fresh Daily</h4>
              <p className="mt-2 text-sm text-gray-500">
                Prepared only after your order.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 p-5 text-center">
              <div className="text-3xl">🚚</div>
              <h4 className="mt-3 font-semibold">Fast Delivery</h4>
              <p className="mt-2 text-sm text-gray-500">
                Quick delivery within your locality.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-100 p-5 text-center">
              <div className="text-3xl">❤️</div>
              <h4 className="mt-3 font-semibold">Homemade</h4>
              <p className="mt-2 text-sm text-gray-500">
                Made with love using quality ingredients.
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/products" className="flex-1">
              <Button size="lg" fullWidth rightIcon={<ArrowRight size={20} />}>
                Browse Menu
              </Button>
            </Link>

            <Link to="/" className="flex-1">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<Home size={20} />}
              >
                Home
              </Button>
            </Link>
          </div>

          {/* Bottom */}

          <div className="rounded-2xl bg-green-50 p-5">
            <p className="text-center text-sm font-medium text-green-700">
              🍽️ Fresh homemade meals prepared with care and delivered
              directly to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;