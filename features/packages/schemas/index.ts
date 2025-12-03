import { z } from "zod";

export const packageFormSchema = z.object({
  // Receiver Details
  receiverName: z.string().min(2, "Receiver name is required"),
  receiverEmail: z.email("Invalid email address"),
  receiverPhone: z.string().min(10, "Valid phone number is required"),
  receiverAddress: z.string().min(5, "Full address is required"),

  // Origin Details
  originLocation: z.string().min(2, "Origin location is required"),

  // Destination Details
  destinationLocation: z.string().min(2, "Destination location is required"),
  destinationDate: z
    .string()
    .min(1, "Destination date is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Date cannot be in the past"),

  // Package Details
  weight: z.string().min(1, "Weight is required (e.g. 5kg)"),
  dimensions: z.string().min(1, "Dimensions are required"),
  items: z.number().min(1, "At least 1 item is required"),
  value: z.string().min(1, "Declared value is required"),

  // Service Details
  carrier: z.string().min(1, "Carrier is required"),
  service: z.string().min(1, "Service type is required"),

  // Route Stops (Intermediate)
  stops: z.array(
    z.object({
      location: z.string().min(2, "Location is required"),
    })
  ),
});

export type PackageFormValues = z.infer<typeof packageFormSchema>;
