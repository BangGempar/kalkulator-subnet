
export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  for (let i = 0; i < 4; i++) {
    const octetStr = parts[i];
    if (!/^\d+$/.test(octetStr)) return false;
    const octet = parseInt(octetStr, 10);
    if (isNaN(octet) || octet < 0 || octet > 255 || octet.toString() !== octetStr) {
      return false;
    }
  }
  return true;
}

export function isValidCIDR(prefix: number): boolean {
  return Number.isInteger(prefix) && prefix >= 0 && prefix <= 32;
}
