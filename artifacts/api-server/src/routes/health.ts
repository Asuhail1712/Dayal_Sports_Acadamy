import { Router, Request, Response } from "express";
import { HealthCheckResponse } from "../lib/api-zod/src/index.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  const response = HealthCheckResponse.parse({
    status: "ok",
  });

  res.json(response);
});

export default router;