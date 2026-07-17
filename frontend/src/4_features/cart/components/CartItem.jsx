import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import QuantitySelector from "../../products/components/QuantitySelector";

import productPlaceholder from "../../../2_assets/images/product-placeholder.png";
import { API_BASE_URL } from "../../../8_constants/config";

const CartItem = ({
  item,
  updating,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const image = item.product_image
    ? item.product_image.startsWith("http")
      ? item.product_image
      : `${API_BASE_URL}${item.product_image}`
    : productPlaceholder;

  return (
    <div
      className="
        rounded-2xl
        border
        border-orange-100
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-200
        hover:shadow-lg
      "
    >
      <div className="flex gap-4">

        {/* Image */}

        <Link
          to={`/products/${item.product_id}`}
          className="shrink-0"
        >
          <img
            src={image}
            alt={item.product_name}
            onError={(e) => {
              e.currentTarget.src =
                productPlaceholder;
            }}
            className="
              h-24
              w-24
              rounded-2xl
              object-cover

              sm:h-28
              sm:w-28
            "
          />
        </Link>

        {/* Content */}

        <div className="flex min-w-0 flex-1 flex-col justify-between">

          {/* Top */}

          <div>

            <div className="flex items-start justify-between gap-3">

              <Link
                to={`/products/${item.product_id}`}
                className="min-w-0"
              >

                <h2
                  className="
                    line-clamp-2
                    text-base
                    font-bold
                    text-gray-900

                    sm:text-lg
                  "
                >
                  {item.product_name}
                </h2>

              </Link>

              <button
                type="button"
                disabled={updating}
                onClick={() => {

                  if (updating) return;

                  const confirmed =
                    window.confirm(
                      `Remove "${item.product_name}" from cart?`
                    );

                  if (!confirmed) return;

                  onRemove(item.id);

                }}
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  transition

                  ${
                    updating
                      ? "cursor-not-allowed bg-gray-100 text-gray-300"
                      : "bg-red-50 text-red-500 hover:bg-red-100"
                  }
                `}
              >

                <Trash2 size={18} />

              </button>

            </div>

            <p className="mt-2 text-sm text-gray-500">

              ₹{Number(item.unit_price).toFixed(2)} each

            </p>

          </div>

          {/* Bottom */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() =>
                onIncrease(
                  item.id,
                  item.quantity
                )
              }
              onDecrease={() =>
                onDecrease(
                  item.id,
                  item.quantity
                )
              }
            />

            <div className="text-right">

              <p className="text-xs text-gray-500">

                Total

              </p>

              <h3
                className="
                  text-lg
                  font-extrabold
                  text-orange-500

                  sm:text-xl
                "
              >
                ₹{Number(item.subtotal).toFixed(2)}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;