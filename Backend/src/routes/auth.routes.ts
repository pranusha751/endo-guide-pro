import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-endo-guide";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        passwordHash,
        verificationToken,
        isEmailVerified: true, // Bypassed for development
      },
    });

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      message: "Registration successful. You can now log in.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    if (!user.isEmailVerified) {
      res.status(403).json({ error: "Please verify your email address to continue." });
      return;
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ id: user.id, email: user.email, fullName: user.fullName, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.issues });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

router.get("/verify", async (req, res) => {
  const token = req.query.token as string;
  if (!token) {
    res.status(400).json({ error: "Missing verification token" });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid or expired verification token" });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
      },
    });

    res.json({ success: true, message: "Email successfully verified!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (user.isEmailVerified) {
      res.status(400).json({ error: "Email is already verified" });
      return;
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken },
    });

    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({ message: "Verification email sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
