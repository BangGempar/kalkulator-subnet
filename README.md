
# IPv4 Subnet Calculator

A 100% client-side Web Application for IPv4 subnet calculation. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Calculates Network, Broadcast, First/Last Host, and Usable Hosts.
- Supports CIDR and Subnet Mask input modes.
- Strict IPv4 and CIDR validation.
- Binary Representation generation.
- IPv4 Classification (Private, Loopback, Link-Local, Multicast).
- Calculates address count using `BigInt` to prevent integer overflow and sign issues.
- Dark mode support.
- Fully responsive.

## Special Handling
- `/31`: Specifically handled for point-to-point usage (2 usable addresses).
- `/32`: Handled as a single host (1 usable address).
- `/0`: Correct handling of entire address space.

## Calculation Logic
- **Network Address** = IP `AND` Subnet Mask
- **Broadcast Address** = Network Address `OR` Wildcard Mask
- **Wildcard Mask** = `NOT` Subnet Mask
- **Total Addresses** = 2^(32 - prefix)
- **Traditional Usable Hosts** = Total Addresses - 2
- `/31` = 2 usable addresses
- `/32` = 1 usable address

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Testing
```bash
npm run test
```

### Build
```bash
npm run build
```
"# kalkulator-subnet" 
