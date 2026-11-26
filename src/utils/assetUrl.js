/**
 * Resolves a public asset path against Vite's configured BASE_URL
 * so assets work identically on localhost (/) and GitHub Pages (/rk-residency-nellore/).
 */
export function assetUrl(path) {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  const clean = path.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
