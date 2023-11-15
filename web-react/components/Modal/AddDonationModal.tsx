import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { useContract } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

interface AddDonationModalProps {
  fundraiserId: number;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddDonationModal({
  isOpen,
  onOpenChange,
  fundraiserId
}: AddDonationModalProps) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0.001");
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const donate = async () => {
   const data = await contract?.call("donateToFundraiser", [fundraiserId], {value: ethers.utils.parseEther(amount)})
   return data
  };

  const handleDonate = () => {
    setLoading(true);
    donate();
    setLoading(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='sm'
      placement='auto'
      className='bg-gray-100'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1 text-xl text-blue-500'>
              Add Donation
            </ModalHeader>
            <ModalBody>
              <Input
                radius={'sm'}
                type='number'
                label='Amount'
                color='primary'
                step={"0.001"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>ETH</span>
                  </div>
                }
                className='max-w-[350px] text-slate-800'
              />
            </ModalBody>
            <ModalFooter>
              {
              loading ? <Button disabled color='danger' variant='light' onPress={onClose}>
                Cancel
              </Button> : <Button color='danger' variant='light' onPress={onClose}>
                Cancel
              </Button>
              }
              
              <Button color='primary' isLoading={loading} onPress={() => {
                handleDonate(); 
                onClose();
                }}>
                Donate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
