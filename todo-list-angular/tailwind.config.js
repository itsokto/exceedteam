const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Tailwind Paths
  configJS: 'tailwind.config.js',
  sourceCSS: 'src/tailwind.scss',
  outputCSS: 'src/styles.scss',
  watchRelatedFiles: [],
  // Sass
  sass: true,
  // PurgeCSS Settings
  purge: false,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: [
    '.ts',
    '.html',
    '.js'
  ],
  extractors: [],
  content: [],
  theme: {
    ...defaultTheme,
    extend: {
      colors: {
        primary: '#ead8d8',
        secondary: '#79b5ab',
        background: '#f5f5f5'
      },
      boxShadow: {
        paper: '0 1px 1px rgb(209, 213, 219), 0 10px 0 -5px #fff, 0 10px 1px -4px rgb(209, 213, 219), 0 20px 0 -10px #fff, 0 20px 1px -9px rgb(209, 213, 219);'
      }
    }
  }
}
