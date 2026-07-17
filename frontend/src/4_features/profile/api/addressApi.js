import api from "../../../1_app/axios";

// ======================================================
// Get All Addresses
// ======================================================

export const getAddresses = async () => {

  const response = await api.get(
    "/addresses"
  );

  return response.data;

};

// ======================================================
// Get Default Address
// ======================================================

export const getDefaultAddress = async () => {

  const response = await api.get(
    "/addresses/default"
  );

  return response.data;

};

// ======================================================
// Get Single Address
// ======================================================

export const getAddress = async (
  addressId
) => {

  const response = await api.get(
    `/addresses/${addressId}`
  );

  return response.data;

};

// ======================================================
// Create Address
// ======================================================

export const createAddress = async (
  data
) => {

  const response = await api.post(
    "/addresses",
    data
  );

  return response.data;

};

// ======================================================
// Update Address
// ======================================================

export const updateAddress = async (
  addressId,
  data
) => {

  const response = await api.put(
    `/addresses/${addressId}`,
    data
  );

  return response.data;

};

// ======================================================
// Delete Address
// ======================================================

export const deleteAddress = async (
  addressId
) => {

  const response = await api.delete(
    `/addresses/${addressId}`
  );

  return response.data;

};

// ======================================================
// Set Default Address
// ======================================================

export const setDefaultAddress = async (
  addressId
) => {

  const response = await api.put(
    `/addresses/${addressId}/default`
  );

  return response.data;

};