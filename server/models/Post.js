import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picture: {
      data: Buffer,
      contentType: String,
    },
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    methods: {
      findOtherPosts(cb) {
        const posts = mongoose
          .model("Post", this.schema)
          .find({ userId: this.userId });
        cb(null, posts);
      },
    },
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
