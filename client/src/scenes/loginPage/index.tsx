import { lazy } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { State } from "../../reducers/authReducer";
import { CustomPalette } from "../../theme";
import Loader from "../../components/Loader";

const Form = lazy(() => import("./Form"));

const LoginPage = () => {
  const {
    palette,
  }: {
    palette: CustomPalette;
  } = useTheme();
  const navigate = useNavigate();
  const _id = useSelector((state: State) => state.user?._id);
  const token = useSelector((state: State) => state.token);

  useEffect(() => {
    // if user is logged in, redirect to home page
    if (_id && token) navigate("/home");
  }, [_id, token]);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        sx={{
          backgroundColor: palette.background.alt,
        }}
        // backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          sx={{
            fontFamily: "kaushan Script",
          }}
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Paravel
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{
          backgroundColor: palette.background.alt,
        }}
        // backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Paravel, the Social Media for you!
        </Typography>
        <Suspense fallback={<Loader />}>
          <Form />
        </Suspense>
      </Box>
    </Box>
  );
};

export default LoginPage;
