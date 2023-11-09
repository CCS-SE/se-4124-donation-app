import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from '@nextui-org/react';
import AddDonationModal from '../Modal/AddDonationModal';
import { FaEthereum } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';

interface FundraiserCardProps {
  fundraiserId: number;
  beneficiary: string;
  title: string;
  img: string;
  targetAmount: string;
  amountCollected: string;
}

export default function FundraiserCard({
  fundraiserId,
  beneficiary,
  title,
  img,
  targetAmount,
  amountCollected,
}: FundraiserCardProps) {
  const address = useAddress();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { push } = useRouter();

  return (
    <>
      <Card
        shadow='sm'
        onPress={() => push(`fundraiser/${fundraiserId}`)}
        isPressable
      >
        <CardBody className='overflow-visible p-0'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={title}
            className='w-full object-cover h-[230px]'
            src={img}
          />
        </CardBody>
        <CardFooter>
          <div className='flex-1 flex-col'>
            <b className='text-blue-500 text-xl'>{title}</b>
            <div className='flex flex-row justify-between items-center '>
              <div className='flex flex-row'>
                <b className='mr-1 text-blue-700'>{amountCollected}</b>
                <p className='mr-1 text-blue-700'>raised of</p>
                <p className=' text-blue-700'>{targetAmount}</p>
              </div>
              <div>
                {beneficiary !== address ? (
                  <Button
                    size='md'
                    radius='lg'
                    color='primary'
                    onPress={onOpen}
                  >
                    Donate
                  </Button>
                ) : (
                  <Button
                    size='md'
                    radius='lg'
                    color='success'
                    className='text-white'
                  >
                    Claim
                  </Button>
                )}
              </div>
            </div>
            <div className='flex flex-row bg-violet-200 mt-2 rounded-xl p-1 pl-2'>
              <FaEthereum color='blueviolet' />
              <p className='text-[11px] text-default-500 ml-2'>{beneficiary}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
      <AddDonationModal
        fundraiserId={fundraiserId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
