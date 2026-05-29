import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type User = {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
};

import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isServerless =
  process.env.VERCEL === "1" || process.env.AWS_REGION || process.env.NODE_ENV === "production";
const DB_PATH = isServerless
  ? path.join(os.tmpdir(), "users.json")
  : path.join(__dirname, "users.json");

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
}

export async function getUsers(): Promise<User[]> {
  await ensureDb();
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export async function saveUser(user: User): Promise<void> {
  const users = await getUsers();
  users.push(user);
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email === email);
}
