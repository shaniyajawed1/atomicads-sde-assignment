import { Router } from "express";
import { AnalyticsController } from "../controllers/AnalyticsController";

const router = Router();

// Analytics endpoint
router.get("/metrics", AnalyticsController.getMetrics);

export default router;
