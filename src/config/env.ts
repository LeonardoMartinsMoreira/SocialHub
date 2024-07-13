// env.ts
import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_KEY: z.string(),
  EXPO_PUBLIC_PROJECT_ID: z.string(),
});

export default envSchema.parse(process.env);
