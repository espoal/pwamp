'use strict'

var _helperPluginUtils = require('@babel/helper-plugin-utils')

var _core = require('@babel/core')

const declare = _helperPluginUtils.declare

const t = _core.types

const template = _core.template

module.exports = declare(() => {
  return {
    visitor: {
      TemplateLiteral (path) {
        const nodes = []

        console.log({node: path.node})

        for (const elem of (path.node.quasis)) {
          console.log({elem})
          if (elem.value.cooked) {
            // console.log({cooked: elem.value.cooked})
            // nodes.push(t.TemplateLiteral(`ciaociao`))
          }
        }

        // path.replaceWithMultiple(nodes)

        path.replaceWithSourceString(` ' it works!! ' `)
      }
    }
  }
})
