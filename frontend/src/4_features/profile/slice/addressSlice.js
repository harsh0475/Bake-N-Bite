import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAddressesThunk,
  fetchDefaultAddressThunk,
  fetchAddressThunk,  
  createAddressThunk,
  updateAddressThunk,
  deleteAddressThunk,
  setDefaultAddressThunk,
} from "../thunk/addressThunk";

const initialState = {
  addresses: [],

  selectedAddress: null,

  defaultAddress: null,

  loading: false,

  updating: false,

  error: null,
};

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {

    // =====================================================
    // Clear Error
    // =====================================================

    clearAddressError: (state) => {
      state.error = null;
    },

    // =====================================================
    // Reset Address State
    // =====================================================

    resetAddresses: () => initialState,

  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // Fetch Addresses
      // =====================================================

      .addCase(
        fetchAddressesThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchAddressesThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.addresses = action.payload;
        }
      )

      .addCase(
        fetchAddressesThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Fetch Default Address
      // =====================================================

      .addCase(
        fetchDefaultAddressThunk.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchDefaultAddressThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.defaultAddress = action.payload;
        }
      )

      .addCase(
        fetchDefaultAddressThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      
      // =====================================================
      // Fetch Single Address
      // =====================================================

      .addCase(
        fetchAddressThunk.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchAddressThunk.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedAddress =
            action.payload;
        }
      )

      .addCase(
        fetchAddressThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Create Address
      // =====================================================

      .addCase(
        createAddressThunk.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        createAddressThunk.fulfilled,
        (state, action) => {
          state.updating = false;

          state.addresses.push(action.payload);

          if (action.payload.is_default) {
            state.defaultAddress = action.payload;
          }
        }
      )

      .addCase(
        createAddressThunk.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Update Address
      // =====================================================

      .addCase(
        updateAddressThunk.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        updateAddressThunk.fulfilled,
        (state, action) => {
          state.updating = false;

          const index =
            state.addresses.findIndex(
              (address) =>
                address.id === action.payload.id
            );

          if (index !== -1) {
            state.addresses[index] =
              action.payload;
          }

          if (action.payload.is_default) {
            state.defaultAddress =
              action.payload;
          }
        }
      )

      .addCase(
        updateAddressThunk.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Delete Address
      // =====================================================

      .addCase(
        deleteAddressThunk.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        deleteAddressThunk.fulfilled,
        (state, action) => {
          state.updating = false;

          state.addresses =
            state.addresses.filter(
              (address) =>
                address.id !== action.payload
            );

          if (
            state.defaultAddress?.id ===
            action.payload
          ) {
            state.defaultAddress = null;
          }
        }
      )

      .addCase(
        deleteAddressThunk.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      )

      // =====================================================
      // Set Default Address
      // =====================================================

      .addCase(
        setDefaultAddressThunk.pending,
        (state) => {
          state.updating = true;
          state.error = null;
        }
      )

      .addCase(
        setDefaultAddressThunk.fulfilled,
        (state, action) => {
          state.updating = false;

          state.defaultAddress =
            action.payload;

          state.addresses =
            state.addresses.map(
              (address) => ({
                ...address,
                is_default:
                  address.id ===
                  action.payload.id,
              })
            );
        }
      )

      .addCase(
        setDefaultAddressThunk.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAddressError,
  resetAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;