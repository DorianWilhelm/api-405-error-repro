import { z } from "zod";

export const CurrencyTypeEnum = z.enum(["ISO4217"]);

/**
  snake case required by lit
*/

const ZABIElement = z.object({
  name: z.string(),
  type: z.string(),
  internalType: z.string().optional(),
});

const ZFunctionABI = z.object({
  inputs: z.array(ZABIElement),
  outputs: z.array(ZABIElement),
  name: z.string(),
  payable: z.boolean().optional(),
  stateMutability: z.enum(["view", "pure"]),
  type: z.literal("function"),
});

const BaseControlCondition = z
  .object({
    contractAddress: z.string(),
    chain: z.string(),
    returnValueTest: z.object({
      key: z.string().optional(),
      comparator: z.string(),
      value: z.string(),
    }),
  })
  .strict();

export const BasicAccessControlCondition = BaseControlCondition.extend({
  conditionType: z.literal("evmBasic"),
  standardContractType: z.enum(["ERC721", "ERC1155"]),
  method: z.string(),
  parameters: z.array(z.string()),
}).strict();

export const CustomControlCondition = BaseControlCondition.extend({
  conditionType: z.literal("evmContract"),
  functionName: z.string(),
  functionParams: z.array(z.string()),
  functionAbi: ZFunctionABI,
}).strict();

export const BooleanControlCondition = z.object({
  operator: z.enum(["or", "and"]),
});

export const AccessControlConditions = z.array(
  z.union([
    BasicAccessControlCondition,
    CustomControlCondition,
    BooleanControlCondition,
  ])
);

export const DecentralizedStorageLocation = z
  .string()
  .regex(
    new RegExp("^(ar|ipfs|http|https)\\b(://)\\w*"),
    "URL must start with ar://, ipfs://, http:// or https://"
  )
  .describe(
    "a url that resolves to the payload in a decentralized storage location"
  );
export const SchemaVersion = z
  .string()
  .min(5)
  .max(14)
  .regex(RegExp("^(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)$"))
  .describe("Semantic version number of schema that is being used");

export const FIAT_DECIMALS = 2;
export const MonetaryValueSchema = z.object({
  value: z.number().describe(`The value of the monetary amount`),
  decimals: z.number().min(0).max(18).describe("The number of decimals"),
  currency: z
    .string()
    .min(3)
    .max(3)
    .describe("3-letter intl currency code of the monetary amount"),
  currency_type: CurrencyTypeEnum,
});
