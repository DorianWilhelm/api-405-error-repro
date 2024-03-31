// import {
//   DefenderRelayProvider,
//   DefenderRelaySigner,
// } from "@openzeppelin/defender-relay-client/lib/ethers";
import { Relayer } from "@openzeppelin/defender-relay-client";

import { NextApiRequest, NextApiResponse } from "next";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

const message =
  "0x15594d726c05f63142e1717e5a726a4edb96b4dcd6818fa94bebe22f05cec50e";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const relayer = new Relayer({
    apiKey: defenderCredentials.apiKey,
    apiSecret: defenderCredentials.apiSecret,
  });
  const signResponse = await relayer.sign({ message });
  console.log({ signResponse });

  return res.status(200).json({
    status: "ok",
  });
}
