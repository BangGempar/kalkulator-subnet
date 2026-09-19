
import { useState, useCallback, useEffect } from 'react';
import { calculateSubnet } from '../core/subnet';
import { maskToCidr } from '../core/cidr';
import type { SubnetResult } from '../core/types';
import { isValidIPv4, isValidCIDR } from '../utils/validation';

export function useSubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.10');
  const [cidr, setCidr] = useState('24');
  const [mask, setMask] = useState('255.255.255.0');
  const [mode, setMode] = useState<'cidr' | 'mask'>('cidr');
  
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(() => {
    setError(null);
    try {
      if (!isValidIPv4(ip)) throw new Error('Invalid IPv4 address.');
      
      let prefix = parseInt(cidr, 10);
      
      if (mode === 'mask') {
        try {
          prefix = maskToCidr(mask);
        } catch (e: any) {
          throw new Error('Invalid subnet mask. The subnet mask must contain contiguous network bits.');
        }
      } else {
        if (!/^\d+$/.test(cidr) || !isValidCIDR(prefix)) {
          throw new Error('CIDR prefix must be between 0 and 32.');
        }
      }
      
      const res = calculateSubnet(ip, prefix);
      setResult(res);
      if (mode === 'cidr') setMask(res.subnetMask);
      else setCidr(res.cidr.toString());
      
    } catch (e: any) {
      setError(e.message || 'Calculation error');
      setResult(null);
    }
  }, [ip, cidr, mask, mode]);

  const reset = () => {
    setIp('192.168.1.10');
    setCidr('24');
    setMask('255.255.255.0');
    setMode('cidr');
    setError(null);
    setResult(null);
  };
  
  // Read from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qIp = params.get('ip');
    const qCidr = params.get('cidr');
    if (qIp && qCidr) {
      setIp(qIp);
      setCidr(qCidr);
      setMode('cidr');
      // Timeout to ensure state updates before calculation
      setTimeout(() => calculate(), 0);
    }
  }, []);

  return {
    ip, setIp,
    cidr, setCidr,
    mask, setMask,
    mode, setMode,
    result, error,
    calculate, reset
  };
}
