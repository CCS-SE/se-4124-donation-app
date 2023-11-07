import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from '@nextui-org/react';

interface AddDonationModalProps {
  fundraiserId: number;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddDonationModal({
  isOpen,
  onOpenChange,
}: AddDonationModalProps) {
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
                startContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>ETH</span>
                  </div>
                }
                className='max-w-[350px] text-slate-800'
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Cancel
              </Button>
              <Button color='primary' onPress={onClose}>
                Donate
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
