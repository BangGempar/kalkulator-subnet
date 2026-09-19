
export const IPV4_BITS = 32n;
export const MAX_IPV4 = (1n << 32n) - 1n;
export const FULL_IPV4 = MAX_IPV4;

export function parseIPv4(ip: string): bigint {
  const parts = ip.split('.');
  if (parts.length !== 4) throw new Error('Invalid IPv4 address');
  let result = 0n;
  for (let i = 0; i < 4; i++) {
    const octet = parseInt(parts[i], 10);
    if (isNaN(octet) || octet < 0 || octet > 255 || parts[i] !== octet.toString()) {
      throw new Error('Invalid IPv4 octet');
    }
    result = (result << 8n) | BigInt(octet);
  }
  return result;
}

export function formatIPv4(value: bigint): string {
  if (value < 0n || value > MAX_IPV4) throw new Error('IPv4 out of bounds');
  const octets = [];
  for (let i = 0; i < 4; i++) {
    octets.unshift(Number(value & 255n));
    value >>= 8n;
  }
  return octets.join('.');
}

export function ipv4ToBinary(ip: string): string {
  const value = parseIPv4(ip);
  let bin = value.toString(2).padStart(32, '0');
  return `${bin.slice(0, 8)}.${bin.slice(8, 16)}.${bin.slice(16, 24)}.${bin.slice(24, 32)}`;
}

export function binaryToIPv4(binary: string): string {
  const clean = binary.replace(/\./g, '');
  if (clean.length !== 32) throw new Error('Binary must be 32 bits');
  const value = BigInt('0b' + clean);
  return formatIPv4(value);
}
