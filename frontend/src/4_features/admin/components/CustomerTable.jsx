import { Link } from "react-router-dom";
import {
  Eye,
  Mail,
  Phone,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
} from "lucide-react";

const Badge = ({
  text,
  color,
}) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color}`}
  >
    {text}
  </span>
);

const CustomerTable = ({
  customers,
}) => {
  return (

    <>

      {/* ====================================================== */}
      {/* Mobile Cards */}
      {/* ====================================================== */}

      <div className="space-y-4 lg:hidden">

        {customers.map((customer) => (

          <div
            key={customer.id}
            className="rounded-[30px] border border-orange-100 bg-white p-5 shadow-lg"
          >

            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-xl font-bold text-white">

                {customer.full_name
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

              <div className="min-w-0 flex-1">

                <h3 className="truncate text-lg font-black text-gray-900">

                  {customer.full_name}

                </h3>

                <p className="text-sm text-gray-500">

                  Customer ID #{customer.id}

                </p>

              </div>

            </div>

            <div className="mt-4 space-y-2">

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <Mail
                  size={15}
                  className="text-orange-500"
                />

                <span className="truncate">
                  {customer.email}
                </span>

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <Phone
                  size={15}
                  className="text-green-500"
                />

                {customer.phone}

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              <Badge
                text={customer.role}
                color="bg-orange-100 text-orange-700"
              />

              {customer.is_verified ? (
                <Badge
                  text="Verified"
                  color="bg-green-100 text-green-700"
                />
              ) : (
                <Badge
                  text="Not Verified"
                  color="bg-red-100 text-red-700"
                />
              )}

              {customer.is_active ? (
                <Badge
                  text="Active"
                  color="bg-green-100 text-green-700"
                />
              ) : (
                <Badge
                  text="Inactive"
                  color="bg-gray-200 text-gray-700"
                />
              )}

            </div>

            <div className="mt-4 flex items-center justify-between border-t border-orange-50 pt-4">

              <p className="text-sm text-gray-500">

                Joined{" "}
                {new Date(
                  customer.created_at
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}

              </p>

              <Link
                to={`/admin/customers/${customer.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >

                <Eye size={16} />

                View

              </Link>

            </div>

          </div>

        ))}

      </div>

      {/* ====================================================== */}
      {/* Desktop Table */}
      {/* ====================================================== */}

      <div className="hidden overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-xl lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            {/* ====================================================== */}
            {/* Header */}
            {/* ====================================================== */}

            <thead className="bg-gradient-to-r from-orange-50 to-white">

              <tr>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Contact
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Role
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Verification
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Status
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Joined
                </th>

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            {/* ====================================================== */}
            {/* Body */}
            {/* ====================================================== */}

            <tbody className="divide-y divide-orange-50 bg-white">

              {customers.map(
                (customer) => (

                  <tr
                    key={customer.id}
                    className="transition hover:bg-orange-50/60"
                  >

                    {/* Customer */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-lg font-bold text-white">

                          {customer.full_name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <h3 className="font-semibold text-gray-900">

                            {customer.full_name}

                          </h3>

                          <p className="text-sm text-gray-500">

                            Customer ID #{customer.id}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Contact */}

                    <td className="px-6 py-5">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm">

                          <Mail
                            size={15}
                            className="text-orange-500"
                          />

                          {customer.email}

                        </div>

                        <div className="flex items-center gap-2 text-sm">

                          <Phone
                            size={15}
                            className="text-green-500"
                          />

                          {customer.phone}

                        </div>

                      </div>

                    </td>

                    {/* Role */}

                    <td className="px-6 py-5 text-center">

                      <Badge
                        text={customer.role}
                        color="bg-orange-100 text-orange-700"
                      />

                    </td>

                    {/* Verification */}

                    <td className="px-6 py-5 text-center">

                      {customer.is_verified ? (

                        <Badge
                          text="Verified"
                          color="bg-green-100 text-green-700"
                        />

                      ) : (

                        <Badge
                          text="Not Verified"
                          color="bg-red-100 text-red-700"
                        />

                      )}

                    </td>

                    {/* Active */}

                    <td className="px-6 py-5 text-center">

                      {customer.is_active ? (

                        <Badge
                          text="Active"
                          color="bg-green-100 text-green-700"
                        />

                      ) : (

                        <Badge
                          text="Inactive"
                          color="bg-gray-200 text-gray-700"
                        />

                      )}

                    </td>

                    {/* Joined */}

                    <td className="px-6 py-5 text-center">

                      <div className="text-sm">

                        {new Date(
                          customer.created_at
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </div>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-2">

                        <Link
                          to={`/admin/customers/${customer.id}`}
                          className="rounded-xl bg-orange-100 p-3 text-orange-600 transition-all hover:bg-orange-500 hover:text-white"
                          title="View Customer"
                        >

                          <Eye size={18} />

                        </Link>

                        {customer.is_verified ? (

                          <div
                            className="rounded-xl bg-green-100 p-3 text-green-700"
                            title="Verified"
                          >

                            <ShieldCheck size={18} />

                          </div>

                        ) : (

                          <div
                            className="rounded-xl bg-red-100 p-3 text-red-700"
                            title="Not Verified"
                          >

                            <ShieldX size={18} />

                          </div>

                        )}

                        {customer.is_active ? (

                          <div
                            className="rounded-xl bg-green-100 p-3 text-green-700"
                            title="Active"
                          >

                            <UserCheck size={18} />

                          </div>

                        ) : (

                          <div
                            className="rounded-xl bg-gray-200 p-3 text-gray-700"
                            title="Inactive"
                          >

                            <UserX size={18} />

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );
};

export default CustomerTable;
