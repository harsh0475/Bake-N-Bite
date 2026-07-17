// src/4_features/checkout/components/DeliveryMethod.jsx
const DeliveryMethod = ({ value, onChange }) => {
  return (
    <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-black text-gray-900">
        Delivery Method
      </h2>

      <div className="space-y-4">
        <label
          className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition-all duration-300 ${
            value === "Home Delivery"
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-orange-300"
          }`}
        >
          <input
            type="radio"
            checked={value === "Home Delivery"}
            onChange={() => onChange("Home Delivery")}
          />

          <div>
            <h3 className="font-semibold text-gray-900">Home Delivery</h3>
            <p className="text-sm text-gray-500">
              Delivered to your doorstep
            </p>
          </div>
        </label>

        <label
          className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition-all duration-300 ${
            value === "Pickup"
              ? "border-orange-500 bg-orange-50 shadow-md"
              : "border-gray-200 hover:border-orange-300"
          }`}
        >
          <input
            type="radio"
            checked={value === "Pickup"}
            onChange={() => onChange("Pickup")}
          />

          <div>
            <h3 className="font-semibold text-gray-900">Store Pickup</h3>
            <p className="text-sm text-gray-500">
              Collect your order yourself
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default DeliveryMethod;