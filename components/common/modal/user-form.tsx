"use client";

import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Fragment, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { UserEntity } from "@/entities";
import { useQueryData } from "@/hooks/query/useQueryData";
import { USERS } from "@/services/endpoin";
import { get, patch, post } from "@/services/api";
import { FormUserParams } from "@/hooks/query/users/useUsers";

interface ModalUserProps {
  id: number | string | any;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isUpdate?: boolean;
}

export default function UserFormModal({
  id,
  isOpen,
  onOpenChange,
  isUpdate = false,
}: ModalUserProps) {
  const { data, isLoading, refetch } = useQueryData({
    queryKey: ["user", id],
    queryFn: () => get<UserEntity>(USERS, { params: { id } }),
    enabled: !!id,
  });

  const { avatar, email, first_name, last_name } = data?.data || {};

  const createUsers = useMutation({
    mutationKey: ["create-users"],
    mutationFn: async (credentials: FormUserParams): Promise<UserEntity> => {
      const { first_name, last_name, email } = credentials;
      const response = await post<UserEntity>(USERS, {
        email,
        first_name,
        last_name,
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("New user created successfully");
      refetch();
    },
  });

  const updateUsers = useMutation({
    mutationKey: ["update-users"],
    mutationFn: async (credentials: FormUserParams): Promise<UserEntity> => {
      const { id, first_name, last_name, email } = credentials;
      const response = await patch<UserEntity>(`${USERS}/${id}`, {
        email,
        first_name,
        last_name,
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      refetch();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormUserParams>({
    mode: "all",
    defaultValues: useMemo(
      () => ({
        id,
        first_name: first_name || "",
        last_name: last_name || "",
        email: email || "",
      }),
      [first_name, last_name, email, id],
    ),
  });

  const onSubmit = (data: FormUserParams) => {
    const { id, first_name, last_name, email } = data;

    if (isUpdate) {
      updateUsers.mutate({ id, first_name, last_name, email });
    } else {
      createUsers.mutate({ first_name, last_name, email });
    }
  };

  return (
    <Fragment>
      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ModalHeader className="flex flex-col gap-1">
                <Avatar
                  isBordered
                  alt="avatar"
                  className="w-36 h-36 mx-auto mt-5"
                  radius="full"
                  src={avatar}
                />
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 items-center justify-center text-center">
                  <input type="text" {...register("id")} hidden />
                  <Input
                    {...register("email")}
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    size="sm"
                    type="email"
                  />

                  <Input
                    {...register("first_name")}
                    label="First Name"
                    name="first_name"
                    placeholder="Enter your first name"
                    size="sm"
                    type="text"
                  />

                  <Input
                    {...register("last_name")}
                    label="Last Name"
                    name="last_name"
                    placeholder="Enter your last name"
                    size="sm"
                    type="text"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  type="button"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  disabled={!isValid}
                  isLoading={
                    updateUsers.isPending || createUsers.isPending || isLoading
                  }
                  type="submit"
                  variant="solid"
                >
                  {isUpdate ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
