import { useDispatch, useSelector } from "react-redux";

import {
  loginThunk,
  logoutThunk,
  registerThunk,
  getCurrentUserThunk,
  googleLoginThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
} from "../thunk/authThunk";

import {
  clearForgotPasswordState,
  clearResetPasswordState,
} from "../slice/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return {
    ...auth,

    login: (data) => dispatch(loginThunk(data)).unwrap(),

    register: (data) => dispatch(registerThunk(data)).unwrap(),

    googleLogin: (credential) =>
      dispatch(googleLoginThunk(credential)).unwrap(),

    forgotPassword: (email) =>
      dispatch(forgotPasswordThunk(email)).unwrap(),

    resetPassword: (data) => dispatch(resetPasswordThunk(data)).unwrap(),

    clearForgotPasswordState: () => dispatch(clearForgotPasswordState()),

    clearResetPasswordState: () => dispatch(clearResetPasswordState()),

    getProfile: () => dispatch(getCurrentUserThunk()).unwrap(),

    logout: () => dispatch(logoutThunk()).unwrap(),
  };
};

export default useAuth;