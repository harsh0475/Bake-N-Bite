// src/4_features/products/components/ProductSpecification.jsx
const ProductSpecification = ({ product }) => {
  return (
    <div className="rounded-[28px] border border-orange-100 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-black text-gray-900">
        Product Details
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="font-semibold text-gray-900">
            {product.category?.name || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Preparation Time</p>
          <p className="font-semibold text-gray-900">
            {product.prep_time} mins
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Food Type</p>
          <p className="font-semibold text-gray-900">
            {product.is_veg ? "Vegetarian" : "Non Vegetarian"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Spice Level</p>
          <p className="font-semibold text-gray-900">
            {product.spice_level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;