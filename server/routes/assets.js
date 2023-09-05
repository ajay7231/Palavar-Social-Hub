import express from "express";
import { getAssets } from "../controllers/assets.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/:id", getAssets);

export default router;
