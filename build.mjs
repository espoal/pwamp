import babel from 'rollup-plugin-babel'
import rollup from 'rollup'
import closure from 'google-closure-compiler-js'
import fs from 'fs'
import UglifyJS from 'uglify-es'
import butternut from 'butternut'

const esInputOptions = {
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

const UMDInputOptions = {
  input: 'src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [],
      plugins: ["transform-class-properties", "plugin-transform-modules-commonjs"],
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




async function build({inputOpts, outOpts, source=false}) {
  // create a bundle
  const bundle = await rollup.rollup(inputOpts)


  // generate code and a sourcemap

  const { code } = await bundle.generate(outOpts)

  if (source) fs.writeFileSync(outOpts.file, code)

  // outOpts.closure.jsCode = code

  // const minified = closure.compile(outOpts.closure)

  const uglified = UglifyJS.minify(code)
  // const butter = butternut.squash(code)


  // fs.writeFileSync(outOpts.file +'.clo.js', minified.compiledCode)

  fs.writeFileSync(outOpts.compressedName, uglified.code)

  // fs.writeFileSync(outOpts.compressedName +'.butt.js', butter.code)



}

build({inputOpts: esInputOptions, outOpts: esModuleOut, source: true})
build({inputOpts: esInputOptions, outOpts: umdOut})