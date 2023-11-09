import { Button, useDisclosure, Spinner } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import CreateFundraiserModal from '../../components/Modal/CreateFundraiserModal';
import FundraiserCard from '../../components/Card/FundraiserCard';
import { ethers } from 'ethers';
import { useContract, useContractRead } from '@thirdweb-dev/react';

interface FundraiserProps {
  beneficiary: string;
  title: string;
  targetAmount: string;
  amountCollected: string;
  img: string;
}

export default function FundraisersPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { data, isLoading } = useContractRead(contract, 'getAllFundraisers');

  return (
    <div className='min-h-screen'>
      <div className='flex flex-row justify-between p-2 items-center'>
        <h1 className='lg:text-3xl text-2xl text-violet-500 font-medium mt-3 ml-3'>
          Fundraisers
        </h1>
        <div>
          <ConnectWallet
            dropdownPosition={{
              side: 'bottom',
              align: 'center',
            }}
            style={{
              backgroundColor: 'blueviolet',
              fontSize: 10,
              color: 'white',
              marginTop: 20,
              marginRight: 2,
            }}
          />
        </div>
      </div>
      <div className='flex p-2.5 grid-cols-2'>
        {isLoading ? (
          <div className='flex flex-col h-screen w-screen items-center justify-center'>
            <Spinner size='lg' color='secondary' />
          </div>
        ) : !isLoading && data && data.length == 0 ? (
          <p className='font-medium text-lg'>No fundraisers yet.</p>
        ) : (
          <div className='flex flex-wrap'>
            {data.map((fundraiser: FundraiserProps, i: number) => (
              <div className='w-full sm:w-1/3 lg:w-[360px] m-3' key={i}>
                <FundraiserCard
                  amountCollected={ethers.utils.formatEther(
                    fundraiser.amountCollected
                  )}
                  beneficiary={fundraiser.beneficiary}
                  fundraiserId={i}
                  img={
                    !fundraiser.img
                      ? 'https://preen.ph/wp-content/blogs.dir/38/files/1920/11/preen-supertyphoon-rolly-fandonations.jpg'
                      : fundraiser.img
                  }
                  targetAmount={ethers.utils.formatEther(
                    fundraiser.targetAmount
                  )}
                  title={fundraiser.title}
                />
              </div>
            ))}
          </div>
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
