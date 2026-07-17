import {
  API_BASE_URL,
} from "../8_constants/config";

// ==========================================================
// Build Full Image URL
// ==========================================================

export const getImageUrl = (
  image
) => {
  if (!image) {
    return null;
  }

  // Blob URL (preview after selecting file)
  if (image.startsWith("blob:")) {
    return image;
  }

  // Already absolute URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // Backend uploaded image
  return `${API_BASE_URL}${image}`;
};