import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//  _id, firstName, lastName, occupation, location, picturePath
export interface Friend {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  pictureId: string;
  lastName: string;
  picturePath: string;
  friends: Friend[]; // Assuming friends have user IDs
  profileViews: number;
  location?: string;
  occupation?: string;
  impressions?: number;
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  picturePath?: string;
  userPicturePath?: string;
  likes: Map<string, boolean>;
  comments: any[]; // You can replace this with a more specific type if needed
  createdAt: Date;
  updatedAt: Date;
}

export interface State {
  mode: PaletteMode; // Use a specific string literal type
  user: User | null;
  token: string | null;
  posts: any[];
}

const initialState: State = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: Friend[] }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: Post[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: Post }>) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
