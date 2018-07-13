import {ScriptTag, StyleTag} from './Tags'

export function Head (tags = []) {
  return {
    // language=HTML
    html: `
        <head>
            
            ${unwrapTags(tags)}
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
        </head>
    `
  }
}

export function unwrapTags (tags) {
  return tags.map((tag) => {
    switch (tag.type) {
      case 'title':
        return `<title> ${tag.title} </title>`
      case 'meta':
        return `<meta />`
      case 'style':
        return StyleTag(tag)
      case 'script':
        return ScriptTag(tag)
      default:
        return `<unknoknTag${tag.type}/>`
    }
  }).join(' /n')
}
