import type { AppProps } from 'next/app';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Sepolia } from '@thirdweb-dev/chains';
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={Sepolia}
      supportedWallets={[metamaskWallet()]}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
