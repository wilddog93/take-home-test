"use client";

import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { UserEntity } from "@/entities";
import { useQueryData } from "@/hooks/query/useQueryData";
import { USERS } from "@/services/endpoin";
import { get } from "@/services/api";

interface ModalUserProps {
  id: number | string | any;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function UserModal({
  id,
  isOpen,
  onOpenChange,
}: ModalUserProps) {
  const { data } = useQueryData({
    queryKey: ["user", id],
    queryFn: () => get<UserEntity>(USERS, { params: { id } }),
    enabled: !!id,
  });

  const { avatar, email, first_name, last_name } = data?.data || {};

  return (
    <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Avatar
                isBordered
                alt="avatar"
                className="h-20 w-20 mx-auto mt-5"
                radius="full"
                src={avatar}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2 items-center justify-center text-center">
                <h1 className="text-2xl font-bold leading-none text-default-800">
                  {`${first_name} ${last_name}`}
                </h1>
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {email}
                </h4>
                <h5 className="text-small tracking-tight text-default-400 mt-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ratione dolores adipisci quibusdam et nesciunt quia, veritatis
                  corporis eveniet sapiente praesentium!
                </h5>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
