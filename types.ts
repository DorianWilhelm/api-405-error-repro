import { z } from "zod";
import { IPNFTSchema } from "./schema/IPNFT.Schema";

export type IPNFT = z.infer<typeof IPNFTSchema>;
