import { Button, useDisclosure, Spinner } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useState } from 'react';
import CreateFundraiserModal from '../components/Modal/CreateFundraiserModal';
import FundraiserCard from '../components/Card/FundraiserCard';

interface FundraiserProps {
  beneficiary: string;
  title: string;
  description: string;
  targetAmount: number;
  amountCollected: number;
  image: string;
}

export default function DonationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [fundraisers, setFundraisers] = useState<FundraiserProps[]>([]);

  return (
    <div className='h-screen'>
      <div className='flex flex-row justify-between p-2 items-center'>
        <h1 className='text-3xl text-violet-500 font-medium'>Fundraisers</h1>
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
      <div className='flex p-2.5 grid-cols-2'>
        {isLoading ? (
          <div>
            {' '}
            <Spinner size='lg' color='secondary' />
          </div>
        ) : !isLoading && fundraisers && fundraisers.length == 0 ? (
          <p className='font-medium text-lg'>No fundraisers yet.</p>
        ) : (
          <FundraiserCard
            amountCollected={0}
            beneficiary='3182310318381238193'
            description=''
            fundraiserId={1}
            img='https://preen.ph/wp-content/blogs.dir/38/files/1920/11/preen-supertyphoon-rolly-fandonations.jpg'
            targetAmount={0.5}
            title='Sagip Kapamilya'
          />
        )}
      </div>
      <div>
        <Button
          size='sm'
          className='absolute bottom-10 right-6 bg-violet-600 text-white rounded-full h-16 text-4xl'
          onPress={onOpen}
        >
          +
        </Button>
      </div>
      <CreateFundraiserModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
