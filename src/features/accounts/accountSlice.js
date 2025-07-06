import { createSlice } from "@reduxjs/toolkit";
//createSlice helps in three big benefits
//1)it will automatically create action creators from our reducers
//2)it makes writing these reducers a lot easier because we no longer need that switch statement and also default case is also handled
//3)we can actually mutate our state inside reducers
//behind the scenes ,it  has a library called Immer which still converts to immutable logic
///*****
// the main thing to remember these automatically created action creators only accepts single argument  */
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    //action creators can only receive single argument ,so we need to use prepare the data before it reached the reducer
    //so we created a new object (requestLoan) adn preaped data using " prepare " then we returned the new object

    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convetingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  //when we are returning a function here ,redux knows that is teh
  //asynchronous action that we want to execute before dispatching anythinh to store
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    //API CALL
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const converted = Number((amount * data.rates.USD).toFixed(2));

    dispatch({ type: "account/deposit", payload: converted });
  };
}

export default accountSlice.reducer;
// export default function accountreducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };
//   //when we are returning a function here ,redux knows that is teh
//   //asynchronous action that we want to execute before dispatching anythinh to store
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     //API CALL
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     );
//     const data = await res.json();
//     const converted = Number((amount * data.rates.USD).toFixed(2));

//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return {
//     type: "account/withdraw",
//     payload: amount,
//   };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }
// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
