// src/4_features/products/pages/Products.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductGrid from "../components/ProductGrid";
import ProductSearch from "../components/ProductSearch";
import ProductSort from "../components/ProductSort";
import CategoryChips from "../components/CategoryChips";
import ProductFilters from "../components/ProductFilters";
import PriceFilter from "../components/PriceFilter";

import useProducts from "../hooks/useProducts";
import useCategories from "../../categories/hooks/useCategories";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import PromoBanner from "../../../3_components/common/PromoBanner";

const Products = () => {
  const {
    products,
    categoryProducts,
    loadingProducts,
    error,
    fetchProducts,
    fetchProductsByCategory,
  } = useProducts();

  const {
    categories,
    loading,
    error: categoryError,
    fetchCategories,
  } = useCategories();

  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);
  const [sort, setSort] = useState("default");
  const [veg, setVeg] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // ======================================================
  // Load Categories
  // ======================================================

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ======================================================
  // Load Products
  // ======================================================

  useEffect(() => {
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [categoryId, fetchProducts, fetchProductsByCategory]);

  // ======================================================
  // Source
  // ======================================================

  const sourceProducts = categoryId ? categoryProducts : products;

  // ======================================================
  // Search + Sort
  // ======================================================

  const filteredProducts = useMemo(() => {
    let data = [...sourceProducts];

    if (search.trim()) {
      data = data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (veg === "veg") {
      data = data.filter((product) => product.is_veg);
    }

    if (veg === "nonveg") {
      data = data.filter((product) => !product.is_veg);
    }

    if (availability === "available") {
      data = data.filter((product) => product.is_available);
    }

    if (availability === "unavailable") {
      data = data.filter((product) => !product.is_available);
    }

    if (priceRange) {
      data = data.filter((product) => {
        const price = Number(product.discount_price || product.price);

        switch (priceRange) {
          case "0-100":
            return price <= 100;
          case "100-250":
            return price > 100 && price <= 250;
          case "250-500":
            return price > 250 && price <= 500;
          case "500+":
            return price > 500;
          default:
            return true;
        }
      });
    }

    switch (sort) {
      case "priceLow":
        data.sort(
          (a, b) =>
            Number(a.discount_price || a.price) -
            Number(b.discount_price || b.price)
        );
        break;

      case "priceHigh":
        data.sort(
          (a, b) =>
            Number(b.discount_price || b.price) -
            Number(a.discount_price || a.price)
        );
        break;

      case "rating":
        data.sort(
          (a, b) => Number(b.average_rating) - Number(a.average_rating)
        );
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [sourceProducts, search, sort, veg, availability, priceRange]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 pb-20 pt-8">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: categoryId ? "Category" : "Menu" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="🍴 Homemade With Love"
          title={
            categoryId
              ? "Explore This Category"
              : "Discover Delicious Homemade Food"
          }
          description="Fresh cakes, momos, sandwiches, noodles, beverages and snacks prepared with love and delivered fresh to your doorstep."
          stats={[
            { value: filteredProducts.length, label: "Available Items" },
            { value: "Fresh", label: "Everyday" },
            { value: "4.9★", label: "Customer Rating" },
          ]}
          className="mt-8"
        />

        {/* ====================================================== */}
        {/* Category Chips */}
        {/* ====================================================== */}

        <div className="mt-10">
          <CategoryChips
            categories={categories}
            loading={loading}
            error={categoryError}
          />
        </div>

        {/* ====================================================== */}
        {/* Filters */}
        {/* ====================================================== */}

        <div className="mt-8 rounded-2xl border border-orange-100 bg-white p-4 shadow-md lg:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
              Find Your Favourite Food
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search, filter and sort homemade dishes.
            </p>
          </div>

          <div
            className="
              grid
              gap-3

              md:grid-cols-2

              xl:grid-cols-[2fr_1fr_1fr_1fr]
            "
          >
            <ProductSearch value={search} onChange={setSearch} />

            <ProductFilters
              veg={veg}
              availability={availability}
              onVegChange={setVeg}
              onAvailabilityChange={setAvailability}
            />

            <ProductSort value={sort} onChange={setSort} />

            <PriceFilter value={priceRange} onChange={setPriceRange} />
          </div>
        </div>

        {/* ====================================================== */}
        {/* Product Count */}
        {/* ====================================================== */}

        <div className="my-8 flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm lg:px-6">
          <div>
            <h2 className="text-xl font-black lg:text-2xl text-gray-900">Our Menu</h2>

            <p className="text-sm text-gray-500">Freshly prepared homemade food.</p>
          </div>

          <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* ====================================================== */}
        {/* Products */}
        {/* ====================================================== */}

        <ProductGrid
          products={filteredProducts}
          loading={loadingProducts}
          error={error}
          emptyMessage="No products match your search."
        />
      </Container>
    </section>
  );
};

export default Products;