import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {

  return (

    <>
      {/* =============================== */}
      {/* Mobile */}
      {/* =============================== */}

      <div
        className="
        flex
        gap-4
        overflow-x-auto
        px-1
        pb-2

        snap-x
        snap-mandatory

        scroll-smooth
        scrollbar-hide

        lg:hidden
        "
      >

        {categories.map((category) => (

          <div
            key={category.id}
            className="
              min-w-[82%]
              max-w-[82%]
              snap-center
            "
          >

            <CategoryCard
              category={category}
            />

          </div>

        ))}

      </div>

      {/* =============================== */}
      {/* Desktop */}
      {/* =============================== */}

      <div
        className="
          hidden
          gap-8
          lg:grid
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {categories.map((category) => (

          <CategoryCard
            key={category.id}
            category={category}
          />

        ))}

      </div>

    </>

  );

};

export default CategoryGrid;