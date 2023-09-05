import { Modal, Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
// import Backdrop from "@mui/material/Backdrop";

type Props = {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
};

const SocialMediaModal = ({ open, onClose, shareUrl, title }: Props) => {
  const handleShare = (platform: string) => {
    let shareLink = "";

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(title)}`;
        break;
      case "instagram":
        shareLink = `https://www.instagram.com/`;
        break;
      default:
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      // Backdrop={Backdrop}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: "90%",
          maxWidth: 300,
          p: 2,
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label="Facebook"
          onClick={() => handleShare("facebook")}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="Twitter" onClick={() => handleShare("twitter")}>
          <TwitterIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="LinkedIn"
          onClick={() => handleShare("linkedin")}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          onClick={() => handleShare("instagram")}
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default SocialMediaModal;
