import { useInfiniteQuery } from "@tanstack/react-query";
const fetchCatFactsWithUsers = async ({ pageParam }) => {
    const url = pageParam || "https://catfact.ninja/facts";
    //   console.log(`Fetching facts from: ${url}`);
    const res = await fetch(url);
    if (!res.ok)
        throw new Error("Failed to fetch cat facts");
    const data = await res.json();
    //   console.log(`Fetched facts:`, data);
    const usersRes = await fetch(`https://randomuser.me/api/?results=${data.data.length}`);
    if (!usersRes.ok)
        throw new Error("Failed to fetch users");
    const usersData = await usersRes.json();
    //   console.log(`Fetched users:`, usersData);
    const combinedData = data.data.map((fact, index) => ({
        fact: fact.fact,
        user: usersData.results[index],
    }));
    return {
        data: combinedData,
        next_page_url: data.next_page_url,
    };
};
const useCatFactsWithUsers = () => {
    return useInfiniteQuery({
        queryKey: ["catFactsWithUsers"],
        queryFn: fetchCatFactsWithUsers,
        getNextPageParam: (lastPage) => lastPage.next_page_url,
    });
};
export default useCatFactsWithUsers;
