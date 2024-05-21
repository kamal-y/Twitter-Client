import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Quicksand } from 'next/font/google'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const inter = Inter({ subsets: ["latin"] });
const quickSand = Quicksand({ subsets: ["latin"] });

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="852185220315-t1q68o5stn14r6dk1flhu4k61rn4bdiu.apps.googleusercontent.com" >
          <Component {...pageProps} />
          <Toaster />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  )
}
