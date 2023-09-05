import supertest from "supertest";
import app from "../index";
const request = supertest(app);

describe("Test the assets path", () => {
  test("It should response the GET method", async () => {
    const fileId = "64f0e8c43e32eceb3c340f14";
    const response = await request.get(`/assets/${fileId}`);
    expect(response.statusCode).toBe(200);
    //  to have a content-type of image/jpeg
    expect(response.headers["content-type"]).toEqual("image/jpeg");
    //  expect(response.headers["e-tag"]).toEqual(fileId);

    //  to have a cache-control of public, max-age=300, must-revalidate
    expect(response.headers["cache-control"]).toEqual(
      `public, max-age=${process.env.FILE_EXPIRE_TIME}, must-revalidate`
    );
  });
});

describe("Test the assets path with invalid ID", () => {
  test("It should response the GET method", async () => {
    const fileId = "64f0e8c43e32eceb3c340f18";
    //  const response = await request.get(`/assets/${fileId}`);
    request.get(`/assets/${fileId}`).expect(404, {
      message: "File not found",
    });
    //  console.log(response.body.message).toEqual("File not found");
    //  expect(response.statusCode).toBe(404);
    //  expect(response.body).toEqual(Buffer.from('{ message: 'File not found" }'));

    //  to have a message of File not found  res.status(404).json({ message: "File not found" });
    //  expect(response.body.message).toEqual("File not found");
  });
});

describe("Test the assets path with invalid ID format", () => {
  test("It should response the GET method", async () => {
    const fileId = "wrong-format-id";

    const response = await request.get(`/assets/${fileId}`);
    expect(response.statusCode).toBe(500);
  });
});
// Mock the Redis client methods
// jest.mock(redisClient, () => {
//   const mockGet = jest.fn();
//   const mockSetEx = jest.fn();

//   return {
//     get: mockGet,
//     setEx: mockSetEx,
//   };
// });

// describe("GET assets/:id", () => {
//   it("should return cached file if available", async () => {
//     const id = "some-file-id";
//     const cachedFile = "cached-binary-data";

//     //  redisClient.get.mockResolvedValue(cachedFile);

//     const response = await request.get(`assets/${id}`);

//     expect(response.status).toBe(200);
//     expect(response.header["e-tag"]).toBe(id);
//  expect(response.body).toEqual(Buffer.from(cachedFile, "binary"));
//   });

//   it("should return file from MongoDB if not cached", async () => {
//     const id = "some-file-id";
//     const fileData = "binary-data-from-database";

//     redisClient.get.mockResolvedValue(null);

//     // Mock MongoDB GridFile.findById to return the file data
//     //  const GridFile = require("../models/Gridfile");
//     GridFile.findById = jest.fn().mockResolvedValue({
//       filename: "example.jpg",
//       getBinaryString: jest.fn().mockResolvedValue(fileData),
//     });

//     const response = await request.get(`/assets/${id}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(Buffer.from(fileData, "binary"));
//   });

//   it("should return 404 if the file does not exist", async () => {
//     const id = "non-existent-file-id";

//     redisClient.get.mockResolvedValue(null);

//     // Mock MongoDB GridFile.findById to return null (file not found)
//     const GridFile = require("../models/Gridfile");
//     GridFile.findById = jest.fn().mockResolvedValue(null);

//     const response = await request.get(`/assets/${id}`);

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({ message: "File not found" });
//   });

//   it("should return 500 on server error", async () => {
//     const id = "some-file-id";

//     redisClient.get.mockRejectedValue(new Error("Redis error"));

//     const response = await request.get(`/assets/${id}`);

//     expect(response.status).toBe(500);
//     expect(response.body).toEqual({ error: "Redis error" });
//   });
// });
