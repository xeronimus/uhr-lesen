export function utf8_to_b64(normalString: string): string {
  return window.btoa(encodeURIComponent(normalString));
}

export function b64_to_utf8(b64String: string): string {
  return decodeURIComponent(window.atob(b64String));
}
