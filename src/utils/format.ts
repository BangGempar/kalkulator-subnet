
export function formatNumber(num: bigint | number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
