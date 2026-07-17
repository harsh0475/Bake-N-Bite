// src/4_features/checkout/components/PaymentMethod.jsx
import {
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";

const PaymentMethod = ({ value, onChange }) => {
  const methods = [
    {
      title: "Cash On Delivery",
      value: "Cash On Delivery",
      icon: <Banknote size={24} />,
      description: "Pay when your order is delivered.",
    },
    {
      title: "Razorpay",
      value: "Razorpay",
      icon: <CreditCard size={24} />,
      description: "UPI • Cards • Wallet • Net Banking",
      badge: "Secure",
    },
    {
      title: "Direct UPI",
      value: "UPI",
      icon: <Smartphone size={24} />,
      description: "Coming Soon",
      badge: "Soon",
      disabled: true,
    },
  ];

  return (
    <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-black text-gray-900">
        Payment Method
      </h2>

      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.value}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all duration-300
            ${
              value === method.value
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-200 hover:border-orange-300"
            }
            ${method.disabled ? "cursor-not-allowed opacity-60" : ""}`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                checked={value === method.value}
                disabled={method.disabled}
                onChange={() => onChange(method.value)}
              />

              <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
                {method.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{method.title}</p>

                  {method.badge && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      {method.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-700">Secure Payments</h3>

        <p className="mt-2 text-sm text-gray-600">
          Online payments are processed securely through Razorpay.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethod;