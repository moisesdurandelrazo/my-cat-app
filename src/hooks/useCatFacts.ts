import { useInfiniteQuery } from "@tanstack/react-query";
import { Page, Item } from "../types/types";

const fetchCatFactsWithUsers = async ({
  pageParam = "1",
}: {
  pageParam?: string;
}): Promise<Page> => {
  const res = await fetch(`https://catfact.ninja/facts?page=${pageParam}`);
  if (!res.ok) throw new Error("Failed to fetch cat facts");

  const catFacts = await res.json();

  const usersRes = await fetch("https://randomuser.me/api?results=10");
  if (!usersRes.ok) throw new Error("Failed to fetch random users");

  const users = await usersRes.json();

  const dataWithUsers: Item[] = catFacts.data.map(
    (fact: { fact: string; length: number }, i: number) => ({
      ...fact,
      user: users.results[i],
    })
  );

  return {
    data: dataWithUsers,
    next_page_url: catFacts.next_page_url,
  };
};

const useCatFactsWithUsers = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: ["catFactsWithUsers"],
    queryFn: fetchCatFactsWithUsers,
    getNextPageParam: (lastPage) => lastPage.next_page_url || undefined,
  });
};

export default useCatFactsWithUsers;
