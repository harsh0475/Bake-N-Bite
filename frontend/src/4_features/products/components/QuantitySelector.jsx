import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 20,
}) => {
  return (
    <div
      className="
        inline-flex
        items-center
        overflow-hidden
        rounded-xl
        border
        border-orange-200
        bg-white
        shadow-sm
      "
    >
      {/* Minus */}

      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          transition

          ${
            quantity <= min
              ? "cursor-not-allowed bg-gray-100 text-gray-300"
              : "text-orange-500 hover:bg-orange-50 active:scale-95"
          }

          md:h-10
          md:w-10
        `}
      >
        <Minus size={16} />
      </button>

      {/* Quantity */}

      <div
        className="
          flex
          h-9
          min-w-[42px]
          items-center
          justify-center
          border-x
          border-orange-100
          bg-orange-50
          text-sm
          font-bold
          text-gray-900

          md:h-10
          md:min-w-[48px]
          md:text-base
        "
      >
        {quantity}
      </div>

      {/* Plus */}

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          transition

          ${
            quantity >= max
              ? "cursor-not-allowed bg-gray-100 text-gray-300"
              : "bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
          }

          md:h-10
          md:w-10
        `}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;