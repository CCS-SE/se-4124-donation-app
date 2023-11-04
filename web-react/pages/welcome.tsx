import { ConnectWallet } from '@thirdweb-dev/react';

export default function WelcomePage() {
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='font-medium text-4xl text-violet-700 mb-2'>Welcome!</h1>
      <div>
        <ConnectWallet
          dropdownPosition={{
            side: 'bottom',
            align: 'center',
          }}
          btnTitle='Connect Wallet'
          style={{
            backgroundColor: 'blueviolet',
            fontSize: 15,
            color: 'white',
          }}
        />
      </div>
    </div>
  );
}
