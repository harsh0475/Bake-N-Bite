import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAddresses,
  getDefaultAddress,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../api/addressApi";

// ======================================================
// Error Helper
// ======================================================

const getErrorMessage = (
  error,
  fallback
) => {

  const detail =
    error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return (
      detail[0]?.msg ||
      fallback
    );
  }

  if (typeof detail === "string") {
    return detail;
  }

  return fallback;

};

// ======================================================
// Fetch All Addresses
// ======================================================

export const fetchAddressesThunk =
  createAsyncThunk(
    "address/getAll",

    async (
      _,
      thunkAPI
    ) => {

      try {

        return await getAddresses();

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch addresses."
          )
        );

      }

    }
  );

// ======================================================
// Fetch Default Address
// ======================================================

export const fetchDefaultAddressThunk =
  createAsyncThunk(
    "address/default",

    async (
      _,
      thunkAPI
    ) => {

      try {

        return await getDefaultAddress();

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch default address."
          )
        );

      }

    }
  );

// =======================================

export const fetchAddressThunk =
  createAsyncThunk(
    "address/getOne",
    async (id, thunkAPI) => {
      try {
        return await getAddress(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to fetch address."
          )
        );
      }
    }
  );

// ======================================================
// Create Address
// ======================================================

export const createAddressThunk =
  createAsyncThunk(
    "address/create",

    async (
      data,
      thunkAPI
    ) => {

      try {

        return await createAddress(
          data
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to create address."
          )
        );

      }

    }
  );

// ======================================================
// Update Address
// ======================================================

export const updateAddressThunk =
  createAsyncThunk(
    "address/update",

    async (
      {
        addressId,
        data,
      },
      thunkAPI
    ) => {

      try {

        return await updateAddress(
          addressId,
          data
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to update address."
          )
        );

      }

    }
  );

// ======================================================
// Delete Address
// ======================================================

export const deleteAddressThunk =
  createAsyncThunk(
    "address/delete",

    async (
      addressId,
      thunkAPI
    ) => {

      try {

        await deleteAddress(
          addressId
        );

        return addressId;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to delete address."
          )
        );

      }

    }
  );

// ======================================================
// Set Default Address
// ======================================================

export const setDefaultAddressThunk =
  createAsyncThunk(
    "address/default/update",

    async (
      addressId,
      thunkAPI
    ) => {

      try {

        return await setDefaultAddress(
          addressId
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          getErrorMessage(
            error,
            "Unable to set default address."
          )
        );

      }

    }
  );