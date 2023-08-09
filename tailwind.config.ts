import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        dark: 'hsl(235, 21%, 11%)',
        lightdark: 'hsl(235, 24%, 19%)',
        darkgrayishblue: 'hsl(235, 19%, 35%)',
        lightgrayishblue: 'hsl(234, 39%, 85%)',
        verylightgray: 'hsl(0, 0%, 98%)',
      },
      letterSpacing: {
        widest: '0.5rem',
      }
    },
  },
  plugins: [],
}
export default config
