import ProductCard from "./ProductCard";

import ErrorState from "../../../3_components/common/ErrorState";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  emptyMessage = "No products found.",
  scrollOnMobile = false,
}) => {

  // ======================================================
  // Loading
  // ======================================================

  if (loading) {

    if (scrollOnMobile) {
      return (

        <>

          {/* Mobile: horizontal scroll */}

          <div
            className="
              flex
              gap-4
              overflow-x-auto
              pb-4
              lg:hidden
              snap-x
              snap-mandatory
              scrollbar-hide
            "
          >

            {Array.from({ length: 4 }).map((_, index) => (

              <div
                key={index}
                className="min-w-[240px] snap-center"
              >

                <ProductCardSkeleton />

              </div>

            ))}

          </div>

          {/* Desktop: grid */}

          <div
            className="
              hidden
              gap-8
              lg:grid
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {Array.from({ length: 8 }).map((_, index) => (

              <ProductCardSkeleton key={index} />

            ))}

          </div>

        </>

      );
    }

    return (

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:gap-4
          md:grid-cols-3
          md:gap-6
          xl:grid-cols-4
          xl:gap-8
        "
      >

        {Array.from({
          length: 8,
        }).map((_, index) => (

          <ProductCardSkeleton
            key={index}
          />

        ))}

      </div>

    );
  }

  // ======================================================
  // Error
  // ======================================================

  if (error) {

    return (

      <ErrorState
        title="Unable to load products"
        description={error}
      />

    );

  }

  // ======================================================
  // Empty
  // ======================================================

  if (!products.length) {

    return (

      <div className="flex flex-col items-center rounded-[32px] border border-orange-100 bg-white px-8 py-24 text-center shadow-sm">

        <div className="mb-8 text-8xl">

          🍽️

        </div>

        <h2 className="text-3xl font-extrabold text-gray-900">

          No Products Found

        </h2>

        <p className="mt-4 max-w-lg text-lg leading-8 text-gray-500">

          {emptyMessage}

        </p>

      </div>

    );

  }

  // ======================================================
  // Products — scroll on mobile (Featured / Best Seller)
  // ======================================================

  if (scrollOnMobile) {
    return (

      <>

        {/* Mobile: horizontal scroll, same pattern as Browse Categories */}

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            pb-4
            lg:hidden
            snap-x
            snap-mandatory
            scrollbar-hide
          "
        >

          {products.map((product) => (

            <div
              key={product.id}
              className="min-w-[240px] snap-center"
            >

              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>

        {/* Desktop: grid */}

        <div
          className="
            hidden
            gap-8
            lg:grid
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </>

    );
  }

  // ======================================================
  // Products — default (Products page, Related Products)
  // ======================================================

  return (

    <>

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:gap-4
          md:grid-cols-3
          md:gap-6
          xl:grid-cols-4
          xl:gap-8
        "
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </>

  );

};

export default ProductGrid;