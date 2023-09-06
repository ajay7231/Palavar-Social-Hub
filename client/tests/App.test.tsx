// App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "../src/App";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();
const store = mockStore({
  user: null,
  token: null,
  mode: "light",
  posts: [],
});

const UpdatedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

it("renders without crashing", async () => {
  render(<UpdatedApp />);
  screen.debug();
}); // check if the component is rendered
