import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1).max(255),
  age: z.number().int().positive(),
  email: z.string().email().optional(),
})

export type User = z.infer<typeof UserSchema>
