//this configurestore wraps around createstore and adds some more functionalities to it .
//it automatically combines reducers adn automatically add the THUNK middleware adn even automatically set up the developer tools
import { configureStore } from "@reduxjs/toolkit";
import accountreducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountreducer,
    customer: customerReducer,
  },
});

export default store;
