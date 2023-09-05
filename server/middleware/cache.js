import Redis from "redis";
const redisClient = Redis.createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
await redisClient.connect();
export default redisClient;
export const setCache = function (req, res, next) {
  if (req.method == "GET" && req.url.includes("assets")) {
    res.set("Content-Type", "image/jpeg");
    res.set(
      "Cache-control",
      `public, max-age=${process.env.FILE_EXPIRE_TIME}, must-revalidate`
    );
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }
  next();
};
