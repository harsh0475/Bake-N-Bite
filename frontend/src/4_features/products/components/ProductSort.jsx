const ProductSort = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
    >
      <option value="default">Sort By</option>

      <option value="priceLow">
        Price : Low to High
      </option>

      <option value="priceHigh">
        Price : High to Low
      </option>

      <option value="rating">
        Highest Rated
      </option>

      <option value="name">
        Name (A-Z)
      </option>
    </select>
  );
};

export default ProductSort;