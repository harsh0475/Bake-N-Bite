// ==========================================================
// Backend Configuration
// ==========================================================

export const API_BASE_URL =
  import.meta.env.VITE_API_URL;
  
export const API_V1 =
  `${API_BASE_URL}/api/v1`;

// ==========================================================
// Google Sign-In
// ==========================================================

export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "";