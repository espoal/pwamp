import babel from 'rollup-plugin-babel'
import rollup from 'rollup'
import closure from 'google-closure-compiler-js'
import fs from 'fs'
import UglifyJS from 'uglify-es'
import butternut from 'butternut'

const inputOptions = {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [],
      plugins: ["transform-class-properties"],
      exclude: 'node_modules/**'
    })
  ]
}


const closureOpts = {
  compilationLevel: 'SIMPLE',
  //languageIn: 'ECMASCRIPT_2017',
  //languageOut: 'ECMASCRIPT6',
  //warningLevel: 'VERBOSE'
}

const umdOut = {
  format: 'umd',
  file: 'dist/source.js',
  name: 'pwamp',
  compressedName: 'dist/bundle.js',

}

const esModuleOut = {
  format: 'es',
  file: 'dist/source.mjs',
  compressedName: 'dist/bundle.mjs',

}




async function build(outOpts) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions)


  // generate code and a sourcemap
  const { code } = await bundle.generate(esModuleOut)


  fs.writeFileSync(outOpts.file, code)

  // outOpts.closure.jsCode = code

  // const minified = closure.compile(outOpts.closure)

  const uglified = UglifyJS.minify(code)
  // const butter = butternut.squash(code)


  // fs.writeFileSync(outOpts.file +'.clo.js', minified.compiledCode)

  fs.writeFileSync(outOpts.compressedName, uglified.code)

  // fs.writeFileSync(outOpts.compressedName +'.butt.js', butter.code)



}

build(esModuleOut)
build(umdOut)