import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
} from "lucide-react";

import useAdmin from "../hooks/useAdmin";

import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";
import EmptyState from "../../../3_components/common/EmptyState";

import CustomerTable from "../components/CustomerTable";

const Customers = () => {
  const {
    customers,
    loading,
    error,
    fetchCustomers,
  } = useAdmin();

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCustomers =
    useMemo(() => {
      if (!search.trim()) {
        return customers;
      }

      const keyword =
        search.toLowerCase();

      return customers.filter(
        (customer) =>
          customer.full_name
            ?.toLowerCase()
            .includes(keyword) ||
          customer.email
            ?.toLowerCase()
            .includes(keyword) ||
          customer.phone
            ?.toLowerCase()
            .includes(keyword)
      );
    }, [
      customers,
      search,
    ]);

  if (loading.customers) {
    return <LoadingSpinner />;
  }

  if (error.customers) {
    return (
      <ErrorState
        title="Unable to load customers"
        description={
          error.customers
        }
      />
    );
  }

  const verifiedCustomers =
    customers.filter(
      (customer) =>
        customer.is_verified
    ).length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.is_active
    ).length;

  return (
    <div className="space-y-8">

      {/* ====================================================== */}
      {/* Hero */}
      {/* ====================================================== */}

      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 p-6 text-white shadow-2xl sm:p-8 lg:p-10">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute bottom-0 right-24 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              👥 Customer Management
            </span>

            <h1 className="mt-6 text-3xl font-black sm:text-4xl lg:text-5xl">
              Customers
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-orange-100 sm:text-base lg:text-lg">
              View registered customers,
              manage accounts and monitor
              verification status.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <div className="rounded-3xl bg-white/20 px-6 py-5 backdrop-blur">

              <Users
                size={28}
                className="mb-3"
              />

              <p className="text-3xl font-black">
                {customers.length}
              </p>

              <p>Total Customers</p>

            </div>

            <div className="rounded-3xl bg-white/20 px-6 py-5 backdrop-blur">

              <UserCheck
                size={28}
                className="mb-3"
              />

              <p className="text-3xl font-black">
                {verifiedCustomers}
              </p>

              <p>Verified</p>

            </div>

            <div className="rounded-3xl bg-white/20 px-6 py-5 backdrop-blur">

              <Users
                size={28}
                className="mb-3"
              />

              <p className="text-3xl font-black">
                {activeCustomers}
              </p>

              <p>Active</p>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* Search */}
      {/* ====================================================== */}

      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-lg sm:p-6">

        <div className="relative">

          <Search
            size={22}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-orange-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search by customer name, email or phone..."
            className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 py-4 pl-14 pr-5 text-[15px] text-gray-800 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-orange-300 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:text-base"
          />

        </div>

      </div>

      {/* ====================================================== */}
      {/* Table */}
      {/* ====================================================== */}

      {filteredCustomers.length ===
      0 ? (
        <EmptyState
          title="No Customers Found"
          description="No customers match your search."
        />
      ) : (
        <CustomerTable
          customers={
            filteredCustomers
          }
        />
      )}

    </div>
  );
};

export default Customers;