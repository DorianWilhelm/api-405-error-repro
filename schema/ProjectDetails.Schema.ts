import { z } from "zod";
import { MonetaryValueSchema } from "./Common.Schema";

export const ProjectDetailsSchema = z
  .object({
    industry: z
      .string()
      .optional()
      .describe("Economic industry that this IP relates to"), //Backwards compatability
    organization: z.string().describe("Organization that created the IP"),
    topic: z.string().min(3).describe("Topic of the IP"),
    funding_amount: MonetaryValueSchema,
    research_lead: z.object({
      first_name: z.string().min(3).optional(), // Backwards compatibility with old ip-nfts (only relevant for goerli)
      last_name: z.string().optional(), // Backwards compatibility with old ip-nfts (only relevant for goerli)
      name: z.string().min(3),
      email: z.string().email(),
    }),
  })
  .describe(
    "describes a research project that generates intellectual property"
  );
