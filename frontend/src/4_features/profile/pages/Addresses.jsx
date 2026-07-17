import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MapPinned } from "lucide-react";

import useAddress from "../hooks/useAddress";

import AddressForm from "../components/AddressForm";
import AddressList from "../components/AddressList";

import Container from "../../../3_components/common/Container";
import Breadcrumb from "../../../3_components/common/Breadcrumb";
import PromoBanner from "../../../3_components/common/PromoBanner";
import LoadingSpinner from "../../../3_components/common/LoadingSpinner";
import ErrorState from "../../../3_components/common/ErrorState";

const Addresses = () => {
  const {
    addresses,
    loading,
    error,

    fetchAddresses,
    fetchAddress,

    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddress();

  const [editingAddress, setEditingAddress] = useState(null);

  // =====================================================
  // Load Addresses
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadAddresses = async () => {
      try {
        if (mounted) {
          await fetchAddresses();
        }
      } catch {
        // handled by redux
      }
    };

    loadAddresses();

    return () => {
      mounted = false;
    };
  }, [fetchAddresses]);

  // =====================================================
  // Edit Address
  // =====================================================

  const handleEdit = async (address) => {
    try {
      const fullAddress = await fetchAddress(address.id);
      setEditingAddress(fullAddress);
    } catch (err) {
      toast.error(err || "Unable to load address.");
    }
  };

  // =====================================================
  // Cancel Edit
  // =====================================================

  const handleCancelEdit = () => {
    setEditingAddress(null);
  };

  // =====================================================
  // Create Address
  // =====================================================

  const handleCreate = async (data) => {
    try {
      await createAddress(data);
      await fetchAddresses();
      toast.success("Address added successfully.");
    } catch (err) {
      toast.error(err);
    }
  };

  // =====================================================
  // Update Address
  // =====================================================

  const handleUpdate = async (data) => {
    try {
      await updateAddress(editingAddress.id, data);
      await fetchAddresses();
      setEditingAddress(null);
      toast.success("Address updated successfully.");
    } catch (err) {
      toast.error(err);
    }
  };

  // =====================================================
  // Delete Address
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this address?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteAddress(id);
      await fetchAddresses();

      if (editingAddress && editingAddress.id === id) {
        setEditingAddress(null);
      }

      toast.success("Address deleted successfully.");
    } catch (err) {
      toast.error(err);
    }
  };

  // =====================================================
  // Set Default Address
  // =====================================================

  const handleDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      await fetchAddresses();
      toast.success("Default address updated.");
    } catch (err) {
      toast.error(err);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20">
        <LoadingSpinner text="Fetching your addresses..." />
      </div>
    );
  }

  // =====================================================
  // Error
  // =====================================================

  if (error) {
    return (
      <section className="bg-orange-50 py-16">
        <Container>
          <ErrorState
            title="Unable to load addresses"
            description={error}
            onRetry={fetchAddresses}
          />
        </Container>
      </section>
    );
  }

  const defaultAddress = addresses.find((address) => address.is_default);

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 py-8 lg:py-12">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Profile", href: "/profile" },
            { label: "Addresses" },
          ]}
        />

        {/* ====================================================== */}
        {/* Hero */}
        {/* ====================================================== */}

        <PromoBanner
          badge="📍 Delivery Addresses"
          title="My Addresses"
          description="Save multiple delivery locations for faster, hassle-free checkout."
          stats={[
            { value: addresses.length, label: "Saved" },
            { value: defaultAddress ? "1" : "0", label: "Default Set" },
          ]}
          className="mt-8"
        />

        {/* ====================================================== */}
        {/* Info Bar */}
        {/* ====================================================== */}

        <div className="my-8 flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-5">
          <div>
            <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
              Manage Your Addresses
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new address or edit one of your saved locations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 sm:self-auto">
            <MapPinned size={20} />
            {addresses.length} Address{addresses.length !== 1 ? "es" : ""}
          </div>
        </div>

        {/* ====================================================== */}
        {/* Form + List */}
        {/* ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:gap-10">
          <div className="order-1 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <AddressForm
              initialData={editingAddress}
              onSubmit={editingAddress ? handleUpdate : handleCreate}
              onCancel={editingAddress ? handleCancelEdit : undefined}
            />
          </div>

          <div className="order-2 lg:order-2">
            <AddressList
              addresses={addresses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleDefault}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Addresses;