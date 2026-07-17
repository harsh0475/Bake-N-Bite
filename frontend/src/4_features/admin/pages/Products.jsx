import { useEffect, useState } from "react";
import {
  Plus,
  ShoppingBasket,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";
import Button from "../../../3_components/common/Button";

import AdminHero from "../components/AdminHero";
import AdminSectionCard from "../components/AdminSectionCard";

import ProductSearch from "../components/ProductSearch";
import ProductFilters from "../components/ProductFilters";
import ProductTable from "../components/ProductTable";
import ProductPagination from "../components/ProductPagination";
import DeleteProductModal from "../components/DeleteProductModal";

const Products = () => {
  const {
    products,
    pagination,
    loading,
    error,
    fetchProducts,
    deleteProduct,
  } = useAdmin();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [veg, setVeg] = useState("");

  const [sort, setSort] = useState("");

  const [availability, setAvailability] =
    useState("");

  const [featured, setFeatured] =
    useState("");

  const [bestSeller, setBestSeller] =
    useState("");

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  // ======================================================
  // Load Products
  // ======================================================

  const loadProducts = () => {

    fetchProducts({

      page,

      page_size: 10,

      search:
        search || undefined,

      category_id:
        category || undefined,

      is_veg:
        veg === ""
          ? undefined
          : veg === "true",

      sort:
        sort || undefined,

      is_available:
        availability === ""
          ? undefined
          : availability === "true",

      is_featured:
        featured === ""
          ? undefined
          : featured === "true",

      is_best_seller:
        bestSeller === ""
          ? undefined
          : bestSeller === "true",

    });

  };

  useEffect(() => {

    loadProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    search,
    category,
    veg,
    sort,
    availability,
    featured,
    bestSeller,
  ]);

  // ======================================================
  // Reset Filters
  // ======================================================

  const resetFilters = () => {

    setPage(1);

    setSearch("");

    setCategory("");

    setVeg("");

    setSort("");

    setAvailability("");

    setFeatured("");

    setBestSeller("");

  };

  // ======================================================
  // Delete Product
  // ======================================================

  const openDeleteModal = (
    product
  ) => {

    setSelectedProduct(product);

    setShowDeleteModal(true);

  };

  const closeDeleteModal = () => {

    setSelectedProduct(null);

    setShowDeleteModal(false);

  };

  const handleDelete = async (
    productId
  ) => {

    try {

      await deleteProduct(productId);

      toast.success(
        "Product deleted successfully."
      );

      closeDeleteModal();

      loadProducts();

    } catch (error) {

      toast.error(
        error ||
        "Unable to delete product."
      );

    }

  };

  if (loading.products) {

    return <LoadingSpinner text="Fetching products..." />;

  }

  if (error.products) {

    return (

      <ErrorState
        title="Unable to load products"
        description={error.products}
        onRetry={loadProducts}
      />

    );

  }

  return (

    <section className="space-y-8 lg:space-y-10">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <AdminHero
        badge="🍴 Bake N Bite Admin"
        title="Product Management"
        description="Manage products, pricing, featured items, availability and product visibility from one place."
        stats={[
          {
            label: "Products",
            value: pagination.total ?? products.length,
          },
        ]}
        buttonText="Create Product"
        buttonIcon={<Plus size={22} strokeWidth={2.5} />}
        buttonTo="/admin/products/new"
      />

      {/* ====================================================== */}
      {/* Filters */}
      {/* ====================================================== */}

      <AdminSectionCard
        title="Search & Filters"
        description="Find any product instantly."
        actions={
          <Button
            variant="outline"
            leftIcon={<RefreshCw size={18} />}
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        }
      >
        <div className="space-y-6">

          <ProductSearch
            value={search}
            onChange={(value) => {

              setPage(1);

              setSearch(value);

            }}
          />

          <ProductFilters
            category={category}
            veg={veg}
            sort={sort}
            availability={availability}
            featured={featured}
            bestSeller={bestSeller}

            onCategoryChange={(value) => {

              setPage(1);

              setCategory(value);

            }}

            onVegChange={(value) => {

              setPage(1);

              setVeg(value);

            }}

            onSortChange={(value) => {

              setPage(1);

              setSort(value);

            }}

            onAvailabilityChange={(value) => {

              setPage(1);

              setAvailability(value);

            }}

            onFeaturedChange={(value) => {

              setPage(1);

              setFeatured(value);

            }}

            onBestSellerChange={(value) => {

              setPage(1);

              setBestSeller(value);

            }}

          />

        </div>

      </AdminSectionCard>

      {/* ====================================================== */}
      {/* Products */}
      {/* ====================================================== */}

      {products.length === 0 ? (

        <EmptyState
          title="No Products Found"
          description="No products match your current filters."
          buttonText="Reset Filters"
          onButtonClick={resetFilters}
        />

      ) : (

        <div className="space-y-8">

          <AdminSectionCard
            title="Products"
            description={`Showing ${products.length} product${
              products.length !== 1 ? "s" : ""
            } of ${pagination.total ?? products.length}.`}
            actions={
              <div className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                <ShoppingBasket size={16} />

                Total {pagination.total ?? products.length}
              </div>
            }
          >
            <ProductTable
              products={products}
              onDelete={openDeleteModal}
            />
          </AdminSectionCard>

          {pagination.totalPages > 1 && (

            <ProductPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />

          )}

        </div>

      )}

      {/* ====================================================== */}
      {/* Delete Modal */}
      {/* ====================================================== */}

      <DeleteProductModal
        isOpen={showDeleteModal}
        product={selectedProduct}
        loading={loading.deleteProduct}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />

    </section>

  );

};

export default Products;
