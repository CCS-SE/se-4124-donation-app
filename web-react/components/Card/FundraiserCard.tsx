import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from '@nextui-org/react';
import AddDonationModal from '../Modal/AddDonationModal';

interface FundraiserCardProps {
  fundraiserId: number;
  beneficiary: string;
  title: string;
  description: string;
  img: string;
  targetAmount: number;
  amountCollected: number;
}

export default function FundraiserCard({
  fundraiserId,
  beneficiary,
  title,
  description,
  img,
  targetAmount,
  amountCollected,
}: FundraiserCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card shadow='sm'>
        <CardBody className='overflow-visible p-0'>
          <Image
            shadow='sm'
            radius='lg'
            width='100%'
            alt={title}
            className='w-full object-cover h-[250px]'
            src={img}
          />
        </CardBody>
        <CardFooter>
          <div className='flex-1 flex-col '>
            <b className='text-blue-500 text-xl'>{title}</b>
            <div className='flex flex-row justify-between items-center '>
              <div className='flex flex-row'>
                <b className='mr-1 text-blue-700'>{amountCollected}</b>
                <p className='mr-1 text-blue-700'>raised of</p>
                <p className=' text-blue-700'>{targetAmount}</p>
              </div>
              <div>
                <Button size='md' radius='lg' color='primary' onPress={onOpen}>
                  Donate
                </Button>
              </div>
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