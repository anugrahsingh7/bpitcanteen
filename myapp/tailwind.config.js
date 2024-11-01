/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in'
      }
    },
  },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards'
      }
    }
  },

  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { borderColor: 'currentColor' },
          '50%': { borderColor: 'transparent' }
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite'
      }
    }
  },
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        fadeInDelay: 'fadeIn 0.8s ease-out 0.3s forwards'
      }
    }
  },
  plugins: [],
  
}
