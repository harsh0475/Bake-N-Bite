const ProductPrice = ({ price, discountPrice }) => {
  const hasDiscount =
    discountPrice &&
    Number(discountPrice) < Number(price);

  return (
    <div className="mt-3 flex items-center gap-3">
      {hasDiscount ? (
        <>
          <span className="text-2xl font-bold text-orange-500">
            ₹{discountPrice}
          </span>

          <span className="text-gray-400 line-through">
            ₹{price}
          </span>
        </>
      ) : (
        <span className="text-2xl font-bold text-orange-500">
          ₹{price}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;