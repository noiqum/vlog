import { z } from 'zod';

// Video metadata schema for validation
export const VideoMetadataSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 characters or less" }),
  description: z.string()
    .max(200, { message: "Description must be 200 characters or less" })
    .optional()
});

// Interface for Video structure
export interface Video {
  id: string;
  uri: string;
  name: string;
  description?: string;
  createdAt: number;
}

// Type for Video Metadata (for form validation)
export type VideoMetadata = z.infer<typeof VideoMetadataSchema>;