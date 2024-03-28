export const shouldUseLocalIpfs = () => {
  return process.env.NEXT_PUBLIC_USE_LOCAL_IPFS === "true";
};

export const convertToGatewayUrl = (hash: string): string => {
  if (hash.startsWith("ar://")) {
    return `https://arweave.net/${hash.replace("ar://", "")}`;
  }
  if (hash.startsWith("ipfs://")) {
    const gatewayUrl = shouldUseLocalIpfs()
      ? "http://localhost:8080"
      : "https://w3s.link";

    return `${gatewayUrl}/ipfs/${hash.replace("ipfs://", "")}`;
  }

  return hash;
};
