import { MapPinned, Home } from "lucide-react";

import AddressCard from "./AddressCard";

const AddressList = ({ addresses, onEdit, onDelete, onSetDefault }) => {
  // =====================================================
  // Empty State
  // =====================================================

  if (addresses.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm sm:p-10">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <Home size={32} className="text-orange-500" />
          </div>

          <h2 className="mt-6 text-2xl font-black text-gray-900 sm:text-3xl">
            No Addresses Added
          </h2>

          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Save your delivery address using the form to make checkout much
            faster.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // Address List
  // =====================================================

  return (
    <div>
      {/* Header */}

      <div className="mb-6 flex items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-sm lg:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-orange-100 p-3 text-orange-500">
            <MapPinned size={22} />
          </div>

          <div>
            <h2 className="text-lg font-black text-gray-900 lg:text-xl">
              Saved Addresses
            </h2>

            <p className="text-sm text-gray-500">
              {addresses.length} saved address{addresses.length > 1 ? "es" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="space-y-5 sm:space-y-6">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
          />
        ))}
      </div>
    </div>
  );
};

export default AddressList;