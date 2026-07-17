const ProductBadge = ({
  text,
  color = "orange",
}) => {
  const colors = {
    orange: "bg-orange-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-600 text-white",
    blue: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${colors[color]}`}
    >
      {text}
    </span>
  );
};

export default ProductBadge;