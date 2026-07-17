import { ArrowLeft, Save } from "lucide-react";

const AdminBottomActionBar = ({
  backText = "Back",
  submitText = "Save",
  loadingText = "Saving...",
  loading = false,
  onBack,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl gap-3 px-3 py-3 sm:px-5 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 font-semibold transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />

          {backText}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={onSubmit}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />

          {loading ? loadingText : submitText}
        </button>
      </div>
    </div>
  );
};

export default AdminBottomActionBar;