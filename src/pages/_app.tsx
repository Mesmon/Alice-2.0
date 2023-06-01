import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from 'next-themes';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <NavigationBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
);

export default MyApp;
