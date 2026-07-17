const ProductRating = ({ rating = 0, reviews = 0 }) => {
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="rounded-lg bg-green-600 px-2 py-1 text-xs font-semibold text-white">
        ⭐ {Number(rating).toFixed(1)}
      </span>

      <span className="text-sm text-gray-500">
        ({reviews} Reviews)
      </span>
    </div>
  );
};

export default ProductRating;