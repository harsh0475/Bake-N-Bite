import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Landmark,
  Building2,
  CheckCircle,
  Save,
  X,
} from "lucide-react";

import Button from "../../../3_components/common/Button";

const emptyForm = {
  full_name: "",
  phone: "",
  address_line_1: "",
  address_line_2: "",
  landmark: "",
  city: "",
  state: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  address_type: "home",
  is_default: false,
};

const AddressForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-orange-100 bg-white p-4 shadow-md sm:p-6"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-900 lg:text-2xl">
            {initialData ? "Edit Address" : "Add New Address"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {initialData
              ? "Update the details for this address."
              : "Fill in the details for a new delivery address."}
          </p>
        </div>

        {initialData && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-orange-50 p-2 text-orange-500 transition hover:bg-orange-100"
            aria-label="Cancel edit"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Full Name */}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
          <User size={18} className="text-orange-500" />
          Full Name
        </label>

        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* Phone */}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
          <Phone size={18} className="text-orange-500" />
          Phone Number
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* Address */}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
          <MapPin size={18} className="text-orange-500" />
          Address Line 1
        </label>

        <input
          name="address_line_1"
          value={form.address_line_1}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 font-medium text-gray-700">
          Address Line 2
        </label>

        <input
          name="address_line_2"
          value={form.address_line_2}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* Landmark */}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
          <Landmark size={18} className="text-orange-500" />
          Landmark
        </label>

        <input
          name="landmark"
          value={form.landmark}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* City & State */}

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            City
          </label>

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            State
          </label>

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      {/* Postal Code */}

      <div className="mb-5">
        <label className="mb-2 block font-medium text-gray-700">
          Postal Code
        </label>

        <input
          name="postal_code"
          value={form.postal_code}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* Address Type */}

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 font-medium text-gray-700">
          <Building2 size={18} className="text-orange-500" />
          Address Type
        </label>

        <select
          name="address_type"
          value={form.address_type}
          onChange={handleChange}
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        >
          <option value="home">🏠 Home</option>
          <option value="work">🏢 Work</option>
          <option value="other">📍 Other</option>
        </select>
      </div>

      {/* Default */}

      <label className="mb-8 flex cursor-pointer items-center gap-3 rounded-2xl bg-orange-50 p-4">
        <input
          type="checkbox"
          name="is_default"
          checked={form.is_default}
          onChange={handleChange}
        />

        <CheckCircle className="text-green-600" size={20} />

        <span className="font-medium">Set as default address</span>
      </label>

      {/* Buttons */}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          size="lg"
          fullWidth
          leftIcon={<Save size={20} />}
        >
          {initialData ? "Update Address" : "Save Address"}
        </Button>

        {initialData && onCancel && (
          <Button type="button" variant="outline" size="lg" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;