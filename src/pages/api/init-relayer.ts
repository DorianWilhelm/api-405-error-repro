import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "@openzeppelin/defender-relay-client/lib/ethers";

import { NextApiRequest, NextApiResponse } from "next";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signer = new DefenderRelaySigner(
    defenderCredentials,
    new DefenderRelayProvider(defenderCredentials),
    {
      speed: "fast",
    }
  );
  const address = await signer.getAddress();

  return res.status(200).json({
    status: "ok",
    address,
  });
}
