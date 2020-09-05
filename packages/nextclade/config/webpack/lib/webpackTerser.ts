/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MinifyOptions } from 'terser'

import TerserPlugin from 'terser-webpack-plugin'

export interface WebpackTerserParams {
  sourceMaps: boolean
  pretty: boolean
  profile: boolean
}

export default function webpackTerser({ sourceMaps, pretty, profile = false }: WebpackTerserParams) {
  const minify: MinifyOptions = {
    ecma: 5,
    parse: {
      ecma: 2020,
    },
    compress: {
      defaults: true,
      ecma: 5,
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    // @ts-ignore
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
    ie8: false,
    safari10: true,
    keep_classnames: profile,
    keep_fnames: profile,
    sourceMap: sourceMaps,
  }

  const beautify: MinifyOptions = {
    ...minify,
    compress: false,
    mangle: false,
    // @ts-ignore
    output: {
      ...minify.format,
      braces: true,
      semicolons: true,
      beautify: true,
      comments: 'all',
    },
    ie8: false,
    safari10: false,
    keep_classnames: true,
    keep_fnames: true,
  }

  return new TerserPlugin({
    terserOptions: pretty ? beautify : minify,
    parallel: true,
    cache: true,
    extractComments: false,
    sourceMap: sourceMaps,
  })
}
