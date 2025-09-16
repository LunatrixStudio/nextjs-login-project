export function isValidIranMobile(value: string): boolean {
  if (!value) return false
  const v = value.trim()
  const re1 = /^09\d{9}$/
  const re2 = /^\+989\d{9}$/
  const re3 = /^00989\d{9}$/
  return re1.test(v) || re2.test(v) || re3.test(v)
}
