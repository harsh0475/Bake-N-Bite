import {
  Home,
  Building2,
  MapPin,
  Pencil,
  Trash2,
  CheckCircle2,
  Star,
} from "lucide-react";

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const getIcon = () => {
    switch (address.address_type?.toLowerCase()) {
      case "home":
        return <Home size={22} className="text-orange-500" />;
      case "work":
        return <Building2 size={22} className="text-blue-500" />;
      default:
        return <MapPin size={22} className="text-green-600" />;
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${
        address.is_default ? "border-orange-500" : "border-orange-100"
      }`}
    >
      {/* Header */}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-orange-100 p-3">{getIcon()}</div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black text-gray-900 sm:text-xl">
                {address.full_name}
              </h3>

              {address.is_default && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Default
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {address.phone}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-600">
          {address.address_type}
        </span>
      </div>

      {/* Address */}

      <div className="mt-5 rounded-2xl bg-gray-50 p-4">
        <p className="text-sm leading-7 text-gray-700 sm:text-base">
          {address.address_line_1}
          {address.address_line_2 && `, ${address.address_line_2}`}
          {address.landmark && `, ${address.landmark}`}
          <br />
          {address.city}, {address.state}
          <br />
          {address.postal_code}
        </p>
      </div>

      {/* Actions */}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        {!address.is_default && (
          <button
            type="button"
            onClick={() => onSetDefault(address.id)}
            className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 sm:col-span-1 sm:text-base"
          >
            <Star size={18} />
            Set Default
          </button>
        )}

        <button
          type="button"
          onClick={() => onEdit(address)}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-100 px-4 py-2.5 text-sm font-medium transition hover:bg-orange-50 sm:text-base"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(address.id)}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 sm:text-base"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>

      {/* Footer */}

      {address.is_default && (
        <div className="mt-5 flex items-start gap-2 border-t border-orange-100 pt-5 text-green-600">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />

          <span className="text-sm font-medium">
            This address will be used by default during checkout.
          </span>
        </div>
      )}
    </div>
  );
};

export default AddressCard;