import {Head} from './Head'
import {ScriptTag, StyleTag} from './Tags'

export const renderToString = (layout, params, {HeadFactory, FootFactory = null} = {HeadFactory: Head, FootFactory: null}) => {
  const [headTags, footerTags, HTMLParams] = buildTags(layout, params)

  const head = HeadFactory(headTags)

  const foot = FootFactory
    ? FootFactory(footerTags)
    : footerTags.join(' ')

  HTMLParams.head = head

  HTMLParams.foot = foot

  return layout.html(HTMLParams)
}

const buildTags = (layout, params) => {

}

const buildTag = tag => {
  const headTags = []; const footerTags = []; const HTMLParams = {}

  if (tag.html) HTMLParams[tag] = tag.html

  if (tag.style) headTags.push(
      StyleTag(tag.style))

  if (tag.exports && tag.exports.type === 'script') headTags.push(ScriptTag(tag.exports))

  return [headTags, footerTags, HTMLParams]
}

buildTags.referencePrototype = {
  html: '',
  style: '',
  exports: ''
}
