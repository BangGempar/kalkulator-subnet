
import type { SubnetResult } from './types';
import { parseIPv4, formatIPv4, FULL_IPV4, ipv4ToBinary } from './ipv4';
import { cidrToMask } from './cidr';
import {
  getLegacyClass,
  isPrivateAddress,
  isLoopbackAddress,
  isLinkLocalAddress,
  isMulticastAddress,
  getAddressClassification,
} from './classification';

export function calculateSubnet(ip: string, prefix: number): SubnetResult {
  if (prefix < 0 || prefix > 32) throw new Error('CIDR prefix must be between 0 and 32');
  
  const ipInt = parseIPv4(ip);
  const maskInt = cidrToMask(prefix);
  const wildcardInt = FULL_IPV4 ^ maskInt;
  
  const networkInt = ipInt & maskInt;
  const broadcastInt = networkInt | wildcardInt;
  
  const totalAddresses = 1n << BigInt(32 - prefix);
  
  let usableHosts: bigint;
  let firstHost: bigint | null;
  let lastHost: bigint | null;
  
  if (prefix <= 30) {
    usableHosts = totalAddresses - 2n;
    firstHost = networkInt + 1n;
    lastHost = broadcastInt - 1n;
  } else if (prefix === 31) {
    usableHosts = 2n;
    firstHost = networkInt;
    lastHost = broadcastInt;
  } else {
    usableHosts = 1n;
    firstHost = networkInt;
    lastHost = networkInt;
  }
  
  const subnetMaskStr = formatIPv4(maskInt);
  const networkStr = formatIPv4(networkInt);
  const broadcastStr = formatIPv4(broadcastInt);
  
  return {
    ipAddress: ip,
    cidr: prefix,
    subnetMask: subnetMaskStr,
    wildcardMask: formatIPv4(wildcardInt),
    
    networkAddress: networkStr,
    broadcastAddress: broadcastStr,
    
    firstHost: firstHost !== null ? formatIPv4(firstHost) : null,
    lastHost: lastHost !== null ? formatIPv4(lastHost) : null,
    
    totalAddresses,
    usableHosts,
    
    ipBinary: ipv4ToBinary(ip),
    subnetMaskBinary: ipv4ToBinary(subnetMaskStr),
    networkBinary: ipv4ToBinary(networkStr),
    broadcastBinary: ipv4ToBinary(broadcastStr),
    
    prefixLength: prefix,
    hostBits: 32 - prefix,
    
    addressClass: getLegacyClass(ip),
    addressType: getAddressClassification(ipInt),
    
    isPrivate: isPrivateAddress(ipInt),
    isLoopback: isLoopbackAddress(ipInt),
    isLinkLocal: isLinkLocalAddress(ipInt),
    isMulticast: isMulticastAddress(ipInt),
  };
}
