// import { Relayer } from "@openzeppelin/defender-relay-client";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { toBytes } from "viem";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

export const relayerSign = async (network: number, message: `0x${string}`) => {
  const signer = new DefenderRelaySigner(
    defenderCredentials,
    new DefenderRelayProvider(defenderCredentials),
    {
      speed: "fast",
    }
  );
  const signature = await signer.signMessage(toBytes(message));
  const address = await signer.getAddress();
  return { signature, address };
};
