import { NextApiRequest, NextApiResponse } from "next";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";
import { toBytes } from "viem";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const message =
    "0x15594d726c05f63142e1717e5a726a4edb96b4dcd6818fa94bebe22f05cec50e";

  const signer = new DefenderRelaySigner(
    defenderCredentials,
    new DefenderRelayProvider(defenderCredentials),
    {
      speed: "fast",
    }
  );
  const signature = await signer.signMessage(toBytes(message));
  console.log({ signature });
  return res.status(200).json({
    status: "ok",
    signature,
  });
}
