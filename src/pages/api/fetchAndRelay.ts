import { relayerSign } from "@/lib/relayer";

import { NextApiRequest, NextApiResponse } from "next";
import { sepolia } from "viem/chains";

export const config = {
  runtime: "nodejs",
  maxDuration: 20,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { signature, address } = await relayerSign(
    sepolia.id,
    "0x15594d726c05f63142e1717e5a726a4edb96b4dcd6818fa94bebe22f05cec50e"
  );
  console.log({ signature, address });

  return res.status(200).json({
    status: "ok",
    signature,
    address,
  });
}
