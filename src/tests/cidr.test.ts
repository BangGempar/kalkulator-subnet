
import { describe, it, expect } from 'vitest';
import { cidrToMask, maskToCidr } from '../core/cidr';

describe('CIDR logic', () => {
  it('should calculate mask from CIDR', () => {
    expect(cidrToMask(24)).toBe(4294967040n); // 255.255.255.0
    expect(cidrToMask(0)).toBe(0n); // 0.0.0.0
    expect(cidrToMask(32)).toBe(4294967295n); // 255.255.255.255
    expect(cidrToMask(30)).toBe(4294967292n); // 255.255.255.252
  });
  
  it('should calculate CIDR from mask string', () => {
    expect(maskToCidr('255.255.255.0')).toBe(24);
    expect(maskToCidr('0.0.0.0')).toBe(0);
    expect(maskToCidr('255.255.255.255')).toBe(32);
    expect(maskToCidr('255.255.255.252')).toBe(30);
  });
  
  it('should throw on invalid mask', () => {
    expect(() => maskToCidr('255.255.0.255')).toThrow();
    expect(() => maskToCidr('255.255.255.1')).toThrow();
  });
});
