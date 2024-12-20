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
const fetchCatFactsWithUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageParam = "1", }) {
    const res = yield fetch(`https://catfact.ninja/facts?page=${pageParam}`);
    if (!res.ok)
        throw new Error("Failed to fetch cat facts");
    const catFacts = yield res.json();
    const usersRes = yield fetch("https://randomuser.me/api?results=10");
    if (!usersRes.ok)
        throw new Error("Failed to fetch random users");
    const users = yield usersRes.json();
    const dataWithUsers = catFacts.data.map((fact, i) => (Object.assign(Object.assign({}, fact), { user: users.results[i] })));
    return {
        data: dataWithUsers,
        next_page_url: catFacts.next_page_url,
    };
});
const useCatFactsWithUsers = () => {
    return useInfiniteQuery({
        queryKey: ["catFactsWithUsers"],
        queryFn: fetchCatFactsWithUsers,
        getNextPageParam: (lastPage) => lastPage.next_page_url || undefined,
    });
};
export default useCatFactsWithUsers;
