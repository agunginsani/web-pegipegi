export default function toCurrencyFormat(value: number, prefix = ''): string {
  if (isNaN(value)) return '';
  const { format } = new Intl.NumberFormat('id');
  const rawValue = Math.abs(value);
  const convert = format(rawValue);
  const signedPrefix = value < 0 ? `-${prefix}` : `${prefix}`;
  const rupiah = prefix ? `${signedPrefix}${convert}` : `${format(value)}`;

  return rupiah;
}
