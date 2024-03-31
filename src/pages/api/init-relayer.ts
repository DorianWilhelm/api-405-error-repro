// import {
//   DefenderRelayProvider,
//   DefenderRelaySigner,
// } from "@openzeppelin/defender-relay-client/lib/ethers";
import { Relayer } from "@openzeppelin/defender-relay-client";

import { NextApiRequest, NextApiResponse } from "next";
import { toBytes } from "viem";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

const message =
  "0x15594d726c05f63142e1717e5a726a4edb96b4dcd6818fa94bebe22f05cec50e";

// const signature = "0x23c66e968d4fc0a3bc6aceedf12094040a39575bdfe0707e54305d4a1caefe01301c212e038a11b2e480f1c2ac873f43d99e210cf5130a07576624c7660dd32601546d71"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const relayer = new Relayer({
    apiKey: defenderCredentials.apiKey,
    apiSecret: defenderCredentials.apiSecret,
  });
  const signResponse = await relayer.sign({
    message,
  });
  console.log({ signResponse });

  return res.status(200).json({
    status: "ok",
  });
}
