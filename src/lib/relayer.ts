import { Relayer } from "@openzeppelin/defender-relay-client";

import { privateKeyToAccount } from "viem/accounts";

const defenderCredentials = {
  apiKey: process.env.DEFENDER_RELAY_API_KEY!,
  apiSecret: process.env.DEFENDER_RELAY_SECRET_KEY!,
};

export const relayerSign = async (network: number, message: `0x${string}`) => {
  if (31337 == network) {
    //that's hardhat's 0th account, so it's safe ;)
    const _privateKey =
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const account = privateKeyToAccount(_privateKey);

    const signature = await account.signMessage({ message: { raw: message } });
    return { signature, address: account.address };
  } else {
    const signer = new Relayer(defenderCredentials);
    const signature = await signer.sign({ message });
    const { address } = await signer.getRelayer();
    return { signature, address };
  }
};
