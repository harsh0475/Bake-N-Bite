import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export default AppProviders;