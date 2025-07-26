import postcssPresetEnv from 'postcss-preset-env';
import discardUnusedKeyframes from 'postcss-discard-unused';
import sortMediaQueries from 'postcss-sort-media-queries';

// Fallback if NODE_ENV is not defined (Vite sets 'development' or 'production')
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

export default {
  plugins: [
    postcssPresetEnv({
      autoprefixer: true,
      features: {
        'logical-properties-and-values': false,
        'custom-properties': false,
        'gap-properties': false,
        'focus-visible-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'nested-calc': { preserve: false },
      },
    }),
    sortMediaQueries(),
    ...(isProduction ? [discardUnusedKeyframes()] : []),
  ],
};
