
export interface SubnetResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;

  networkAddress: string;
  broadcastAddress: string;

  firstHost: string | null;
  lastHost: string | null;

  totalAddresses: bigint;
  usableHosts: bigint;

  ipBinary: string;
  subnetMaskBinary: string;
  networkBinary: string;
  broadcastBinary: string;

  prefixLength: number;
  hostBits: number;

  addressClass: string;
  addressType: string;

  isPrivate: boolean;
  isLoopback: boolean;
  isLinkLocal: boolean;
  isMulticast: boolean;
}
