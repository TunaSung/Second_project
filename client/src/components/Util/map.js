export function buildMapUrl(address) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}