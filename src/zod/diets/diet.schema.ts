import { z } from 'zod';
import { doctorSchema } from './diets.doctor.schema';
import { patientSchema } from './diets.patient.schema';

export const dietSchema = z.object({
  _id: z.string(),
  doctor: doctorSchema,
  patients: z.array(patientSchema),

  name: z.string(),
  category: z.string(),
  recommendations: z.string().optional(),
  benefits: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  images: z.array(z.string()).optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ZDiet = z.infer<typeof dietSchema>;
