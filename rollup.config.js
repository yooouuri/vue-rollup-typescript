import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'

const baseFolder = './src/'
const componentsFolder = 'components/'

const components = fs
  .readdirSync(baseFolder + componentsFolder)
  .filter((f) => fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory())

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default () => {
  const mapComponent = (name) => {
    return [
      {
        input: `${baseFolder}${componentsFolder}${name}/index.ts`,
        external: ['vue'],
        output: {
          format: 'esm',
          name: capitalize(name),
          file: `esm/components/${name}/index.js`,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        },
        plugins: [
          vue(),
          typescript(),
          nodeResolve({
            extensions: ['.vue', '.ts']
          }),
          babel(),
          cjs(),
          // alias({
            // entries: {
            //   'vue': 'vue/dist/vue.esm.js'
            // }
            // entries: [
            //   { find: 'vue', replacement: require.resolve('vue/dist/vue.esm.js') }
            // ]
          // })
        ]
      }
    ]
  }

  return [
    ...components.map((f) => mapComponent(f)).reduce((r, a) => r.concat(a), [])
  ]

  // return [
  //   {
  //     input: `${baseFolder}${componentsFolder}form-input-ts/index.ts`,
  //     external: ['vue'],
  //     output: {
  //       format: 'esm',
  //       name: 'form-input-ts',
  //       file: `esm/components/form-input-js/index.js`,
  //       exports: 'named',
  //     },
  //     plugins: [
  //       vue(),
  //       typescript(),
  //       nodeResolve({
  //         extensions: ['.vue', '.ts']
  //       }),
  //       babel(),
  //       cjs()
  //     ]
  //   },
  //   {
  //     input: `${baseFolder}${componentsFolder}form-input/index.js`,
  //     external: ['vue'],
  //     output: {
  //       format: 'esm',
  //       name: 'form-input',
  //       file: `esm/components/form-input/index.js`,
  //       exports: 'named',
  //     },
  //     plugins: [
  //       vue(),
  //       nodeResolve({
  //         extensions: ['.vue', '.js']
  //       }),
  //       babel(),
  //       cjs()
  //     ]
  //   }
  // ]
}
