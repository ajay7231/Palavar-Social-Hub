import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { State, User } from "../../reducers/authReducer";
import { CustomPalette } from "../../theme";
import twitterIcon from "../../assets/twitter.png";
import linkedinIcon from "../../assets/linkedin.png";

// const UserImage = lazy(() => import("../../components/UserImage"));

type Props = {
  userId: string;
  picturePath: string;
};

const UserWidget: React.FC<Props> = ({ userId, picturePath }) => {
  const [user, setUser] = useState<User | null>(null); // Specify User type
  const {
    palette,
  }: {
    palette: CustomPalette;
  } = useTheme();
  const navigate = useNavigate();
  const token = useSelector<State, string | null>(
    (state) => state.token as string | null
  ); // Type annotations for useSelector
  const darkTextColor = palette.neutral.dark;
  const mediumTextColor = palette.neutral.medium;
  const mainTextColor = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId, token]); // Add dependencies

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    profileViews,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={darkTextColor}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={mediumTextColor}>
              {friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: mainTextColor }} />
          <Typography color={mediumTextColor}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: mainTextColor }} />
          <Typography color={mediumTextColor}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={mediumTextColor}>
            Who's viewed your profile
          </Typography>
          <Typography color={mainTextColor} fontWeight="500">
            {profileViews}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={mediumTextColor}>
            Impressions of your post
          </Typography>
          <Typography color={mainTextColor} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={mainTextColor}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={twitterIcon} alt="twitter" />
            <Box>
              <Typography color={mainTextColor} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={mediumTextColor}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: mainTextColor }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={linkedinIcon} alt="linkedin" />
            <Box>
              <Typography color={mainTextColor} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={mediumTextColor}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: mainTextColor }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
