import clsx from "clsx";

const Button = ({
  children,

  variant = "primary",
  size = "md",

  fullWidth = false,
  loading = false,

  leftIcon,
  rightIcon,

  className,

  disabled,

  type = "button",

  ...props
}) => {
  const baseClasses = clsx(
    "inline-flex items-center justify-center gap-2",
    "rounded-2xl font-semibold",
    "transition-all duration-200",
    "select-none",
    "focus:outline-none focus:ring-4",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60"
  );

  const variants = {
    primary: clsx(
      "bg-orange-500 text-white",
      "hover:bg-orange-600",
      "focus:ring-orange-200"
    ),

    secondary: clsx(
      "bg-orange-50 text-orange-600",
      "hover:bg-orange-100",
      "focus:ring-orange-100"
    ),

    outline: clsx(
      "border border-orange-300 bg-white text-orange-600",
      "hover:bg-orange-50",
      "focus:ring-orange-100"
    ),

    ghost: clsx(
      "bg-transparent text-gray-700",
      "hover:bg-gray-100",
      "focus:ring-gray-200"
    ),

    success: clsx(
      "bg-green-600 text-white",
      "hover:bg-green-700",
      "focus:ring-green-200"
    ),

    warning: clsx(
      "bg-amber-500 text-white",
      "hover:bg-amber-600",
      "focus:ring-amber-200"
    ),

    danger: clsx(
      "bg-red-500 text-white",
      "hover:bg-red-600",
      "focus:ring-red-200"
    ),
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",

    md: "h-11 px-5 text-sm",

    lg: "h-12 px-6 text-base",

    xl: "h-14 px-7 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <span
          className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-current
            border-t-transparent
          "
        />
      )}

      {!loading && leftIcon}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
};

export default Button;