
import { describe, it, expect } from 'vitest';
import { calculateSubnet } from '../core/subnet';

describe('Subnet Calculation Rules', () => {
  it('should calculate /24 correctly', () => {
    const res = calculateSubnet('192.168.1.10', 24);
    expect(res.networkAddress).toBe('192.168.1.0');
    expect(res.broadcastAddress).toBe('192.168.1.255');
    expect(res.firstHost).toBe('192.168.1.1');
    expect(res.lastHost).toBe('192.168.1.254');
    expect(res.totalAddresses).toBe(256n);
    expect(res.usableHosts).toBe(254n);
    expect(res.subnetMask).toBe('255.255.255.0');
    expect(res.wildcardMask).toBe('0.0.0.255');
  });

  it('should calculate /16 correctly', () => {
    const res = calculateSubnet('172.16.10.50', 16);
    expect(res.networkAddress).toBe('172.16.0.0');
    expect(res.broadcastAddress).toBe('172.16.255.255');
    expect(res.firstHost).toBe('172.16.0.1');
    expect(res.lastHost).toBe('172.16.255.254');
    expect(res.totalAddresses).toBe(65536n);
    expect(res.usableHosts).toBe(65534n);
    expect(res.subnetMask).toBe('255.255.0.0');
    expect(res.wildcardMask).toBe('0.0.255.255');
  });

  it('should calculate /26 correctly', () => {
    const res = calculateSubnet('192.168.1.100', 26);
    expect(res.networkAddress).toBe('192.168.1.64');
    expect(res.broadcastAddress).toBe('192.168.1.127');
    expect(res.firstHost).toBe('192.168.1.65');
    expect(res.lastHost).toBe('192.168.1.126');
    expect(res.totalAddresses).toBe(64n);
    expect(res.usableHosts).toBe(62n);
    expect(res.subnetMask).toBe('255.255.255.192');
    expect(res.wildcardMask).toBe('0.0.0.63');
  });

  it('should calculate /30 correctly', () => {
    const res = calculateSubnet('192.168.1.10', 30);
    expect(res.networkAddress).toBe('192.168.1.8');
    expect(res.broadcastAddress).toBe('192.168.1.11');
    expect(res.firstHost).toBe('192.168.1.9');
    expect(res.lastHost).toBe('192.168.1.10');
    expect(res.totalAddresses).toBe(4n);
    expect(res.usableHosts).toBe(2n);
    expect(res.subnetMask).toBe('255.255.255.252');
  });

  it('should calculate /31 correctly', () => {
    const res = calculateSubnet('192.168.1.10', 31);
    expect(res.networkAddress).toBe('192.168.1.10');
    expect(res.broadcastAddress).toBe('192.168.1.11');
    expect(res.firstHost).toBe('192.168.1.10');
    expect(res.lastHost).toBe('192.168.1.11');
    expect(res.totalAddresses).toBe(2n);
    expect(res.usableHosts).toBe(2n);
  });

  it('should calculate /32 correctly', () => {
    const res = calculateSubnet('192.168.1.10', 32);
    expect(res.networkAddress).toBe('192.168.1.10');
    expect(res.broadcastAddress).toBe('192.168.1.10');
    expect(res.firstHost).toBe('192.168.1.10');
    expect(res.lastHost).toBe('192.168.1.10');
    expect(res.totalAddresses).toBe(1n);
    expect(res.usableHosts).toBe(1n);
    expect(res.subnetMask).toBe('255.255.255.255');
  });

  it('should calculate /0 correctly', () => {
    const res = calculateSubnet('10.20.30.40', 0);
    expect(res.networkAddress).toBe('0.0.0.0');
    expect(res.broadcastAddress).toBe('255.255.255.255');
    expect(res.firstHost).toBe('0.0.0.1');
    expect(res.lastHost).toBe('255.255.255.254');
    expect(res.totalAddresses).toBe(4294967296n);
    expect(res.usableHosts).toBe(4294967294n);
    expect(res.subnetMask).toBe('0.0.0.0');
    expect(res.wildcardMask).toBe('255.255.255.255');
  });

  it('should not overflow on boundary IP 255.255.255.255/32', () => {
    const res = calculateSubnet('255.255.255.255', 32);
    expect(res.networkAddress).toBe('255.255.255.255');
    expect(res.broadcastAddress).toBe('255.255.255.255');
    expect(res.totalAddresses).toBe(1n);
  });
});
