// env.ts
import { z } from 'zod';

const envSchema = z.object({
  API_KEY: z.coerce.string(),
});

export default envSchema.parse(process.env);
