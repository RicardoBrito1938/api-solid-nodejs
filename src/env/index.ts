import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  DATABASE_URL: z.string().default(""),
  JWT_SECRET: z.string().default(""),
});

export const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Environment validation error:", _env.error.message);

  throw new Error("Environment validation error");
}

export const env = _env.data;
