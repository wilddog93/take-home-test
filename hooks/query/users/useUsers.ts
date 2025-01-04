import { UserEntity } from "@/entities";
import { get } from "@/services/api";
import { useQueryData } from "@/hooks/query/useQueryData";
import { USERS } from "@/services/endpoin";

type UsersParams = {
  page: number;
  per_page?: number;
};

export type FormUserParams = {
  id?: number | string | any;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar?: string;
};

const useUsers = ({ ...params }: UsersParams) =>
  useQueryData({
    queryKey: ["users", params],
    queryFn: () =>
      get<UserEntity[]>(USERS, {
        params,
      }),
  });

export { useUsers };
