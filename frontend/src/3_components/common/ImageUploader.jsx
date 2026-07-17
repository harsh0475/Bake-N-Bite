import { useRef } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";

const ImageUploader = ({
  image,
  preview,
  onChange,
  onRemove,
  loading = false,
  label = "Image",
}) => {
  const inputRef = useRef(null);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="space-y-3">

      <label className="block font-medium text-gray-700">
        {label}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {(preview || image) ? (
        <div className="relative w-fit">

          <img
            src={preview || image}
            alt={label}
            className="h-40 w-40 rounded-xl border object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
          >
            <X size={16} />
          </button>

        </div>
      ) : (

        <button
          type="button"
          onClick={openFilePicker}
          disabled={loading}
          className="flex h-40 w-40 flex-col items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 transition hover:border-orange-500 hover:bg-orange-100"
        >

          <ImageIcon
            size={34}
            className="mb-2 text-orange-500"
          />

          <span className="text-sm font-medium">
            Select Image
          </span>

        </button>

      )}

      <button
        type="button"
        onClick={openFilePicker}
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-60"
      >
        <Upload size={18} />

        {loading
          ? "Uploading..."
          : image || preview
          ? "Replace Image"
          : "Upload Image"}
      </button>

    </div>
  );
};

export default ImageUploader;