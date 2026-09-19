
import { MAX_IPV4 } from './ipv4';

export function cidrToMask(prefix: number): bigint {
  if (prefix < 0 || prefix > 32) throw new Error('Invalid CIDR prefix');
  if (prefix === 0) return 0n;
  return (MAX_IPV4 << BigInt(32 - prefix)) & MAX_IPV4;
}

export function maskToCidr(maskStr: string): number {
  const parts = maskStr.split('.');
  if (parts.length !== 4) throw new Error('Invalid subnet mask');
  let maskInt = 0n;
  for (let i = 0; i < 4; i++) {
    const octet = parseInt(parts[i], 10);
    if (isNaN(octet) || octet < 0 || octet > 255 || parts[i] !== octet.toString()) {
      throw new Error('Invalid subnet mask octet');
    }
    maskInt = (maskInt << 8n) | BigInt(octet);
  }
  
  if (maskInt === 0n) return 0;
  
  // Count prefix length
  let prefix = 0;
  let testBit = 1n << 31n;
  for (let i = 0; i < 32; i++) {
    if ((maskInt & testBit) !== 0n) {
      prefix++;
    } else {
      break;
    }
    testBit >>= 1n;
  }
  
  // Verify remaining bits are 0
  const expectedMask = (MAX_IPV4 << BigInt(32 - prefix)) & MAX_IPV4;
  if (maskInt !== expectedMask) {
    throw new Error('Invalid subnet mask. The subnet mask must contain contiguous network bits.');
  }
  
  return prefix;
}
