import { lazy, Suspense } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import Loader from "../../components/Loader";
import { State, User } from "../../reducers/authReducer";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const PostsWidget = lazy(() => import("../widgets/PostsWidget"));

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const token = useSelector((state: State) => state.token);
  const loggedInUser = useSelector((state: State) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
    document.title = `${data.firstName} ${data.lastName} | Paraval`;
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId ?? ""} picturePath={user?.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId ?? ""} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget
            picturePath={loggedInUser ? loggedInUser.picturePath : ""}
          />
          <Box m="2rem 0" />
          <Suspense fallback={<Loader />}>
            <PostsWidget userId={userId ?? ""} isProfile />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
