export default function forceDesktopUrl(url: string) {
  const mobileSignature: RegExp = new RegExp('/m(/?)$');
  if (!mobileSignature.test(url)) return url;

  return url.replace(mobileSignature, '/');
}
