import ProductRow from "./ProductRow";

const ProductTable = ({
  products,
  onDelete,
}) => {

  return (

    <>

      {/* ====================================================== */}
      {/* Mobile */}
      {/* ====================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:hidden">

        {products.map((product) => (

          <ProductRow
            key={product.id}
            product={product}
            onDelete={onDelete}
            mobile
          />

        ))}

      </div>

      {/* ====================================================== */}
      {/* Desktop */}
      {/* ====================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-orange-100 lg:block">

        {/* ====================================================== */}
        {/* Table */}
        {/* ====================================================== */}

        <div className="overflow-x-auto">

          <table className="min-w-full">

            {/* ====================================================== */}
            {/* Head */}
            {/* ====================================================== */}

            <thead className="sticky top-0 z-10 border-b border-orange-100 bg-orange-50">

              <tr>

                <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Product

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Category

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Pricing

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Rating

                </th>

                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-wider text-gray-600">

                  Status

                </th>

                <th className="px-8 py-5 text-right text-xs font-black uppercase tracking-wider text-gray-600">

                  Actions

                </th>

              </tr>

            </thead>

            {/* ====================================================== */}
            {/* Body */}
            {/* ====================================================== */}

            <tbody className="divide-y divide-orange-50 bg-white">

              {products.map((product) => (

                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                />

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

};

export default ProductTable;