module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: process.env.TARGET === 'esm' ? false : 'auto',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
}
