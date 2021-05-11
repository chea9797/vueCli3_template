const IS_PROD = process.env.NODE_ENV === "production" ? true : false;

const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
// 去除 console.log
/* if (IS_PROD) {
  plugins.push('transform-remove-console')
} */

module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      useBuiltIns: 'entry'
    }]
  ],
  plugins
}