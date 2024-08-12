import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },
    extend: {
      width: {
        'max-plus-20': 'calc(max-content + 20px)',
      },
      fontSize: {
        '2xs': '.7rem',
      },
      backdropBlur: {
        xxs: '1px',
        xs: '2px',
      },
      transitionProperty: {
        width: 'width',
        padding: 'padding',
        height: 'height',
        opacity: "opacity"
      },
      backgroundImage: {
        'contour-lines': "url('/assets/contour.png')"
      }
    }
  },
  plugins: [

  ],
} satisfies Config

// plugins: [
//   require('@tailwindcss/typography'),
//   require('@tailwindcss/forms'),
//   require('@tailwindcss/container-queries'),
//   require('tailwindcss-text-border'),
//   require('tailwind-scrollbar')({ nocompatible: true }),
//   plugin(function({ addVariant }) {
//     addVariant('aria-selected', '&[aria-selected="true"]')
//   })
// ]
