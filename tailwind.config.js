/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#fef3e2',
					100: '#fde6c5',
					200: '#fbcd8b',
					300: '#f9b451',
					400: '#f79b17',
					500: '#e88500',
					600: '#c97000',
					700: '#945300',
					800: '#5f3600',
					900: '#2a1900'
				},
				secondary: {
					50: '#f0f4f8',
					100: '#d9e2ec',
					200: '#bcccdc',
					300: '#9fb3c8',
					400: '#829ab1',
					500: '#627d98',
					600: '#486581',
					700: '#334e68',
					800: '#243b53',
					900: '#102a43'
				}
			},
			fontFamily: {
				display: ['Crimson Pro', 'Georgia', 'serif'],
				body: ['Inter', 'system-ui', 'sans-serif']
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.6s ease-out',
				'scale-in': 'scaleIn 0.4s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			}
		}
	},
	plugins: []
};
