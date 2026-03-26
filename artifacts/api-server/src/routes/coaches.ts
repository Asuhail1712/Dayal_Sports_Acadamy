import { Router, Request, Response } from "express";
import { coachesTable } from "../lib/db/src/schema";
import { GetCoachesResponse } from "../lib/api-zod/src";

const router = Router();

router.get("/coaches", async (_req: Request, res: Response) => {
  try {
    const { db } = await import("../lib/db/src");

    const coaches = await db
      .select()
      .from(coachesTable)
      .orderBy(coachesTable.id);

    const data = GetCoachesResponse.parse(
      coaches.map((c: any) => ({
        ...c,
      }))
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;