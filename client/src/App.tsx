import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import HomePage from "./scenes/homePage";
// import LoginPage from "./scenes/loginPage";
// import ProfilePage from "./scenes/profilePage";
import { useMemo, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./reducers/authReducer";
import Loader from "./components/Loader";
import Page from "./components/Page";

const ProfilePage = lazy(() => import("./scenes/profilePage"));
const HomePage = lazy(() => import("./scenes/homePage"));
const LoginPage = lazy(() => import("./scenes/loginPage"));

function App() {
  const mode = useSelector((state: State) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state: State) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <Page title="Login | Paraval">
                    <LoginPage />
                  </Page>
                </Suspense>
              }
            />
            <Route
              path="/home"
              element={
                isAuth ? (
                  <Suspense fallback={<Loader />}>
                    <Page title="Home | Paraval">
                      <HomePage />
                    </Page>
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/profile/:userId"
              element={
                isAuth ? (
                  <Suspense fallback={<Loader />}>
                    <Page title="Profile | Paraval">
                      <ProfilePage />
                    </Page>
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
