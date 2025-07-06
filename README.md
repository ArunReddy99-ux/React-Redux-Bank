# React-Redux-Bank

A React application demonstrating state management using Redux Toolkit.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Key Concepts](#key-concepts)
- [How the Application Works](#how-the-application-works)

## Project Overview

This app showcases Redux Toolkit for managing state in a React project, with features for account and customer management.

## Features

- Account operations (deposit, withdraw, etc.)
- Customer creation and management
- State management with Redux Toolkit
- Modular, scalable folder structure
- Redux DevTools integration

## Project Structure
<pre> ```text redux-intro/ │ ├── public/ │ └── index.html ├── src/ │ ├── App.js │ ├── index.js │ ├── index.css │ ├── store.js │ └── features/ │ ├── accounts/ │ │ ├── AccountOperations.js │ │ ├── accountSlice.js │ │ └── BalanceDisplay.js │ └── customers/ │ ├── CreateCustomer.js │ ├── Customer.js │ └── customerSlice.js ├── package.json └── README.md ``` </pre>
## Technologies Used

- React
- Redux Toolkit
- React-Redux
- JavaScript (ES6+)
- Redux DevTools

## Key Concepts

- **Redux Toolkit**: Simplifies Redux setup with `configureStore`, `createSlice`, and built-in middleware.
- **Slices**: Each feature (accounts, customers) has its own slice for actions and reducers.
- **Thunk Middleware**: Handles async logic.
- **Component Structure**: Organized by feature for scalability.

## How the Application Works
## How the Application Works

### 1. Store Configuration

- The Redux store is set up in `store.js` using **`configureStore`** from Redux Toolkit.
- `configureStore` simplifies store setup by:
  - Automatically combining all reducers (here: `account` and `customer`).
  - Adding the **Thunk middleware** by default for handling asynchronous actions.
  - Enabling **Redux DevTools** for easier debugging.
- The store is exported and provided to the React app using the **`<Provider>`** component from `react-redux` (typically in `index.js`).

### 2. State Slices

- **Account Slice (`accountSlice.js`):**
  - Created using **`createSlice`** from Redux Toolkit, which combines state, reducers, and actions in one place.
  - Manages all state and logic related to account operations (e.g., balance, deposit, withdraw).
  - Can include async thunks for side effects (like API calls).
- **Customer Slice (`customerSlice.js`):**
  - Also uses **`createSlice`** for customer-related state (e.g., customer details, creation).
  - Follows the same pattern as the account slice, keeping logic modular and maintainable.

### 3. Feature Components

- **Account Features:**
  - `AccountOperations.js`: UI for performing account actions (deposit, withdraw, etc.), dispatches actions using the **`useDispatch`** hook.
  - `BalanceDisplay.js`: Reads the current account balance from the Redux store using the **`useSelector`** hook and displays it.
- **Customer Features:**
  - `CreateCustomer.js`: Form for adding a new customer, dispatches actions to update the customer state.
  - `Customer.js`: Displays customer information, reads from the Redux store using **`useSelector`**.

### 4. Data Flow

- Components use the **`useDispatch`** hook to send actions (e.g., deposit, create customer) to the Redux store.
- The store processes these actions using the appropriate slice reducer, updating the state.
- Components use the **`useSelector`** hook to read the latest state from the store and update the UI automatically.
- If asynchronous logic is needed (e.g., API calls), Redux Toolkit’s built-in **thunk middleware** handles it seamlessly.

### 5. Scalability and Structure

- The codebase is organized by feature, making it easy to add new slices or components as the app grows.
- Each feature folder contains its own slice, UI components, and related logic, promoting separation of concerns and maintainability.

### 6. Developer Experience

- **Redux DevTools** are enabled by default, allowing you to inspect actions, state changes, and time-travel debug.
- The use of Redux Toolkit’s functions (`configureStore`, `createSlice`) and hooks (`useDispatch`, `useSelector`) reduces boilerplate, enforces best practices, and makes state management more efficient and developer-friendly.

