import { useInfiniteQuery } from "@tanstack/react-query";

type CatFact = {
  fact: string;
  length: number;
};

type RandomUser = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
};

type Page = {
  data: {
    fact: string;
    user: RandomUser;
  }[];
  next_page_url: string | null;
};

const fetchCatFactsWithUsers = async ({ pageParam }: { pageParam?: string }): Promise<Page> => {
  const url = pageParam || "https://catfact.ninja/facts";
//   console.log(`Fetching facts from: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cat facts");
  const data = await res.json();

//   console.log(`Fetched facts:`, data);

  const usersRes = await fetch(`https://randomuser.me/api/?results=${data.data.length}`);
  if (!usersRes.ok) throw new Error("Failed to fetch users");
  const usersData = await usersRes.json();

//   console.log(`Fetched users:`, usersData);

  const combinedData = data.data.map((fact: CatFact, index: number) => ({
    fact: fact.fact,
    user: usersData.results[index],
  }));

  return {
    data: combinedData,
    next_page_url: data.next_page_url,
  };
};

const useCatFactsWithUsers = () => {
  return useInfiniteQuery<Page, Error>({
    queryKey: ["catFactsWithUsers"],
    queryFn: fetchCatFactsWithUsers,
    getNextPageParam: (lastPage) => lastPage.next_page_url,
  });
};

export default useCatFactsWithUsers;
