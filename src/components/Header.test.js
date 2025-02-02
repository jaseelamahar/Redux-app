import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "./Header";
import authReducer from "./store/auth"; 
import cartReducer from "./store/cart";

const mockStore = configureStore({
  reducer: { auth: authReducer, cart: cartReducer },
  preloadedState: { auth: { isAuthenticated: true }, cart: { showcart: false } },
});

describe("Header component", () => {
  test("renders Redux Auth title", () => {
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
    expect(screen.getByText("Redux Auth")).toBeInTheDocument();
  });

  test("renders My Products link when authenticated", async () => {
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );

    const output = await screen.findByText("My Products");
    expect(output).toBeInTheDocument();
  });

  test("renders My Sales link when authenticated", async () => {
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );

    const output = await screen.findByText("My Sales");
    expect(output).toBeInTheDocument();
  });

  test("renders Logout button when authenticated", () => {
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("renders 'Your Cart' button when cart is hidden", () => {
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  test("renders 'Hide Cart' button when cart is visible", () => {
    const storeWithCartVisible = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState: { auth: { isAuthenticated: true }, cart: { showcart: true } },
    });

    render(
      <Provider store={storeWithCartVisible}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Hide Cart")).toBeInTheDocument();
  });

  test("does not show My Products when not authenticated", () => {
    const storeWithoutAuth = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState: { auth: { isAuthenticated: false }, cart: { showcart: false } },
    });

    render(
      <Provider store={storeWithoutAuth}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText("My Products")).not.toBeInTheDocument();
  });

  test("does not show Logout button when not authenticated", () => {
    const storeWithoutAuth = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState: { auth: { isAuthenticated: false }, cart: { showcart: false } },
    });

    render(
      <Provider store={storeWithoutAuth}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  test("renders navigation only when authenticated", () => {
    const storeWithoutAuth = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState: { auth: { isAuthenticated: false }, cart: { showcart: false } },
    });

    render(
      <Provider store={storeWithoutAuth}>
        <Header />
      </Provider>
    );

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
test("does not render My Products link when not authenticated", () => {
    const storeWithoutAuth = configureStore({
      reducer: { auth: authReducer, cart: cartReducer },
      preloadedState: { auth: { isAuthenticated: false }, cart: { showcart: false } },
    });
  
    render(
      <Provider store={storeWithoutAuth}>
        <Header />
      </Provider>
    );
  

    expect(screen.queryByText("My Products")).not.toBeInTheDocument();
  });
  