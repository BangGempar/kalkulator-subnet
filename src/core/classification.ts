


export function getLegacyClass(ip: string): string {
  const firstOctet = parseInt(ip.split('.')[0], 10);
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet === 127) return 'Loopback';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E (Experimental)';
  return 'Unknown';
}

export function isPrivateAddress(ipInt: bigint): boolean {
  // 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
  if (ipInt >= 167772160n && ipInt <= 184549375n) return true;
  // 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
  if (ipInt >= 2886729728n && ipInt <= 2887778303n) return true;
  // 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)
  if (ipInt >= 3232235520n && ipInt <= 3232301055n) return true;
  return false;
}

export function isLoopbackAddress(ipInt: bigint): boolean {
  // 127.0.0.0/8
  return ipInt >= 2130706432n && ipInt <= 2147483647n;
}

export function isLinkLocalAddress(ipInt: bigint): boolean {
  // 169.254.0.0/16
  return ipInt >= 2851995648n && ipInt <= 2852061183n;
}

export function isMulticastAddress(ipInt: bigint): boolean {
  // 224.0.0.0/4 (224.0.0.0 - 239.255.255.255)
  return ipInt >= 3758096384n && ipInt <= 4026531839n;
}

export function isSharedAddress(ipInt: bigint): boolean {
  // 100.64.0.0/10
  return ipInt >= 1681915904n && ipInt <= 1686110207n;
}

export function getAddressClassification(ipInt: bigint): string {
  if (ipInt === 0n) return 'Unspecified';
  if (isLoopbackAddress(ipInt)) return 'Loopback';
  if (isLinkLocalAddress(ipInt)) return 'Link-local';
  if (isMulticastAddress(ipInt)) return 'Multicast';
  if (isPrivateAddress(ipInt)) return 'Private';
  if (isSharedAddress(ipInt)) return 'Shared';
  if (ipInt === 4294967295n) return 'Broadcast (255.255.255.255)';
  
  // Future enhancements: More precise special-purpose ranges
  return 'Public';
}
