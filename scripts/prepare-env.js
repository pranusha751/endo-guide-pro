import fs from "fs";

if (process.env.VERCEL) {
  const url = process.env.POSTGRES_URL || process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

  if (url) {
    console.log("Found Vercel Database URLs, mapping to Prisma...");
    let envContent = "";
    if (fs.existsSync(".env")) {
      envContent = fs.readFileSync(".env", "utf-8");
    }
    envContent += `\nDATABASE_URL="${url}"\n`;
    fs.writeFileSync(".env", envContent);
  } else {
    console.log("No POSTGRES_URL found in Vercel environment.");
  }
}
