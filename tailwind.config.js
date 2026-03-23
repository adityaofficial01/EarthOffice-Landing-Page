/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const path = require('path')

module.exports = {
  important: true, // Ensures your Tailwind styles override others
  darkMode: 'class', // Use class-based dark mode for manual toggle support
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx}',
    './src/layouts/**/*.{html,js}',
    './src/screens/**/*.{html,js}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem', // You can keep these large sizes if needed
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem',
        '6xl': '6rem',
        '7xl': '7rem',
        '8xl': '8rem',
        '9xl': '9rem',
      },
    },

    screens: {
      sm: '640px',
      md: '769px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      lg: '0.5rem',
      xl: '1rem',
      '4xl': '2rem',
      full: '9999px',
    },
    opacity: {
      0: '0',
      20: '0.2',
      40: '0.4',
      60: '0.6',
      80: '0.8',
      100: '1',
    },
    colors: {
      transparent: 'transparent',
      // Using literal RGB values (not CSS vars) so Tailwind opacity modifiers work:
      // e.g. text-white/60, bg-white/5, border-white/10
      white: '#ffffff',
      black: '#000000',
      background: "var(--background)",
      foreground: "var(--foreground)",
      mainPurple: "var(--mainPurple)",
      mainBlue: "var(--mainBlue)",
      Buttongrey: "var(--Buttongrey)",
      Yellow: {
        50: 'var(--lightYellow)'
      },
      Purple:{50:'var(--lightPurple)'},
      Blue: {
        50: 'var(--lightBlue)',
        60: 'var(--lightViolet)',
        100: 'var(--primaryViolet)',
        200: 'var(--primaryBlue)',
      },
      Violet: {
        100: 'var(--LightViolet)',
      },
      // Earth Office brand colors
      sky: require('tailwindcss/colors').sky,
      blue: require('tailwindcss/colors').blue,
      indigo: require('tailwindcss/colors').indigo,
      violet: require('tailwindcss/colors').violet,
      purple: require('tailwindcss/colors').purple,
      rose: require('tailwindcss/colors').rose,
      pink: require('tailwindcss/colors').pink,
      orange: require('tailwindcss/colors').orange,
      amber: require('tailwindcss/colors').amber,
      yellow: require('tailwindcss/colors').yellow,
      emerald: require('tailwindcss/colors').emerald,
      teal: require('tailwindcss/colors').teal,
      green: require('tailwindcss/colors').green,
      slate: require('tailwindcss/colors').slate,
      gray: require('tailwindcss/colors').gray,
      zinc: require('tailwindcss/colors').zinc,
      red: require('tailwindcss/colors').red,
    },

    fontSize: {
      'para': '1rem',             // 16px (this is the default rem to px conversion)
      'iconSize': '1.2rem',       // 19.2px (corrected from 1.20rem to 1.2rem)
      'iconSizeLarge': '1.5rem',       // 19.2px (corrected from 1.20rem to 1.2rem)
      'description': '1.2rem',    // 19.2px (corrected from 1.20rem to 1.2rem)
      'descriptionSmall': '1.125rem',             // 18px (this is the default rem to px conversion)
      'title22': '1.25rem',       // 20px
      'title20': '1.25rem',       // 20px
      'title22': '1.15rem',   // 36px
      'title24': '1.5rem',        // 24px
      'title25': '1.5625 rem',    // 25px
      'title26': '1.625rem',      // 26px
      'title28': '1.75rem',       // 28px
      'title30': '1.875rem',      // 30px
      'title34': '2.5rem',       // 36px
      'title36': '3rem',
      'title40': '4rem',
      'title50': '5rem',
    },

    boxShadow: {
      'custom': '0px 3px 6px #DFDFDF',
      'none': 'none',
      'box-shadow': '0px 5px 20px 0px rgba(0, 0, 0, 0.05)'

    },

    fontFamily: {
      Judson: ['Judson', ...defaultTheme.fontFamily.sans],
      Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      Inter: ['Inter', ...defaultTheme.fontFamily.sans],
      sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'earth-primary': '#009edd',
        'earth-dark': '#030712',
      },
      backgroundImage: {
        'sectionOneGirl': `url(${path.resolve(__dirname, 'src/assets/Images/SectionOneGirl.png')})`,
        'footerBg': `url(${path.resolve(__dirname, 'src/assets/icons/Footerbg.png')})`,
        'aboutUsBg': `url(${path.resolve(__dirname, 'src/assets/icons/AboutUsbg.png')})`,
        'MissionBg': `url(${path.resolve(__dirname, 'src/assets/icons/MissionBg.png')})`,
        'VisionBg': `url(${path.resolve(__dirname, 'src/assets/icons/VisionBg.png')})`,
        'StoryBg': `url(${path.resolve(__dirname, 'src/assets/icons/StoryBg.png')})`,
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,158,221,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0,158,221,0.8)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"),],
}