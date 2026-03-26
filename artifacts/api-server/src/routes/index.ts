import { Router, type IRouter } from "express";

import healthRouter from "./health.js";
import classesRouter from "./classes.js";
import coachesRouter from "./coaches.js";
import enquiriesRouter from "./enquiries.js";

const router: IRouter = Router();

router.use("/health", healthRouter);
router.use("/classes", classesRouter);
router.use("/coaches", coachesRouter);
router.use("/enquiries", enquiriesRouter);

export default router;