// src/4_features/products/components/ProductCardSkeleton.jsx
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm">
      {/* Image */}

      <div className="aspect-square bg-gray-200" />

      {/* Content */}

      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-8 w-1/3 rounded bg-gray-200" />
        <div className="h-12 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;