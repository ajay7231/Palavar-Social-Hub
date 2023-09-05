import Post from "../models/Post.js";
import User from "../models/User.js";
import fs from "fs";
import GridFile from "../models/Gridfile.js";
import redisClient from "../middleware/cache.js";

// Create a new post
export const createPosts = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    // Find the user in the database by their userId
    const user = await User.findById(userId);
    let File = new GridFile();
    if (req.file) {
      const file = req.file;
      const fileStream = fs.createReadStream(file.path);
      File.filename = file.originalname;
      await File.upload(fileStream);
      fs.unlinkSync(file.path);
    }

    await redisClient.del("posts");
    await redisClient.del(`posts:${userId}`);

    // Create a new Post object with the provided data
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath: req.file ? File._id : picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    // Save the new post object to the database
    await newPost.save();

    // Retrieve all posts from the database
    const posts = await Post.find();

    // Respond with all posts in the response
    res.status(201).json(posts);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ message: error.message });
  }
};

// Get all posts for the feed
export const getFeedPosts = async (req, res) => {
  try {
    const CachedPosts = await redisClient.get("posts");
    if (CachedPosts) {
      console.log("Cached Posts");
      return res.status(200).json(JSON.parse(CachedPosts));
    }
    // Retrieve all posts from the database
    const posts = await Post.find();
    await redisClient.setEx(
      "posts",
      process.env.POST_EXPIRE_TIME,
      JSON.stringify(posts)
    );
    // console.log(posts);

    // for (let post of posts) {
    //   post.findOtherPosts((err, otherPosts) => console.log(otherPosts));
    // }

    // Respond with all posts in the response
    res.status(200).json(posts);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ message: error.message });
  }
};

// Get all posts for a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const cachedUserPosts = await redisClient.get(`posts:${userId}`);
    if (cachedUserPosts) {
      console.log("Cached User Posts");
      return res.status(200).json(JSON.parse(cachedUserPosts));
    }

    // Find all posts in the database where the userId matches
    const posts = await Post.find({ userId });
    await redisClient.setEx(
      `posts:${userId}`,
      process.env.POST_EXPIRE_TIME,
      JSON.stringify(posts)
    );

    // Respond with the posts for the user in the response
    res.status(200).json(posts);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ message: error.message });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post in the database by its ID
    const post = await Post.findById(id);

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // If the user has already liked the post, remove the like; otherwise, add a like
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post in the database with the new likes data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } // Return the updated post after the update operation
    );

    // Respond with the updated post in the response
    res.status(200).json(updatedPost);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ message: error.message });
  }
};
