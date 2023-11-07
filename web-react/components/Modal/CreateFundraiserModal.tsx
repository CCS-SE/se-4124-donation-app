import React, { useState } from 'react';
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
import { ethers } from 'ethers';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';

interface CreateFundraiserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

interface CreateFundraiserFormProps {
  title: string;
  description: string;
  targetAmount: string;
  img: string;
}

const inititalData = {
  title: '',
  targetAmount: '',
  description: '',
  img: '',
};

export default function CreateFundraiserModal({
  isOpen,
  onOpenChange,
}: CreateFundraiserModalProps) {
  const [form, setForm] = useState<CreateFundraiserFormProps>(inititalData);

  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { mutateAsync: createFundraiser, isLoading } = useContractWrite(
    contract,
    'createFundraiser'
  );

  const resetForm = () => {
    setForm(inititalData);
  };

  const addFundraiser = async () => {
    try {
      const data = await createFundraiser({
        args: [
          address,
          form.title,
          form.description,
          form.img,
          ethers.utils.parseUnits(form.targetAmount, 18),
        ],
      });
      console.info('Contract call successs', data);
      onOpenChange();
    } catch (err) {
      console.error('Contract call failure', err);
      onOpenChange();
    }
  };

  const handleFormChange = (fieldName: string, value: any) => {
    setForm({ ...form, [fieldName]: value });
  };

  const handleSubmit = () => {
    console.log(form);

    addFundraiser();
  };

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
                value={form.title}
                onValueChange={(title) => handleFormChange('title', title)}
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
                value={form.targetAmount}
                onValueChange={(amount) =>
                  handleFormChange('targetAmount', amount)
                }
              />
              <Textarea
                radius={'sm'}
                type=''
                label='Description'
                color='secondary'
                className='max-w-[350px]'
                value={form.description}
                onValueChange={(description) =>
                  handleFormChange('description', description)
                }
              />
              <Input
                radius={'sm'}
                label='Image URL'
                color='secondary'
                isClearable
                className='max-w-[350px]'
                value={form.img}
                onValueChange={(img) => handleFormChange('img', img)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='danger'
                variant='light'
                onPress={() => {
                  resetForm();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color='secondary'
                onPress={handleSubmit}
                isLoading={isLoading}
              >
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
