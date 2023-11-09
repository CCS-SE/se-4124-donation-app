import React from 'react';
import { FaEthereum } from 'react-icons/fa';

interface TopDonorCardProps {
  address: string;
  amountDonated: string;
  index: number;
}

export default function TopDonorCard({
  address,
  amountDonated,
  index,
}: TopDonorCardProps) {
  return (
    <div className=' mt-3'>
      <div className='flex flex-row'>
        <div className='rounded-full bg-violet-500 bg-opacity-60 lg:w-8 w-10 p-2 justify-center lg:h-8'>
          <p className='text-center lg:-mt-1'>{index}</p>
        </div>
        <div className='ml-1.5 rounded-md bg-violet-200 bg-opacity-25 lg:w-full w-[100%] p-2 flex flex-row items-center  justify-between lg:h-8 h-10 px-1.5'>
          <div className='flex flex-row items-center'>
          <FaEthereum color='lightblue' />
          <p className='text-center text-white ml-2 lg:text-base text-[8px] mr-2 font-light'>
            {address}
          </p>
          </div>
          <p className='text-center font-semibold text-violet-500 lg:text-lg text-[8px]'>
            {amountDonated}
          </p>
        </div>
      </div>
    </div>
  );
}
