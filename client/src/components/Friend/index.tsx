import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State, User, setFriends } from "../../reducers/authReducer";
import FlexBetween from "../FlexBetween";
import UserImage from "../UserImage";
import { CustomPalette } from "../../theme";
import { Suspense, useState } from "react";
import Loader from "../Loader";

type Props = {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
};

const Friend = ({ friendId, name, subtitle, userPicturePath }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: State) => state.user as User);
  const token = useSelector((state: State) => state.token);
  const friends = useSelector((state: State) => state.user?.friends);
  const [loading, setLoading] = useState(false);

  const {
    palette,
  }: {
    palette: CustomPalette;
  } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setLoading(false);
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Suspense fallback={<Loader />}>
          <UserImage image={userPicturePath} size="55px" />
        </Suspense>
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== _id && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size="1.2rem" />
          ) : isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
