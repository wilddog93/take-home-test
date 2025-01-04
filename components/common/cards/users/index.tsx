"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment, useState } from "react";

import UserModal from "../../modal/user";
import UserFormModal from "../../modal/user-form";

import { UserEntity } from "@/entities";
import { useQueryData } from "@/hooks/query/useQueryData";
import { get } from "@/services/api";
import { USERS } from "@/services/endpoin";

interface Props {
  id: number | string | any;
}

export const CardUsers = ({ id }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const { data, isLoading, error } = useQueryData({
    queryKey: ["user", id],
    queryFn: () => get<UserEntity>(USERS, { params: { id } }),
    enabled: !!id,
  });

  const onOpenModal = () => {
    setIsOpenForm(true);
  };

  const { avatar, email, first_name } = data?.data || {};

  if (isLoading)
    return (
      <Card className="py-10 px-4" radius="sm" shadow="sm">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
          <Skeleton className="rounded-full" isLoaded={isLoading}>
            <div className="h-24 rounded-lg bg-default" />
          </Skeleton>
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoading}>
            <div className="h-5 w-full rounded-lg bg-default" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoading}>
            <div className="h-3 w-full rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" isLoaded={isLoading}>
            <div className="h-8 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </CardBody>
      </Card>
    );

  if (error) return <div>User not found!</div>;

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="w-full py-10 px-4 rounded-lg shadow-small hover:cursor-pointer overflow-hidden"
        onClick={onOpen}
      >
        <div className="flex flex-row items-center justify-center space-y-0 pb-2">
          <Avatar alt={first_name} className="h-20 w-20" src={avatar} />
        </div>
        <div className="flex flex-col items-center justify-center overflow-auto">
          <div className="text-2xl font-bold">{first_name}</div>
          <p className="text-xs text-muted-foreground">{email}</p>
          <Button
            className="mt-4 px-10 text-base"
            size="sm"
            onPress={onOpenModal}
          >
            Edit
          </Button>
        </div>
      </div>
      <UserModal id={id} isOpen={isOpen} onOpenChange={onOpenChange} />
      <UserFormModal
        isUpdate
        id={id}
        isOpen={isOpenForm}
        onOpenChange={setIsOpenForm}
      />
    </Fragment>
  );
};
