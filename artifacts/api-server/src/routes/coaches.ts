import { Router, Request, Response } from "express";
import { db } from "@workspace/db";
import { coachesTable } from "@workspace/db/schema";
import { GetCoachesResponse } from "@workspace/api-zod";

const router = Router();

router.get("/coaches", async (_req: Request, res: Response) => {
  try {
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