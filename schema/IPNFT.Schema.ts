import { z } from "zod";

import { AgreementSchema } from "./Agreement.Schema";
import { DecentralizedStorageLocation, SchemaVersion } from "./Common.Schema";
import { ProjectDetailsSchema } from "./ProjectDetails.Schema";

/**
 * descriptions including typos are copied from the official ERC
 * https://eips.ethereum.org/EIPS/eip-1155#metadata
 *
 */
export const IPNFTSchema = z
  .object({
    schema_version: SchemaVersion,
    name: z
      .string()
      .min(5)
      .describe("Identifies the asset to which this token represents"),
    description: z
      .string()
      .min(10)
      .describe("Describes the asset to which this token represents"),
    image: DecentralizedStorageLocation,
    external_url: z.string().describe("A URI pointing to an external resource"),
    terms_signature: z.string(),
    properties: z
      .object({
        type: z
          .literal("IP-NFT")
          .describe(
            "Identifier that this is an IP-NFT that complies to the standards of Molecule's IP-NFT"
          ),
        agreements: z.array(AgreementSchema),
        initial_symbol: z.string(),
        project_details: ProjectDetailsSchema,
      })
      .strict(),
  })
  .describe("Describes IP-NFT Token metadata");
