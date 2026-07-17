import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();
const prisma = new PrismaClient();

router.use(authenticate);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const cases = await prisma.case.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
    });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const {
      patientName,
      patientAge,
      patientGender,
      tooth,
      dx,
      date,
      status,
      fileSystem,
      timestamp,
    } = req.body;

    const newCase = await prisma.case.create({
      data: {
        userId,
        patientName,
        patientAge,
        patientGender,
        tooth,
        dx,
        date,
        status,
        fileSystem,
        timestamp: timestamp || Date.now(),
      },
    });
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const caseId = req.params.id as string;
    const caseRecord = await prisma.case.findFirst({
      where: { id: caseId, userId },
    });

    if (!caseRecord) {
      res.status(404).json({ error: "Case not found" });
      return;
    }
    res.json(caseRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const caseId = req.params.id as string;
    const updateData = req.body;

    // Check if case belongs to user
    const existing = await prisma.case.findFirst({ where: { id: caseId, userId } });
    if (!existing) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    const updatedCase = await prisma.case.update({
      where: { id: caseId },
      data: updateData,
    });
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const caseId = req.params.id as string;

    const existing = await prisma.case.findFirst({ where: { id: caseId, userId } });
    if (!existing) {
      res.status(404).json({ error: "Case not found" });
      return;
    }

    await prisma.case.delete({ where: { id: caseId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
