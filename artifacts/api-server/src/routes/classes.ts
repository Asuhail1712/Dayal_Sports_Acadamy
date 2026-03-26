import { Router, Request, Response } from "express";
import { classesTable } from "../lib/db/src/schema/index.js";
import { GetClassesResponse } from "../lib/api-zod/src/index.js";

const router = Router();

router.get("/classes", async (_req: Request, res: Response): Promise<void> => {
  try {
    if (!process.env.DATABASE_URL) {
      res.status(503).json({
        message: "DATABASE_URL is not configured",
      });
      return;
    }

    const { db } = await import("../lib/db/src/index.js");

    const classes = await db
      .select()
      .from(classesTable)
      .orderBy(classesTable.id);

    const data = GetClassesResponse.parse(
      classes.map((c: any) => ({
        ...c,
        price: Number(c.price),
        imageUrl: c.imageUrl ?? undefined,
      }))
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;