# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## IPv4 Subnet Calculator Web Application

**Version:** 1.0
**Status:** Ready for Development
**Platform:** Web
**Primary Language:** English UI dengan opsi Indonesian pada tahap berikutnya
**Scope:** IPv4 Subnet Calculator
**Target:** Developer, Network Engineer, mahasiswa, administrator jaringan, dan pengguna yang sedang belajar subnetting.

---

# 1. Product Overview

Aplikasi ini adalah web-based **IPv4 Subnet Calculator** yang digunakan untuk menghitung informasi jaringan berdasarkan IPv4 address dan subnet mask/CIDR.

Aplikasi harus mampu menerima input seperti:

```text
192.168.1.10/24
```

atau:

```text
IP Address: 192.168.1.10
CIDR: /24
```

kemudian menghasilkan informasi:

* IP Address
* CIDR
* Subnet Mask
* Wildcard Mask
* Network Address
* Broadcast Address
* First Usable Host
* Last Usable Host
* Total Addresses
* Usable Hosts
* IP Address dalam Binary
* Subnet Mask dalam Binary
* Network Address dalam Binary
* Broadcast Address dalam Binary
* Network Class
* Address Type
* Private/Public/Special-purpose classification
* Subnet range
* Host range
* Prefix information

Aplikasi harus bekerja **100% client-side** dan tidak membutuhkan backend untuk kalkulasi utama.

---

# 2. Product Goal

Tujuan utama aplikasi:

1. Menghasilkan perhitungan subnet IPv4 yang akurat.
2. Memberikan hasil secara instan setelah input berubah.
3. Menampilkan hasil dengan struktur yang mudah dipahami.
4. Menampilkan representasi binary untuk membantu proses pembelajaran subnetting.
5. Menangani edge case IPv4 dengan benar.
6. Memiliki unit test untuk setiap fungsi inti subnetting.
7. Tidak bergantung pada API eksternal untuk perhitungan.
8. Responsive pada desktop, tablet, dan mobile.
9. Memiliki UX sederhana seperti online calculator modern.
10. Mudah dikembangkan menjadi IPv6 Calculator pada fase berikutnya.

---

# 3. Product Scope

## 3.1 MVP

MVP wajib memiliki:

### Input

* IPv4 Address
* CIDR Prefix
* Subnet Mask
* Tombol Calculate
* Tombol Reset
* Preset/example input

### Output

* IP Address
* CIDR
* Subnet Mask
* Wildcard Mask
* Network Address
* Broadcast Address
* First Host
* Last Host
* Total Addresses
* Usable Hosts
* Binary representation
* Address classification

### Utility

* Copy result
* Clear input
* Validation
* Responsive UI
* Dark/light theme

---

# 4. Non-Goals MVP

Jangan implementasikan fitur berikut pada MVP kecuali struktur aplikasi memang sudah dipersiapkan untuk pengembangan selanjutnya:

* IPv6
* VLSM automatic allocation
* CIDR aggregation
* Routing table simulator
* IP geolocation
* WHOIS
* DNS lookup
* Ping
* Traceroute
* Port scanner
* Backend database
* User authentication

Fitur tersebut dapat menjadi Phase 2/3.

---

# 5. Recommended Technology Stack

## Frontend

Gunakan:

```text
React
TypeScript
Vite
Tailwind CSS
```

Alasan:

* ringan
* cepat
* cocok untuk aplikasi calculator
* client-side
* mudah dideploy
* TypeScript membantu mencegah kesalahan tipe data pada subnet calculation.

---

# 6. Supporting Libraries

Gunakan seminimal mungkin.

Recommended:

```text
React
TypeScript
Vite
Tailwind CSS
Lucide React
Vitest
React Testing Library
```

Opsional:

```text
Zod
```

untuk validation schema.

Jangan menggunakan library subnetting pihak ketiga sebagai sumber utama hasil kalkulasi.

Engine subnetting harus dibuat sendiri sehingga seluruh logika dapat diuji dan dikontrol.

---

# 7. Architecture

Gunakan arsitektur:

```text
src/
│
├── components/
│   ├── Header.tsx
│   ├── CalculatorForm.tsx
│   ├── ResultPanel.tsx
│   ├── ResultCard.tsx
│   ├── BinaryVisualization.tsx
│   ├── NetworkRange.tsx
│   ├── AddressClassification.tsx
│   ├── ErrorMessage.tsx
│   └── CopyButton.tsx
│
├── core/
│   ├── ipv4.ts
│   ├── subnet.ts
│   ├── cidr.ts
│   ├── classification.ts
│   └── types.ts
│
├── utils/
│   ├── format.ts
│   ├── clipboard.ts
│   └── validation.ts
│
├── hooks/
│   └── useSubnetCalculator.ts
│
├── tests/
│   ├── ipv4.test.ts
│   ├── subnet.test.ts
│   ├── cidr.test.ts
│   └── classification.test.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 8. Critical Engineering Rule

## Jangan mencampurkan UI dengan subnet calculation.

Contoh buruk:

```text
CalculatorForm.tsx
    └── menghitung network address
    └── menghitung broadcast
    └── menghitung host
```

Jangan melakukan hal tersebut.

Gunakan:

```text
UI
 ↓
Input Parser
 ↓
IPv4 Calculation Engine
 ↓
Result Object
 ↓
UI Renderer
```

Dengan demikian calculation engine dapat dites tanpa browser.

---

# 9. Core Data Model

Gunakan TypeScript interface berikut sebagai dasar:

```ts
interface SubnetResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;

  networkAddress: string;
  broadcastAddress: string;

  firstHost: string | null;
  lastHost: string | null;

  totalAddresses: bigint;
  usableHosts: bigint;

  ipBinary: string;
  subnetMaskBinary: string;
  networkBinary: string;
  broadcastBinary: string;

  prefixLength: number;
  hostBits: number;

  addressClass: string;
  addressType: string;

  isPrivate: boolean;
  isLoopback: boolean;
  isLinkLocal: boolean;
  isMulticast: boolean;

  networkStart: string;
  networkEnd: string;
}
```

Jika serialisasi JSON diperlukan, `bigint` harus dikonversi menjadi string sebelum `JSON.stringify()`.

---

# 10. IPv4 Representation

IPv4 terdiri dari:

```text
32 bits
```

dibagi menjadi empat octet:

```text
8 bits . 8 bits . 8 bits . 8 bits
```

Contoh:

```text
192.168.1.10
```

Binary:

```text
11000000.10101000.00000001.00001010
```

---

# 11. IPv4 Validation

IPv4 valid harus memenuhi semua kondisi:

1. terdiri dari tepat 4 octet
2. setiap octet merupakan integer
3. setiap octet berada pada:

```text
0–255
```

Valid:

```text
192.168.1.1
10.0.0.1
172.16.0.1
255.255.255.255
0.0.0.0
```

Invalid:

```text
192.168.1
192.168.1.256
192.168.1.-1
192.168.1.1.5
abc.def.ghi.jkl
```

Jangan menerima:

```text
192.168.01.001
```

kecuali aplikasi secara eksplisit memiliki mode normalization.

Untuk MVP, gunakan strict validation.

---

# 12. CIDR Validation

CIDR IPv4 harus berada pada:

```text
/0 sampai /32
```

Valid:

```text
/0
/8
/16
/24
/30
/31
/32
```

Invalid:

```text
/-1
/33
/100
```

Jika user memasukkan:

```text
192.168.1.10/24
```

parser harus memisahkan:

```text
IP = 192.168.1.10
Prefix = 24
```

---

# 13. Subnet Mask Calculation

CIDR `/n` berarti:

```text
n network bits
32-n host bits
```

Subnet mask harus dibentuk berdasarkan prefix.

Contoh:

```text
/24
```

berarti:

```text
11111111.11111111.11111111.00000000
```

atau:

```text
255.255.255.0
```

Contoh:

```text
/16
```

=

```text
255.255.0.0
```

Contoh:

```text
/30
```

=

```text
255.255.255.252
```

---

# 14. Wildcard Mask

Wildcard mask:

```text
wildcard = inverse(subnet mask)
```

Contoh `/24`:

```text
Subnet mask:
255.255.255.0

Wildcard:
0.0.0.255
```

Contoh `/30`:

```text
Subnet:
255.255.255.252

Wildcard:
0.0.0.3
```

---

# 15. Network Address Calculation

Formula:

```text
networkAddress = ipAddress AND subnetMask
```

Contoh:

```text
IP:
192.168.1.10

Mask:
255.255.255.0

Network:
192.168.1.0
```

---

# 16. Broadcast Address Calculation

Formula:

```text
broadcast = networkAddress OR wildcardMask
```

Contoh:

```text
Network:
192.168.1.0

Wildcard:
0.0.0.255

Broadcast:
192.168.1.255
```

---

# 17. Total Address Calculation

Formula:

```text
totalAddresses = 2^(32 - prefix)
```

Contoh `/24`:

```text
2^(32-24)
= 2^8
= 256
```

Contoh `/16`:

```text
2^16
= 65,536
```

Contoh `/0`:

```text
2^32
= 4,294,967,296
```

Gunakan `BigInt` untuk hasil internal agar tidak ada masalah integer representation.

---

# 18. Usable Host Calculation

Untuk prefix:

```text
/0 sampai /30
```

gunakan:

```text
usableHosts = totalAddresses - 2
```

karena network address dan broadcast address tidak digunakan sebagai host dalam model subnet tradisional.

Namun `/31` dan `/32` adalah pengecualian.

---

# 19. /31 Special Case

Jangan menggunakan:

```text
total - 2
```

untuk `/31`.

RFC-style point-to-point usage memungkinkan kedua alamat dalam `/31` digunakan pada link point-to-point.

Untuk calculator ini:

```text
/31

Total addresses = 2
Usable hosts = 2
```

Display:

```text
First Host = network address
Last Host = broadcast address
```

Tambahkan keterangan:

```text
/31 is commonly used for point-to-point links.
```

Jangan menyebut kedua alamat tersebut sebagai "network and broadcast" pada mode `/31` jika aplikasi sedang menjelaskan host usability.

---

# 20. /32 Special Case

`/32` hanya memiliki satu address.

```text
totalAddresses = 1
usableHosts = 1
```

Network address:

```text
IP address itu sendiri
```

Broadcast:

```text
IP address itu sendiri
```

First Host:

```text
IP address
```

Last Host:

```text
IP address
```

Tambahkan keterangan:

```text
/32 represents a single IPv4 address.
```

---

# 21. /0 Special Case

`/0`:

```text
Subnet Mask:
0.0.0.0

Wildcard:
255.255.255.255

Network:
0.0.0.0

Broadcast:
255.255.255.255

Total:
4,294,967,296
```

Usable traditional hosts:

```text
4,294,967,294
```

---

# 22. First Host

Untuk prefix:

```text
/0 sampai /30
```

formula:

```text
firstHost = networkAddress + 1
```

---

# 23. Last Host

Untuk prefix:

```text
/0 sampai /30
```

formula:

```text
lastHost = broadcastAddress - 1
```

---

# 24. Binary Representation

Aplikasi harus dapat mengubah IPv4 menjadi binary.

Contoh:

```text
192.168.1.10
```

menjadi:

```text
11000000.10101000.00000001.00001010
```

Setiap octet wajib terdiri dari 8 digit.

Jangan menampilkan:

```text
1100000.10101000...
```

karena leading zero harus dipertahankan.

---

# 25. Binary Subnet Visualization

Buat visualisasi:

```text
11000000.10101000.00000001.00001010
NNNNNNNN.NNNNNNNN.NNNNNNNN.HHHHHHHH
```

Keterangan:

```text
N = Network bit
H = Host bit
```

Contoh `/26`:

```text
11111111.11111111.11111111.11000000
NNNNNNNN.NNNNNNNN.NNNNNNNN.NNHHHHHH
```

Visualisasi harus mengikuti prefix secara dinamis.

---

# 26. Address Class

Aplikasi boleh menampilkan legacy IPv4 class:

```text
Class A
Class B
Class C
Class D
Class E
```

berdasarkan first octet.

Rules:

```text
1–126   = Class A
128–191 = Class B
192–223 = Class C
224–239 = Class D
240–255 = Class E
```

Special case:

```text
127.x.x.x = Loopback
```

Jangan menjadikan address class sebagai dasar subnet calculation modern.

Tambahkan label:

```text
Legacy Class
```

agar user memahami bahwa CIDR adalah metode subnetting utama.

---

# 27. Address Classification

Aplikasi harus melakukan classification secara terpisah dari legacy class.

Minimum classification:

```text
Private
Public
Loopback
Link-local
Multicast
Unspecified
Special-purpose
```

Gunakan data resmi IANA untuk special-purpose classification, bukan membuat daftar berdasarkan asumsi. IANA memelihara registry IPv4 special-purpose address space.

Private IPv4 minimum:

```text
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

Loopback:

```text
127.0.0.0/8
```

Link-local:

```text
169.254.0.0/16
```

Shared Address Space:

```text
100.64.0.0/10
```

Multicast:

```text
224.0.0.0/4
```

IANA mendefinisikan multicast IPv4 pada rentang `224.0.0.0` sampai `239.255.255.255`.

---

# 28. Classification Priority

Jika sebuah address memenuhi beberapa kategori, gunakan priority system.

Recommended:

```text
1. Unspecified
2. Loopback
3. Link-local
4. Multicast
5. Private
6. Shared
7. Special-purpose
8. Public
```

Namun jangan menganggap:

```text
not private = public
```

secara otomatis untuk semua special-purpose ranges.

Classification harus berdasarkan registry/rules yang jelas.

---

# 29. Input Modes

Calculator harus menyediakan dua mode input.

## Mode A — CIDR

Input:

```text
192.168.1.10/24
```

## Mode B — IP + Subnet Mask

Input:

```text
IP Address:
192.168.1.10

Subnet Mask:
255.255.255.0
```

Kedua mode harus menghasilkan result object yang sama.

---

# 30. CIDR ↔ Subnet Mask Conversion

Aplikasi harus mendukung:

```text
CIDR → subnet mask
```

dan:

```text
subnet mask → CIDR
```

Subnet mask harus contiguous.

Valid:

```text
255.255.255.0
255.255.255.128
255.255.255.192
255.255.255.224
255.255.255.240
255.255.255.248
255.255.255.252
255.255.255.254
255.255.255.255
```

Invalid:

```text
255.0.255.0
255.255.0.255
255.255.255.1
255.255.255.127
```

Jika subnet mask tidak contiguous:

```text
255.255.0.255
```

tolak input.

Error:

```text
Invalid subnet mask.
The subnet mask must contain contiguous network bits.
```

---

# 31. Internal IPv4 Representation

Jangan menjadikan string sebagai format utama calculation.

Gunakan representasi integer unsigned 32-bit atau `BigInt`.

Recommended internal representation:

```ts
type IPv4Int = bigint;
```

Contoh:

```text
192.168.1.10
```

diubah menjadi satu nilai integer internal.

Semua operasi:

```text
AND
OR
mask
range
increment
decrement
```

dilakukan menggunakan BigInt.

Kemudian hasil dikonversi kembali menjadi dotted decimal.

Alasan:

JavaScript Number bitwise operators menggunakan signed 32-bit integer sehingga address dengan high bit dapat menghasilkan perilaku yang membingungkan. BigInt mendukung operasi bitwise tanpa truncation seperti itu.

---

# 32. IPv4 Conversion Functions

Implementasikan fungsi terpisah:

```ts
parseIPv4(ip: string): bigint

formatIPv4(value: bigint): string

ipv4ToBinary(ip: string): string

binaryToIPv4(binary: string): string

cidrToMask(prefix: number): bigint

maskToCidr(mask: string): number

calculateNetwork(ip: bigint, mask: bigint): bigint

calculateBroadcast(network: bigint, wildcard: bigint): bigint
```

Jangan membuat satu fungsi besar yang melakukan semuanya.

---

# 33. Recommended Calculation Pipeline

Pipeline:

```text
User Input
    ↓
Normalize Input
    ↓
Validate IPv4
    ↓
Validate CIDR / Mask
    ↓
Convert IPv4 → BigInt
    ↓
Generate Mask
    ↓
Calculate Wildcard
    ↓
Calculate Network
    ↓
Calculate Broadcast
    ↓
Calculate Total Addresses
    ↓
Calculate Usable Hosts
    ↓
Calculate First/Last Host
    ↓
Classify Address
    ↓
Generate Binary Representation
    ↓
Create SubnetResult
    ↓
Render UI
```

---

# 34. Main Calculation Algorithm

Pseudocode:

```ts
function calculateSubnet(ip: string, prefix: number): SubnetResult {

    validateIPv4(ip);
    validatePrefix(prefix);

    const ipInt = parseIPv4(ip);

    const mask = cidrToMask(prefix);

    const wildcard = FULL_IPV4 ^ mask;

    const network = ipInt & mask;

    const broadcast = network | wildcard;

    const totalAddresses = 1n << BigInt(32 - prefix);

    let usableHosts: bigint;
    let firstHost: bigint | null;
    let lastHost: bigint | null;

    if (prefix <= 30) {
        usableHosts = totalAddresses - 2n;
        firstHost = network + 1n;
        lastHost = broadcast - 1n;
    }

    else if (prefix === 31) {
        usableHosts = 2n;
        firstHost = network;
        lastHost = broadcast;
    }

    else {
        usableHosts = 1n;
        firstHost = network;
        lastHost = network;
    }

    return {
        ...
    };
}
```

---

# 35. Constants

Define:

```ts
const IPV4_BITS = 32n;

const MAX_IPV4 = (1n << 32n) - 1n;

const FULL_IPV4 = MAX_IPV4;
```

Do not repeatedly hard-code:

```text
4294967295
```

throughout the application.

---

# 36. UI Design

Design should be inspired by the usability of established subnet calculators, but do NOT copy the exact layout, branding, wording, assets, or visual design of Calculator.net.

Reference concept:

* simple calculator
* input at top
* result immediately below
* information presented in tables/cards
* minimal visual clutter

---

# 37. Page Structure

Recommended:

```text
------------------------------------------------
Header
------------------------------------------------

IPv4 Subnet Calculator

Calculate IPv4 network information quickly and
accurately.

------------------------------------------------
Calculator Card
------------------------------------------------

Input Mode

[ CIDR ] [ IP + Subnet Mask ]

IP Address
[ 192.168.1.10 ]

CIDR Prefix
[ /24 ]

[ Calculate ] [ Reset ]

------------------------------------------------
Result
------------------------------------------------

Network Information

IP Address       192.168.1.10
CIDR             /24
Subnet Mask      255.255.255.0
Wildcard Mask    0.0.0.255

Network Address  192.168.1.0
Broadcast        192.168.1.255

First Host       192.168.1.1
Last Host        192.168.1.254

Total Addresses  256
Usable Hosts     254

------------------------------------------------

Binary Visualization

IP
11000000.10101000.00000001.00001010

MASK
11111111.11111111.11111111.00000000

------------------------------------------------

Address Information

Class
Private/Public
Loopback
etc.

------------------------------------------------

How the calculation works

Explanation

------------------------------------------------

Footer
------------------------------------------------
```

---

# 38. Result Cards

Gunakan beberapa card:

### Network Information

```text
IP Address
CIDR
Subnet Mask
Wildcard Mask
```

### Address Range

```text
Network Address
First Host
Last Host
Broadcast Address
```

### Capacity

```text
Total Addresses
Usable Hosts
Host Bits
```

### Classification

```text
Legacy Class
Address Type
Private/Public
Special Purpose
```

---

# 39. Copy Button

Setiap result penting memiliki:

```text
Copy
```

Contoh:

```text
Network Address
192.168.1.0    [Copy]
```

Setelah copy:

```text
Copied!
```

Gunakan Clipboard API.

Jika Clipboard API tidak tersedia:

```text
fallback mechanism
```

---

# 40. Reset Button

Reset harus mengembalikan form ke default:

```text
IP:
192.168.1.10

CIDR:
24
```

dan menghapus validation error.

---

# 41. Real-Time Validation

Saat user mengetik:

```text
192.168.1.999
```

tampilkan:

```text
Invalid IPv4 address.
```

Namun jangan menampilkan error terlalu agresif saat user sedang mengetik.

Gunakan:

```text
onBlur
```

atau validation setelah user berhenti mengetik.

---

# 42. Calculate Behavior

Calculate button:

```text
Calculate
```

harus:

1. validate input
2. calculate
3. update result
4. scroll ke result jika diperlukan
5. tidak melakukan page reload

---

# 43. Error Handling

Error harus spesifik.

Contoh:

```text
Invalid IPv4 address.
```

```text
IPv4 octet must be between 0 and 255.
```

```text
CIDR prefix must be between 0 and 32.
```

```text
Invalid subnet mask.
```

```text
Subnet mask must contain contiguous network bits.
```

Jangan menggunakan:

```text
Something went wrong.
```

untuk validation error yang sebenarnya dapat dijelaskan.

---

# 44. Accessibility

Wajib:

* semantic HTML
* label pada input
* keyboard navigation
* visible focus state
* sufficient contrast
* button memiliki accessible name
* error message terhubung ke input
* jangan mengandalkan warna saja untuk membedakan status

---

# 45. Responsive Design

Desktop:

```text
max-width: 1100–1200px
```

Mobile:

```text
single-column layout
```

Result table harus dapat di-scroll horizontal jika diperlukan.

Input:

```text
100% width
```

pada mobile.

---

# 46. Theme

Implementasikan:

```text
Light Mode
Dark Mode
```

Gunakan system preference sebagai default:

```text
prefers-color-scheme
```

Tambahkan theme toggle.

---

# 47. URL Query Support

Tambahkan kemampuan optional:

```text
/?ip=192.168.1.10&cidr=24
```

Saat URL tersebut dibuka, aplikasi otomatis mengisi kalkulator.

Contoh:

```text
https://example.com/?ip=10.0.0.10&cidr=8
```

Aplikasi harus menghasilkan:

```text
10.0.0.0/8
```

Ini berguna untuk sharing hasil kalkulasi.

---

# 48. Share Result

Optional MVP+.

Button:

```text
Share
```

akan menghasilkan URL:

```text
/?ip=192.168.1.10&cidr=24
```

Jika Web Share API tersedia:

```text
navigator.share()
```

Jika tidak:

```text
copy URL
```

---

# 49. Preset Examples

Sediakan example buttons:

```text
10.0.0.1/8
172.16.10.20/16
192.168.1.100/24
192.168.1.100/26
10.10.10.10/30
10.10.10.10/31
10.10.10.10/32
```

Klik example langsung mengisi calculator.

---

# 50. Detailed Example

Input:

```text
IP:
192.168.1.10

CIDR:
/24
```

Expected:

```text
IP Address:
192.168.1.10

CIDR:
/24

Subnet Mask:
255.255.255.0

Wildcard:
0.0.0.255

Network:
192.168.1.0

Broadcast:
192.168.1.255

First Host:
192.168.1.1

Last Host:
192.168.1.254

Total:
256

Usable:
254

Host Bits:
8
```

---

# 51. Test Case — /16

Input:

```text
172.16.10.50/16
```

Expected:

```text
Network:
172.16.0.0

Broadcast:
172.16.255.255

First Host:
172.16.0.1

Last Host:
172.16.255.254

Total:
65536

Usable:
65534

Mask:
255.255.0.0

Wildcard:
0.0.255.255
```

---

# 52. Test Case — /26

Input:

```text
192.168.1.100/26
```

Expected:

```text
Mask:
255.255.255.192

Wildcard:
0.0.0.63

Network:
192.168.1.64

Broadcast:
192.168.1.127

First:
192.168.1.65

Last:
192.168.1.126

Total:
64

Usable:
62
```

---

# 53. Test Case — /30

Input:

```text
192.168.1.10/30
```

Expected:

```text
Mask:
255.255.255.252

Network:
192.168.1.8

Broadcast:
192.168.1.11

First:
192.168.1.9

Last:
192.168.1.10

Total:
4

Usable:
2
```

---

# 54. Test Case — /31

Input:

```text
192.168.1.10/31
```

Expected:

```text
Mask:
255.255.255.254

Network:
192.168.1.10

Broadcast:
192.168.1.11

Total:
2

Usable:
2

First:
192.168.1.10

Last:
192.168.1.11
```

Display note:

```text
/31 is commonly used for point-to-point links.
```

---

# 55. Test Case — /32

Input:

```text
192.168.1.10/32
```

Expected:

```text
Mask:
255.255.255.255

Network:
192.168.1.10

Broadcast:
192.168.1.10

Total:
1

Usable:
1

First:
192.168.1.10

Last:
192.168.1.10
```

---

# 56. Test Case — /0

Input:

```text
10.20.30.40/0
```

Expected:

```text
Mask:
0.0.0.0

Wildcard:
255.255.255.255

Network:
0.0.0.0

Broadcast:
255.255.255.255

Total:
4294967296

Usable:
4294967294

First:
0.0.0.1

Last:
255.255.255.254
```

---

# 57. Test Case — Boundary IP

Input:

```text
255.255.255.255/32
```

Expected:

```text
Network:
255.255.255.255

Broadcast:
255.255.255.255

Total:
1
```

No overflow must occur.

---

# 58. Test Case — Zero Address

Input:

```text
0.0.0.0/0
```

Expected:

```text
Network:
0.0.0.0

Broadcast:
255.255.255.255
```

---

# 59. Test Case — Private Address

Input:

```text
192.168.1.50/24
```

Expected classification:

```text
Private
```

---

# 60. Test Case — Loopback

Input:

```text
127.0.0.1/8
```

Expected:

```text
Loopback
```

---

# 61. Test Case — Link Local

Input:

```text
169.254.10.20/16
```

Expected:

```text
Link-local
```

---

# 62. Test Case — Multicast

Input:

```text
224.0.0.1/32
```

Expected:

```text
Multicast
```

---

# 63. Unit Testing Requirements

Unit tests are mandatory.

At minimum:

```text
IPv4 parser
IPv4 formatter
Binary conversion
CIDR → mask
Mask → CIDR
Wildcard calculation
Network calculation
Broadcast calculation
Host calculation
Address count
Private detection
Loopback detection
Link-local detection
Multicast detection
Invalid input handling
```

---

# 64. Test Matrix

Create automated tests for every prefix:

```text
/0
/1
/2
...
/32
```

Minimum requirement:

```text
33 prefix tests
```

For each prefix test:

```text
mask
wildcard
network
broadcast
total addresses
```

must be checked.

---

# 65. Property-Based Invariants

Selain test case manual, engine harus memenuhi invariant.

Untuk setiap valid IP + CIDR:

```text
network <= ip <= broadcast
```

Untuk `/0`:

```text
network = 0
broadcast = MAX_IPV4
```

Untuk `/32`:

```text
network = ip
broadcast = ip
```

Untuk `/31`:

```text
broadcast = network + 1
```

Untuk `/24`:

```text
total = 256
```

Secara umum:

```text
broadcast - network + 1
=
2^(32-prefix)
```

Ini adalah test yang sangat penting.

---

# 66. Mask Invariant

Untuk subnet mask valid:

```text
mask & wildcard = 0
```

dan:

```text
mask | wildcard = 0xFFFFFFFF
```

Jika menggunakan BigInt:

```ts
(mask & wildcard) === 0n
```

dan:

```ts
(mask | wildcard) === MAX_IPV4
```

---

# 67. Network Invariant

Untuk setiap IP:

```text
network & mask === network
```

dan:

```text
ip & mask === network
```

---

# 68. Broadcast Invariant

```text
broadcast | mask === broadcast
```

dan:

```text
broadcast === network | wildcard
```

---

# 69. Host Invariant

Untuk `/0–/30`:

```text
firstHost = network + 1
lastHost = broadcast - 1
```

dan:

```text
lastHost - firstHost + 1
=
usableHosts
```

---

# 70. No Floating Point Calculation

Jangan menggunakan:

```ts
Math.pow(2, 32 - prefix)
```

sebagai representasi utama.

Gunakan:

```ts
1n << BigInt(32 - prefix)
```

untuk perhitungan address count.

Tujuannya adalah menjaga integer calculation tetap eksplisit dan aman.

---

# 71. No Signed Bitwise Number

Jangan membuat engine seperti:

```ts
const network = ip & mask;
```

jika `ip` dan `mask` disimpan sebagai JavaScript `number`.

JavaScript Number bitwise operations dikonversi menjadi signed 32-bit integer. Hal ini dapat menyebabkan nilai IPv4 dengan high bit `1` terlihat negatif.

Gunakan:

```ts
BigInt
```

sebagai representasi internal.

Contoh:

```ts
const network = ipBigInt & maskBigInt;
```

---

# 72. No External API for Calculation

Calculator harus tetap berfungsi:

```text
offline
```

setelah halaman selesai dimuat.

Tidak boleh:

```text
POST IP ke server
```

hanya untuk menghitung subnet.

Semua calculation dilakukan di browser.

---

# 73. Privacy

IP address yang dimasukkan user:

```text
tidak dikirim ke server
```

untuk calculation.

Jangan menyimpan input ke database.

Jangan menggunakan analytics yang merekam nilai IP calculator secara langsung.

---

# 74. Performance

Calculation harus selesai:

```text
< 50 ms
```

untuk input normal.

Tidak perlu Web Worker untuk MVP karena calculation IPv4 sangat kecil.

---

# 75. SEO

Page harus memiliki:

```html
<title>IPv4 Subnet Calculator</title>
```

Meta description:

```text
Calculate IPv4 subnet masks, CIDR, network address,
broadcast address, host range, and usable hosts.
```

Heading:

```text
H1: IPv4 Subnet Calculator
```

Tambahkan explanatory content:

```text
What is a subnet calculator?
How to calculate subnet mask
What is CIDR?
What is a network address?
What is a broadcast address?
```

---

# 76. SEO Content Disclaimer

Jangan membuat klaim:

```text
100% guaranteed
```

atau:

```text
the world's best
```

Gunakan wording informatif.

---

# 77. Suggested Footer

Footer:

```text
IPv4 Subnet Calculator

A client-side IPv4 subnet calculator for
networking and educational purposes.

Tools
- IPv4 Calculator
- CIDR Calculator
- Subnet Mask Calculator

Resources
- IPv4 Basics
- CIDR Guide
- Subnetting Guide
```

Fitur yang belum dibuat jangan ditampilkan sebagai link aktif.

---

# 78. Future Features

Struktur kode harus memungkinkan penambahan:

## Phase 2

```text
VLSM Calculator
```

Input:

```text
Network:
192.168.1.0/24

Requirements:
Department A = 100 hosts
Department B = 50 hosts
Department C = 20 hosts
```

Output:

```text
Subnet
Network
Prefix
Mask
First Host
Last Host
Broadcast
```

---

# 79. Phase 2 — CIDR Aggregation

Contoh:

```text
192.168.0.0/24
192.168.1.0/24
192.168.2.0/24
192.168.3.0/24
```

dapat dianalisis untuk aggregation.

Fitur ini jangan dicampurkan dengan MVP engine.

---

# 80. Phase 3 — IPv6

Tambahkan:

```text
IPv6 Subnet Calculator
```

Tetapi gunakan engine terpisah:

```text
core/ipv4/
core/ipv6/
```

Jangan membuat satu fungsi yang mencoba menangani IPv4 dan IPv6 sekaligus.

---

# 81. Development Rules for Hermes Agent

Hermes Agent WAJIB mengikuti aturan berikut.

### Rule 1

Jangan mengubah calculation formula hanya demi membuat test pass.

Jika test gagal:

```text
periksa logic
```

bukan mengubah expected value secara sembarangan.

### Rule 2

Semua calculation harus berada di:

```text
src/core/
```

### Rule 3

UI tidak boleh menghitung subnet.

### Rule 4

Semua public core functions harus memiliki unit test.

### Rule 5

Gunakan TypeScript strict mode.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Rule 6

Tidak menggunakan `any` kecuali benar-benar diperlukan.

### Rule 7

Gunakan BigInt untuk internal IPv4 integer calculations.

### Rule 8

Jangan menggunakan external subnet calculator API.

### Rule 9

Jangan menggunakan `eval`.

### Rule 10

Jangan memasukkan secret/API key ke frontend.

---

# 82. Definition of Done

Project dianggap selesai apabila:

### Functionality

* [ ] IPv4 validation bekerja.
* [ ] CIDR validation bekerja.
* [ ] Subnet mask validation bekerja.
* [ ] CIDR → mask bekerja.
* [ ] Mask → CIDR bekerja.
* [ ] Network calculation benar.
* [ ] Broadcast calculation benar.
* [ ] Wildcard calculation benar.
* [ ] Total address benar.
* [ ] Usable host benar.
* [ ] `/0` benar.
* [ ] `/31` benar.
* [ ] `/32` benar.
* [ ] Binary representation benar.
* [ ] Classification bekerja.

### UI

* [ ] Responsive.
* [ ] Dark mode.
* [ ] Light mode.
* [ ] Validation error.
* [ ] Copy button.
* [ ] Reset.
* [ ] Example presets.
* [ ] Accessible form.
* [ ] Result mudah dibaca.

### Testing

* [ ] Semua unit test pass.
* [ ] Prefix `/0–/32` telah dites.
* [ ] Boundary IP telah dites.
* [ ] Invalid input telah dites.
* [ ] `/31` telah dites.
* [ ] `/32` telah dites.
* [ ] Network invariant pass.
* [ ] Broadcast invariant pass.
* [ ] Address count invariant pass.

### Build

```bash
npm run build
```

harus berhasil tanpa error.

### Tests

```bash
npm run test
```

harus menghasilkan:

```text
PASS
```

---

# 83. Required npm Scripts

package.json harus memiliki:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

# 84. Final Expected UX

User membuka:

```text
IPv4 Subnet Calculator
```

Kemudian melihat:

```text
IP Address
[192.168.1.10]

CIDR
[/24]

[ Calculate ]
```

Setelah calculate:

```text
NETWORK INFORMATION

IP Address       192.168.1.10
CIDR             /24
Subnet Mask      255.255.255.0
Wildcard Mask    0.0.0.255

ADDRESS RANGE

Network          192.168.1.0
First Host       192.168.1.1
Last Host        192.168.1.254
Broadcast        192.168.1.255

CAPACITY

Total Addresses  256
Usable Hosts     254
Host Bits        8

BINARY

IP:
11000000.10101000.00000001.00001010

MASK:
11111111.11111111.11111111.00000000

CLASSIFICATION

Legacy Class    C
Address Type    Private
```

---

# 85. Final Implementation Priority

Hermes Agent harus mengerjakan dalam urutan berikut:

```text
STEP 1
Project initialization

↓

STEP 2
IPv4 core parser

↓

STEP 3
IPv4 BigInt conversion

↓

STEP 4
CIDR engine

↓

STEP 5
Subnet calculation engine

↓

STEP 6
Unit tests

↓

STEP 7
Validation

↓

STEP 8
Classification engine

↓

STEP 9
React UI

↓

STEP 10
Binary visualization

↓

STEP 11
Copy/share/reset

↓

STEP 12
Dark/light theme

↓

STEP 13
Responsive design

↓

STEP 14
SEO

↓

STEP 15
Final testing

↓

STEP 16
Production build
```

---

# 86. Critical Acceptance Test

Sebelum menyatakan project selesai, Hermes Agent WAJIB menjalankan test berikut:

```text
Input:
192.168.1.10/24
```

Expected:

```text
Network = 192.168.1.0
Broadcast = 192.168.1.255
First Host = 192.168.1.1
Last Host = 192.168.1.254
Total = 256
Usable = 254
Mask = 255.255.255.0
Wildcard = 0.0.0.255
```

Kemudian:

```text
Input:
192.168.1.100/26
```

Expected:

```text
Network = 192.168.1.64
Broadcast = 192.168.1.127
First Host = 192.168.1.65
Last Host = 192.168.1.126
Total = 64
Usable = 62
```

Kemudian:

```text
Input:
192.168.1.10/31
```

Expected:

```text
Total = 2
Usable = 2
```

Kemudian:

```text
Input:
192.168.1.10/32
```

Expected:

```text
Total = 1
Usable = 1
Network = 192.168.1.10
Broadcast = 192.168.1.10
```

Kemudian:

```text
Input:
10.20.30.40/0
```

Expected:

```text
Network = 0.0.0.0
Broadcast = 255.255.255.255
Total = 4294967296
```

Jika salah satu hasil tersebut tidak sesuai, project **belum dianggap selesai**.

---

# 87. Important Notes for Developer

Jangan berasumsi bahwa:

```text
Network Address = input IP
```

Input IP bisa merupakan host di dalam subnet.

Contoh:

```text
192.168.1.100/24
```

network bukan:

```text
192.168.1.100
```

tetapi:

```text
192.168.1.0
```

Jangan berasumsi:

```text
Broadcast = IP terakhir dari octet
```

Broadcast harus dihitung berdasarkan subnet mask.

Jangan berasumsi:

```text
Private = 10.x.x.x saja
```

Private IPv4 juga mencakup:

```text
172.16.0.0/12
192.168.0.0/16
```

Jangan menganggap semua address non-private sebagai public karena terdapat berbagai special-purpose ranges yang didefinisikan dalam registry IANA.

Jangan menggunakan legacy Class A/B/C sebagai dasar menentukan network address.

Dasar calculation harus:

```text
CIDR prefix
+
subnet mask
```

Legacy class hanya informasi tambahan.

---

# 88. Final Technical Principle

Core aplikasi harus mengikuti prinsip:

```text
STRING INPUT
      ↓
VALIDATION
      ↓
BIGINT IPv4
      ↓
CIDR MASK
      ↓
BITWISE CALCULATION
      ↓
SUBNET RESULT
      ↓
FORMATTING
      ↓
UI
```

Jangan:

```text
UI
 ↓
random calculation
 ↓
format string
```

Semua hasil harus berasal dari satu **single source of truth**, yaitu:

```text
calculateSubnet()
```

Dengan pendekatan ini, perubahan UI tidak boleh mengubah hasil subnetting.

---

# 89. Deliverables

Hermes Agent harus menghasilkan:

```text
1. Complete React + TypeScript project

2. Responsive IPv4 Subnet Calculator

3. IPv4 calculation engine

4. Address classification engine

5. Unit tests

6. README.md

7. Architecture documentation

8. Calculation documentation

9. Test documentation

10. Production build
```

README harus menjelaskan:

```text
Installation
Development
Testing
Build
Architecture
Calculation logic
Supported CIDR
Special handling for /31 and /32
```

---

# 90. README Calculation Documentation

README harus menyertakan formula:

```text
Network Address
= IP AND Subnet Mask

Broadcast Address
= Network Address OR Wildcard Mask

Wildcard Mask
= NOT Subnet Mask

Total Addresses
= 2^(32-prefix)

Traditional Usable Hosts
= Total Addresses - 2

/31
= 2 usable addresses

/32
= 1 usable address
```

README juga harus menjelaskan bahwa `/31` merupakan special case untuk point-to-point usage dan `/32` merepresentasikan satu IPv4 address.

---

# 91. Final Instruction to Hermes Agent

Implement the application according to this PRD.

Do not simplify the subnet calculation logic.

Do not replace the calculation engine with an external API or third-party calculator.

Prioritize correctness over visual complexity.

Before finishing:

1. Run all unit tests.
2. Run all `/0–/32` prefix tests.
3. Run boundary tests.
4. Run `/31` and `/32` tests.
5. Verify BigInt calculations.
6. Verify network/broadcast invariants.
7. Verify invalid input handling.
8. Run production build.
9. Fix all TypeScript errors.
10. Fix all failing tests.
11. Only after all tests pass, consider the implementation complete.

The application must be deterministic:

```text
same input
→ same result
```

No network request should be required for subnet calculation.
