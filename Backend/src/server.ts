import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import casesRoutes from "./routes/cases.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
// We can use cookie-parser if we want to read JWT from cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/cases", casesRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
