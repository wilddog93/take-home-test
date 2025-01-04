"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/react";

import Dashboard from "@/components/layouts/sidebar";
import { CardUsers } from "@/components/common/cards/users";
import { useSearch } from "@/store/search/useSearch";
import { useUsers } from "@/hooks/query/users/useUsers";
import useScroll from "@/hooks/scroll/useScroll";
import { UserEntity } from "@/entities";

export default function ConnectedUsersPage() {
  const refContainer = useRef<HTMLDivElement>(null);
  const { isLastScroll } = useScroll(refContainer);

  const [users, setUsers] = useState<UserEntity[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Limit tidak diubah, jadi bisa dibuat konstanta
  const [total, setTotal] = useState(0);

  const { isSearch, search } = useSearch();

  const options = useMemo(() => {
    return {
      page: isSearch ? 1 : page,
      per_page: isSearch ? 1000 : limit,
    };
  }, [page, limit, isSearch]);

  const { data, isLoading, error } = useUsers(options);

  useEffect(() => {
    if (data?.data) {
      setUsers((prevUsers) => {
        const existingIds = new Set(prevUsers.map((user) => user.id));
        const filteredNewUsers = data.data.filter(
          (user) => !existingIds.has(user.id),
        );

        return [...prevUsers, ...filteredNewUsers];
      });
    }
    if (data?.total) {
      setTotal(data.total);
    }
  }, [data]);

  const filteringUsers = users.filter((user) => {
    if (!search) return true;

    const searchUser = search.toLowerCase();

    return (
      user.email.toLowerCase().includes(searchUser) ||
      user.first_name.toLowerCase().includes(searchUser) ||
      user.last_name.toLowerCase().includes(searchUser)
    );
  });

  useEffect(() => {
    if (isLastScroll) {
      if (users.length < total) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isLastScroll]);

  const handleBackToTop = () => {
    // Scroll back to the top of the page
    refContainer.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <Dashboard refMain={refContainer}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10">
          {filteringUsers?.length > 0 ? (
            filteringUsers.map((user, i) => (
              <CardUsers id={user.id as number} key={i} />
            ))
          ) : (
            <Fragment>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton className="rounded-lg" isLoaded={isLoading} key={i}>
                  <div className="h-80 w-full rounded-lg bg-default" />
                </Skeleton>
              ))}
            </Fragment>
          )}
        </div>
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard refMain={refContainer}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10">
          User not found
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard refMain={refContainer}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10">
        {filteringUsers.map((user, i) => (
          <CardUsers id={user.id as number} key={i} />
        ))}
      </div>
      {!isSearch && filteringUsers.length < total ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            disabled={isLoading}
            onPress={() => setPage((prev) => prev + 1)}
          >
            {isLoading ? "Loading..." : "Next"}
          </Button>
        </div>
      ) : filteringUsers.length === total && !isSearch ? (
        <div className="flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          All users found
          <Button disabled={isLoading} onPress={handleBackToTop}>
            {isLoading ? "Loading..." : "Back to top"}
          </Button>
        </div>
      ) : filteringUsers.length === 0 && !isSearch ? (
        <div className="text-center text-muted-foreground">No users found</div>
      ) : null}
    </Dashboard>
  );
}
