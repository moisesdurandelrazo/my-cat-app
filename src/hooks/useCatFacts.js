var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useInfiniteQuery } from "@tanstack/react-query";
const fetchCatFactsWithUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageParam }) {
    const url = pageParam || "https://catfact.ninja/facts";
    //   console.log(`Fetching facts from: ${url}`);
    const res = yield fetch(url);
    if (!res.ok)
        throw new Error("Failed to fetch cat facts");
    const data = yield res.json();
    //   console.log(`Fetched facts:`, data);
    const usersRes = yield fetch(`https://randomuser.me/api/?results=${data.data.length}`);
    if (!usersRes.ok)
        throw new Error("Failed to fetch users");
    const usersData = yield usersRes.json();
    //   console.log(`Fetched users:`, usersData);
    const combinedData = data.data.map((fact, index) => ({
        fact: fact.fact,
        user: usersData.results[index],
    }));
    return {
        data: combinedData,
        next_page_url: data.next_page_url,
    };
});
const useCatFactsWithUsers = () => {
    return useInfiniteQuery({
        queryKey: ["catFactsWithUsers"],
        // @ts-ignore
        queryFn: fetchCatFactsWithUsers,
        getNextPageParam: (lastPage) => lastPage.next_page_url,
    });
};
export default useCatFactsWithUsers;
