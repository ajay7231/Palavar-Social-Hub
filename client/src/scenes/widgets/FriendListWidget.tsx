import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, setFriends } from "../../reducers/authReducer";
import { CustomPalette } from "../../theme";

// const Friend = lazy(() => import("../../components/Friend"));

const FriendListWidget = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const {
    palette,
  }: {
    palette: CustomPalette;
  } = useTheme();
  const token = useSelector((state: State) => state.token);
  const friends = useSelector((state: State) => state.user?.friends);
  const [loaded, setLoaded] = useState(false);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (!loaded) getFriends();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
