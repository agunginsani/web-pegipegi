export default function leadingZero(num: number): string {
  return `0${Math.floor(num)}`.slice(-2);
}
