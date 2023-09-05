import { createClient } from "redis";
// const redisClient = Redis.createClient({
//   password: process.env.REDIS_PASS,
//   socket: {
//     host: "redis-12832.c301.ap-south-1-1.ec2.cloud.redislabs.com",
//     port: 12832,
//   },
// });

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

await redisClient.connect();
export default redisClient;
export const setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 5;
  // const urls = ["/assets"];

  // you only want to cache for GET requests
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

  // remember to call next() to pass on the request
  next();
};
