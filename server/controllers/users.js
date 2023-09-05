import User from "../models/User.js";
import redisClient from "../middleware/cache.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const CachedUser = await redisClient.get(`user:${id}`);
    if (CachedUser) {
      console.log("Cache Hit - User");
      return res.status(200).json(JSON.parse(CachedUser));
    }
    // console.log("user/id", id);
    const user = await User.findById(id);
    const { password, updatedAt, ...other } = user._doc;
    await redisClient.setEx(
      `user:${id}`,
      process.env.USER_EXPIRE_TIME,
      JSON.stringify(other)
    );
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const CachedFriends = await redisClient.get(`friends:${id}`);
    if (CachedFriends) {
      console.log("Cache Hit - Friends");
      return res.status(200).json(JSON.parse(CachedFriends));
    }
    let CachedUser = await redisClient.get(`user:${id}`);
    if (CachedUser) {
      console.log("Cache Hit - User");
      CachedUser = JSON.parse(CachedUser);
      const friends = await Promise.all(
        CachedUser.friends.map((id) => User.findById(id))
      );
      await redisClient.setEx(
        `friends:${id}`,
        process.env.FRIENDS_EXPIRE_TIME,
        JSON.stringify(friends)
      );
      const formatedFriends = friends.map((friend) => {
        const { _id, firstName, lastName, occupation, location, picturePath } =
          friend;
        return { _id, firstName, lastName, occupation, location, picturePath };
      });
      return res.status(200).json(formatedFriends);
    }
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    await redisClient.setEx(
      `user:${id}`,
      process.env.USER_EXPIRE_TIME,
      JSON.stringify(user)
    );
    await redisClient.setEx(
      `friends:${id}`,
      process.env.FRIENDS_EXPIRE_TIME,
      JSON.stringify(friends)
    );
    const formatedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      return { _id, firstName, lastName, occupation, location, picturePath };
    });
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    // console.log("ids", id, friendId);
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    await redisClient.del(`user:${id}`);
    await redisClient.del(`user:${friendId}`);
    await redisClient.del(`friends:${id}`);
    await redisClient.del(`friends:${friendId}`);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      return { _id, firstName, lastName, occupation, location, picturePath };
    });
    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
