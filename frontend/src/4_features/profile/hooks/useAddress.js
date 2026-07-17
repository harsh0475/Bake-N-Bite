import { useCallback } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchAddressesThunk,
  fetchDefaultAddressThunk,
  fetchAddressThunk,
  createAddressThunk,
  updateAddressThunk,
  deleteAddressThunk,
  setDefaultAddressThunk,
} from "../thunk/addressThunk";

const useAddress = () => {
  const dispatch = useDispatch();

  const address = useSelector(
    (state) => state.address
  );

  const fetchAddresses = useCallback(
    () =>
      dispatch(
        fetchAddressesThunk()
      ).unwrap(),
    [dispatch]
  );

  const fetchDefaultAddress =
    useCallback(
      () =>
        dispatch(
          fetchDefaultAddressThunk()
        ).unwrap(),
      [dispatch]
    );
  
  const fetchAddress = useCallback((id) => {
    return dispatch(
      fetchAddressThunk(id)
    ).unwrap();
  }, [dispatch]);

  const createAddress = useCallback(
    (data) =>
      dispatch(
        createAddressThunk(data)
      ).unwrap(),
    [dispatch]
  );

  const updateAddress = useCallback(
    (id, data) =>
      dispatch(
        updateAddressThunk({
          addressId: id,
          data,
        })
      ).unwrap(),
    [dispatch]
  );

  const deleteAddress = useCallback(
    (id) =>
      dispatch(
        deleteAddressThunk(id)
      ).unwrap(),
    [dispatch]
  );

  const setDefaultAddress =
    useCallback(
      (id) =>
        dispatch(
          setDefaultAddressThunk(id)
        ).unwrap(),
      [dispatch]
    );

  return {
    ...address,

    fetchAddresses,

    fetchDefaultAddress,

    fetchAddress,   

    createAddress,

    updateAddress,

    deleteAddress,

    setDefaultAddress,
  };
};

export default useAddress;