import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import axios from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
	axios.defaults.baseURL =
		process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
	axios.defaults.withCredentials = true;

	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
