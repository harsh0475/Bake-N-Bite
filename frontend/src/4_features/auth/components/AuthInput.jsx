// src/4_features/auth/components/AuthInput.jsx
const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-2xl border py-3.5 outline-none transition
          ${Icon ? "pl-12 pr-4" : "px-4"}
          ${
            error
              ? "border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          }`}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AuthInput;