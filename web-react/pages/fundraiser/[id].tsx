import { Button, Spinner, useDisclosure } from '@nextui-org/react';
import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Image } from '@nextui-org/react';
import TopTenCard from '../../components/Card/TopDonorCard';
import { ethers } from 'ethers';
import AddDonationModal from '../../components/Modal/AddDonationModal';

export default function FundraiserDetailPage() {
  const { query } = useRouter();
  const address = useAddress();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { data, isLoading } = useContractRead(contract, 'getFundraiser', [
    query.id,
  ]);

  if (isLoading) {
    return (
      <div className='flex flex-col h-screen w-screen items-center justify-center'>
        <Spinner size='lg' color='secondary' />
      </div>
    );
  }

  const sortedDonations = [...data.donations].sort(
    (
      a: { donor: string; amount: string },
      b: { donor: string; amount: string }
    ) => {
      let amountA = parseFloat(ethers.utils.formatEther(a.amount));
      let amountb = parseFloat(ethers.utils.formatEther(b.amount));

      return amountb - amountA;
    }
  );

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col sm:flex-row p-6'>
        <div className='lg:w-1/3 w-full'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={data && data.title}
            className='w-full object-cover h-[100%]'
            src={
              data && !data.img
                ? 'https://preen.ph/wp-content/blogs.dir/38/files/1920/11/preen-supertyphoon-rolly-fandonations.jpg'
                : data.img
            }
          />
          <h1 className='lg:text-2xl text-lg mt-2'>{data && data.title}</h1>
          <h1 className='lg:text-lg text-base mt-2'>
            {data && data.description}
          </h1>
          <div className='flex flex-row items-center justify-between'>
            <p className='lg:text-2xl text-base text-violet-400 font-semibold'>
              {data && ethers.utils.formatEther(data.amountCollected)} raised of{' '}
              {data && ethers.utils.formatEther(data.targetAmount)}
            </p>
            {data && data.beneficiary !== address ? (
              <Button
                color='secondary'
                className='mt-4 text-lg  w-1/3'
                onPress={onOpen}
              >
                Donate
              </Button>
            ) : (
              <Button color='success' className='mt-4 text-lg text-white w-1/3'>
                Claim
              </Button>
            )}
          </div>
        </div>
        {data && data.donations.length === 0 ? (
          <></>
        ) : (
          <div className='lg:ml-12 bg-violet-100 bg-opacity-10 p-2 rounded-lg lg:w-1/2 w-[100%] lg:mt-0 mt-5 lg:mb-8'>
            <h1 className='lg:text-3xl text-xl lg:mt-0 my-2 text-violet-500 font-bold mb-6'>
              Top 10 Donors
            </h1>
            {data &&
              sortedDonations.map(
                (
                  donation: { donor: string; amount: string },
                  index: number
                ) => (
                  <div className='flex-col' key={index}>
                    <TopTenCard
                      index={index + 1}
                      address={donation.donor}
                      amountDonated={ethers.utils.formatEther(donation.amount)}
                    />
                  </div>
                )
              )}
          </div>
        )}
      </div>
      <AddDonationModal
        fundraiserId={parseInt(query.id as string)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
