
import { describe, it, expect } from 'vitest';
import { calculateSubnet } from '../core/subnet';

describe('Address Classification', () => {
  it('should detect Private IPv4', () => {
    expect(calculateSubnet('192.168.1.50', 24).isPrivate).toBe(true);
    expect(calculateSubnet('10.0.0.1', 8).isPrivate).toBe(true);
    expect(calculateSubnet('172.16.1.1', 12).isPrivate).toBe(true);
    
    expect(calculateSubnet('8.8.8.8', 24).isPrivate).toBe(false);
  });
  
  it('should detect Loopback', () => {
    expect(calculateSubnet('127.0.0.1', 8).isLoopback).toBe(true);
    expect(calculateSubnet('127.0.0.1', 8).addressType).toBe('Loopback');
  });
  
  it('should detect Link-local', () => {
    expect(calculateSubnet('169.254.10.20', 16).isLinkLocal).toBe(true);
    expect(calculateSubnet('169.254.10.20', 16).addressType).toBe('Link-local');
  });

  it('should detect Multicast', () => {
    expect(calculateSubnet('224.0.0.1', 32).isMulticast).toBe(true);
    expect(calculateSubnet('224.0.0.1', 32).addressType).toBe('Multicast');
  });
});
