import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import { State, setPosts } from "../../reducers/authReducer";

type Props = {
  userId: string;
  isProfile?: boolean;
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: State) => state.posts);
  const token = useSelector((state: State) => state.token);

  const fetchPosts = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setPosts({ posts: data.reverse() }));
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const url = isProfile
      ? `${import.meta.env.VITE_URL}/posts/${userId}/posts`
      : `${import.meta.env.VITE_URL}/posts`;

    fetchPosts(url);
  }, [userId, isProfile, token]); // Adding userId, isProfile, and token to dependencies

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
