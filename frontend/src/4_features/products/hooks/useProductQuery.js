import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";

const useProductQuery = (filters = {}) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts(filters);

        console.log("Fetched Products:", data);

        if (mounted) {
          setProducts(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.data?.detail ??
              "Unable to load products."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
  };
};

export default useProductQuery;