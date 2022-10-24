import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Axios from 'axios';
import { AuthProvider } from '../context/auth';

function MyApp({ Component, pageProps }: AppProps) {
	// Next.js 환경변수 포맷(그냥 공식같은 거라 이해할 필요 x)
	Axios.defaults.baseURL =
		process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
	return (
		<>
			<AuthProvider>
				<Component {...pageProps} />;
			</AuthProvider>
		</>
	);
}

export default MyApp;
