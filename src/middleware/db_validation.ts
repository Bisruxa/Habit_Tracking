import {z} from 'zod'
export const createUserSchema = z.object ({
  email:z.string().email('Invalid email'),
  password:z.string().min(8),
 username:z.string().min(3),
 firstName:z.string().max(50).optional(),
 lastName:z.string().max(50).optional(),
})
export const loginSchema = z.object({
  email:z.string().email('Invalid email'),
  password:z.string().min(8),

})
export const createHabitSchema=z.object({
  name:z.string().min(1).max(100),
  description:z.string().max(500).optional(),
  frequency:z.enum(['daily','weekly','monthly']),
  targetCount:z.number().min(1).optional(),
  isActive:z.boolean().optional(),
  userId:z.string().uuid(),
})

export const createEntrySchema =z.object({
  note:z.string().max(500).optional(),
  habitId:z.string().uuid(),
})
export const createTagSchema = z.object({
  name:z.string().min(1).max(50),
  color:z.string().optional(),
})

export const createHabitTagSchema = z.object({
  habitId:z.string().uuid(),
  tagId:z.string().uuid(),
})