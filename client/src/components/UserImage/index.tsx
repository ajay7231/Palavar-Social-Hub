import { Box } from "@mui/material";
import styles from "./UserImage.module.css";
type Props = {
  image: string;
  size?: string;
};
const UserImage = ({ image, size = "60px" }: Props) => {
  return (
    <Box width={size} height={size}>
      <img
        className={styles.userImage}
        //   style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${import.meta.env.VITE_URL}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
