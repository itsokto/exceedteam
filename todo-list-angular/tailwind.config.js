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
    }
  }
}
