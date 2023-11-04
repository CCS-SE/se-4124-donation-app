import { Button, useDisclosure, Spinner } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import CreateFundraiserModal from '../components/Modal/CreateFundraiserModal';
import FundraiserCard from '../components/Card/FundraiserCard';
import { ethers } from 'ethers';
import { useAddress, useContract } from '@thirdweb-dev/react';

interface FundraiserProps {
  beneficiary: string;
  title: string;
  description: string;
  targetAmount: number;
  amountCollected: number;
  img: string;
}

export default function DonationPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [fundraisers, setFundraisers] = useState<FundraiserProps[]>([]);

  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const getAllFundraisers = async () => {
    const fundraisers = await contract?.call('getAllFundraisers');

    const parsedFundraisers = fundraisers.map(
      (
        fundraiser: {
          beneficiary: string;
          title: string;
          description: string;
          targetAmount: { toString: () => ethers.BigNumberish };
          img: string;
          amountCollected: { toString: () => ethers.BigNumberish };
        },
        index: number
      ) => ({
        key: index,
        fundraiserId: index,
        beneficiary: fundraiser.beneficiary,
        title: fundraiser.title,
        description: fundraiser.description,
        img: fundraiser.img,
        targetAmount: ethers.utils.formatEther(
          fundraiser.targetAmount.toString()
        ),
        amountCollected: ethers.utils.formatEther(
          fundraiser.amountCollected.toString()
        ),
      })
    );

    return parsedFundraisers;
  };

  const fetchFundraisers = async () => {
    setIsLoading(true);
    const data = await getAllFundraisers();
    setFundraisers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchFundraisers();
    }
  }, [address, contract]);

  return (
    <div className='min-h-screen'>
      <div className='flex flex-row justify-between p-2 items-center'>
        <h1 className='text-3xl text-violet-500 font-medium mt-3 ml-3'>Fundraisers</h1>
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
              marginTop: 20,
              marginRight: 2
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
          <div className='flex flex-wrap'>
            {fundraisers.map((fundraiser, i) => (
              <div className='w-full sm:w-1/3 lg:w-[360px] m-3' key={i}>
                <FundraiserCard
                  amountCollected={fundraiser.amountCollected}
                  beneficiary={fundraiser.beneficiary}
                  description={fundraiser.description}
                  fundraiserId={i}
                  img={
                    !fundraiser.img
                      ? 'https://preen.ph/wp-content/blogs.dir/38/files/1920/11/preen-supertyphoon-rolly-fandonations.jpg'
                      : fundraiser.img
                  }
                  targetAmount={fundraiser.targetAmount}
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
