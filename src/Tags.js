export function ScriptTag ({src = false, url = false, async = true, defer = true, type}) {
  if (!url && !src) return ''

  if (url) url = `src="${url}"`

  return `<script ${async ? 'async ' : ''} ${defer ? 'defer ' : ''} ${url || ''} >${src || ''}</script>`
}

export function StyleTag ({src = false, url = false}) {
  if (!url && !src) return ''

  if (url) url = `src="${url}"`

  return `<style ${url || ''} >${src || ''}</style>`
}