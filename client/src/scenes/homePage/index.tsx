import { lazy, Suspense } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import Loader from "../../components/Loader";
import { State, User } from "../../reducers/authReducer";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
import AdvertWidget from "../widgets/AdvertWidget";

const LazyPostsWidget = lazy(() => import("../widgets/PostsWidget"));
// const LazyAdvertWidget = lazy(() => import("../widgets/AdvertWidget"));

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector(
    (state: State) => state.user as User
  );
  // console.log(import.meta.env.VITE_URL);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <Suspense fallback={<Loader />}> */}
          <UserWidget userId={_id} picturePath={picturePath} />
          {/* </Suspense> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <Suspense fallback={<Loader />}> */}
          <MyPostWidget picturePath={picturePath} />
          {/* </Suspense> */}
          <Suspense fallback={<Loader />}>
            <LazyPostsWidget userId={_id} />
          </Suspense>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Suspense fallback={<Loader />}>
              <AdvertWidget />
            </Suspense>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
