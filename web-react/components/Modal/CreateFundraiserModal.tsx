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

interface CreateFundraiserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CreateFundraiserModal({
  isOpen,
  onOpenChange,
}: CreateFundraiserModalProps) {
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
            <ModalHeader className='flex flex-col gap-1 text-xl text-violet-600'>
              Create Fundraiser
            </ModalHeader>
            <ModalBody>
              <Input
                radius={'sm'}
                label='Title'
                color='secondary'
                isRequired
                isClearable
                className='max-w-[350px]'
              />
              <Input
                radius={'sm'}
                type='number'
                label='Amount'
                color='secondary'
                isRequired
                isClearable
                startContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>ETH</span>
                  </div>
                }
                required
                className='max-w-[350px] text-slate-800'
              />
              <Textarea
                radius={'sm'}
                type=''
                label='Description'
                color='secondary'
                className='max-w-[350px]'
              />
              <Input
                radius={'sm'}
                label='Image URL'
                color='secondary'
                isClearable
                className='max-w-[350px]'
              />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Cancel
              </Button>
              <Button color='secondary' onPress={onClose}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
