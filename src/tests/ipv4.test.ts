
import { describe, it, expect } from 'vitest';
import { parseIPv4, formatIPv4, ipv4ToBinary, binaryToIPv4 } from '../core/ipv4';

describe('IPv4 Core', () => {
  it('should parse valid IPv4', () => {
    expect(parseIPv4('192.168.1.10')).toBe(3232235786n);
    expect(parseIPv4('255.255.255.255')).toBe(4294967295n);
    expect(parseIPv4('0.0.0.0')).toBe(0n);
  });

  it('should format IPv4', () => {
    expect(formatIPv4(3232235786n)).toBe('192.168.1.10');
    expect(formatIPv4(4294967295n)).toBe('255.255.255.255');
    expect(formatIPv4(0n)).toBe('0.0.0.0');
  });
  
  it('should handle binary conversion', () => {
    const bin = ipv4ToBinary('192.168.1.10');
    expect(bin).toBe('11000000.10101000.00000001.00001010');
    expect(binaryToIPv4(bin)).toBe('192.168.1.10');
  });

  it('should throw on invalid IPv4', () => {
    expect(() => parseIPv4('192.168.1')).toThrow();
    expect(() => parseIPv4('192.168.1.256')).toThrow();
    expect(() => parseIPv4('192.168.1.-1')).toThrow();
    expect(() => parseIPv4('192.168.1.01')).toThrow();
  });
});
