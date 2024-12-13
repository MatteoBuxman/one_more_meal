import containerQueries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
declare function require(name:string):any;

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  daisyui: {
    darkTheme: "light",
   },

  theme: {
    extend: {
      colors: {
        'smoky-black': '#0F1108', // Custom name for 0F1108
        'yellow-green': '#B0DB43', // Custom name for B0DB43
        'electric-indigo': '#5E2BFF', // Custom name for 5E2BFF
        'carolina-blue': '#86BBD8', // Custom name for 86BBD8
        'light-cyan': '#D7F9FF', // Custom name for D7F9FF
      },
      fontFamily:{
        lexend: ['Lexend', 'sans-serif'],
      }
  },
},

  plugins: [
    containerQueries,
    require('daisyui'),
  ]
} satisfies Config;
