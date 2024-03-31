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

// const signature = "0xa65282285c98da673b145552c86a831b919624978a334bae5419b8036e1776b20ef09dc28845623e00dd6c67a64321c03b750ea6a7a4ef40ce9673e047b96e9e1c"

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
