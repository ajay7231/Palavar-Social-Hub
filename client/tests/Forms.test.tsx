import React, { useMemo, useState } from "react";
import { it, expect, describe } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import Form from "../src/scenes/loginPage/Form";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import { Provider } from "react-redux";
// import { store } from "../src/main";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../src/theme";

const StateForm = () => {
  const mockStore = configureStore();
  const store = mockStore({
    user: null,
    token: null,
    mode: "light",
    posts: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >("success");
  const [error, setError] = useState<boolean>(false);
  const mode = "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Form
            setErrorMessage={setErrorMessage}
            setError={setError}
            setSeverity={setSeverity}
          />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe("Form", () => {
  it("renders without crashing", async () => {
    render(<StateForm />);
    screen.debug();
    // check if the component is rendered
  });

  it("displays the login form by default", async () => {
    const { queryByText } = await render(<StateForm />);
    expect(queryByText("LOGIN")).toBeTruthy();
    expect(queryByText("REGISTER")).toBeFalsy();
  });

  it('switches to the register form when "Sign Up" is clicked', async () => {
    const { getByText, queryByText } = await render(<StateForm />);
    const registerButton = getByText("Don't have an account? Sign Up here.");
    await fireEvent.click(registerButton);
    expect(queryByText("LOGIN")).toBeFalsy();
    expect(queryByText("REGISTER")).toBeTruthy();
  });

  it('submits the login form when "LOGIN" is clicked', async () => {
    const { getByLabelText, getByText } = await render(<StateForm />);
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("LOGIN");

    await fireEvent.input(emailInput, {
      target: { value: "test@example.com" },
    });
    await fireEvent.input(passwordInput, { target: { value: "password123" } });
    await fireEvent.click(loginButton);

    expect(loginButton).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it('submits the register form when "REGISTER" is clicked', async () => {
    const { getByLabelText, getByText } = await render(<StateForm />);
    const registerChangeButton = getByText(
      "Don't have an account? Sign Up here."
    );
    await fireEvent.click(registerChangeButton);
    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const locationInput = getByLabelText("Location");
    const occupationInput = getByLabelText("Occupation");
    const registerButton = getByText("REGISTER");

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(locationInput).toBeTruthy();
    expect(occupationInput).toBeTruthy();
    expect(registerButton).toBeTruthy();
    expect(registerChangeButton).toBeTruthy();

    await fireEvent.input(firstNameInput, { target: { value: "John" } });
    await fireEvent.input(lastNameInput, { target: { value: "Doe" } });
    await fireEvent.input(emailInput, {
      target: { value: "test@example.com" },
    });
    await fireEvent.input(passwordInput, { target: { value: "password123" } });
    await fireEvent.input(locationInput, { target: { value: "New York" } });
    await fireEvent.input(occupationInput, { target: { value: "Developer" } });
    await fireEvent.click(registerButton);

    expect(firstNameInput.value).toBe("John");
    ("test@example.com");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(locationInput.value).toBe("New York");
    expect(occupationInput.value).toBe("Developer");

    // Add assertions for registration behavior here
  });
});
